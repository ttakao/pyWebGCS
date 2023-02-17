from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
import json
import time
from dronekit import connect as VehicleConnect, VehicleMode

import uvicorn

app = FastAPI()
app.mount("/static",StaticFiles(directory="static"), name="static")

vehicle = None # global : having vehicle status

#
#  sub functions
# python require funtions before useing it.
#
# connect/disconnect to Dronekit object
def connectvehicle(connectstring):
    
    global vehicle

    if connectstring == "close":
        if vehicle is None:
            pass
        else:
            vehicle.close()
            vehicle = None
        return "NG"
    else:
        # all strings except "close", seemed as connectstring
        if vehicle is None:
            vehicle = VehicleConnect(connectstring, wait_ready=False)
            # "wait_rady = True" does not come back.
            vehicle.wait_ready('autopilot_version')
        else:
            # already connected.
            return "OK"
        #tried to connect request
        if vehicle is None:
            return  "NG"
        else:
            return  "OK"         
    
def setMode(d_mode):
    # don't use variable name 'mode' !!!
    # flight Mode change.
    global vehicle
    
    vehicle.mode = VehicleMode(d_mode)
    vehicle.flush()
    while not vehicle.mode.name == d_mode:
        time.sleep(1)
             
    return

def getStatus(obj):
    global vehicle
    # get current status data
    # vehicle object has complicated structure
    # this function simplify it for JSON transfer
    obj["loc_g_lat"] = vehicle.location.global_frame.lat
    obj["loc_g_lon"] = vehicle.location.global_frame.lon
    obj["loc_g_alt"] = vehicle.location.global_frame.alt
    obj["att_pitch"] = vehicle.attitude.pitch
    obj["att_yaw"] = vehicle.attitude.yaw
    obj["att_roll"] = vehicle.attitude.roll
    # obj["velocity"] = vehicle.velocity (vx, vy, vz)
    obj["gps"] = vehicle.gps_0.fix_type
    # obj["gimbal"] =  vehicle.gimbal
    obj["batt_volt"] = vehicle.battery.voltage
    obj["batt_cur"] = vehicle.battery.current
    obj["batt_level"] = vehicle.battery.level
    obj["ekf_status"] = vehicle.ekf_ok
    obj["heartbeat"] = vehicle.last_heartbeat
    obj["rngf_dist"] = vehicle.rangefinder.distance
    obj["rngf_volt"] = vehicle.rangefinder.voltage
    obj["heading"] = vehicle.heading
    obj["armable"] = vehicle.is_armable
    obj["sys_status"] = vehicle.system_status.state
    obj["g_speed"] = vehicle.groundspeed
    obj["mode"] = vehicle.mode.name
    obj["armed"] = vehicle.armed
   
    return

# main web request process
@app.get("/")
async def get():
    fh = open('index.html','r')
    html = fh.read() 
    return HTMLResponse(content=html, status_code=200)

@app.websocket("/msg")
async def msg(websocket: WebSocket):
    
    await websocket.accept()

    try:
        while True:
            # receive as json, add getting info and send back.
            recv_obj = await websocket.receive_json()
            key = recv_obj["key"]
            
            if key == "connect":
                recv_obj["result"] = connectvehicle(recv_obj["connectstring"])

            elif recv_obj["key"] == "mode":
                setMode(recv_obj["mode"])
                recv_obj["mode"] = vehicle.mode.name

            elif recv_obj["key"] == "status":
                getStatus(recv_obj)
                print( json.dumps(recv_obj) )

            await websocket.send_json(recv_obj) # send updated info to Browser
    
    except:
        print("** Oh, something happen. socket closed. **")
        await websocket.close()

            
if __name__ == "__main__":
    uvicorn.run(app, port=8000)
