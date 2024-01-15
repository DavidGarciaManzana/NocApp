import {LogEntity, LogSeverityLevel} from "../entities(models)/log.entity";

export abstract class LogDatasource{
    abstract saveLog (log:LogEntity):Promise<void>
    abstract getLog (severityLevel?:LogSeverityLevel):Promise<LogEntity[]>
}