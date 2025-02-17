export interface IPaginationOptions {
  page?: number;
  limit?: number;
}

export interface IPaginationResponse {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}
