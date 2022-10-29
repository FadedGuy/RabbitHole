import { WebSocketServer } from 'ws';
import * as readline from 'readline';

const port = 6969;

const wss = new WebSocketServer({
    port
});


function ask(ws: any){
    let input = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    input.question("[Server] What to send?", (output) =>{
        console.log(output != "exit()");
        if(output != "exit()"){
            ws.send(output);
            ask(ws);
        }
        else{
            input.close();
        }
    });
}

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        console.log(`Received data: ${data}`);
    })
    ws.send(`[Server] Hello there`);

    ask(ws)
});

console.log(`Listening at: ${port}`)