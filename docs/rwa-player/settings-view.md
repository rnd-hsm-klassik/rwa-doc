# Settings View

The *Settings* tab holds everything that is configured once per device or per session:
the headtracker to connect to, where the position and heading data come from, and the connection to *RWA Creator*.

### Identity

- **Device ID**: a free-text name identifying this phone (e.g. `hs-03`), used for telemetry/analytics.
- **Headtracker**: the Bluetooth name of the headtracker to connect to (e.g. `rwaht31` or `rtkrover-ca0ca7`, printed on the headphones).
  The name must match **exactly**; there is no device picker. Changing it triggers a reconnect.

### Data sources

- **GPS**: *Internal* (default) or *RTK tracker*. With *RTK tracker* selected, the position comes from the headtracker's RTK GNSS receiver.
  The app falls back to the phone's internal GPS automatically whenever the tracker has not delivered a coordinate for 8 seconds,
  and switches back as soon as fixes arrive again.
- **Heading**: *Internal* or *Headtracker* (default). *Headtracker* uses the orientation sensor on the headphones:
  localisation stays stable while you turn your head. *Internal* uses the phone's own motion sensors instead,
  useful when no headtracker is available (the phone's orientation then acts as the head orientation, so keep it pointing where you look).

### Head tracking

- **Inverse elevation** (default off): flips the sign of the elevation data.
  This is mostly necessary when Running Heading off of the phone's internal motion sensors.
  Enable it if looking *up* makes sources move *down*, which depends on how the tracker is mounted.
- **Calibrate on start** (default off): automatically sets *north* to the direction the tracker points at the moment a game is started, instead of requiring a manual *Calibrate north* on the [Control View](./control-data-view.md).

### RWA Creator

These settings connect the phone to a laptop running *RWA Creator* on the same WiFi network, in either direction:
see [Simulating Location on the Phone](../creating-soundwalks/simulating-location-on-the-phone.md) and
[Live GPS in RWA Creator](../creating-soundwalks/live-gps-in-rwa-creator.md).

- **IP address**: the IP address of the laptop running *RWA Creator*. Used both for receiving/sending location data (OSC) and for downloading games (*Fetch Games* in the [Games View](./games-view.md)).
- **Register / Unregister**: registering tells RWA Creator to send its Hero position to this phone; the phone's own location updates are suspended while registered. Check RWA Creator's Log View for the successful registration.
- **Send GPS to Creator**: the opposite direction: sends this phone's GPS position to RWA Creator (only
  while *not* registered). This switch is intentionally not remembered across app restarts.

### Soundwalk

- **Default game**: the game that is loaded automatically when the app starts. *None* disables auto-loading.
