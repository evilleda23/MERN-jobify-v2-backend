import { NextFunction, Request, Response } from 'express';
import { ErrorDto } from '../../domain/interfaces';
import { HttpResponse } from '../shared';

export function ValidateBodyDtoMiddleware<T>(dtoClass: {
  create(object: unknown): [ErrorDto[]?, T?];
  getName(): string;
}): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    const [errors, createDto] = dtoClass.create(req.body);
    if (errors) return HttpResponse.create(res, 400, 'payload', { errors });

    const className = dtoClass.getName();

    req.body = { ...req.body, [className]: createDto as T };

    next();
  };
}

export function ValidateQueryDtoMiddleware<T>(dtoClass: {
  create(object: unknown): [ErrorDto[]?, T?];
  getName(): string;
}): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    const [errors, createDto] = dtoClass.create(req.query);

    if (errors) {
      return HttpResponse.create(res, 400, 'payload', { errors });
    }

    const className = dtoClass.getName();

    req.body = { ...req.body, [className]: createDto as T };

    next();
  };
}
