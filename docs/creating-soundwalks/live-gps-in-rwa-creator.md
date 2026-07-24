# Live GPS in RWA Creator

Sound design benefits a lot from the audible and visual cues of the environment the sounds are designed for.
How far are the surrounding trees, buildings and landmarks? What influence do they have on the scene? How does a
sound actually sound *at* a specific location? It helps a great deal to grab your laptop, headphones and iPhone,
and sit in the very place you are designing sounds for.

To get the best simulation result on location, transmit the iPhone's GPS position to *RWA Creator* and listen to
the result in realtime - without having to transfer the project to the phone after every change. You also see
the actual GPS precision live on the map, so you can adjust the boundaries of scenes and states on the spot.
Ideal for field work.

The opposite direction - steering the phone from the laptop - is covered in
[Simulating Location on the Phone](./simulating-location-on-the-phone.md).

## Requirements

- The iPhone (running *RWA Player*) and the laptop (running *RWA Creator*) are in the **same WiFi network**.
  The personal hotspot of your iPhone works well for this.
- You know the **IP address of the laptop** running *RWA Creator*.

!!! tip "Finding the IP address of your laptop"
    On macOS, open *System Settings > WiFi*, and click *Details...* on the connected network to see the
    laptop's IP address. Alternatively, run `ipconfig getifaddr en0` in a terminal.

## Steps

1. On the iPhone, open the *Settings* pane of *RWA Player* and enter the **IP address** of your laptop.
2. Toggle **GPS to RWA Creator**. The phone now transmits its GPS position to the laptop.
3. In *RWA Creator*, start the simulation with the :rwa-start: button in the
   [Map View](../rwa-creator/map-view.md) toolbar. The Hero now follows the phone's location.

You can now walk around with the phone in your pocket and the laptop in your hands, hear your design react to
your real position, and edit it in place:

- Listen to how a source sits against the real acoustic backdrop of the place, and adjust its sound design
  directly.
- Walk the edges of your scenes and states, and drag boundaries and radii until the transitions happen where
  they feel right.
- Watch how the Hero position scatters while you stand still - that scatter *is* the GPS accuracy at this
  location, and your state boundaries should account for it.
