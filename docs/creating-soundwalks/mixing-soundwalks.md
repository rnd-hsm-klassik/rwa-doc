# Mixing Scenes, States and Assets

Over the course of a project, the number of scenes, states and assets is going
to grow, and dynamics will sooner or later diverge. Some assets were maybe
created in a studio, others outside, on headpohones, or or simply with a
different state of mind. These differences become even bigger when multiple
people work on the same project. For that reason RWA Creator has hirachical
gainstaging built in.[^gainstaging-version] Every **asset**, every **state** and
every **scene** has its own gain, and they are cumulative:

[^gainstaging-version]: Gain staging and values in dB were introduced in version
1.5.0.

``` scene gain × state gain × asset gain = what you hear ```

- All three start at unity (**0 dB**). Nothing changes until you touch one.
- Raising or lowering a **state** shifts every asset in that state by the same
  amount, the assets keep their balance relative to each other. Raising a
  **scene** shifts every state (and so every asset) in it.
- The values are independent: changing the state gain does not rewrite the gains
  of its assets. The Creator and the Player multiply the three at playback time.

The fields are called **Gain (dB)** in the asset, state and scene attribute
views. `0` is unity, `-6` is roughly half as loud, `+6` roughly twice, `-inf` is
silent. Values above 0 dB are allowed but watch for clipping: the master volume
slider in the toolbar sits after everything else and does not prevent it.

If you are used to the way gain was set in previous versions (pre 1.5.0): The
project still stores those values, it's just the UI that translates it to a more
relatable unit: $dB = 20 \cdot log_{10} A$ and $A = 10^{ \frac{20}{dB} }$
respectively.

**Mixing while the simulation runs.** Gain changes take effect immediately, so
you can walk the simulator through a scene, listen, and adjust states or whole
scenes on the fly.

**Undo.** Each finished edit of a gain field is one undo step.

**In the file.** Saved as `gain="..."` (a linear factor, not dB) on `<scene>`,
`<state>` and `<asset>`. Older projects without the scene/state attribute load
with unity gain and sound exactly as before.
