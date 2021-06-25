import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import { DateTime } from "luxon";

export default class UserController{

    public async getAll(_ctx: HttpContextContract) {
        const users = await User.all();
        return users;
    }

    public async getById({ response, params }: HttpContextContract) {
        const user = await User.find(params['id']);
        await user?.load('songs');
        if (user) return user
        return response.notFound({ message: 'Id not found' });
    }

    public async Create(ctx: HttpContextContract) {
        const { name, email, dateBirth } = ctx.request.body();

        let birthDate = DateTime.fromFormat(dateBirth, 'dd.mm.yyyy')
        let def = DateTime.now();

        const user = await User.create({
            name,
            email,
            birth_date: def
        })


        return {message: 'Created'}
    }

    public async Delete({ params, response }: HttpContextContract) {
        const user = await User.find(params['id']);
        if (!user) return response.notFound({ message: 'Id not found' })
        user.delete();
        return {message: 'Deleted'}
    }

    public async Update({ response }: HttpContextContract) {
        // const user = await User.find(ctx.params['id']);
        // let { title, singer } = ctx.request.body();
        // if (!user) return ctx.response.notFound({ message: 'Id not found' }) 
        // user.merge({ title, singer }).save();
        return response.notFound({ message: 'NOT IMPLEMENTED YET' })
    }
}