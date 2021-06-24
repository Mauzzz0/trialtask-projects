import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Song from "App/Models/Song";


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

    public async Create(ctx: HttpContextContract) {
        let { title, singer } = ctx.request.body();

        await Song.create({
            title,
            singer
        });

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