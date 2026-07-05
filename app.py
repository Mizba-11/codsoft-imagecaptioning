from flask import Flask, render_template, request
import os
from utils import generate_caption

app = Flask(__name__)

UPLOAD_FOLDER = "static/uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():

    if "image" not in request.files:
        return render_template(
            "index.html",
            caption="Please upload an image."
        )

    image = request.files["image"]

    if image.filename == "":
        return render_template(
            "index.html",
            caption="No image selected."
        )

    filepath = os.path.join(
        app.config["UPLOAD_FOLDER"],
        image.filename
    )

    image.save(filepath)

    caption = generate_caption(filepath)

    return render_template(
        "index.html",
        image=filepath,
        caption=caption
    )

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)