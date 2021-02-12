// websocket server
import WebSocket, { Server } from 'ws';
import http from 'http';
import { app } from './express_server';

let rooms: { [code: string] : any; } = {}; // should probably not be type any
let rn: number = 0; // room number
let abc: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let httpserver = http.createServer();
let wss = new Server({
    noServer: true
});
httpserver.on('request', app);

wss.on('conn', function connection(ws, req) {
    let path = req.url.split('/');
    if (path.length == 4) {
        // /api/vX/createroom
        if (path[3] == "createroom") {
            // generate a new room
            rn += 1;
            rn = rn % (26**4);
            let roomcode: string = abc[~~(rn/26**3)%26]+abc[~~(rn/26**2)%26]+abc[~~(rn/26**1)%26]+abc[~~(rn/26**0)%26];
            rooms[roomcode] = new Room(roomcode, ws);

            // send some confirmation back with room code
            ws.send(Message("server", "roomcreation", {"roomcode": roomcode}));
            return;
        }
    }

    // client not host
    if (path.length != 5) { return ws.close(); }
    let [_, __, version, room, name] = path;
    room = room.toUpperCase();
    name = name.toUpperCase();
    
    //ws.on('message', function(req: string, res: string) {
    //    ws.send("hello");
    //})

    // check if room exists
    if (room in rooms) {
        // check if name is already in use
        if (name in rooms[room].clients) {
            // name already in use, check if reconnect
            // TODO check reconnect
            // TODO if not reconnect, send alert saying name already in use
            ws.close(4001,"Name is already in use.");
        } else {
            // new player name, add player
            rooms[room].addclient(name, ws, req);
            // tell host player has joined
            rooms[room].host.send(Message("server", "playerjoin", {name: name}))
        }
    } else {
        // room doesn't exist
        // TODO send an alert saying room doesn't exist
        console.log(`${name} tried to connect to ${room} that doesn't exist`);
        // send something
        ws.close(4000,"Room does not exist.");
    }
});

httpserver.on('upgrade', function upgrade(request, socket, head) {
    wss.handleUpgrade(request, socket, head, socket => {
        wss.emit('conn', socket, request);
    });
});

httpserver.listen(8080, function () {
    console.log("listening on port 8080");
})

function Message(source: string, action: string, data: any) {
    return JSON.stringify({"source": source, "action": action, "data": data});
}

class Room {
    code: string;
    host: WebSocket;
    clients: any;

    constructor(code: string, host: WebSocket) {
        this.code = code;
        this.host = host;
        this.clients = {};
        this.host.on('message', this.recieve);
    }

    recieve=(msg: string)=>{
        // recieve data from host
        let data = JSON.parse(msg);
        console.log("Host sent: "+msg);

        if (data.action == "send") {
            // pass data payload onto client(s)
            data.clients.forEach((client: string) => {
                // client is a client name string
                if (client.toUpperCase() in this.clients) {
                    this.clients[client.toUpperCase()].tell(data.content);
                }
            }); 
        }
    }

    addclient=(name: string, ws: WebSocket, req: any)=>{
        this.clients[name] = new Player(name, ws, this.host, req);
        console.log("Added player: "+name);
    }
}

class Player {
    name: string;
    host: any;
    conn: WebSocket;

    constructor(name: string, ws: WebSocket, host: any, req: any) {
        this.name = name;
        this.host = host;
        // store the websocket connection
        this.conn = ws;
        ws.on('message', this.recieve);

        // this.fingerprint = "" // TODO

    }

    tell=(data: string)=>{
        // send data to client browser
        this.conn.send(Buffer.from(data).toString("base64"));
    }

    recieve=(msg: string)=>{
        // data recieved from client browser
        let data = JSON.parse(msg);
        // check special cases like dropped connection or something requiring server action

        // forward onto host
        this.host.send(Message(this.name,"clientdata",JSON.stringify(data)));
    }
}