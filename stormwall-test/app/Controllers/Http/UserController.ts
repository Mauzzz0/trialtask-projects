import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Song from "App/Models/Song";
import User from "App/Models/User";
import User from "App/Models/User";
import { DateTime } from "luxon";

export default class UserController{

    public async getAll(ctx: HttpContextContract) {
        const users = await User.all();
        return users;
    }

    public async getById(ctx: HttpContextContract) {
        const user = await User.find(ctx.params['id']);
        if (user) return user
        return ctx.response.notFound({ message: 'Id not found' });
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

        const song1 = await Song.findOrFail(3);
        const song2 = await Song.findOrFail(4);

        await user.related('songs').createMany([song1, song2]);
        await user.related('songs').fetchOrCreateMany([song1, song2])
        //  "E_MISSING_MODEL_ATTRIBUTE: \"User.songs\" expects \"songId\" to exist on \"Song\" model, but is missing",
        // Но в сонгах существуют эти айди....

        // await user.related('songs').attach([]) СТРОКА ИЗ ВИДЕО, ПОЧЕМУ НЕ РАБОТАЕТ attach

        // const { name, email, dateBirth, songs } = ctx.request.body();

        // let song = await Song.findOrFail(songs[0]);

        // const user = await User.create({
        //     name,
        //     email,
        //     birth_date: def
        // })

        return {message: 'Created'}
    }

    public async Delete(ctx: HttpContextContract) {
        const user = await User.find(ctx.params['id']);
        if (!user) return ctx.response.notFound({ message: 'Id not found' })
        user.delete();
        return {message: 'Deleted'}
    }

    public async Update(ctx: HttpContextContract) {
        const user = await User.find(ctx.params['id']);
        let { title, singer } = ctx.request.body();
        if (!user) return ctx.response.notFound({ message: 'Id not found' }) 
        user.merge({ title, singer }).save();
        return { message: 'Updated' }
    }
}