import {LogDatasource} from "../../domain(business_logic)/datasources(data_origin)I/log.datasource";
import {LogEntity, LogSeverityLevel} from "../../domain(business_logic)/entities(models)/log.entity";
import * as fs from "fs";
export class FileSystemDatasource implements LogDatasource{
    private readonly logPath = 'logs/';
    private readonly alllogPath = 'logs/all_logs.log';
    private readonly lowlogPath = 'logs/low_logs.log';
    private readonly medlogPath = 'logs/med_logs.log';
    private readonly highlogPath = 'logs/hig_logs.log';

    constructor(){
        this.createLogsFiles()
    }
    private createLogsFiles(){
        if(!fs.existsSync(this.logPath)){
            fs.mkdirSync(this.logPath,{recursive:true})
        }
        !fs.existsSync(this.alllogPath) && fs.writeFileSync(this.alllogPath,'')
        !fs.existsSync(this.lowlogPath) && fs.writeFileSync(this.lowlogPath,'')
        !fs.existsSync(this.medlogPath) && fs.writeFileSync(this.medlogPath,'')
        !fs.existsSync(this.highlogPath) && fs.writeFileSync(this.highlogPath,'')
    }
    async saveLog(newLog: LogEntity): Promise<void> {
        const logJson = `${JSON.stringify(newLog)}\n`
        fs.appendFileSync(this.alllogPath,logJson)

        newLog.level === LogSeverityLevel.low && fs.appendFileSync(this.lowlogPath,logJson)
        newLog.level === LogSeverityLevel.medium && fs.appendFileSync(this.medlogPath,logJson)
        newLog.level === LogSeverityLevel.high && fs.appendFileSync(this.highlogPath,logJson)

    }
    async getLog(severityLevel?: LogSeverityLevel): Promise<LogEntity[]> {
        if(!severityLevel){
            return this.getLogsFromFile(this.alllogPath)
        }
        switch (severityLevel){
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.lowlogPath)
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.medlogPath)
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highlogPath)
        }

    }
    private getLogsFromFile =(path:string):LogEntity[]=>{
        const content = fs.readFileSync(path,'utf-8')
        return content.split("\n").map(log=>LogEntity.fromJson(log))
    }

}