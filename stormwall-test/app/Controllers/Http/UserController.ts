import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UserController{

    public async getAll(ctx: HttpContextContract) {
        return {message: 'UserController.getAll'}
    }

    public async getById(ctx: HttpContextContract) {
        return {message: 'UserController.getById', id: ctx.params['id']}
    }

    public async Create(ctx: HttpContextContract) {
        return {message: 'UserController.Create'}
    }

    public async Delete(ctx: HttpContextContract) {
        return {message: 'UserController.Delete', id: ctx.params['id']}
    }

    public async Update(ctx: HttpContextContract) {
        return {message: 'UserController.Update', id: ctx.params['id']}
    }
}