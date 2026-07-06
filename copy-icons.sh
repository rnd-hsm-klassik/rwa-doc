#!/bin/bash

# source directory
SOURCE_DIR="./overrides/.icons/rwa/source"

# destinations (adjust paths accordingly)
DESTINATIONS=(
    "./overrides/.icons/rwa"
    "../rwa-creator/images"
)

# filnames: source:destination pairs
declare -a FILES=(
    "arrow_selector_tool_48dp_434343_FILL1_wght300_GRAD-25_opsz48.svg:arrow.svg"
    "volume_down_40dp_2854C5_FILL0_wght300_GRAD-25_opsz24.svg:audiochannelsource.svg"
    "network_ping_48dp_2854C5_FILL1_wght300_GRAD-25_opsz48.svg:audioreflectionactive.svg"
    "network_ping_48dp_F19E39_FILL1_wght300_GRAD-25_opsz48.svg:audioreflectionpassive.svg"
    "volume_up_48dp_2854C5_FILL1_wght300_GRAD-25_opsz48.svg:audiosource.svg"
    "volume_up_48dp_F19E39_FILL1_wght300_GRAD-25_opsz48-custom.svg:audiosourceselected.svg"
    "hotel_class_48dp_2854C5_FILL1_wght300_GRAD-25_opsz48.svg:audiosourcestartpoint.svg"
    "distance_48dp_2854C5_FILL0_wght300_GRAD-25_opsz48.svg:audiosourcestartpoint1.svg"
    "headphones_48dp_434343_FILL1_wght300_GRAD-25_opsz48.svg:calibrateHeadtrackerButton.svg"
    "delete_forever_48dp_434343_FILL0_wght300_GRAD-25_opsz48.svg:donttrashassets.svg"
    "not_listed_location_48dp_434343_FILL0_wght300_GRAD-25_opsz48.svg:findlocation.svg"
    "flag_48dp_2854C5_FILL1_wght300_GRAD-25_opsz48.svg:flag.svg"
    "podiatry_48dp_434343_FILL1_wght300_GRAD-25_opsz48.svg:headtrackerStepButton.svg"
    "select_48dp_434343_FILL0_wght300_GRAD-25_opsz48.svg:pen.svg"
    "radio_button_unchecked_48dp_434343_FILL0_wght300_GRAD-25_opsz48.svg:radiiVisibleButton.svg"
    "ink_eraser_48dp_434343_FILL0_wght300_GRAD-25_opsz48.svg:rubber.svg"
    "radio_button_unchecked_48dp_8C1AF6_FILL0_wght300_GRAD-25_opsz48.svg:scene.svg"
    "radio_button_checked_48dp_8C1AF6_FILL0_wght300_GRAD-25_opsz48.svg:sceneselected.svg"
    "play_arrow_48dp_9DC384_FILL1_wght300_GRAD-25_opsz48.svg:start.svg"
    "radio_button_unchecked_48dp_434343_FILL0_wght300_GRAD-25_opsz48.svg:state.svg"
    "radio_button_checked_48dp_434343_FILL0_wght300_GRAD-25_opsz48.svg:stateselected.svg"
    "stop_48dp_D16D6A_FILL1_wght300_GRAD-25_opsz48.svg:stop.svg"
    "cell_tower_48dp_434343_FILL1_wght300_GRAD-25_opsz48.svg:syncwithclients.svg"
    "delete_48dp_434343_FILL0_wght300_GRAD-25_opsz48.svg:trashassets.svg"
)

# copy each file to each destination
for file_pair in "${FILES[@]}"; do
    IFS=':' read -r source dest <<< "$file_pair"
    for dest_dir in "${DESTINATIONS[@]}"; do
        cp "$SOURCE_DIR/$source" "$dest_dir/$dest"
    done
done
