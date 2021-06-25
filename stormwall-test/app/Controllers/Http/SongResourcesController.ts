import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Song from 'App/Models/Song';
import CreateSongValidator from 'App/Validators/CreateSongValidator';
import IdIsNumberValidator from 'App/Validators/IdIsNumberValidator';

export default class SongResourcesController {
  public async index ({}: HttpContextContract) {
    const songs = await Song.all();
    return songs;
  }

  public async create ({}: HttpContextContract) {
  }

  public async store ({ request }: HttpContextContract) {
    await request.validate(CreateSongValidator);
    const { title, singer, user_id } = request.body();
    const song = await Song.create({
        title,
        singer,
        user_id
    })
    song.save();
    return {message: 'Created'}
  }

  public async show ({ response, params }: HttpContextContract) {
    const song = await Song.find(params['id']);
    if (song) return song
    return response.notFound({ message: 'Id not found' });
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({ response }: HttpContextContract) {
    // const song = await Song.find(ctx.params['id']);
    // let { title, singer } = ctx.request.body();
    // if (!song) return ctx.response.notFound({ message: 'Id not found' }) 
    // song.merge({ title, singer }).save();
    return response.notFound({ message: 'NOT IMPLEMENTED YET' })
  }

  public async destroy ({ response, params }: HttpContextContract) {
    const song = await Song.find(params['id']);
    if (!song) return response.notFound({ message: 'Id not found' })
    song.delete();
    return {message: 'Deleted'}
  }
}
