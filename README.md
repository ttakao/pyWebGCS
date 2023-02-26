# pywebgcs
## Ardupilot Web based simple GCS.

## Background
There are some GCS supporting Ardupilot.
These GCS are all-in-one great software.

But when light users would like to control his UAV, many of functions make confusion. Every one don't have deep UAV knowledge.
Then I try to build simple GCS for new operators.
This GCS can be used just one user for one UAV.
Because this package should run on the companion computer.

## Ideas
- No multi users, no multi UAVs.
- Do not use paid web services, such as Google map API.
- Server side program is writtern by Python, Cliant side program by Javascript.
- Do not use any CSS engine, such as Bootstrap, JQuery for avoiding confusion. (Users/Developper loves simple.)
- HTML 5(Chrome base)
- Websocket, Leaflet and plug in
- Python, FastAPI, websocket, uavconf
- Dronekit for Python

## First Goal
- Accessed by LTE module or Wi-Fi
- Run on companion computer (Raspberry PI)
- show UAV status
- show map, current location of UAV
- set WaypointS
- can set mode.
- Guided mode support


