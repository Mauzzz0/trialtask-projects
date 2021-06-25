import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserResourcesController {
  public async index ({}: HttpContextContract) {
    // all
  }

  // public async create ({}: HttpContextContract) {
  // }

  public async store ({}: HttpContextContract) {
    // create new one
  }

  public async show ({}: HttpContextContract) {
    // get by id
  }

  // public async edit ({}: HttpContextContract) {
  // }

  public async update ({}: HttpContextContract) {
    // upd
  }

  public async destroy ({}: HttpContextContract) {
    // delete
  }
}
