# Map View

![map-view](./assets/rwa-creator-map-view.png)

/// caption
**Map View** is the main view of the RWA Creator. It allows for creating and editing *scenes* and *states*.
///

## Toolbar

### Tools

:rwa-arrow: **Arrow**: double clicking in *Map View* creates a new *state*. Clicking on an existing *state* selects it; click+drag moves an existing *state*; click+drag on the map moves the map.

:rwa-pen: **Selection**: Rectangular selection of *states*; click and drag on the map to select multiple *states*.

:rwa-rubber: **Rubber**: Click on *states* to delete them.

### Show assets/radii

:rwa-audiosource: **Blue speaker**: toggle display of assets in *Map View*

:rwa-radiiVisibleButton: **State circle**: toggle display of state radii in *Map View*

### Start/Stop Simulation

:rwa-start: **Green play button**: starts simulation

:rwa-stop: **Red stop button**: stops simulation

### :rwa-calibrateHeadtrackerButton: Calibrate Headtracker

### :rwa-headtrackerStepButton: Send Footstep

### ![hero4](./assets/heroFollowsSceneAndStateButton.png) Hero Follows Selection
<!-- TODO: this is missing an SVG Icon -->

When active, the hero jumps to locations selected through *Select Scene* or *Select Scene* menues. This is useful for debugging the game in simulation mode, as you can place the hero into state/scene without having to move through other states/scenes i.e. dragging the hero around.

!!! tip "Only applies to menu-selection"
    "Hero Follows Selection" only applies to the *Map View* **menu selection**, not for selection by clicking on list entries in *Game*- or *State View*!

### Toggle remove assets on delete

:rwa-trashassets: **Trash**: Assets will be removed from asset-folder when deleted from the list.

:rwa-donttrashassets: **Don't Trash**: Deleting assets in the list leaves the files in the asset-folder.

### :rwa-syncwithclients: Toggle Fileserver

### :rwa-findlocation: Location Lookup

Open dialog to lookup map locations. Suggestions and coordinates are provided by an online service (Open Street Maps nominatim server or Swisstopo geoservice).

!!! important "Rate Limits, Changes for H.E.I. Campus"
    The documentation for the [OSM Nominatim Service](https://operations.osmfoundation.org/policies/nominatim/)
    that provides the location lookup, describes its use for auto-complete search as "*unacceptable use*".
    The requirements further state: "*No heavy uses (an absolute maximum of 1 request per second)*".
    For **H.E.I. Campus**, the location lookup was switched to the
    [Swisstopo REST web geoservices](https://www.swisstopo.admin.ch/en/rest-api-geoservices-reframe-web).

### Main volume

### Menus

- **Select Scene**: select the current scene
- **Select State**: select the current state; map moves automatically to the selected state
- **Scene Menu**: allows for creating a new scene; delete the current scene; other options not working yet
- **State Menu**: allows for creating a new state; so far the only way to create a non-gps state

## Map legend

![hero4](./assets/heroFollowsSceneAndStateButton.png) **Hero**: Location of the listener

:rwa-scene: Center of a scene

:rwa-sceneselected: Center of selected scene

:rwa-state: Center of a state

:rwa-stateselected: Center of selected state

:rwa-audiosource: Asset (also center of rotation)

:rwa-audiosourceselected: Selected asset

:rwa-audiochannelsource: Channel source if asset has more than one channel

:rwa-audiosourcestartpoint: Starting point of moving asset

:rwa-audiosourcestartpoint1: Moving asset position
