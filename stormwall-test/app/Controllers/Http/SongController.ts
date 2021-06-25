import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Song from "App/Models/Song";
import CreateSongValidator from "App/Validators/CreateSongValidator";

export default class SongController{

    public async getAll(_ctx: HttpContextContract) {
        const songs = await Song.all();
        return songs;
    }

    public async getById({ response, params}: HttpContextContract) {
        const song = await Song.find(params['id']);
        if (song) return song
        return response.notFound({ message: 'Id not found' });
    }

    public async Create({ request }: HttpContextContract) {
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

    public async Delete({ response, params }: HttpContextContract) {
        const song = await Song.find(params['id']);
        if (!song) return response.notFound({ message: 'Id not found' })
        song.delete();
        return {message: 'Deleted'}
    }

    public async Update({ response }: HttpContextContract) {
        // const song = await Song.find(ctx.params['id']);
        // let { title, singer } = ctx.request.body();
        // if (!song) return ctx.response.notFound({ message: 'Id not found' }) 
        // song.merge({ title, singer }).save();
        return response.notFound({ message: 'NOT IMPLEMENTED YET' })
    }
}