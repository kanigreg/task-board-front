import { Exclude, Expose } from 'class-transformer';

export class Todo {
  @Exclude({ toPlainOnly: true })
  id: number;
  
  @Expose({ name: 'project_id', toPlainOnly: true})
  projectId?: number;
  
  @Expose()
  text: string;
  
  @Expose({ name: 'is_completed' })
  isCompleted?: boolean;
}
