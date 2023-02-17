# pywebgcs
## Ardupilot Web based simple GCS.
##Background
There are some GCS supporting Ardupilot.
These GCS are all-in-one.
But when light users would like to control his UAV, many of functions make confusion.
Then I try to build simple GCS.
This GCS can be used just one user for one UAV.
Because this package should run on the companion computer.

##Ideas
- No multi users, no multi UAVs
- Do not use paid web services, such as Google
- Server side program is writtern by Python, Cliant side program is by Javascript.
- Do not use any CSS engine, such as Bootstrap, JQuery for avoiding confusion.
- HTML (Chrome base)
- Websocket, Leaflet
- Python, FastAPI, websocket, uavconf
- Dronekit for Python

##First Specification
- Access by LTE module
- Run on companion computer (Raspberry PI)
- show UAV status
- show map, current location of UAV
- set WaypointS
- can set mode.
- Guided mode support


