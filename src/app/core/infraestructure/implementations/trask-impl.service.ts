import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { TaskRepository } from '../repositories/task.repository';
import { BaseResponse } from '../interfaces/BaseResponse/BaseResponse.interface';
import { CreateTaskRequest } from '../interfaces/Task/CreateTask.interface';
import { GetTaskListResponse } from '../interfaces/Task/GetTaskResponse.interface';
import { UpsertTaskResponse } from '../interfaces/Task/UpsertTaskResponse.interface';
import { UpdateTaskRequest } from '../interfaces/Task/UpdateTaskRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskImplService extends TaskRepository {
  private readonly apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getAllTasks(): Observable<GetTaskListResponse> {
    return this.http.get<GetTaskListResponse>(`${this.apiUrl}/api/v1/tasks`);
  }

  createTask(
    createTaskRequest: CreateTaskRequest
  ): Observable<UpsertTaskResponse> {
    return this.http.post<UpsertTaskResponse>(
      `${this.apiUrl}/api/v1/tasks`,
      createTaskRequest
    );
  }

  updateTask(
    taskId: string,
    request: UpdateTaskRequest
  ): Observable<UpsertTaskResponse> {
    return this.http.put<UpsertTaskResponse>(
      `${this.apiUrl}/api/v1/tasks/${taskId}`,
      request
    );
  }

  deleteTask(taskID: string): Observable<BaseResponse> {
    return this.http.delete<BaseResponse>(
      `${this.apiUrl}/api/v1/tasks/${taskID}`
    );
  }
}
