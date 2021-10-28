# Rest API for online shop for Pryaniky.com
###### ASP.NET API, cloud MongoDB
###### Database in cloud.mongodb.com allows `all connections`. Just download repo and test API.
### Models:
#### Product - `Id`, `Title`, `Description`, `Price`, `Quantity`. With sync/async service.
#### Order - `Id`, `ProductId` array, `Quantity` array. With sync/async service.
## Endpoints
| PATH ( `api/` )| METHOD | ACTION |
|----------------|:---------:|----------------:|
| test/ | `POST` | Create some products (15 tv, 9 cameras, 32 radios, 19 audios) |
| test/ | `DELETE` | Wipe all products |
| product/ | `POST` | Create new product (need title, description, price in json body) |
| product/ | `GET` | Return all products |
| product/{id} | `GET` | Return product by id |
| product/{id} | `DELETE` | Delete product by id |
| product/{id} | `PUT` | Update already exist product (need new product in json body) |
| order/ | `POST` | Create new order (need ProductId, Quantity in json body) |
| order/ | `GET` | Return all orders |
| order/{id} | `GET` | Return order by id |
| order/{id} | `DELETE` | Delete order by id |

## Замечания
 Нет большого опыта разработки REST API средствами ASP.NET, поэтому нет представления о верной архитектуре. При построении рахитектуры опирался на пару статей с сайта майкрософт: [#1](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-5.0&tabs=visual-studio), [#2](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/ddd-oriented-microservice) и [#3](https://github.com/evgomes/supermarket-api), в целом придерживался архитектуры, которая используется при работе с Node.js. Отсутствует использование паттерна "Репозиторий", как и сами репозитории. Отсутствуют интерфейсы для сервисов (чтобы не увеличивать количество кода на ровном месте, нарушая принцип KISS). Из-за чего будет сложнее производить расширение приложения по горизонтали и вертикали, нет возможности легко заменять сервисы для работы с другими БД. В модели заказа двумя массивами представлены списки и количества продуктов для создания заказа, это несовсем удобно, возможны ошибки при неравных длинах массивов. API никак не общается с параметрами запросами, возможно это и хорошо, но мне кажется обратное. В конструктор OrderService прокидывается экземпляр productService, возможно, ненужная зависимость, но как это обойти не знаю. Касаемо солида, по моему мнению, слегка нарушен dependency inversion principle из-за отсутствия некоторых интерфейсов. Не совсем ясно как в лоб работать с json в ASP.NET, из-за чего нет правильной обработки ошибок, например: в сигнатуре для GET: /api/product/{id} стоит возвращаемый тип `Product`, в случае, если по id ничего не найдено - данная программа вернёт ошибку (это неправильно!!), корректнее будет вернуть statuscode 404 + джсон ответ { message: 'Incorrect key' }, однако, в сигнатуре явно сказано что возвращаемый тип должен быть Product, поэтому мы не можем вернуть new JsonResult(), хотя в конечном счёте и то и то вернёт json.. как быть...
