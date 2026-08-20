# Overview

With the aid of a motion-tracking GPS-powered headset, RWA Player lets you listen to projects created and edited in [RWA Creator](../rwa-creator/index.md) in the real world.

The main focus of the user experience is in the listening to the soundwalk itself, and not so much with the GUI of the RWA Player app. In other words, RWA Player functions only as a channel where your audio environments live. After pressing the **start** button, you can simply put the mobile device in your pocket and let your ears be the interface that allows you to explore the creative content of your RWA soundwalk.

### The five tabs

- [Games](./games-view.md): the games on the device; tap to load one, *Fetch Games* to download from RWA Creator.
- [Control](./control-data-view.md): start/stop, headtracker connection, calibration, volume, and the live scene/state/position readout.
- [Map](./map-view.md): the current scene on a map, with the listener position (for checking boundaries on site).
- [Diagnostics](./diagnostics-view.md): connection, battery and GNSS quality details, for troubleshooting.
- [Settings](./settings-view.md): headtracker name, position/heading sources, the RWA Creator connection, and the default game.

### Where the position comes from

RWA Player picks the listener position from three possible sources, in a fixed priority:

1. **RWA Creator**: while the phone is *registered* with RWA Creator,
    the Hero position from the laptop overrides everything else
    (see[Simulating Location on the Phone](../creating-soundwalks/simulating-location-on-the-phone.md)).
2. **RTK headtracker**: with the GPS source set to *RTK tracker* in the [Settings View](./settings-view.md),
    the headtracker's satellite receiver delivers the position, at up to centimeter accuracy.
    This requires the Phone to provide a Hotspot, so the headtracker can stream RTK correction data from the the internet connection.
3. **Internal GPS**: the phone's own location. This is the default (for now),
    and the automatic fallback whenever the tracker delivers no fix for 8 seconds.

The [Control View](./control-data-view.md) and the [Map View](./map-view.md) both show which source is currently active.

In the sections [Creating Soundwalks](../creating-soundwalks/index.md) and [FAQ](../faq), you can find creative insights and technical tips that will help you take your artistic ideas to their full potential in the RWA environment.
