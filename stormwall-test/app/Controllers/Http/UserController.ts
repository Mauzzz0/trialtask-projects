import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Song from "App/Models/Song";
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
        let user = await User.create({
            name,
            email,
            birth_date: def
        })

        user.save();

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