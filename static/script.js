const imageInput = document.getElementById("imageInput");

const uploadForm = document.querySelector("form");

const uploadButton = document.querySelector(".upload-btn");

let previewImage = document.createElement("img");

previewImage.id = "previewImage";

previewImage.style.display = "none";

previewImage.style.marginTop = "25px";

previewImage.style.maxWidth = "100%";

previewImage.style.borderRadius = "20px";

previewImage.style.border = "2px solid #00ff66";

previewImage.style.boxShadow = "0 0 20px #00ff66";

document.querySelector(".upload-card").appendChild(previewImage);
imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) {

        previewImage.style.display = "none";

        return;

    }

    const allowed = ["image/jpeg","image/png","image/jpg","image/webp"];

    if (!allowed.includes(file.type)) {

        alert("Please upload JPG, PNG or WEBP image.");

        imageInput.value = "";

        previewImage.style.display = "none";

        return;

    }

    if (file.size > 5 * 1024 * 1024) {

        alert("Image size must be less than 5MB.");

        imageInput.value = "";

        previewImage.style.display = "none";

        return;

    }

    const reader = new FileReader();

    reader.onload = function (e) {

        previewImage.src = e.target.result;

        previewImage.style.display = "block";

    };

    reader.readAsDataURL(file);

});

uploadForm.addEventListener("submit", function () {

    uploadButton.disabled = true;

    uploadButton.innerHTML = "⏳ Generating Caption...";

});

const uploadBox = document.querySelector(".upload-box");

uploadBox.addEventListener("dragover", function (e) {

    e.preventDefault();

    uploadBox.style.borderColor = "#00ff66";

    uploadBox.style.background = "rgba(0,255,102,.15)";

});

uploadBox.addEventListener("dragleave", function () {

    uploadBox.style.background = "transparent";

});

uploadBox.addEventListener("drop", function (e) {

    e.preventDefault();

    uploadBox.style.background = "transparent";

    imageInput.files = e.dataTransfer.files;

    imageInput.dispatchEvent(new Event("change"));

});

window.onload = function () {

    console.log("VisionCaption AI Loaded Successfully.");

};