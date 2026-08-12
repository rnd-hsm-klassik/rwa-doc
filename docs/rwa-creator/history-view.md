# History View

This view provides **undo/redo** functionality. Snapshots (undo/redo steps), are written for every editing interaction. Click on the step to revert to that version of the project.

![history-view](./assets/rwa-creator-history-view.png)

/// caption
**History View**: List of snapshots (undo/redo steps)
///


## Snapshots

The snapshots themselves are versions of the project files, stored in the `undo` folder of the project. When copying the project to an iPhone, make sure to ***not*** include this folder, as every snapshot will show up as an individual game in the [RWA Player]. When exporting the game, this undo folder will be automatically removed (see [Transferring Projects]).

## Deleted audio files

If the [Map View] toolbar option :rwa-trashassets: *On asset delete: remove referenced files* is active, deleting an asset moves its referenced file (audio or pd patch) into a session trash inside the project's `tmp` folder. Reverting to a snapshot that still contains the asset moves the file back into the `assets` folder automatically (noted in the [Log View]). The session trash lives only as long as the undo history: on quit, or when another project is opened, its contents are moved to the system trash.

[Map View]: ./map-view.md
[Log View]: ./log-view.md
[RWA Player]: ../rwa-player/games-view.md
[Transferring Projects]: ../creating-soundwalks/transferring-projects.md
