import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class SongController{

    public async getAll(ctx: HttpContextContract) {
        return {message: 'SongController.getAll'}
    }

    public async getById(ctx: HttpContextContract) {
        return {message: 'SongController.getById', id: ctx.params['id']}
    }

    public async Create(ctx: HttpContextContract) {
        return {message: 'SongController.Create'}
    }

    public async Delete(ctx: HttpContextContract) {
        return {message: 'SongController.Delete', id: ctx.params['id']}
    }

    public async Update(ctx: HttpContextContract) {
        return {message: 'SongController.Update', id: ctx.params['id']}
    }
}