import { Response } from 'express';

export class HttpResponse {
  private constructor() {}

  static create(
    response: Response,
    status: number,
    key: string,
    data?: Record<string, any>,
    interpolations?: Record<string, any>
  ): HttpResponse {
    const message = response.locals.t(`${key}_${status}`, interpolations);
    return response.status(status).json({
      status,
      message,
      ...data,
    });
  }
}
