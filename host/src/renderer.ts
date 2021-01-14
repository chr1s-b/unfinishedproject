import { image } from './utils/display';
import { playAudio } from "./utils/audio";

let btn = document.getElementById("coolbutton");
let kindasusimg = new image("https://media.discordapp.net/attachments/538766359819976737/798981681603805204/maxresdefault.png?width=1202&height=676");

if(btn!= null){
btn.addEventListener("click", (e:Event) => {
    playAudio("https://cdn.discordapp.com/attachments/538766359819976737/798520157005807637/3e54cc690cfb4a3fa332c63ec09d9bd8.377600.wav")
    kindasusimg.show(10,20,50,200);
});
}

