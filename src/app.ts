import {Server} from "./presentation/server"
import {PrismaClient} from "@prisma/client";




(async()=>{
    main()
})()
async function main(){

    const prisma = new PrismaClient();
    //INSERT INTO THE DB
    // const newLog = await prisma.logModel.create({
    //     data:{
    //         level:"HIGH",
    //         message:"Test message",
    //         origin:"App.ts"
    //     }
    // })
    // console.log({newLog})

    //READ DB
    // const logs = await prisma.logModel.findMany({
    //     where:{
    //         level:"HIGH"
    //     }
    // })
    // console.log(logs)

    Server.Start();
}