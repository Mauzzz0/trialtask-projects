import { Controller, Delete, Get, NotImplementedException, Post, Put } from '@nestjs/common';

@Controller('category')
export class CategoryController {
  @Get('/')
  public async list(): Promise<any> {
    /* Список категорий */
    throw new NotImplementedException();
  }

  @Post('/')
  public async create(): Promise<any> {
    /* Новая категория */
    throw new NotImplementedException();
  }

  @Put('/:id')
  public async update(): Promise<any> {
    /* Обновить категорию */
    throw new NotImplementedException();
  }

  @Delete('/:id')
  public async delete(): Promise<any> {
    /* Удалить категорию NO_CASCADE */
    throw new NotImplementedException();
  }
}
