## Scenes and States

How the game engine interpretes *where* you are and *what* you hear. Written
against RWA Player 1.3.0.

### How does geofencing of scenes and states work?

While you walk, your GPS position is continuously handed to the game engine,
which checks whether you are inside or outside the boundaries of a scene or a
state.

Boundaries are deliberately not razor-sharp: they have hysteresis, so that the
edge you enter at and the edge you leave at are not the same line.

* **Entering** requires you to be about 2 m *inside* the drawn
  boundary.[^enter-offset-shape-dependent] The trigger area is therefore
  slightly smaller than what you see on the map.
* **Leaving** happens at the drawn boundary, unless you give the scene or state
  an **Exit Offset** (in meters). The exit offset pushes the boundary *outwards*
  for leaving only, so you have to walk that much further out before the area
  releases you.

[^enter-offset-shape-dependent]: The enter offset is fixed at 2 m in the player
    and cannot be set per area in the Creator. It applies only to **circular and
    rectangular** areas. For circles it is taken off the radius, for rectangles
    off the overall width and height (about 1 m per side). **Polygons have no
    enter offset**: they trigger at the drawn outline. Exit offsets work for all
    shapes, polygons included. **Worth noting**: RWA Creator currently doesn't
    apply a fixed enter offset.

Without hysteresis, standing right on a boundary would trigger repeatedly: GPS
positions keep drifting by about a meter even when you stand still. In difficult
spots (walls or buildings close by, obstructed view of the sky) that jitter gets
considerably worse, and boundaries and exit offsets need fine-tuning to stay
reliable.

Two practical consequences:

* **Very small areas may never trigger.** A circle needs a radius of more than 2
  m before there is anything left to enter; a rectangle needs to be more than 2
  m wide and tall. Keep areas comfortably larger than the GPS accuracy you
  expect at that spot.
* **Position updates are evaluated about once per
  second**,[^position-update-interval] so there can be up to a second between
  crossing a line and hearing the change. Do not design on the assumption of
  instant response - give transitions a bit of room.

[^position-update-interval]: The position update interval is dependent on the
    update rate of the game engine, a.k.a. the "frame rate". Since this is an
    audio-game engine without frames drawn to a screen, the interval is not tied
    to a visual frame rate. RWA Creator and Player use different intervals: RWA
    Creator: 25 ms (40 Hz), RWA Player: 1 s (1 Hz).

### Why does a state not trigger again when I walk back into it?

Because of the **re-entry latch**. As soon as a state is entered, it is latched
and will not fire again until you have actually left it - that is, until you
have stepped outside its exit boundary at least once. Standing inside a state,
or shuffling around near its edge, will not restart it.

The same latch is used when a state is blocked (see *required states* below): a
state you were not allowed to enter stays blocked until you leave its area and
come back.

The latch is released when you leave the area, and also when you leave the scene
the state belongs to - so a state you were standing in when the scene changed is
available again the next time you enter that scene.

### What is the difference between a scene and a state?

A **scene** is the container; **states** live inside it and are only considered
while their scene is the current one.

On every evaluation, the engine first checks whether you have walked into a
different scene, and only then which state inside that scene applies. Scenes are
only compared against other scenes **on the same level**, which is what lets you
stack overlapping scenes without them fighting each other.

### Which state wins when areas overlap?

The first one that matches, in the order the states are listed in the scene.
The engine stops at the first state whose conditions are fulfilled. It does not
look for the "best" or the closest match. If you have overlapping state areas,
their order in the scene is what decides, so put the more specific one first.

It is generally recommended to avoid overlapping state areas, because it can be
confusing to the listener and to the designer. If you do have overlapping areas,
make sure to test them thoroughly.

### What happens when I enter a new scene?

1. The background assets of the old scene are faded out.
2. The new scene becomes current, and its **fallback state** (the first state in
   the scene) is entered - unless the scene has fallback disabled.
3. The new scene's **background state** starts.

The fallback state is where you are whenever no other state applies:

The background state is the "neutral" ground of the scene. Give it the ambience you want to carry the scene,
or leave it empty and let the scene stay silent between states.

!!! note "Changed behaviour"
    **Note (changed in RWA Player 1.3.0):** audio from the previous state is no longer always
    cut when the scene changes. Running assets are ended only if the new scene
    activates a fallback state that actually has assets in it. Entering a scene with
    fallback disabled, or with a silent, asset-less fallback, now lets the previous
    audio play out until a new state is triggered. If a piece of yours relied on
    audio being cut at every scene boundary, it will sound different - put an asset
    in the fallback state to get the old behaviour back.

### What else decides whether I enter or leave a state, besides geography?

Geography is the first gate, but several options can hold a state back or push
you out of it:

**Conditions for entering**

* *Required states* - the state only opens once you have already visited the
  states it names. If you arrive without them, you are turned away, and if a
  *hint state* is configured, you are sent there instead (a good place for a
  "you are missing something" cue).
* *Enter only once* - the state can be visited once per walk and never again.

**Conditions for leaving**

* *Min stay time*: scenes and states can insist on a minimum dwell time before
  any transition is considered, even if you have already walked out.
* *Timeout*: after this many seconds the state (or scene) is left on its own.
* *Leave after assets finish*: the state ends by itself once its audio has
  played out.
* *Leave only after assets finish*: walking out is not enough; the state holds
  on until its audio is done. Use this when a sound must not be cut off
  mid-sentence.

**Where you go next**

* *Next state* / *next scene* send you to a specific destination when the state
  ends. With neither set, you fall back to the scene's fallback state.

### Tips for reliable triggering outdoors

* Draw areas larger than you think you need - GPS accuracy, not your map, sets
  the resolution of the piece.
* Use the *exit offset* to widen the gap between entering and leaving wherever
  a listener is likely to linger on a boundary.
* Avoid designing critical triggers right next to facades, under trees, or in
  narrow alleys; place them in open space and let the narrow spots be
  continuations, not triggers.
* Prefer a few large, forgiving areas over many small adjacent ones. Adjacent
  areas turn every GPS wobble into a state change.
* Walk-test with the Diagnostics tab open: it shows the live position and the
  active scene and state, which is the quickest way to see a boundary
  misbehaving.
