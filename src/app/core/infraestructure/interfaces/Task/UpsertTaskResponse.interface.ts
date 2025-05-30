import { BaseResponse } from '../BaseResponse/BaseResponse.interface';
import { TaskResponse } from './GetTaskResponse.interface';

export interface UpsertTaskResponse extends BaseResponse {
  data: TaskResponse;
}
