import { BaseResponse } from '../BaseResponse/BaseResponse.interface';

// export interface GetTaskResponse extends BaseResponse {
//   data: TaskResponse;
// }

export interface GetTaskListResponse extends BaseResponse {
  data: TaskResponse[];
}

export interface TaskResponse {
  id: string;
  userId: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
