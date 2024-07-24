var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var preview = document.getElementById("preview");
var recording = document.getElementById("recording");
var startButton = document.getElementById("startButton");
var stopButton = document.getElementById("stopButton");
var downloadButton = document.getElementById("downloadButton");
var downloadQuestionsButton = document.getElementById("downloadQuestionsButton");
var saveButton = document.getElementById("saveButton");
var toast = document.getElementById("toast");
var questionsContainer = document.getElementById("questions");
var mediaRecorder;
var recordedChunks = [];
var stream;
var shuffledQuestions = [];
var questions = [
    "1. What is your name?",
    "2. How old are you?",
    "3. What is your favorite color?",
    "4. What is your hobby?",
    "5. What is your profession?",
    "6. Where do you live?",
    "7. What is your favorite food?",
    "8. What is your favorite movie?",
    "9. What is your favorite book?",
    "10. What is your favorite sport?"
];
function showToast(message) {
    toast.textContent = message;
    toast.className = "toast show";
    setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 3000);
}
function shuffleArray(array) {
    var _a;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
    }
}
function displayQuestions() {
    shuffledQuestions = __spreadArray([], questions, true);
    shuffleArray(shuffledQuestions);
    questionsContainer.innerHTML = "";
    shuffledQuestions.forEach(function (question) {
        var p = document.createElement("p");
        p.textContent = question;
        p.style.animation = "slideIn 0.5s forwards";
        questionsContainer.appendChild(p);
    });
}
function startRecording() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(function (mediaStream) {
        stream = mediaStream;
        preview.srcObject = stream;
        mediaRecorder = new MediaRecorder(stream);
        recordedChunks = [];
        mediaRecorder.ondataavailable = function (event) {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };
        mediaRecorder.onstop = function () {
            var blob = new Blob(recordedChunks, { type: 'video/webm' });
            recording.src = URL.createObjectURL(blob);
            downloadButton.href = recording.src;
            downloadButton.download = "RecordedVideo.webm";
            // Create a blob for the questions and set the download link
            var questionsBlob = new Blob([JSON.stringify(shuffledQuestions, null, 2)], { type: 'application/json' });
            downloadQuestionsButton.href = URL.createObjectURL(questionsBlob);
            downloadQuestionsButton.download = "RecordedQuestions.json";
            saveButton.disabled = false;
            saveButton.dataset.blobUrl = URL.createObjectURL(blob); // Store the blob URL for later use
            showToast('Video recording stopped.');
        };
        mediaRecorder.start();
        preview.classList.add('recording');
        startButton.disabled = true;
        stopButton.disabled = false;
        stopButton.style.backgroundColor = "#dc3545"; // Set enabled color
        saveButton.disabled = true;
        showToast('Video recording started.');
        displayQuestions();
    })
        .catch(function (error) {
        console.error('Error accessing media devices.', error);
        showToast('Error accessing media devices.');
    });
}
function stopRecording() {
    mediaRecorder.stop();
    preview.classList.remove('recording');
    startButton.disabled = false;
    stopButton.disabled = true;
    stopButton.style.backgroundColor = "#6c757d"; // Set disabled color
    stream.getTracks().forEach(function (track) { return track.stop(); });
}
function saveVideo(blob) {
    var formData = new FormData();
    var videoFile = new File([blob], "recorded_video.webm", { type: "video/webm" });
    formData.append('videoFile', videoFile);
    // Convert shuffledQuestions array to a JSON Blob and append it to the form data
    var questionsBlob = new Blob([JSON.stringify(shuffledQuestions)], { type: 'application/json' });
    var questionsFile = new File([questionsBlob], "recorded_questions.json", { type: 'application/json' });
    formData.append('questionsFile', questionsFile);
    fetch('/video/upload', {
        method: 'POST',
        body: formData,
    })
        .then(function (response) { return response.text(); })
        .then(function (result) { return console.log(result); })
        .catch(function (error) { return console.error('Error uploading video:', error); });
}
startButton.addEventListener('click', function () {
    startRecording();
    stopButton.disabled = false;
}, false);
stopButton.addEventListener('click', function () { return stopRecording(); }, false);
saveButton.addEventListener('click', function () {
    var blobUrl = saveButton.dataset.blobUrl;
    fetch(blobUrl)
        .then(function (response) { return response.blob(); })
        .then(function (blob) {
        saveVideo(blob);
        showToast('Video saved.');
    })
        .catch(function (error) { return console.error('Error saving video:', error); });
}, false);
