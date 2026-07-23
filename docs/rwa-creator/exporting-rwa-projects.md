# Transferring Projects

There are two ways to get a project from *RWA Creator* onto the iPhone running *RWA Player*:

- **Over WiFi**, using the *Sharing Server* built into *RWA Creator*, no cable required.
- **Manually**, by exporting the project to disk and copying it to the device over a USB connection.

## Transfer projects over WiFi

*RWA Creator* contains a small file server that *RWA Player* can download games from. Instead of exporting the
project and transferring it by cable, both devices talk to each other over the local network.

### Requirements

- The iPhone (running *RWA Player*) and the laptop (running *RWA Creator*) are in the **same WiFi network**.
  The personal hotspot of your iPhone works well for this, e.g. when you are out in the field.
- You know the **IP address of the laptop** running *RWA Creator*.

### Steps

1. In *RWA Creator*, activate :rwa-syncwithclients: *Toggle Fileserver* in the [Map View](./map-view.md#toggle-fileserver)
   toolbar. The server now serves the exported projects to the local network.
2. Navigate to *File > Export to Sharing Server*. This bundles your project into a `.zip` file and stores it in
   the folder specified as *Sharing Server Path* in *File > File Path Preferences*.
   ![File Path Preferences Window](./assets/export-file-path.png)
3. On the iPhone, open the *Settings* tab of *RWA Player* and enter the **IP address** of the laptop running
   *RWA Creator*.
4. Switch to the [Games View](../rwa-player/games-view.md) and tap **Fetch Games**. All games offered by the
   Sharing Server are transferred to the phone and appear in the list.

!!! warning "Fetching replaces all games on the phone"
    **All games already on the phone are deleted before the new ones are loaded.** Whatever the Sharing Server
    offers at that moment is what you end up with on the device.

!!! tip "Keep the server folder tidy"
    Every export adds another `.zip` file to the *Export Games Path* folder, and every one of them is transferred
    on each fetch. Clean out projects you no longer need, otherwise transfers become unnecessarily slow.

## Manually transfer via USB

On the main manu, navigate *File > Export for manual transfer* (to be renamed).

![Export for XCode Client Project](./assets/export-tool-bar.png){width=66.66%}

Your project will be saved to the *Export Games Path* path specified in *File > File Path Preferences*.

![File Path Preferences Window](./assets/export-file-path.png)

Your saved project is a folder containing the .rwa project as well as its corresponding *assets* folder.

![Saved Exported Files](./assets/export-saved-files.png)

This folder and its contents are the only items that you will have to copy to *RWA Player* in order to experience your RWA project as a GPS-based soundwalk. [Copy this folder to your iPhone](../faq.md#how-to-copy-a-game-to-the-iphone)

In our section about [RWA Player](../rwa-player), you will find all the necessary information to navigate the *RWA player* mobile app and its integration with the *RWA Creator* software.
