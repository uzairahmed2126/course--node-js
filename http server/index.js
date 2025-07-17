import http from  "http";
import  fs from "fs";
const  port= 9001;
const server = http.createServer((req,res)=>{
    const log = `${new Date()} new request recevied\n`
    fs.appendFile("log.txt",log,(err)=>{
        if(err) {
            console.log("error while append file",err);
        }
        res.end("Hello from server");
    })
});
server.listen(port,()=>console.log(`server listen port :${port}` ));
