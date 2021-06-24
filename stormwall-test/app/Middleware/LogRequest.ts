import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Logger from '@ioc:Adonis/Core/Logger';

export default class LogRequest {
    public async handle(
        { request }: HttpContextContract,
        next: () => Promise<void>
    ) {
        Logger.info(`${request.hostname()} ${request.method()}: ${request.url()}`);
        if (JSON.stringify(request.body()) !== '{}') console.log(request.body());
        await next()
    }
}