import WebSocket from 'ws';
import { EventEmitter } from 'events';
import { Form } from './pageloader';

export class Room extends EventEmitter {
    code: string;
    ws: WebSocket;
    players: any;
    constructor(serveraddr: string) {
        super();
        this.ws = new WebSocket('ws://'+serveraddr+'/api/v1/createroom');
        console.log('ws://'+serveraddr+'/api/v1/createroom');
        this.code = "";
        this.players = [];

        this.ws.on('open', function open() {
            console.log("[debug] Opening socket");
        });

        this.ws.on('message', this.parsedata);

        // define internal events to be handled internally and abstracted
        // TODO prefix internal events with _ maybe?

        this.on("playerjoin", this.playerjoin); // probably should make this an external event too
        this.on("roomcreation", this.setcode);
    }

    parsedata=(msg: string)=>{
        console.log("Recieved: "+msg);
        let data = JSON.parse(msg);
        this.emit(data.action, data.data);
    }

    setcode=(data: any)=>{
        console.log(`[debug] Received room code: ${data.roomcode}`);
        this.code = data.roomcode;
    }

    send=(data: any, players?: string[] | string)=>{
        // if players is not provided, it is sent to all, else the members of players are sent the data
        if (typeof players === "string") players = [players];
        if (players) {
            if (players.length > 0) this.ws.send(JSON.stringify({action: "send", room: this.code, clients: this.players, content: data}));
            else return; // ? currently silent drop, send a debug message for this?
        } else {
            // send to all players
            this.ws.send(JSON.stringify({action: "send", room: this.code, clients: this.players, content: data}));
        }
    }

    playerjoin=(data: any)=>{
        console.log(`[debug] ${data.name} has joined.`);
        this.players.push(data.name);
        let myform = Form("mytestform", [{id: "myinput", type: "text"}]);
        this.send(`<h1>Hello ${data.name}</h1> forminnit`+myform, data.name);
    }

    close=()=>{
        // TODO implement close method
    }
}