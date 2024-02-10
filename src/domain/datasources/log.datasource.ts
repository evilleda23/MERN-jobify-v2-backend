import { LogEntity, LogSeverityLevel } from '../entities/log.entity';

export abstract class LogDatasource {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(): Promise<LogEntity[]>;
  abstract getLogsBySecurityLevel(
    severityLevel: LogSeverityLevel
  ): Promise<LogEntity[]>;
}
