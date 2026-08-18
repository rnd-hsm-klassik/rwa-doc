# RWA Creator - Release Notes

These notes summarise what changed for you as a creator. For the full technical
detail behind each entry, see [CHANGELOG.md].

[CHANGELOG.md]: https://github.com/rnd-hsm-klassik/rwa-creator/blob/h.e.i.-campus-customisation/CHANGELOG.md

## Version 1.5.0 (19 August 2026)

A feature release: mixing across scenes, states and assets, patches that can
sound different on every trigger (proper random), and a large repair of undo and
the save-on-quit behaviour.

[Download v1.5.0](https://drive.switch.ch/index.php/s/e2pNsP7eV11HEyw/download)

### Mixing: gain on scenes and states, in dB

Scenes and states now have a **gain of their own**, next to the asset gain you
already know. The three multiply: raising a state lifts every asset in it by
the same amount, raising a scene lifts everything below it. Instead of
retouching twenty assets to make a state quieter, you set the state.
Details in [Mixing Soundwalks](../creating-soundwalks/mixing-soundwalks.md).

- All gain fields are now shown and edited in **dB**.
- While the simulation runs, a gain edit is audible immediately,
  no restart needed.
- Older projects load unchanged (scenes and states start at unity).

### A fresh random seed for every Pd patch activation

Each time an asset patch is activated it now receives a **`<tag>-seed`**: a new
random number your patch can feed into `[random]` and friends. A patch that
draws from it sounds different every time the state is entered, instead of
repeating the same "random" sequence in every run. Patches that ignore the
receiver are unaffected.

### Open an asset in its own application

**Shift+double-click** an asset in the asset list to open its file in the OS
default application: Pd for patches, your audio editor for sound files
(ocenaudio recommended). Plain double-click still renames. A missing file or
missing default application is reported in the Log View.

### The save-on-quit question finally behaves

- It only appears when the project **really has unsaved changes**. Opening a
  game, zooming the map, clicking through scenes and quitting asks nothing.
  Undoing back to the saved version counts as unmodified again.
- **Cancel now cancels.** It used to ask on every quit and then quit anyway,
  whatever you answered.
- **New** and **Open** ask the same question before replacing a modified
  project, instead of silently throwing your changes away. The question names
  what is about to happen.

### Undo and the History View repaired

Several long-standing undo problems had one root: projects that arrived by zip,
git or a hand copy have no `undo/` folder, and RWA Creator never created one.
Every undo step was then dropped without a word, and the History View listed
some unrelated directory, where clicking an entry **wiped the current project**.

- The project folders are created on open, so undo works for any project,
  including one you have not saved yet (its steps go to a scratch workspace and
  move over on Save as).
- The History View only ever lists your project's own snapshots, in the correct
  order past ten steps.
- An unreadable snapshot leaves your project untouched and warns, instead of
  loading an empty game.
- Map tiles are cached inside the project again, instead of landing in whatever
  folder the app happened to start from.

### Further fixes

- **Audio files edited outside RWA Creator no longer keep a stale length.**
  Duration, channel count and sample rate were read once and then cached until
  the project was reopened, so a trimmed or converted file kept its old
  duration, which broke loop crossfades and was written into the `.rwa` for the
  Player to believe. The values are now re-read whenever you save, copy or
  export a project, with a log entry per changed file and a warning when a
  crossfade is now longer than the file. **After editing assets outside the
  app, save the project** to pick the changes up.
- File dialogues now open in the **folder you last used**, remembered across
  restarts. *Save Version as…* still starts in the current project's folder.

## Version 1.4.9 (18 August 2026)

A working pass over the built-in playback patches: several audible artefacts at
the start of playback and in loops are gone.

- **Equal-power crossfades when looping**, and one single fade writer instead of
  several controllers fighting each other in some cases: no more zipper noise
  and no more double crossfade.
- **Fade-in and crossfade no longer run at the same time** when an asset
  starts. Playback now does what the attributes say. Note this sounds different
  from previous versions.
- **The click at the beginning of playback is gone**, caused by the distance
  scaling jumping from zero to the first real distance value (linear scaling
  additionally divided by zero). Playback now ramps in from far away.
- **Smooth Distance is actually applied.** (plain) mono- and stereo patches
  ignored the attribute and always used 10 ms ramps.
- **Ground reflections are removed from the binaural patches.** They sounded
  unrealistic in close proximity and trimming them did not give satisfying
  results. Both the original and the trimmed version are parked as
  `ground-reflections.pd` next to the patches in `puredata/`, add them back into
  your own patches if you like them.
- **Develop the player patches in a normal Pd.** The `oggread~` external now
  builds as a Pd library (`make -C pd_externals/rwa-lib install`, then add
  `~/Library/Pd/rwa` to Pd's search path), so the `ogg` patches in `puredata/`
  can be opened, heard and edited outside RWA Creator.

## Version 1.4.8 (14 August 2026)

Engine fixes around scene changes, all mirrored in RWA Player.

- **Overlapping scenes no longer ping-pong.** Standing where two scene areas
  overlap switched the scene many times per second, restarting the background
  state each time and using up the whole player pool within a second. You now
  stay in the scene you are in until you have actually left its area, which
  makes overlapping scene areas usable.
- **Background assets of a scene you left no longer play forever.** Re-entering
  a scene while its background was still fading out started a second copy that
  the engine could not track: it never stopped, never updated and looped
  endlessly. Quick re-entries now crossfade cleanly.
- **States of the scene you just left no longer trigger.** Right after a scene
  change, a GPS state of the old scene could activate once more and play its
  assets into the new scene.
- **Mono assets no longer use up the player pool.** Ending a mono (WAV) asset
  released the wrong slot, so over a session fewer and fewer mono assets could
  start.

## Version 1.4.7 (13 August 2026)

**A new convolution reverb external is now available in your Pd patches!** Now
you can use impulse responses recorded on site to embed your creations into the
environment (inside you custom Pd patchers, using `[vas_reverb~]`). Prepared in
RWA Creator 1.4.5, it is completed by RWA Player 1.3.7, released alongside this
version. Make sure the phones run that Player before relying on reverb in a
walk. 

Copying states between projects now works properly, and scenes/states got the
same delete protections assets received in 1.4.6.

- **Pasting states into another project now reliably brings the audio and Pd
  files along.** Copied states used to arrive without their files: everything
  played fine for the rest of the session, but on the next load (Creator and
  Player alike) the assets were missing, because the files were not copied into
  the target project's `assets/` folder. Pasting now copies them. If the target
  already has a file of the same name with identical content it is simply
  reused; a same-named file with *different* content is not overwritten: the
  incoming file is copied as `name-2.ext` and the pasted asset renamed to match.
  **Watch out for that rename if a dynamic Pd patch refers to the file by its
  original name**! This is not covered by the checks.
- **Clicking a state pasted from another project no longer crashes.** The pasted
  state still pointed at the source project's assets, which are gone once you
  switch projects; selecting it quit the app.
- **Deleting scenes and states is now refused while the simulation runs**, with
  a warning, the same rule as for assets since 1.4.6. The running simulation
  holds on to the current scene and state; deleting them under it could crash.
  Stop the simulation first.
- **The scene and state lists no longer lie after a refused delete.** Trying to
  delete the last remaining scene is refused (a game always keeps one scene),
  but the scene vanished from the list anyway while staying in the game, and a
  do-nothing undo step was recorded on top. The same could happen with the
  toolbar's Scene → Remove, which left the deleted scene selectable in the list.
  Lists now always show what is actually in the game, refusals appear as
  warnings in the log, and undo steps are only written when something was really
  deleted. After deleting a state the selection lands on the fallback state, so
  holding Backspace cannot chain-delete states you never selected.

## Version 1.4.6 (13 August 2026)

Deleting assets, *and undoing it*, can now be trusted.

- **Deleting an asset no longer makes a second, unrelated entry vanish.** After
  a delete, the first-added asset of the state (typically the Pd patch)
  disappeared from the list while staying in the game, and reappeared on the
  next occasion (adding an asset, switching states, reloading), perceived as
  "deleted assets come back". One delete now removes exactly one asset.
- **Deleted asset *files* are no longer gone for good.** With :rwa-trashassets:
  "On asset delete: remove file" active, the file now moves to a session trash
  inside the project instead of being erased. Undoing the delete brings the file
  back into `assets/` automatically (noted in the [Log View]); when the session
  ends, the session trash is forwarded to the system trash as a last-resort
  recovery. Files never silently vanish any more.
- **Missing-file badge.** An asset whose file is absent from the `assets/`
  folder now shows a badge :rwa-badgeFileMissing: in the asset list instead of
  looking like a healthy asset.
- **Deleting an asset while the simulation runs is now visibly refused** with a
  warning. It used to look deleted, only to resurface later.
- **Edits after an undo are no longer silently lost.** Restoring an undo
  snapshot (and in rare cases opening a project) could leave the attribute views
  connected to leftover objects from before the restore; everything you changed
  there was never saved. The views now always reconnect to the restored game.

## Version 1.4.5 (12 August 2026)

This release is about stopping and restarting the simulation: it is now
graceful to the ears, reliable, and faster with binaural patches.

- **Start :rwa-start: and Stop :rwa-stop: fades in simulation.** Added short
  fade-in/out to avoid clicks at beginning/end of simulation. The volume slider
  is smoothed as well, so dragging it no longer zippers.
- Fixed a latent bug involving leftover messages from previous simulation runs:
  An asset that was still fading out when you stopped the simulation could leave
  a timer behind that fired *into the next run*, some seconds in, an unrelated
  asset would simply switch itself off, seemingly at random. If you have ever
  restarted a simulation and lost a sound for no visible reason, this was it.
  This only affected audio assets, not dynamic pd patches.
- Faster restarts with binaural assets.
- Crash fixes for reverb external `[vas_reverb~]`: Stopping a simulation whose
  game used the reverb/convolution externals with array-loaded IRs could corrupt
  memory and crash the app. This a preparatory step to add a reverb external in
  future versions!
- **Tidier built-in patches.** The shipped patches are easier to read (unified zoom
  level, no more scrolling objects into view, stray subpatcher windows, or
  off-screen windows).
- **A quieter log.** Leftover debug prints in the shipped audio asset patches (which
  flooded the Log View with hundreds of lines on every stop) are removed, and
  the filter-loading messages now say what actually happened. 

## Version 1.4.4 (8 August 2026)

A stability release: it removes a family of crashes around deleting assets and
states. If RWA Creator has ever quit on you while you were reorganising a scene,
update.

- **Leftover asset dots on the map no longer crash the app.** When you selected
  a state without assets, the previous state's asset markers stayed visible on
  the map; clicking one of them after its state was gone (deleted, undone, or
  the game reloaded) crashed RWA Creator. Typical trigger: select an empty
  fallback or background state, delete the state you were just working on, then
  click one of its still-visible dots. The map now always clears the old
  markers, including ones "hidden" by the asset mute/disable toggle, which
  stayed clickable although invisible.
- **Backspace in an empty asset list no longer crashes.** Deleting assets one
  after another was fine, but one Backspace too many after the last asset was
  gone (easily done, holding the key repeats it) quit the app.
- **Deleting an asset now really removes it**, instead of quietly keeping it in
  memory. As a consequence, deleting assets is now refused while the simulation
  is running, the same rule that already applied to dragging them. Stop the
  simulation first.

## Version 1.4.3 (7 August 2026)

### Multichannel Pure Data patches

The **Playback Mode of a Pd-patch asset now does something**: it decides how
many channels of spatial data your patch receives. Until now a patch always got
a single set of values (`$0-azimuth1`, `$0-distance1`, `$0-elevation1`),
whatever mode was selected, multichannel patches (using channel positions)
simply could not be driven from the Creator.

- Pick **Binaural-Stereo** and your patch receives two channels
  (`$0-azimuth1`/`$0-azimuth2`, same for distance and elevation),
  **Binaural-5Channel** five, **Binaural-7Channel** seven. The mono modes send
  one channel, as before.
- The channels honour **Channel Radius**, **Rotate Offset** and dragged **custom
  channel positions** exactly like they do for audio assets: the channel dots
  you place on the map are the positions your patch hears.
- At start, every patch now also receives **`$0-numchannels`**: the number of
  channels it will be streamed, so one patch can adapt itself to whatever mode
  is selected.
- Existing patches that only listen to the `...1` receivers keep working
  unchanged, and **"Headtracker relative to source" off** still means: one set
  of raw head azimuth/elevation data, your patch does its own spatialisation.
- The **Auto** mode is hidden for patch assets: it depends on an audio file's
  channel count, which a patch doesn't have.

### 7-channel assets actually surround you now

A bug made **all seven channels of a Binaural-7Channel asset collapse onto a
single point** as soon as the simulation ran: the authored spread
(−40/0/40/−80/80/−120/120°) was visible on the map but never reached your ears.
Fixed, for audio assets and patches alike.

### In step with RWA Player

All of the above is mirrored in **RWA Player 1.3.5**: what you hear in the
simulator is what visitors hear on the phone. Make sure the phones run the
matching Player version before relying on multichannel patches in a walk.

## Version 1.4.2 (7 August 2026)

- **Selected assets stand out on the map.** An asset's satellite icons (channel
  positions, the start position and the moving position of moving/rotating
  assets) now take on the selection colour together with the asset icon itself.
  With several multichannel or moving assets in view you can finally tell which
  dots belong to the selected one.
- **Three asset checkboxes show their real value again.** "Raw Sensors to Pd",
  "GPS to Pd" and "Headtracker relative to source" displayed stale values when
  you selected an asset (most visibly, "Headtracker relative to source" showed
  unchecked although it defaults to on). Only the display was wrong: stored
  projects were never affected. If you wondered why pd patches didn't receive
  azimuth etc. despite "Headtracker relative to source" being unchecked, it's
  because it was checked (default), but you couldn't see it.
- **The "Required Scenes" field is gone from the Scene view.** It was never
  implemented: anything you entered there was silently lost on save. The
  (working) state-level Required States are untouched. If a future release
  implements scene requirements, it will say so here.

## Version 1.4.1 (4 August 2026)

- **Microphone input works again.** Pd patches using `[adc~]` received silence
  in release builds. On first use after this update, macOS asks for microphone
  permission: grant it and live input reaches your patches.

## Version 1.4.0 (3 August 2026)

### See your assets at a glance

The asset list in the State View now shows small status icons (badges) next to
each asset, so you no longer have to open an asset's attributes to check its
setup. Hover over an item and the tooltip spells out what its badges mean.

- :rwa-badgeSamplerateMismatch: **sample-rate warning**: the audio file's sample
  rate differs from the sample the RWA engine is running at. Convert the file
  before using it, otherwhise it will sound pitch-shifted.
- :rwa-badgePd: **Dynamic Patcher**: marks Pure Data patch assets.
- :rwa-badgeMuted: **Muted/Disabled**, :rwa-badgeLooped: **Looped**,
  :rwa-badgeMoving: **Moving**: the corresponding toggles from the asset's
  attributes.
- **Playback mode**: a speaker icon (standard playback :rwa-playbackSpeaker1:
  mono, :rwa-playbackSpeaker2: stereo) or headphones icon (binaural), each with
  its channel count: :rwa-playbackHeadphones1: :rwa-playbackHeadphones2:
  :rwa-playbackHeadphones5: :rwa-playbackHeadphones7:

### Open projects straight from Finder

`.rwa` files now belong to RWA Creator on macOS: they get their own document
icon, and double-clicking one opens the project, in the running app if RWA
Creator is already open, otherwise the app is launched first. As with
File > Open, this replaces the currently loaded project.

<!--iconutil -c iconset ../../../../rwa-creator/images/rwa-document.icns -o ./rwa-document.iconset-->
<!--cp rwa-document.iconset/icon_32x32@2x.png rwa-document-icon-small.png-->
![RWA Document](./assets/rwa-document-icon-small.png)

### Keyboard shortcuts for everyday actions

The operations you repeat all day now have key commands, shown next to their
menu entries:

| Shortcut | Action |
| --- | --- |
| ++command+n++ | New project |
| ++command+o++ | Open project |
| ++command+s++ | Save |
| ++command+shift+s++ | Save Version as… |
| ++command+option+s++ | Copy Project to… |
| ++command+e++ | Export Project for transfer to RWA Player… |
| ++command+shift+e++ | Send Project to Sharing Server… |
| ++command+r++ | Run Simulation (restarts a running one) |
| ++command+k++ | Stop Simulation |
| ++command+shift+l++ | Clear Log Window |

There is a new **Simulation** menu holding Run/Stop, and ++command+r++ means
"run from the top": pressing it while a simulation runs restarts it in one
keystroke. The start button :rwa-start: in the [Map View] toolbar now always
reflects whether the simulation is actually running, no matter how it was
started or stopped.

[Map View]: ./map-view.md

### Headphones can be plugged in at any time

Previously, an audio device connected after starting RWA Creator was invisible
to the app, the simulation would run silently. Now:

- **Rescan Audio Devices** (Audio Preferences menu) picks up newly connected or
  removed hardware. The rescan also runs automatically every time you start the
  simulation, so in practice pressing start :rwa-start: is enough.
- **Follow System Default** at the top of both device lists is the new starting
  state: when macOS switches to your freshly plugged-in headphones, RWA Creator
  follows. Picking a specific device instead is remembered across restarts - by
  name, so it survives unplugging and reconnecting.
- If opening an audio device fails, the log now tells you which device and
  points you at the rescan, instead of failing silently.

### See the progress of file transfers to RWA Player

When you share a game over the Sharing Server :rwa-syncwithclients:, the log now
shows when an [RWA Player] connects, starts requesting a game, and whether the
download completed, so you can tell whether a player reached RWA Creator at all
and which game it pulled.

[RWA Player]: ../rwa-player/index.md

### Fixes and refinements

- **Dark mode**: the [Map View] toolbar icons and the [Log View] now follow the
  system's light/dark appearance.
- **No more stale asset values**: after switching states, the asset attribute
  form could keep showing the previous state's asset; edits then went nowhere or
  silently changed a different asset with the same file name. The form now
  always shows (or clears to) the selected state's actual asset.
- **Clicking empty space** in the state or asset lists no longer clears your
  selection out from under the attribute form.
- Changing **Loop, Rotate or the Playback Mode** in [State View] now updates all
  views immediately, visible in the new badges.
- **Latitude/longitude** fields in the [Scene View] now always appear in the
  same order.
- Saved `.rwa` files reference audio **relative to the project's `assets/`
  folder** instead of recording the full paths of the machine they were saved
  on: shared game files no longer carry your username and folder layout. Old and
  new files remain fully compatible in both directions.
- The File menu entry **Clear** is now called **New**, and its dialogue is
  titled accordingly.

[Log View]: ./log-view.md
[Scene View]: ./scene-view.md
[State View]: ./state-view.md

## Version 1.3.1 (30 July 2026)

- The **FABIAN binaural (HRTF) set no longer has to be copied into every
  project**. Your own Pd patches now find it automatically wherever they live;
  previously it worked only for the bundled playback patches, unless you copied
  the 38 MB file into your game's assets by hand. Existing games that carry
  their own copy keep working. The same fix is mirrored in RWA Player.

## Version 1.3.0 (29 July 2026)

This release focused on making the game engine behave the same in RWA Creator's
simulator and in [RWA Player], so what you hear while testing on the map matches
what visitors hear on the phone.

- **Smoother scene changes.** Audio is no longer always cut when entering a new
  scene: if the new scene's fallback is disabled, the running assets play out
  until a new state is triggered. Background assets end cleanly on every scene
  change.
- **Background states work on their own.** A scene's background state now starts
  correctly with panning and distance attenuation, without you having to enter
  another state first.
- **A more readable log.** Output from Pd patches arrives as complete lines
  prefixed with `[pd]`, instead of one fragment per line.
- Asset gain is now applied correctly the moment an asset starts.

## Version 1.2.6 (23 July 2026)

- **Clearer menu and dialogue wording** around saving, exporting and sharing:
  *Save Version as…*, *Copy Project to…*, *Send Project to Sharing Server…*,
  *Export Project for transfer to RWA Player…*, plus matching preference labels
  (*Sharing Server Path*, *Project Export Path*).
- First iteration of the scene-change audio behaviour refined in 1.3.0, and a
  fix for a crash-prone edge case when a scene has fallback enabled but no
  states.
