import { LogModel } from '../../data/mongo';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
export class MongoLogService implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);
    await newLog.save();
  }

  async getLogsBySecurityLevel(
    severityLevel: LogSeverityLevel
  ): Promise<LogEntity[]> {
    const logs = await LogModel.find({
      level: severityLevel,
    });

    return logs.map(LogEntity.fromObject);
  }
  async getLogsByOrigin(origin: string): Promise<LogEntity[]> {
    const logs = await LogModel.find({
      origin,
    });

    return logs.map(LogEntity.fromObject);
  }
  async getLogs(): Promise<LogEntity[]> {
    const logs = await LogModel.find({});

    return logs.map(LogEntity.fromObject);
  }
}
