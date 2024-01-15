import {CronAdapter} from "./third_party_apis/cron_adapter/cron.adapter";
import {CheckService} from "../domain(business_logic)/use_cases/check_service.usecase";
import {FileSystemDatasource} from "../infrastructure(code_or_process)/datasources/file_system.datasource";
import {LogImplementationRepository} from "../infrastructure(code_or_process)/repositories/log_implementation.repository"
import {PORT} from "../config/env_adapter/dotenv";
const fileSystemLogRepository:LogImplementationRepository = new LogImplementationRepository(
    new FileSystemDatasource(),
    // new mongoLogDS(),
    // new SQLserverDS()
)

export class Server{
    static Start(){
        console.log('Server running...')
        console.log(PORT)
        const newServiceChecker = new  CheckService(
            fileSystemLogRepository,
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