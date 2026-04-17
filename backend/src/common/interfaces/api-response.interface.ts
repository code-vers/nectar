export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  statusCode: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    totalData: number;
    currentPage: number;
    limit: number;
    totalPages: number;
  };
}
