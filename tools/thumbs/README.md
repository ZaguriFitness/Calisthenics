Exercise pictures (media/th/*.webp): the peak pose of each exercise on the 3D anatomy model.

1. Serve the app on http://localhost:8765 and put three.min.js where thumbs.js expects it (SP path at the top).
2. `node thumbs.js <part> <parts>` for each part (e.g. 0..5 of 6) -> raw PNGs in SP/h/thraw
3. `python3 thpost.py <raw dir> media/th` -> 192px cream-tile webp
4. Put the file names (without .webp) into the TH set in index.html.
An exercise without a picture falls back to its line drawing.
