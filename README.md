# pywebgcs
## Ardupilot Web based simple GCS.

## Background
There are some GCS supporting Ardupilot.
These GCS are all-in-one great software.

But when light users want to control his UAV, many of functions make confusion. Every one don't have deep UAV knowledge.
In that cases, some specialist adjust his UAV using MP or QGC.
Light users just onnect his UAV via tablet or PC.

Then I try to build simple GCS.
This GCS run on companion computer (Raspberry PI) of UAV.
Then I do not assume multi users and multi vehicles.

## Concepts
- No multi users, no multi UAVs.
- Do not use paid web services, such as Google map API.
- Server side program is writtern by Python, Cliant side program by Javascript.
- Do not use any CSS engine, such as Bootstrap, JQuery for avoiding confusion. (I assume some users will change codes.)
- HTML 5(Chrome base)
- Javascript: Websocket, Leaflet and plug in
- Python: FastAPI, websocket, uavconf, Dronekit for Python

## Current Status
02/26/2023 Show current UAV status. ARMable.

## First Goal
- Accessed by LTE module or Wi-Fi (Done)
- Run on companion computer (Raspberry PI) (Not tested)
- show UAV status (Done)
- show map, current location of UAV (Done)
- set WaypointS
- can set mode. (Done)
- Guided mode support

## How to use.
Install and set
1. clone git.
2. 'cd pyweb gcs' 
3. If you need to change page in English, please change line 12 of main.py.
4. run 'python main.py'
5. map can be changed top right corner button.
6. connect


