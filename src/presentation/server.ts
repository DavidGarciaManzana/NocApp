import {CronAdapter} from "./third_party_apis/cron_adapter/cron.adapter";
import {CheckService} from "../domain/use_cases/check_service.usecase";


export class Server{
    static Start(){
        console.log('Server running...')
        const newServiceChecker = new  CheckService(
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


    }
}