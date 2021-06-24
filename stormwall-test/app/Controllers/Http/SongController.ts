import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Song from "App/Models/Song";
import User from "App/Models/User";
import Database  from '@ioc:Adonis/Lucid/Database';

export default class SongController{

    public async getAll(_ctx: HttpContextContract) {
        const songs = await Song.all();
        return songs;
    }

    public async getById(ctx: HttpContextContract) {
        const song = await Song.find(ctx.params['id']);
        if (song) return song
        return ctx.response.notFound({ message: 'Id not found' });
    }

    public async Create({ request, response }: HttpContextContract) {
        let { title, singer } = request.body();
        // const title = request.input('title');
        // const singer = request.input('singer');
        // const user_id = request.input('user_id');

        // const user = await User.findOrFail(user_id);

        const song = await Song.create({
            title,
            singer
        })


        // // await song.related('userId').attach(user1);
        // await song.related('songs').attach(user1);

        return {message: 'Created'}
    }

    public async Delete(ctx: HttpContextContract) {
        const song = await Song.find(ctx.params['id']);
        if (!song) return ctx.response.notFound({ message: 'Id not found' })
        song.delete();
        return {message: 'Deleted'}
    }

    public async Update(ctx: HttpContextContract) {
        const song = await Song.find(ctx.params['id']);
        let { title, singer } = ctx.request.body();
        if (!song) return ctx.response.notFound({ message: 'Id not found' }) 
        song.merge({ title, singer }).save();
        return { message: 'Updated' }
    }
}