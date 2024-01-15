import {CronJob,CronCommand} from "cron";


export class CronAdapter {
    static CreateCronJob (cronTime:string|Date,onTick:CronCommand<null, false>){
        const job = new CronJob(
            cronTime,
            onTick
        );
        job.start()
        return job
    }
}