import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateUserValidator{
    constructor(protected ctx: HttpContextContract){
    }

    public schema = schema.create({
        name: schema.string({trim:true}, [
            rules.required(),
        ]),
        email: schema.string({trim:true}, [
            rules.minLength(5), // a@a.a
            rules.email()
        ]),
        dateBirth : schema.date({format: 'dd.mm.yyyy'}, [
            rules.before('today')
        ])
    })

    public messages = {}
}