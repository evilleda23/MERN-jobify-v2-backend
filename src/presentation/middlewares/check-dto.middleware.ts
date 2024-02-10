import { NextFunction, Request, Response } from 'express';

export function ValidateBodyDtoMiddleware<T>(dtoClass: {
  create(object: unknown): [string?, T?];
  getName(): string;
}): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    const [error, createDto] = dtoClass.create(req.body);
    if (error) return res.status(400).json({ error });

    const className = dtoClass.getName();

    req.body = { ...req.body, [className]: createDto as T };

    next();
  };
}

export function ValidateQueryDtoMiddleware<T>(dtoClass: {
  create(object: unknown): [string?, T?];
  getName(): string;
}): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    const [error, createDto] = dtoClass.create(req.query);

    if (error) {
      return res.status(400).json({ error });
    }

    const className = dtoClass.getName();

    req.body = { ...req.body, [className]: createDto as T };

    next();
  };
}
