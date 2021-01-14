export function playAudio(uri: string, playbackSpeed=1.0, vol=0.2){
    console.log("Playing audio from::" + uri+"\n speed: "+playbackSpeed.toString()+"    Vol: "+vol.toString());
    let audio = new Audio(uri);
    
    //Setting properties of the audio before playing :)
    audio.playbackRate = playbackSpeed;
    audio.volume = vol;
    audio.play(); // finally playing it poggggg



}