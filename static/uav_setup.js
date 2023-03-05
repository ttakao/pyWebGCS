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
    // set vehicle status
    // set status on the page.
    for ([key, value] of Object.entries(obj)){
        // map set 
        onUAVMove(obj["loc_g_lat"], obj["loc_g_lon"],
           obj["loc_g_alt"], obj["heading"]);

　　　　　// UAV type
        if (key=="type"){
            // Japanese
            code = value;
            if (document.documentElement.lang == "ja"){
               switch (code){
                case 0:
                    value = "ジェネリック";
                    break;
                case 1:
                    value = "固定翼";
                    break;
                case 2:
                    value = "クアッドコプター";
                    break;
                case 3:
                    value = "同軸ヘリ";
                    break;
                case 4:
                    value = "テイル付コプター";
                    break;
                case 7:
                    value = "飛行船";
                    break;
                case 8:
                    value = "気球";
                    break;
                case 9:
                    value = "ロケット";
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
                case 13:
                    value = "6回転翼コプター";
                    break;
                case 14:
                    value = "8回転翼コプター";
                    break;
                case 15:
                    value = "3回転翼コプター";
                    break;
                case 16:
                    value = "羽ばたき翼機";
                    break;
                case 17:
                    value = "凧";
                    break;
                case 19:
                    value = "VTOL 2回転翼";
                    break;
                case 20:
                    value = "VTOL クアッド";
                    break;
                case 21:
                    value = "VTOL Tiltrotor";
                    break;
                case 22:
                    value = "VTOL 固定翼";
                    break;
                case 23:
                    value = "VTOL Tailsitter";
                    break;
                case 24:
                    value ="VTOL Tiltwing"
                    break;                    
                default:
                    value = "周辺機器?";
               }
            } else {
            // other in English
            switch (code){
                case 0:
                    value = "Generic micro air";
                    break;
                case 1:
                    value = "Fixed wing aircraft";
                    break;
                case 2:
                    value = "Quadrotor";
                    break;
                case 3:
                    value = "Coaxial helicopter";
                    break;
                case 4:
                    value = "Normal helicopter";
                    break;
                case 7:
                    value = "Airship";
                    break;
                case 8:
                    value = "Free balloon";
                    break;
                case 9:
                    value = "Rocket";
                    break;
                case 10:
                    value = "Ground rover";
                    break;
                case 11:
                    value = "boat, ship";
                    break;
                case 12:
                    value = "Submarine";
                    break;
                case 13:
                    value = "Hexarotor";
                    break;
                case 14:
                    value = "Octorotor";
                    break;
                case 15:
                    value = "Tricopter";
                    break;
                case 16:
                    value = "Flapping wing";
                    break;
                case 17:
                    value = "Kite";
                    break;
                case 18:
                    value = "Companion Controller";
                    break;
                case 19:
                    value = "VTOL Two-rotor Tailsitter";
                    break;
                case 20:
                    value = "VTOL Quad-rotor Tailsitter";
                    break;
                case 21:
                    value = "VTOL Tiltrotor";
                    break;
                case 22:
                    value = "VTOL fixed rotors";
                    break;
                case 23:
                    value = "VTOL Tailsitter";
                    break;
                case 24:
                    value ="VTOL Tiltwing"
                    break;                    
                default:
                    value = "maybe peripheral";
               }
            }
        }
        // cell parameter -> cell name.
        cellname = key+"_cell";
        
        // change boolean to YES/NO
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