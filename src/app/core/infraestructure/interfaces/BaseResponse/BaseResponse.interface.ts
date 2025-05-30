export interface BaseResponse {
  success: boolean;
  timestamp: string;
  message?: string;
  errors?: ErrorResponse[];
}

export interface ErrorResponse {
  field: string;
  message: string;
}
