
var ws = new WebSocket("ws://localhost:8000/msg");

// Message comes from the server
ws.onmessage = function(event){
    
    obj = JSON.parse(event.data)

    switch (obj["key"]){

        case 'connect':
            html_connect(obj);
            if (obj["result"] == "OK") {
                get_Status(obj);
            }               
            break;

        case 'mode':
            html_mode(obj);
            break;

        case 'status':
            html_status(obj);
            break;

        default:
            alert("??? something is wrong: "+obj["key"]+ " process.");
    }

}

ws.onclose = function(){
    clearInterval(TimerID);
 //   document.getElementById("connect_marker").style.color = "red";
 //   document.getElementById("connect_status").innerText="切断中";
    alert("Web Socket closed. Restart this page.")
};

ws.onerror = function(){};

// format into Json and send it
// any json must have 'key' that is the order.
// others are payload as object.
function send_json(key, obj){
    obj["key"] = key;
    json_data = JSON.stringify(obj);
    ws.send(json_data);
}