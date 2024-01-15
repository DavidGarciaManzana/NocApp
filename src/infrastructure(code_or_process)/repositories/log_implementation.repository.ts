import {LogRepository} from "../../domain(business_logic)/repository(calls_datasource)I/log.repository";
import {LogEntity, LogSeverityLevel} from "../../domain(business_logic)/entities(models)/log.entity";
import {LogDatasource} from "../../domain(business_logic)/datasources(data_origin)I/log.datasource";

export class LogImplementationRepository implements LogRepository{
    //inyeccion de dependencias (oracle, sql,mongo,etc)
    constructor(private readonly logDataSource:LogDatasource) {
    }


    async saveLog(log: LogEntity): Promise<void> {
        this.logDataSource.saveLog(log)
    }
    async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDataSource.getLog(severityLevel)
    }

}