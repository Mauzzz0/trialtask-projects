import { Controller, Delete, Get, NotImplementedException, Post, Put } from '@nestjs/common';

@Controller('order')
export class OrderController {
  @Get(':id')
  public async read() {
    throw new NotImplementedException();
  }

  @Post('')
  public async create(): Promise<any> {
    throw new NotImplementedException();
  }

  @Put(':id')
  public async update(): Promise<any> {
    throw new NotImplementedException();
  }

  @Delete(':id')
  public async delete(): Promise<any> {
    throw new NotImplementedException();
  }
}
