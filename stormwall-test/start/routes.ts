import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('user', 'UserResourcesController').apiOnly();
  Route.resource('song', 'SongResourcesController').apiOnly();
}).prefix('/api')

Route.any('*', (ctx) => {
  ctx.response.notFound({message: 'Page not found'});
  // Something code for standartization non-existent URIs
})