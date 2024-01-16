import {CronAdapter} from "./third_party_apis/cron_adapter/cron.adapter";
import {CheckService} from "../domain(business_logic)/use_cases/check_service.usecase";
import {FileSystemDatasource} from "../infrastructure(implementation_or_process)/datasources/file_system.datasource";
import {LogImplementationRepository} from "../infrastructure(implementation_or_process)/repositories/log_implementation.repository"
import {PORT} from "../config/env_adapter/dotenv";
import {PrismaClient} from "@prisma/client";
import {PostgresLogDatasource} from "../infrastructure(implementation_or_process)/datasources/postgres_log.datasource";
import {CheckServiceMultiple} from "../domain(business_logic)/use_cases/check_service_multiple.usecase";
const fileSystemLogRepository:LogImplementationRepository = new LogImplementationRepository(
    new FileSystemDatasource()
)
const posgresSystemLogRepository:LogImplementationRepository = new LogImplementationRepository(
    new PostgresLogDatasource()
)
export class Server{
    static Start(){
        console.log('Server running...')

        const newServiceChecker = new  CheckServiceMultiple(
            [fileSystemLogRepository,posgresSystemLogRepository],
            ()=>{
                console.log('todo bien')
            },
                ()=>{
                console.log('algo salio mal')}
        );
        const newJob = CronAdapter.CreateCronJob('*/5 * * * * *',
            function () {
              newServiceChecker.execute('http://localhost:3000/posts')
            }, )
        setTimeout(()=>{
            newJob.stop()
        },150000)

    }
}