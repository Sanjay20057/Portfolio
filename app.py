"""
app.py
Minimal local dev server for the static portfolio site.

This does NOT change how the site works — it just serves the existing
HTML/CSS/JS/asset files exactly as they are, so relative links like
"resume.html" and "static/style.css" keep working the same way they
would if you opened the files directly or used `python3 -m http.server`.

Using Flask here (rather than the plain http.server) mainly because it
handles the WebP MIME type and range requests more reliably in some
browsers when the robot-engine.js frame sequences are being fetched.

Run:
    pip install flask
    python3 app.py
Then open:
    http://127.0.0.1:5000/
"""

import os
from flask import Flask, send_from_directory

# Project root = the folder this file lives in
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__, static_folder=None)  # we handle all static serving manually below


@app.route("/")
def home():
    return send_from_directory(ROOT_DIR, "index.html")


@app.route("/<path:filename>")
def serve_file(filename):
    """
    Serves any file in the project root or its subfolders (static/, etc.)
    exactly as requested — covers index.html, resume.html, archive.html,
    certificates.html, case_studies.html, 404.html, and everything under
    static/ (style.css, script.js, robot-engine.js, robot/frames/*.webp,
    images, PDFs, etc.) with no path rewriting.
    """
    full_path = os.path.join(ROOT_DIR, filename)
    if not os.path.isfile(full_path):
        return send_from_directory(ROOT_DIR, "404.html"), 404
    directory = os.path.dirname(full_path) or ROOT_DIR
    file_only = os.path.basename(full_path)
    return send_from_directory(directory, file_only)


@app.errorhandler(404)
def not_found(_e):
    return send_from_directory(ROOT_DIR, "404.html"), 404


if __name__ == "__main__":
    app.run(debug=True, port=5000)