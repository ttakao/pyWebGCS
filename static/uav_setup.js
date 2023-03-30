// button click handler & returning data html process
var TimerID;
// this value is status update cycle(ms)
// 1000 is MAVlink update cycle.
// then over 2000 is recommended.
const PERIOD = 2500;

function update_status(){
    obj = {};
    get_Status(obj);
}
// connection request
function onConnect() {
    // disable button
    btnobj = document.getElementById('btn_con');
    btnobj.disabled = true;
    // get selected connection type
    selobj = document.getElementById('sel_con');
    selindex = selobj.selectedIndex;
    value = selobj.options[selindex].value;

    obj = {"connectstring": value}; // make parameter object
    send_json("connect", obj);
}
// connetion reply from the server
function html_connect(obj){
    // enable button
    btnobj = document.getElementById('btn_con');
    btnobj.disabled = false;
    // show text
    if (obj["result"] == "OK"){
        document.getElementById("connect_marker").style.color = "lightgreen";
        document.getElementById("connect_status").innerText="接続中";
        // Start status automatic update 
        TimerID = setInterval(update_status, PERIOD);
    }else{
        document.getElementById("connect_marker").style.color = "red";
        document.getElementById("connect_status").innerText="切断中";
        clearInterval(TimerID);
    }

}

// flight mode change request.
function onMode(){
    // disable button
    btnobj = document.getElementById('btn_mode');
    btnobj.disabled = true;
    // pick up selected mode, send request to the server.{
      selobj = document.getElementById('sel_mode');
      selindex = selobj.selectedIndex;
      value = selobj.options[selindex].value;

      obj = {"mode":value};
      send_json("mode", obj);
}

function html_mode(obj){
    // Set mode name.
    document.getElementById("mode_cell").value = obj["mode"];
    // enable button
    btnobj = document.getElementById('btn_mode');
    btnobj.disabled = false;
}

// get status request
function get_Status(obj){
    send_json("status", obj);
}

function html_status(obj){
    // set marker loction
    onUAVMove(obj["loc_g_lat"], obj["loc_g_lon"],
    obj["loc_g_alt"], obj["heading"]);

    // set vehicle status
    fligthStatus(canvas, context,
        obj["att_pitch"], 
        obj["att_roll"],
        obj["loc_g_alt"],
        obj["g_speed"]
    );
    // set compass
    drawCompass(obj["heading"]); 
    // set vehicle type.
    code = obj["type"];
    // Japanese
    if (document.documentElement.lang == "ja"){
        switch (code){
        case 1:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
        case 24:
            value = "飛行機";
            break;
        case 2:
        case 3:
        case 4:
        case 13:
        case 14:
        case 15:
            value = "コプター";
            break;
        case 10:
            value = "地上車";
            break;
        case 11:
            value = "ボート";
            break;
        case 12:
            value = "潜水艦";
            break;
        default:
            value = "その他";
        }
    } else {
    // other in English
    switch (code){
        case 1:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
        case 24:    
            value = "Plane";
            break;
        case 2:
        case 3:
        case 4:
        case 13:
        case 14:
        case 15:
            value = "Copter";
            break;
        case 10:
            value = "Rover";
            break;
        case 11:
            value = "Boat";
            break;
        case 12:
            value = "Submarine";
            break;
        default:
            value = "Other";
        }
    }
    obj["type"] = value;

    // set status on the page.
    for ([key, value] of Object.entries(obj)){
        // cell parameter -> cell name.
        cellname = key+"_cell";
        
        // if value is boolean, change YES/NO
        if (typeof(value) == 'boolean'){
            if (value) {
                value = 'Yes';
            } else {
                value = 'No';
            }
        }
        try{
            document.getElementById(cellname).innerText = value;
        } catch(e){
            // console.log("Not used("+key+"):"+value);
        }
    }
}

function onArm() {
    obj = {};
    send_json("arm", obj);
}