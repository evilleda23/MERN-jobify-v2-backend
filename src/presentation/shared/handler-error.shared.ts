import { Response } from 'express';
import { CustomError } from '../../domain';
import { HttpResponse } from '.';

import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export const handleError = (
  error: unknown,
  res: Response,
  origin: string,
  logService?: LogDatasource
) => {
  if (error instanceof CustomError && error.statusCode < 500) {
    return HttpResponse.create(res, error.statusCode, error.message);
  }
  if (logService) {
    const log = new LogEntity({
      level: LogSeverityLevel.high,
      message: `${error}`,
      origin,
    });
    logService.saveLog(log);
  }
  console.log(`${error}`);
  return HttpResponse.create(res, 500, 'error');
};
