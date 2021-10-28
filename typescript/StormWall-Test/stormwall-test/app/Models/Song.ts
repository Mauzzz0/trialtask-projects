import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import User from './User';

export default class Song extends BaseModel{
    public static table = 'songs';

    @column({ isPrimary: true })
    public id: number

    @column.dateTime({ autoCreate: true})
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime

    @column()
    public title: string

    @column()
    public singer: string

    @belongsTo(() => User)
    public user: BelongsTo<typeof User>

    @column()
    public user_id: number
}


