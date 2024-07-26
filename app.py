"""
Freeze Flask app into GitHub Pages
https://github.com/AshrithSagar/frozen-flask-gh-pages
"""

from os import path
from pathlib import Path

from flask import Flask, render_template, url_for
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


@app.template_filter("link_url")
def link_url(endpoint, **values):
    url = url_for(endpoint, **values)
    if url.endswith("/index.html"):
        url = url[:-10]
    return url


@app.template_filter("static_dir")
def static_dir(filename):
    return url_for("static", filename=filename)


@app.cli.command()
def freeze():
    freezer.freeze()


@app.cli.command()
def serve():
    freezer.run()


@app.route("/")
def index():
    return render_template("pages/index.html")


@app.route("/<path:page>/")
def pages(page):
    return render_template(str(Path("pages") / (page.lower() + ".html")))


if __name__ == "__main__":
    port = 8080
    freezer.freeze()  # Freeze the app into FREEZER_DESTINATION
    # freezer.serve(port=port)  # Serve the app locally from FREEZER_DESTINATION

    # freezer.run(port=port)  # Choose for URL checking
    app.run(port=port, debug=True)  # Choose to run locally from Flask
