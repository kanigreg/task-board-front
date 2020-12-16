import { Exclude, Expose, Transform } from 'class-transformer';

export class Todo {
  @Exclude({ toPlainOnly: true })
  id: number;
  
  @Expose({ name: 'project_id', toClassOnly: true })
  projectId?: number;

  @Expose({ name: 'project_title', toPlainOnly: true })
  projectTitle?: string;
  
  @Expose()
  text: string;
  
  @Expose({ name: 'is_completed', toPlainOnly: true })
  isCompleted: boolean;
}
