export function playAudio(uri: string, playbackSpeed: number=1.0, vol: number=0.2){
    console.log("Playing audio from::" + uri);
    let audio = new Audio(uri);

    //Setting properties of the audio before playing :)
    audio.playbackRate = playbackSpeed;
    audio.volume = vol;
    audio.play(); // finally playing it poggggg



}