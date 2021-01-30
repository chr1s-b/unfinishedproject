// express server
import express from 'express';
export let app = express();

//app.use(express.static(path.join(__dirname, 'public')));

app.get('/client.js', function(req, res) {
    res.sendFile(__dirname + "/client.js");
});

app.get('/', function (req, res) {
    // redirect anywhere to join page
    res.sendFile(__dirname + "/frame.html");
    // frame.html contains websocket client that will
    // trigger connection to server on form submission
});