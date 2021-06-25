/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

  Route.group(() => {
    Route.post('', 'SongController.Create');
    Route.get('', 'SongController.getAll');
    Route.get('/:id', 'SongController.getById');
    Route.put('/:id', 'SongController.Update');
    Route.delete('/:id', 'SongController.Delete');
  }).prefix('/song')

  Route.group(() => {
    Route.post('', 'UserController.Create');
    Route.get('', 'UserController.getAll');
    Route.get('/:id', 'UserController.getById');
    Route.put('/:id', 'UserController.Update');
    Route.delete('/:id', 'UserController.Delete');
    Route.resource('user', 'UserResourcesController').apiOnly();
    Route.resource('user.song', 'UserSongResourcesController').only(['index', 'destroy', 'show']);
  }).prefix('/user')

}).prefix('/api')

Route.any('*', (ctx) => {
  ctx.response.notFound({message: 'Page not found'});
  // Something code for standartization non-existent URIs
})