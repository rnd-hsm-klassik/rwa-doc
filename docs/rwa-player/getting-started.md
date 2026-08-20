# Getting Started

### Installation

Until the RWA Player App is ready for the Apple App store (which may take a
while), the iOS app is installed through Apple Testflight or by manual
drag-n-drop to registered devices connected to a laptop via USB. Device
registration is done in AppStore Connect of the entity also responsible for the
signing and notarisation certificates.

For the current project H.E.I. Campus, a set of iPhones is managed by the
project team. If you want the updates sent to your own phone via Testflight, get
in contact with the project team.

### Permissions

On first use, iOS asks for a few permissions. All of them are needed for a working soundwalk:

- **Location** (asked at first launch): the position drives the whole experience.
  Choose *Allow While Using App* at least; *Always* lets the walk continue with the screen locked.
- **Microphone** (asked at first launch): the audio engine opens the microphone for Pd patches that use live input.
  Games without such patches never actually record anything, but the permission is requested either way.
- **Bluetooth** (asked when the first game is loaded, or when connecting): needed for the headtracker.

If something was denied by accident, it can be changed later in *iOS Settings > Apps > RWA Player*.
