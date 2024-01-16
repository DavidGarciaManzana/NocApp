import {LogRepository} from "../repository(calls_datasource)I/log.repository";
import {LogEntity, LogSeverityLevel} from "../entities(models)/log.entity";

export class CheckServiceMultiple {
    constructor(private logRepository:LogRepository[],private onSuccess:Function,private onFail:Function) {
    }

    private callLogs(log:LogEntity){
        this.logRepository.forEach(logRepository=>{
            logRepository.saveLog(log)
        })
    }
    async execute (url:string){
        try {
            const call = await fetch(url);
            const data = await call.json();
            if (!call.ok){
                throw new Error('Something went wrong')
            }

            const log =new LogEntity(LogSeverityLevel.low,`Service ${url} working`)
            this.callLogs(log)
            this.onSuccess()
            return true
        }catch (err){
            const log =new LogEntity(LogSeverityLevel.high,`${url}is not okay. ${err}`)
            this.callLogs(log)
            this.onFail()
            return false
        }

    }
}

