var constraints = {video: {facingMode: "environment"}, audio: false };

// Define Constants
const cameraView = document.querySelector("#camera--view"),
        cameraOutput = document.querySelector("#camera--output"),
        cameraSensor = document.querySelector("#camera--sensor"),
        cameraTrigger = document.querySelector("#camera--trigger")

// Acces the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices 
        .getUserMedia(constraints)
        .then(function(stream) {
            track=stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("oops. Something is borken.", error);
        });
}

// Take a picture when camera trigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0,0)
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
};

// Start the video stream when the camera loads
window.addEventListener("load", cameraStart, false);


