import WebSocket from 'ws';

export class wsclient {
    constructor(url: string) {
        let ws = new WebSocket(url);

        ws.on('open', function open() {
            console.log("opening socket");
        });

        ws.on('message', function incoming(msg: string) {
            console.log("Recieved: "+msg);
            let data = JSON.parse(msg);
            
            if (data.action == "playerjoin") {
                ws.send(JSON.stringify({action: "send", room: "AAAB", clients: ["playerone","playertwo"], "content": "<h1>testinggggg</h1>"}));
                //ws.send(JSON.stringify({action: "broadcast", room: "AAAB", "content": "<h1>testinggggg</h1>"}));
                //ws.send(JSON.stringify({action: "sendall", room: "AAAB", "content": "<h1>testinggggg</h1>"}));
            }
        })
    }
}