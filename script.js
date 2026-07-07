const video = document.getElementById('video');

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
    faceapi.nets.faceExpressionNet.loadFromUri('./models')
]).then(startVideo).catch(err => console.error('Model load failed:', err))

function startVideo() {
    const getUserMedia = navigator.mediaDevices?.getUserMedia?.bind(navigator.mediaDevices) || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia

    if (!getUserMedia) {
        return console.error('Browser does not support getUserMedia')
    }

    getUserMedia({ video: true })
        .then(stream => video.srcObject = stream)
        .catch(err => console.error('Webcam access failed:', err))
}

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.getElementById('video-container').append(canvas)
    const displaySize = {
        width: video.videoWidth || video.offsetWidth || video.clientWidth,
        height: video.videoHeight || video.offsetHeight || video.clientHeight
    }
    if (!displaySize.width || !displaySize.height) {
        const rect = video.getBoundingClientRect()
        displaySize.width = rect.width
        displaySize.height = rect.height
    }
    faceapi.matchDimensions(canvas, displaySize)
    // console.log('Video is playing');
    setInterval(async () => {

        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()

        // const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        // console.log(detections);
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    }, 100)
})

// startVideo();