import {LogDatasource} from "../../domain(business_logic)/datasources(data_origin)I/log.datasource";
import {LogEntity, LogSeverityLevel} from "../../domain(business_logic)/entities(models)/log.entity";
import {PrismaClient, SecurityLevel} from "@prisma/client";
import {secureHeapUsed} from "node:crypto";

const prismaClient = new PrismaClient();
export class PostgresLogDatasource implements LogDatasource{
    async getLog(severityLevel?: LogSeverityLevel): Promise<LogEntity[]> {
        let logs;
        if(severityLevel){
            logs = await prismaClient.logModel.findMany({
                where:{
                    level:severityLevel.toUpperCase() as SecurityLevel
                }
            })
            console.log(logs)
        } else {
            logs = await prismaClient.logModel.findMany()
            console.log(logs)
        }

        return logs.map(log=>LogEntity.fromObjetc(log))
    }

    async saveLog(log: LogEntity): Promise<void> {
        const {level,message,createdAt}=log;
        const newLog = await prismaClient.logModel.create({
            data:{
                level:level.toUpperCase() as SecurityLevel,
                message:message,
                createdAt:createdAt,
                origin:"postgres_datasource.ts"

            }
        })
        console.log(newLog)

        return Promise.resolve(undefined);
    }

}