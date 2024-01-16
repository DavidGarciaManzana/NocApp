export enum LogSeverityLevel {
    low='low',
    medium='medium',
    high='high'
}
export class LogEntity{
    level:LogSeverityLevel
    message:string
    createdAt:Date
    constructor(level:LogSeverityLevel,message:string,createdAt:Date=new Date) {
        this.level = level
        this.message = message
        this.createdAt=createdAt
    }
    static fromJson =(json:string):LogEntity=>{
        const {message,level,createdAt} = JSON.parse(json)
        const log = new LogEntity(message,level)
        log.createdAt = new Date(createdAt);

        return log;
    }
    static fromObjetc = (object:{[key:string]:any}):LogEntity=>{
        const {message,level,createdAt,origin} = object;
        const log = new LogEntity(message,level,createdAt)
        return log
    }
}