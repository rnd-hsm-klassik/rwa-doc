<!-- TODO: screenshot predates the Control/Settings split (pre 1.3.4) and shows the old "Control Data" tab. -->
![Control Data View Screenshot](./assets/control-data-view-masked.png){align=right width=33.333%}

# Control View

The *Control* tab is where a walk is started and stopped, and where you see at a glance what the RWA Player is doing.
At the beginning of a soundwalk, this is the only screen you need: start the game, put the phone in your pocket, walk.

### Status

- **Project name**: the currently loaded game, or *No project loaded*. Load a game in the [Games View](./games-view.md) first.
- **Scene – State**: the currently active scene and state, updated live while the game runs.
- **Coordinates**: the listener position (WGS84) the engine is using right now.
  An **(RTK)** suffix appears while the position comes from the RTK headtracker instead of the phone's internal GPS.
  The small dot next to it flashes green on every incoming position fix. If it stays grey, no position is arriving.
- **az / el / steps**: current head azimuth and elevation in degrees, and the footstep count.

### Controls

- **Start / Stop** starts and stops the loaded game. The button is greyed out until a game is loaded.
  Starting fades the audio in over a moment; stopping fades everything out (about a second, shown as *Stopping...*) instead of cutting it off.
- **Connect Headtracker** connects to the headtracker named in the [Settings View](./settings-view.md)
  (shown as *Headtracker connected* when done, or *Using Device Orientation* when the heading source is set to *Internal*).
- **Calibrate north**:Ppoint the headphones in the direction that should be *north* and tap.
  With *Calibrate on start* enabled in Settings, this happens automatically each time you start a game (dangerous, as you need to pay attention to face north when starting!).
- **Volume**: Main volume of the playback (0-400%, default 100%). It sits after all scene, state and asset gains;
  A well authored project should not require changing the volume beyound an initial setting at the beginning of a sound walk.

!!! warning "Stay on this tab while receiving positions from RWA Creator"
    When the phone is *registered* with RWA Creator (see [Simulating Location on the Phone](../creating-soundwalks/simulating-location-on-the-phone.md)),
    the incoming Hero positions are only processed while the *Control* tab is on screen. Switching to another tab pauses the reception.

!!! note "Loading a game takes a moment"
    When a game is loaded from the Games View, the Pure Data engine and its playback patches are initialised.
    This takes a few seconds, independent of the size of your game. A spinner is shown while it happens.
