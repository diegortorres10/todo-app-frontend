import { Observable } from 'rxjs';
import { GetTaskListResponse } from '../interfaces/Task/GetTaskResponse.interface';
import { CreateTaskRequest } from '../interfaces/Task/CreateTask.interface';
import { BaseResponse } from '../interfaces/BaseResponse/BaseResponse.interface';
import { UpsertTaskResponse } from '../interfaces/Task/UpsertTaskResponse.interface';
import { UpdateTaskRequest } from '../interfaces/Task/UpdateTaskRequest.interface';

export abstract class TaskRepository {
  abstract getAllTasks(userId: string): Observable<GetTaskListResponse>;
  abstract createTask(
    createTask: CreateTaskRequest
  ): Observable<UpsertTaskResponse>;
  abstract updateTask(
    taskId: string,
    request: UpdateTaskRequest
  ): Observable<UpsertTaskResponse>;
  abstract deleteTask(taskId: string): Observable<BaseResponse>;
}
