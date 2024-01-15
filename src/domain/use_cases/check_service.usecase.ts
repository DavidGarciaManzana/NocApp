export class CheckService {
    constructor(private onSuccess:Function,private onFail:Function) {
    }
    async execute (url:string){
        try {
            const call = await fetch(url);
            const data = await call.json();
            if (!call.ok){
                throw new Error('Something went wrong')
            }

            console.log(data)
            this.onSuccess()
            return true
        }catch (err){
            console.log(err)
            this.onFail()
            return false
        }

    }
}

