function createConnection(event) {
    let room = document.getElementById("room").value;
    let name = document.getElementById("name").value;
    console.log(room, name);
    let wss = new WebSocket(`ws://127.0.0.1:8080/api/v1/${room}/${name}`)
    wss.onmessage = function (e) {
        console.log(e.data);
        let contentregion = document.getElementById("content-region");
        if (contentregion) { contentregion.innerHTML = window.atob(e.data); }
    };
    wss.onopen = function (e) {
        console.log("Websocket opened");

    };
    wss.onerror = function (e) {
        console.log("Websocket error");
        console.log(e);
        wss.close();
    };

    wss.onclose = function (e) {
        console.log("Websocket closed");
        console.log(e);
        alert(e.reason);
    }
}