#!/bin/bash

set -eu

error() {
    local msg="$1"

    echo $msg >&2
    exit 1
}

abspath() {
    local path="$1"

    # Check path is not empty
    [ -z "$path" ] && error "Path is empty"

    # Check path exist's
    [ -e "$path" ] || error "Path doesn't exit: $path"

    # Check path is a directory
    [ -d "$path" ] || error "Path is not a directory: $path"

    cd "$path"
    pwd -P
}

resize() {
    local file="$1" size="$2" path="$3"

    mogrify \
        -path "$path" \
        -filter Triangle \
        -define filter:support=2 \
        -thumbnail "$size" \
        -unsharp 0.25x0.08+8.3+0.045 \
        -dither None \
        -posterize 136 \
        -quality 82 \
        -define jpeg:fancy-upsampling=off \
        -define png:compression-filter=5 \
        -define png:compression-level=9 \
        -define png:compression-strategy=1 \
        -define png:exclude-chunk=all \
        -interlace none \
        -colorspace sRGB \
        "$file"
}

SRC_PATH=$(abspath "${1:-}")
DST_PATH=$(abspath "${2:-}")
MAX_SIZE=${3:-}

# Check binaries
which magick &>/dev/null || error "You need to install ImageMagick"
which mogrify &>/dev/null || error "You need to install ImageMagick"

# Check source and destionation is not the same
[ "$SRC_PATH" != "$DST_PATH" ] || error "Source and dest. path can't be the same"

# Check we set max size or use default
[ -z "$MAX_SIZE" ] && MAX_SIZE="1000"

# Find all the images
for file in $(find "$SRC_PATH" -type f -name *.jpg); do

    # Create the destination directory
    dir=$(dirname $file)
    dst_dir=$DST_PATH${dir##$SRC_PATH}
    mkdir -p $dst_dir

    # Get the size in pixels
    size=$(magick identify -format "%w:%h" "$file")
    width=${size%%:*}
    height=${size##*:}

    # Check if this is already correct size
    # or if it's portrait or landscape
    if [ "$width" -lt "$MAX_SIZE" -a "$height" -lt "$MAX_SIZE" ]; then
        echo "SKIP: $file ($width x $height)"
        cp -f "$file" "$dst_dir"
    elif [ "$width" -gt "$height" ]; then
        echo "$file ($width x $height portrait)"
        resize "$file" "$MAX_SIZE" "$dst_dir"
    else
        echo "$file ($width x $height landscape)"
        resize "$file" "x$MAX_SIZE" "$dst_dir"
    fi
done
