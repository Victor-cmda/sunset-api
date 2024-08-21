import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Req,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoItemDto, CreateTodoListDto } from './dto/create-todo.dto';
import { UpdateTodoItemDto } from './dto/update-todo.dto';

@Controller('api/v1/todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post('list')
  async createList(@Body() body: CreateTodoListDto, @Req() req: any) {
    return await this.todoService.createList(body.name, body.color, req.user);
  }

  @Get('lists')
  async findAllLists(@Req() req: any) {
    return await this.todoService.findAllLists(req.user.userId);
  }

  @Put('list/:id')
  async updateList(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: any,
  ) {
    return await this.todoService.updateList(id, body);
  }

  @Delete('list/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteList(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.todoService.deleteList(id);
  }

  @Post('item/:listId')
  async createItem(
    @Param('listId', new ParseUUIDPipe()) listId: string,
    @Body() body: CreateTodoItemDto,
  ) {
    return await this.todoService.createItem(listId, body.name);
  }

  @Put('item/:id')
  async updateItem(@Param('id') id: number, @Body() body: UpdateTodoItemDto) {
    return await this.todoService.updateItem(id, body);
  }

  @Delete('item/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteItem(@Param('id') id: number) {
    return await this.todoService.deleteItem(id);
  }
}
