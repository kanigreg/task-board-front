import { Exclude, Expose, Type } from 'class-transformer';
import { Todo } from "./todo";

export class Project {
  @Exclude({ toPlainOnly: true })
  id: number;
  
  @Expose()
  title: string;
  
  @Exclude({ toPlainOnly: true })
  @Type(() => Todo)
  todos: Todo[];
}
