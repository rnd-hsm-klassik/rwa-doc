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

* *Required states*: the state only opens once you have already visited the
  states it names. If you arrive without them, you are turned away, and if a
  *hint state* is configured, you are sent there instead (a good place for a
  "you are missing something" cue). See the example and explanation to [the
  question](#how-do-i-use-required-and-hint-states) below.
* *Enter only once* - the state can be visited once per walk and never again.

**Conditions for leaving**

* *Min stay time*: scenes and states can insist on a minimum dwell time before
  any transition is considered, even if you have already walked out.
* *Timeout*: after this many seconds the state (or scene) is left on its own.
* *Leave after assets finish*: the state ends by itself once its audio has
  played out.
* *Leave only after assets finish*: walking out is not enough; the state holds
  on until its audio is done. Use this when a sound must not be cut off
  mid-sentence for example.

**Where you go next**

* *Next state* / *next scene* send you to a specific destination when the state
  ends. With neither set, you fall back to the scene's fallback state.

### How do I use *required* and *hint* states?

The engine remembers every state you have entered during a walk (the *visited
states*). *Required states* let a state check that memory before it activates,
and the *hint state* is where you are sent instead when the check fails (and a
*hint state* is set). Together they are enough for simple puzzle mechanics:
*find the key, then the door opens*.

A minimal "locked door" needs three states in one scene:

1. **`Key`**: an ordinary state somewhere in the scene. Entering it is what
   "picks up" the key: the engine records the visit automatically. Give it an
   asset that tells the listener they found or triggered something.
2. **`Door`**: the gated state. This is where the actual content of the scene
   sits. In the *State view*, type `Key` into its **Required States** field and
   choose `Door locked` as its **Hint State**.
3. **`Door locked`**: the hint. Set its **State Type** to *Hint* and give it a
   "the door won't open... maybe there is a key nearby?" asset. Enable *Leave
   after assets finish* so the walker drops back to the fallback state once the
   hint has played.

What the walker experiences: walking into the `Door` area without having been
in `Key` plays the locked-door message; the door then stays shut until they
leave its area, visit `Key`, and come back - at which point it opens normally.

**Multiple required states.**: The Required States field takes a comma-separated
list: `Key, Crowbar, Password`. This is an *and*: every listed state must have
been visited before the gate opens. Names must match the state names in the same
scene exactly.[^non-matching-required] The single hint state fires no matter
which of the required states is missing.

[^non-matching-required]: Entries that don't match any state are silently dropped
when you confirm the field, so re-select the state afterwards and check which
names survived.

**What counts as "visited".** A state is recorded as visited the moment it is
*entered*, the walker does not have to stay or hear the assets out. The list
survives scene changes, so progress carries across the whole walk, and is
cleared when the game is started. Two things do **not** count: a gated state
that turned the walker away, and a hint state that was reached by redirect
rather than by walking into it.

#### Hint state behaviour

- Each state has at most one hint state, chosen from the states of the same scene.
- The hint fires once per approach: the blocked state latches, and only unlatches
  when the walker leaves its area (see the re-entry latch above).
- Setting the hint's type to *Hint* keeps it out of the normal geographic
  evaluation. It doesn't need an area of its own and can only be reached as a
  hint. You can point it at a regular GPS state instead, but if the walker is
  outside that state's area, the next evaluation will throw them out
  - so type *Hint* is almost always what you want.
- ==Because a *Hint*-typed state has no area to leave, give it an exit of its own:
  *Leave after assets finish*, a *Timeout*, or a *Next state* / *Next scene*==.
- The hint redirect only happens on a failed required-states check; a state that
  refuses entry because of *Enter only once* turns the walker away silently.

**Mind your names.** Required states and hint states are stored as plain state
names. Renaming or deleting a state does *not* update the fields of states that
refer to it, and nothing warns you: a gate requiring a name that no longer
exists can never open, and a dangling hint reference simply stops the hint from
activating. After renaming states, walk through the *Required States* and *Hint
State* fields of the scene once, and check that the names match.

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
