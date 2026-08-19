# Game View

![game-view](./assets/rwa-creator-game-view.png)

/// caption
**Game View**: Scene Attributes (left), Scene List (right)
///

The *Scene List* shows all scenes of the current game. Selected scenes can be removed with the ++delete++ key. The *Scene Attributes* show the attributes of the Scene selected in the *Scene List*. The States belonging to the selected Scene are shown in the *State List* in the [*Scene View*](scene-view.md).

## Scene Attributes

| Attribute Name      | Default Value | Unit   | Description                                                                                                                                                                                                                                                                     |
| ------------------- | ------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Area Type           | Circle        | N/A    | Shape of the scene (circle, rectangle, square, **polygon**): corners can be added to a given polygon shape by double-clicking any point of its sides, and removed by double-clicking a corner. These corners can be clicked-and-dragged to freely modify the polygon's area.   |
| Next Scene          | None          | N/A    | Scene to enter automatically when the scene's *Time Out* elapses. **Not saved to the project file** [^not-saved-attributes]                                                                                                                                                     |
| Time Out            | 0             | s      | After this many seconds in the scene, enter *Next Scene* (0 = never). **Not saved to the project file** [^not-saved-attributes]                                                                                                                                                 |
| Level               | -1            | N/A    | Group Scenes by levels (identified by a unique level number). Scenes are only compared against scenes on the same level, so overlapping scenes on different levels don't compete.                                                                                               |
| Gain (dB)           | 0             | dB     | Gain applied to all states (and by that to all assets) in this scene, see [Mixing Soundwalks](../creating-soundwalks/mixing-soundwalks.md).                                                                                                                                     |
| Scene Radius        | 200           | m      | Radius of the scene when *Area Type = Circle*.                                                                                                                                                                                                                                  |
| Scene Width         | 200           | m      | Width of the scene when *Area Type = Rectangle* or *Square*.                                                                                                                                                                                                                    |
| Scene Height        | 200           | m      | Height of the scene when *Area Type = Rectangle* or *Square*.                                                                                                                                                                                                                   |
| Exit offset         | 0             | m      | Pushes the boundary outwards for *leaving* only, see [Scenes and States](../faq/scenes-and-states.md#how-does-geofencing-of-scenes-and-states-work).                                                                                                                            |
| States follow scene | true          | toggle | In editing mode, states are moved together with the scene.                                                                                                                                                                                                                      |
| Lock Position       | true          | toggle | Fixes the scene's center to its current map position; untick to drag the scene. Scenes are locked by default, and come back locked after reopening the project.                                                                                                                 |
| Disable Fallback    | false         | toggle | Lets the last active state remain active until a new state is activated, instead of returning to the *Fallback* state.                                                                                                                                                          |

!!! note "Positions of the Fallback and Background states"
    The *Fallback* and *Background* states are created at the scene's center,
    but their position has no meaning during playback. They have no area, they
    are entered by the engine, not by geography. It matters though where their
    assets are placed.

[^not-saved-attributes]: **Bug**: Neither *Time Out* nor *Next Scene* of a scene
    are saved to the project file: They work in the running simulation but are
    lost on reload. To make a scene time out, set *Time Out* and *Next Scene* on
    its *Background* state instead, which has the same effect and is saved.
