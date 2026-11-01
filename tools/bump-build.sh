#!/bin/sh
# run before each commit that changes the app: gives the page a new BUILD so phones load the new version
cd "$(dirname "$0")/.." && sed -i "s/^const BUILD=\"[0-9]*\";/const BUILD=\"$(date -u +%Y%m%d%H%M%S)\";/" index.html && grep -n 'BUILD' index.html | head -4
