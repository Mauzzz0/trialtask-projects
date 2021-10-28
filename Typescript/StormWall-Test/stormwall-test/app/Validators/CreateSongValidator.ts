import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"; 

export default class CreateSongValidator{
    constructor(protected ctx: HttpContextContract){
    }

    public schema = schema.create({
        title: schema.string({trim:true}, [
            rules.required(),
        ]),
        singer: schema.string({trim:true}, [
            rules.required()
        ])
    })

    public messages = {}
}