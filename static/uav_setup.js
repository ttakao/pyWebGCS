// button click handler & returning data html process

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
    }else{
        document.getElementById("connect_marker").style.color = "red";
        document.getElementById("connect_status").innerText="切断中";
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
    document.getElementById("mode_cell").innerHTML = obj["mode"];
    // enable button
    btnobj = document.getElementById('btn_mode');
    btnobj.disabled = false;
}


// get status request
function get_Status(obj){
    send_json("status", obj);
}

function html_status(obj){

    // set status into the page.
    for ([key, value] of Object.entries(obj)){
        // alert(key+":"+value);
    }
}
