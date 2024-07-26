"""
Freeze Flask app into GitHub Pages
https://github.com/AshrithSagar/frozen-flask-gh-pages
"""

from os import path
from pathlib import Path

from flask import Flask, render_template
from flask_frozen import Freezer

template_folder = path.abspath("./wiki")

app = Flask(__name__, template_folder=template_folder)
# Enter your GitHub Pages URL here instead of frozen-flask-gh-pages
app.config["FREEZER_BASE_URL"] = "https://docs/"

# As configured in GitHub Pages Settings
app.config["FREEZER_DESTINATION"] = "docs"

app.config["FREEZER_RELATIVE_URLS"] = True
app.config["FREEZER_IGNORE_MIMETYPE_WARNINGS"] = True
app.config["FREEZER_DESTINATION_IGNORE"] = [
    ".nojekyll",
    "static/assets/",
]  # For GitHub Pages
freezer = Freezer(app)


@app.cli.command()
def freeze():
    freezer.freeze()


@app.cli.command()
def serve():
    freezer.run()


@app.route("/")
def index():
    return render_template("pages/index.html")


@app.route("/<page>")
def pages(page):
    return render_template(str(Path("pages") / (page.lower() + ".html")))


# Main Function, Runs at http://0.0.0.0:8080
if __name__ == "__main__":
    freezer.freeze()  # Freeze the app into FREEZER_DESTINATION
    # freezer.serve()  # Serve the app locally from FREEZER_DESTINATION

    # freezer.run()  # Choose for URL checking
    app.run(port=8080, debug=True)  # Choose to run locally from Flask
