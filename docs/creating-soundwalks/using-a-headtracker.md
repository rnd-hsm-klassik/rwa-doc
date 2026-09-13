# Using a Headtracker

The [*Headtracker* menu](../rwa-creator/getting-started.md#headtracker) in the menu bar connects RWA Creator to an RWA headtracker over Bluetooth LE,
so the simulation reacts to where you turn your head.

Once connected, the tracker's azimuth and elevation replace the Hero's head orientation, and its step detector
feeds the *step* events. :rwa-calibrateHeadtrackerButton: [Calibrate](../rwa-creator/map-view.md#calibrate-headtracker) to set north.
Without a headtracker the Hero always faces north: an asset north of the Hero is heard in front, east to the right, south behind, etc.

**Important**: disconnect from the headtracker if you want to use it with RWA Player: the headtracker can only be connected to one device at a time.

When using a RTK headtracker, you can use the GPS location provided by the device to move the Hero and place landmarks.
Check [Live GPS in RWA Creator](./live-gps-in-rwa-creator.md) for details.
