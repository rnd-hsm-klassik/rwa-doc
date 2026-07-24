# Simulating Location on the Phone

Once you have [transferred your soundwalk](./transferring-projects.md) to *RWA Player* on your
iPhone, the most direct way to test it is to go to the corresponding area and walk it. But you will not always
be on site - and you will not want to walk across the whole terrain for every small change. If you are working
elsewhere, you can transmit the Hero location from *RWA Creator* to the running app on your phone: the game runs
on the device, through its audio engine and headphones, while you steer the listener position from the map
on your laptop. This lets you test your game in close-to-real conditions from anywhere.

The opposite direction - feeding the phone's real GPS position into *RWA Creator* - is covered in
[Live GPS in RWA Creator](./live-gps-in-rwa-creator.md).

## Requirements

- The iPhone (running *RWA Player*) and the laptop (running *RWA Creator*) are in the **same WiFi network**.
  The personal hotspot of your iPhone works well for this.
- You know the **IP address of the laptop** running *RWA Creator*.

!!! tip "Finding the IP address of your laptop"
    On macOS, open *System Settings > WiFi*, and click *Details...* on the connected network to see the
    laptop's IP address. Alternatively, run `ipconfig getifaddr en0` in a terminal.

## Steps

1. On the iPhone, start *RWA Player* and open your game in the [Settings View](../rwa-player/settings-view.md).
2. Enter the **IP address** of your laptop into the corresponding field in the section *RWA Creator*.
3. Tap **Register** to notify *RWA Creator* that you'd like to receive location data[^register-check-log].
4. Move to the [*Control View*](../rwa-player/control-data-view.md) and tap **Start** to start the game.
   If you did *not* register for receiving location data from *RWA Creator*,
   your position is updated automatically from the device's GPS, and you can simply start walking.
5. When registered, moving the Hero in the [Map View](../rwa-creator/map-view.md) of *RWA Creator* sends its
   location to the player: drag the Hero across your scenes and listen to the result on the phone.

!!! warning "Stay in the Control View"
    Receiving location data from *RWA Creator* is disabled while the
    [Map View](../rwa-player/map-view.md) is active on the phone. Keep the *Control View* open while
    simulating.

[^register-check-log]: Check the [*Log View*](../rwa-creator/log-view.md) in RWA Creator:
  It will tell you when the registration was successful. You may have to register twice for it
  to succeed.
