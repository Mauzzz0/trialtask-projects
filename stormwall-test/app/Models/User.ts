import { DateTime } from 'luxon';
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Song from './Song';

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
    public birth_date: DateTime

    @hasMany(() => Song)
    public songs: HasMany<typeof Song>
}


