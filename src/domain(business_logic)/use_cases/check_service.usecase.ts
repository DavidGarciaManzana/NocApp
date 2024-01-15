import {LogRepository} from "../repository(calls_datasource)I/log.repository";
import {LogEntity, LogSeverityLevel} from "../entities(models)/log.entity";

export class CheckService {
    constructor(private logRepository:LogRepository,private onSuccess:Function,private onFail:Function) {
    }
    async execute (url:string){
        try {
            const call = await fetch(url);
            const data = await call.json();
            if (!call.ok){
                throw new Error('Something went wrong')
            }

            const log =new LogEntity(LogSeverityLevel.low,`Service ${url} working`)
            this.logRepository.saveLog(log)
            this.onSuccess()
            return true
        }catch (err){
            const log =new LogEntity(LogSeverityLevel.hight,`${url}is not okay. ${err}`)
            this.logRepository.saveLog(log)
            this.onFail()
            return false
        }

    }
}

