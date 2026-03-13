# Map View

## Tools

- **Arrow**: double clicking in *Map View* creates a new *state*. Clicking on an existing *state* selects it; click and drag moves an existing *state*; click+drag on the map moves the map
- **Rubber**: deletes a *state*.

## Show assets/radii

- **Blue speaker**: shows or hides assets in *Map View*
- **Circle**: shows or hides radii in *Map View*

## Start/Stop Simulation

- Green Triangle: starts simulation
- Red Button: stops simulation

## Enter scene location

needs internet connection

- Enter the scene location; suggestions are made by open street maps nominatim server

!!! important "Rate Limits, Suggestions for H.E.I. Campus"
    The documentation for the [OSM Nominatim Service](https://operations.osmfoundation.org/policies/nominatim/)
    that provides the location lookup, describes its use for auto-complete search as "*unacceptable use*".
    The requirements further state: "*No heavy uses (an absolute maximum of 1 request per second)*".
    For **H.E.I. Campus**, the location lookup was switched to the
    [Swisstopo REST web geoservices](https://www.swisstopo.admin.ch/en/rest-api-geoservices-reframe-web).

## Menus

- **Select Scene**: select the current scene
- **Select State**: select the current state; map moves automatically to the selected state
- **Scene Menu**: allows for creating a new scene; delete the current scene; other options not working yet
- **State Menu**: allows for creating a new state; so far the only way to create a non-gps state
