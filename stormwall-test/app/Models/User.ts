import { DateTime } from 'luxon';
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class User extends BaseModel{
    public static table = 'users';

    @column({ isPrimary: true })
    public id: number

    @column.dateTime({ autoCreate: true})
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime

    @column()
    public name: string

    @column() // TODO: email validator
    public email: string

    @column.dateTime() // TODO: date after validator
    public birthdate: DateTime 
}


