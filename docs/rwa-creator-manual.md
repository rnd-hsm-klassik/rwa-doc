# RWA Creator Manual

## General Game Structure

- A *game* consists at least of one *scene*, a *scene* is usually located at a certain GPS position.
- A *scene* consists at least of two *states*: a *background* and a *fallback state*. The *background state* is always active for the whole *scene*. The *fallback state* is entered if no other (except the *background state*) is active. A new *state* can either be created by double clicking into the *map view*, or by select *news tate* from the state menu.
- A state should hold at least one *asset*. Otherwise it has no purpose. An asset can either be an *audio file* or a *Pure Data patcher*.
- All views render by default the last touched *scene*, *state* and *asset*. Therefore, if a state is touched within the *map view*, the *state view* automatically renders the same *state*.

## Map View

### Tools

- **Arrow**: double clicking in *Map View* creates a new *state*. Clicking on an existing *state* selects it; click and drag moves an existing *state*; click+drag on the map moves the map
- **Rubber**: deletes a *state*.

### Show assets/radii

- **Blue speaker**: shows or hides assets in *Map View*
- **Circle**: shows or hides radii in *Map View*

### Start/Stop Simulation

- Green Triangle: starts simulation
- Red Button: stops simulation

### Enter scene location

needs internet connection

- Enter the scene location; suggestions are made by open street maps nominatim server

!!! important "Rate Limits, Suggestions for H.E.I. Campus"
    The documentation for the [OSM Nominatim Service](https://operations.osmfoundation.org/policies/nominatim/)
    that provides the location lookup, describes its use for auto-complete search as "*unacceptable use*".
    The requirements further state: "*No heavy uses (an absolute maximum of 1 request per second)*".
    For **H.E.I. Campus**, the location lookup was switched to the
    [Swisstopo REST web geoservices](https://www.swisstopo.admin.ch/en/rest-api-geoservices-reframe-web).

### Menus

- **Select Scene**: select the current scene
- **Select State**: select the current state; map moves automatically to the selected state
- **Scene Menu**: allows for creating a new scene; delete the current scene; other options not working yet
- **State Menu**: allows for creating a new state; so far the only way to create a non-gps state

## State View

![rwa-creator-state-view](./assets/rwa-creator-state-view.png)

**Asset Attributes** (left), **Asset List** (center), **Asset Map View** (right)

### General Usage

In the *Asset List*, assets can be added via drag & drop; so far only `.wav` and `.aif` files are working.
After adding an asset, it appears instantly in the *Asset Map View*, where it can be placed with the mouse.
Clicking on an asset either in the list or the map selects the corresponding asset;
its attributes are shown in the *Asset Attributes* list and can be edited there.
Several assets can be selected by holding down the Command-key and clicking on the assets in the list.
Their attributes then can be edited together.
An asset can be removed from a state with the Delete-key, if it is selected.
Click+drag allows for editing the state radius.

### Asset Attributes

| Attribute                 | Description                                                                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playback Mode             | auto types are not working yet, choose binaural or mono/stereo                                                                                    |
| Fade-In Time              |                                                                                                                                                   |
| Fade-Out Time             |                                                                                                                                                   |
| Crossfade Time            | crossfade time if loop is activated                                                                                                               |
| Gain                      |                                                                                                                                                   |
| Channel Radius            | distance from center for multichannel binaural playback                                                                                           |
| Rotate Frequency          | XXX                                                                                                                                               |
| Moving Speed              | in m/s for moving assets, if attribute Move is activated                                                                                          |
| Fixed Orientation         | assets keeps the same orientation relative to the player after entering the corresponding state, independent from the specified asset coordinates |
| Fixed Elevation           |                                                                                                                                                   |
| Fixed Distance            | asset stays at specified distance after entering the state, independent from the specified asset coordinates                                      |
| Exclusive                 | XXX                                                                                                                                               |
| Loop                      | asset will be looped with the specified crossfade time                                                                                            |
| Stop Loop at End-Position | loop playback will stop after reaching the end position                                                                                           |
| Raw sensors to pd         | XXX                                                                                                                                               |
| GPS to pd                 | XXX                                                                                                                                               |
| Play only once            | XXX                                                                                                                                               |
| Rotate                    | XXX                                                                                                                                               |
| Move                      | if activated, asset will move from specified start to specified end position. The coordinates can be edited in the Asset Map View.                |
| Damping Function          | Whether asset volume is affected by distance; if so, either linear oder exponential                                                               |
| Damping Factor            | factor in front of the Log Function, a value of 20 is natural damping in free-field (combined with damping trim of 1)                             |
| Damping Trim              | factor before the clipping occurs, 1 is for free field                                                                                            |
| Damping Min               | minimal damping factor                                                                                                                            |
| Damping Max               | maximal damping factor                                                                                                                            |
| Min Distance              | minimal possible distance to the corresponding asset.                                                                                             |

## Scene View

Selected states can be removed with the Delete-Key. The selected state is visible in the *state attributes list*.

| Attribute                     | Description                                                                                                     |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------- |
| State Type                    | only GPS and other are working so far.                                                                          |
| Default Playback Mode         | default playback mode for all state assets.                                                                     |
| Area Type                     | circle or rectangle or square.                                                                                  |
| Next State                    | automatically enter the specified state as next state (use together with "Leave after assets finish" attribute) |
| Next Scene                    | automatically enter the specified scene as next state (use together with "Leave after assets finish" attribute) |
| Time Out                      | exit state after the specified time                                                                             |
| Required States               | entry condition, state is only entered if the specified states have been visited already.                       |
| State Radius                  |                                                                                                                 |
| State Width                   |                                                                                                                 |
| State Height                  |                                                                                                                 |
| Assets follow state           | in editing mode, assets are moved together with the state                                                       |
| Enter State only once         | state can only be entered once                                                                                  |
| Exclusive for one Entity      | not in use yet                                                                                                  |
| Enter Offset                  | offset in meters for entering a state radius; default is -6                                                     |
| Exit Offset                   | offset in meters for leaving a state radius; default is 0                                                       |
| Leave after assets finish     | exit state when assets are no longer active.                                                                    |
| eave only after assets finish | entity stays in the state as long as assets are active, even if the player is outside the state radius.         |

### Notes

**Leave after assets finish**: "Leave after asset finish" is useful for "*nextState*" sequences: If the hero enters a state where the attribute "*nextState*" or "*nextScene*" is set, this state/scene will be entered automatically after all assets finished playing.

**Leave only after assets finish**: If a state contains any looped assets, the attribute "*Leave only after assets finish*" should not be activated, otherwise the state is never exited because the assets never finish. Its purpose is rather to guarantee, that the hero gets all necessary information even if she already left the state radius. In this case, all assets will be played until the end and only afterwards the state will be left.
