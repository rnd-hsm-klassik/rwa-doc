# Getting Started

## Installation

Download the [latest version](https://drive.switch.ch/index.php/s/fkRXSc95qJQmrSG/?accept=zip) of RWA Creator (v1.5.4, 2026-08-28, [Release Notes]). At the moment, RWA Creator is only available for macOS. Linux and Windows versions will be available in the future.

[Release Notes]: release-notes.md

Open the downloaded disk image, open it and move the `RWA Creator.app` to your Applications folder. You can then launch the application from there.

## First Steps

When you first open RWA Creator, it will ask you to save a new project. Choose a location on your computer and give your project a name. This will create a new folder containing your project file with the extension `.rwa`. Next to it you will find a folder named `assets`, where all the audio files and Pure Data patches will be placed. Also, the folders `tilecache`, `tmp`, and `undo` will be created, which are used internally by RWA Creator and can be ignored for now.

```text
SoundWalk/
├── SoundWalk.rwa
├── assets/
├── tilecache/
├── tmp/
└── undo/
```

You can recognise the RWA project file by its icon:

![rwa-document-icon-small](./assets/rwa-document-icon-small.png)

After creating a new project, you will see the main interface of RWA Creator, which consists of six views: [Map View](./map-view.md), [Game View](./game-view.md), [Scene View](./scene-view.md), [State View](./state-view.md), [History View](./history-view.md) and [Log View](./log-view.md). You can freely arrange these views by dragging and dropping them to your preferred layout, or having them float as separate windows.

A new project already contains one scene with its *Background* and *Fallback* states, and the Hero ![hero4](./assets/heroFollowsSceneAndStateButton.png), the avatar that stands for the listener (see [General Game Structure](./overview.md)). From here, a typical first session looks like this:

1. **Bring the scene to your site.** The new scene sits at a default location. In the [Map View](./map-view.md),
    pan the map until the place you are working on lies under the crosshair in the center,
    or open the :rwa-findlocation: *Location Lookup* and pick the place by name, which pans the map there.
    Then choose *Scene Menu > Move Scene to Map Coordinates*: the scene, its states and the Hero will be moved to the crosshair.
2. **Shape the scene.** The scene area (a circle of 200 m by default) is the geofence in which the scene is active.
    Drag its circumference to resize it, or change *Area Type* in the [Game View](./game-view.md) for a rectangle or a polygon. The scene is *locked* by default; untick *Lock Position* to drag it around.
3. **Create states.** Double-click into the map at locations you want to work on. Each double-click creates a GPS state (50 m radius), the trigger area for its sounds.
    Drag states around, resize them at the circumference, and name them in the [Scene View](./scene-view.md).
4. **Add sounds.** Select a state, and drag audio files (`.wav`, `.aif`, `.ogg`) or Pd patches (`.pd`) into the asset list of the [State View](./state-view.md).
    The files are **copied** into your project's `assets` folder; the originals stay where they are, so you can edit your project's copies individually without changing your source material.
    Drag the assets into place on the map of the State View: inside or outside the state area, wherever they should *sound* from.
5. **Listen.** Press :rwa-start: in the Map View toolbar and drag the Hero into your state.
    ==Move the Hero at a realistic walking pace==, that is how your visitors will hear it.
    ++command+r++ restarts the simulation from the top, ++command+k++ stops it.
6. **Save** regularly, ++command+s++. Every edit is also recorded as an undo snapshot in the [History View](./history-view.md),
    but only *Save* writes the project file itself.

When the walk is ready for the phone, see [Transferring Projects](../creating-soundwalks/transferring-projects.md).

## Menus and Preferences

### File

| Menu entry                                 | Shortcut             | What it does                                                                                                                                                                                                            |
| ------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| New                                        | ++command+n++        | Start a new project (asks to save if the current one has unsaved changes).                                                                                                                                              |
| Open                                       | ++command+o++        | Open an `.rwa` project file. Double-clicking an `.rwa` file in the Finder does the same.                                                                                                                                |
| Save                                       | ++command+s++        | Write the current `.rwa` file in place.                                                                                                                                                                                 |
| Save Version as…                           | ++command+shift+s++  | Write a **new** `.rwa` file, by default next to the current one in the same project folder, and continue working on that version. Useful for keeping milestones of a walk; all versions share the same `assets` folder. |
| Copy Project to…                           | ++command+option+s++ | Duplicate the whole project (project file, `assets`, and the internal folders) to a new location.                                                                                                                       |
| Export Project for transfer to RWA Player… | ++command+e++        | Write a clean copy (`.rwa` + `assets` only) to the *Project Export Path*, ready to be copied onto an iPhone by USB. See [Transferring Projects](../creating-soundwalks/transferring-projects.md).                       |
| Send Project to Sharing Server…            | ++command+shift+e++  | Zip the project into the *Sharing Server Path*, from where RWA Player downloads it over WiFi.                                                                                                                           |
| Remove unused files from disk              |                      | Delete every file in the `assets` folder that no asset of the project refers to any more (immediately, not into the trash - check the [Log View](./log-view.md) for what was removed).                                  |
| File Path Preferences                      |                      | See below.                                                                                                                                                                                                              |

**File Path Preferences** holds two folders:

- *Sharing Server Path* - where *Send Project to Sharing Server…* puts the zip files, and what the
  :rwa-syncwithclients: Sharing Server serves. Default: `~/Library/Application Support/RWACreator/Games`.
- *Project Export Path* - where *Export Project for transfer to RWA Player…* writes to. Default: `~/Desktop`.

### Audio Preferences

- **Rescan Audio Devices**: pick up headphones or interfaces plugged in after the app started (this also happens automatically whenever you start the simulation).
- **Target Sample Rate**: 44100 or **48000** (default). RWA Creator and RWA Player both run at 48 kHz,
  so work at 48 kHz throughout: record, edit and export your files at 48 kHz.
  A file at another rate is played back pitch-shifted and gets a :rwa-badgeSamplerateMismatch: badge in the asset list.
- **Select Output-Device / Select Input-Device**: *Follow System Default* (recommended: RWA Creator follows whatever macOS switches to) or a fixed device, remembered by name across restarts.
  The input device only matters for Pd patches using live microphone input (`[adc~]`).

### Simulation

*Run Simulation* ++command+r++ and *Stop Simulation* ++command+k++, the same as the :rwa-start: / :rwa-stop: buttons in the Map View toolbar.

### Headtracker

Connect an RWA headtracker over Bluetooth to steer the Hero's head orientation: see [Map View > Headtracker](./map-view.md#headtracker).

### View

*Gather Views* docks all views back into the main window;
the other entries open or raise the individual views (Map, Game, Scene, State, History, Log Window).
*Clear Log Window* (++command+shift+l++) empties the log.
