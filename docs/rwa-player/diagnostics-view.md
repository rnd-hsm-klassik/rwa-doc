<!-- TODO: screenshot predates the current five-tab layout; re-take on a recent build. -->
![Diagnostics View Screenshot](./assets/diagnostics-view-masked.png){align=right width=33.333%}

# Diagnostics View

The *Diagnostics* tab is a read-only screen, useful while working on sound walks to diagnose problems.
It is the place to look when something goes wrong: is the headtracker actually connected, how good is the GNSS fix, is data still arriving?

### Connectivity

- **Head tracker (BLE)**: *Connected* / *Disconnected*, with the age of the last data. When the heading source is set to *Internal*, this row reads *Device orientation* instead.
- **Signal (RSSI)**: Bluetooth signal strength in dBm; values closer to 0 are better.
- **Last heartbeat**: when the headtracker last reported in.

### Head-tracker device

- **Battery**: the tracker's battery voltage.
- **Firmware** / **Uptime** of the tracker.

### Motion data

- **Azimuth**, **Elevation**: the current head orientation in degrees.
- **Steps**: the footstep count.

### GNSS quality

The quality of the position fix (from the RTK headtracker):

- **Position**: the current coordinates.
- **Fix type**: *No fix*, *2D*, *3D* (*GNSS + DR*: dead reckoning, not available with current hardware).
- **Carrier solution**: the RTK status: *None* (plain GNSS, metre-level), *RTK float* (decimeter-level),
  or *RTK fixed* (centimeter-level). Expect *RTK fixed* only with a good view of the sky and a working correction stream.
- **Horizontal acc. / Vertical acc.**: the receiver's own accuracy estimate, in millimeters.
- **Satellites** / **PDOP**: how many satellites are used and the quality of their geometry (lower PDOP is better, *Position Dilution of Precision*).
- **Correction age**: age of the last RTK correction data. When this grows, the carrier solution will soon degrade from *fixed* to *float* to *None*.
- **Last fix**: when the last position arrived.

### Versions

The app version and the exact build (git commit), useful when reporting a problem.
