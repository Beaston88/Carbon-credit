class ApiResponse<T> {
  statusCode: number;
  message: string;
  success: boolean;
  data: T | null;

  constructor(statusCode: number, message: string = "Success", data?: T) {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data || null;
  }
}

export { ApiResponse };
