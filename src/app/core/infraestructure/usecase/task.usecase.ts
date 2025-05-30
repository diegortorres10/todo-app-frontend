import { inject, Injectable } from '@angular/core';
import { TaskImplService } from '../implementations/trask-impl.service';
import { map, Observable } from 'rxjs';
import { GetTaskListResponse } from '../interfaces/Task/GetTaskResponse.interface';
import { UpsertTaskResponse } from '../interfaces/Task/UpsertTaskResponse.interface';
import { CreateTaskRequest } from '../interfaces/Task/CreateTask.interface';
import { BaseResponse } from '../interfaces/BaseResponse/BaseResponse.interface';
import { UpdateTaskRequest } from '../interfaces/Task/UpdateTaskRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskUseCase {
  private taskImplService = inject(TaskImplService);

  getAllTasks(): Observable<GetTaskListResponse> {
    return this.taskImplService.getAllTasks().pipe(map((response) => response));
  }

  createTask(taskRequest: CreateTaskRequest): Observable<UpsertTaskResponse> {
    return this.taskImplService
      .createTask(taskRequest)
      .pipe(map((response) => response));
  }

  updateTask(
    taskId: string,
    taskRequest: UpdateTaskRequest
  ): Observable<UpsertTaskResponse> {
    return this.taskImplService
      .updateTask(taskId, taskRequest)
      .pipe(map((response) => response));
  }

  updateStateTask(
    taskId: string,
    completed: boolean
  ): Observable<UpsertTaskResponse> {
    const taskRequest: UpdateTaskRequest = {
      completed: completed,
    };
    return this.taskImplService
      .updateTask(taskId, taskRequest)
      .pipe(map((response) => response));
  }

  deleteTask(taskId: string): Observable<BaseResponse> {
    return this.taskImplService
      .deleteTask(taskId)
      .pipe(map((response) => response));
  }
}
