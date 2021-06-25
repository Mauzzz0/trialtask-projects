import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import CreateUserValidator from 'App/Validators/CreateUserValidator';
import { DateTime } from 'luxon';

export default class UserResourcesController {
  public async index ({}: HttpContextContract) {
    const users = await User.all();
    return users;
  }

  public async create ({}: HttpContextContract) {
  }

  public async store ({ request }: HttpContextContract) {
    await request.validate(CreateUserValidator);
    const { name, email, dateBirth } = request.body();
    let birthDate = DateTime.fromFormat(dateBirth, 'dd.mm.yyyy')
    await User.create({
        name,
        email,
        birth_date: birthDate
    })
    return {message: 'Created'}
  }

  public async show ({ response, params }: HttpContextContract) {
    const id = Number(params['id']) || undefined;  // Понятное дело id это далеко не всегда number, особенно в NoSQL, это просто для практики.
    if (!id) response.abort({ message: 'id is not a number' })
    const user = await User.find(id);
    await user?.load('songs');
    if (user) return user
    return response.notFound({ message: 'Id not found' });
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({ response }: HttpContextContract) {
    // const user = await User.find(ctx.params['id']);
    // let { title, singer } = ctx.request.body();
    // if (!user) return ctx.response.notFound({ message: 'Id not found' }) 
    // user.merge({ title, singer }).save();
    return response.notImplemented({ message: 'NOT IMPLEMENTED YET' })
  }

  public async destroy ({ response, params }: HttpContextContract) {
    const id = Number(params['id']) || undefined;  // Понятное дело id это далеко не всегда number, особенно в NoSQL, это просто для практики.
    if (!id) response.abort({ message: 'id is not a number' })
    const user = await User.find(id);
    if (!user) return response.notFound({ message: 'Id not found' })
    user.delete();
    return {message: 'Deleted'}
  }
}
