import { image } from './utils/display';
import { playAudio } from "./utils/audio";
import { ipcRenderer } from 'electron';
import { clipboard, nativeImage } from 'electron';
import { Room } from './utils/roommanager';

function doThing(){
    let i = new image(clipboard.readImage().toDataURL());
    i.show(0,0);
}


let btn = document.getElementById("coolbutton");


if(btn!= null){
    btn.addEventListener("click", (e:Event) => {
        console.log("create websocket");
        let conn = new Room('localhost:8080');

        //playAudio("https://cdn.discordapp.com/attachments/538766359819976737/798520157005807637/3e54cc690cfb4a3fa332c63ec09d9bd8.377600.wav",4);  
        //doThing();
    });       
}
