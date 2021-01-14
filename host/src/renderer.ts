import * as display from './utils/display';
import { playAudio } from "./utils/audio";
import { ipcRenderer } from 'electron';
import { clipboard, nativeImage } from 'electron';

function doThing(){
    let i = document.getElementById("clipboardImg") as HTMLImageElement;
    if(i!=null){
        console.log(clipboard.readImage().getSize().height);
        i.src = clipboard.readImage().toDataURL();
        console.log("Beef")

    }

}


let btn = document.getElementById("coolbutton");


if(btn!= null){
btn.addEventListener("click", (e:Event) => playAudio("https://cdn.discordapp.com/attachments/538766359819976737/798520157005807637/3e54cc690cfb4a3fa332c63ec09d9bd8.377600.wav",4));  
btn.addEventListener("click", (e:Event) => doThing());

        
}

console.log(display.image);
