# Working with Pure Data

## How to receive head-tracking data in Pure Data

Unset the asset attribute `Headtracker relative to source`. This will send the
raw headtracking data to the Pd patcher instead of calculating the bearing and
elevation of the source(s) relative to your location. The data arrives at the
Pd-receives `$0-azimuth1` and `$0-elevation1`.

### Consequences

When using Pd patches as assets, the `Playback Mode` has no effect, as the Pd patcher sends its audio directly to the output. Any binaural rendering would have to be implemented in the patch. It's best to set the `Playback Mode` to `Undetermined`.

Custom channel positions don't work anymore, as those would require bearing/elevation calculation, which is now skipped.

With looping toggled, the game engine would calculate the offset at which the crossfade starts using the duration of the audio asset ($t_{offset} = t_{audio} - t_{xfade}$). Since *Pd-assets* don't have a duration, you would have to set that duration manually.

!!! tip "Example: Fountain Dipping"
    Check out [fountain-dipping](https://drive.switch.ch/index.php/f/9803330791) (you need to be logged into SwitchDrive for access) and the `assets/fountain-dipping.pd` therein:

    - Elevation is used to crossfade between above water and submerged scenes (dipping your head under water at a fountain)
    - Azimuth is implemented as usual: Sources can be placed at a bearing of your choice and will be rendered using binaural synthesis. Damping is not implemented.
    - Multiple loop players are available that can have a global bearing offset or individual positioning of each source channel.
