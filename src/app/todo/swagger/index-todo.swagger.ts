import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { TodoItem, TodoList } from '../entity/todo.entity';
import { IndexUserSwagger } from 'src/app/user/swagger/index-user.swagger';

export class IndexTodoListSwagger extends PartialType(
  OmitType(TodoList, ['createdAt', 'updatedAt', 'deletedAt', 'items', 'user']),
) {
  @ApiProperty({ type: () => IndexTodoItemSwagger, isArray: true })
  items: IndexTodoItemSwagger[];

  @ApiProperty({ type: () => IndexUserSwagger })
  user: IndexUserSwagger;
}

export class IndexTodoItemSwagger extends OmitType(TodoItem, [
  'createdAt',
  'updatedAt',
  'deletedAt',
  'todoList',
] as const) {}
