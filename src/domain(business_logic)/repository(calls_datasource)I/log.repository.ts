import {LogEntity, LogSeverityLevel} from "../entities(models)/log.entity";

export abstract class LogRepository{
    abstract saveLog (log:LogEntity):Promise<void>
    abstract getLog (severityLevel:LogSeverityLevel):Promise<LogEntity[]>
}