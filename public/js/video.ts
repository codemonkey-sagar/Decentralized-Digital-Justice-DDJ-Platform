const preview = document.getElementById("preview") as HTMLVideoElement;
const recording = document.getElementById("recording") as HTMLVideoElement;
const startButton = document.getElementById("startButton") as HTMLButtonElement;
const stopButton = document.getElementById("stopButton") as HTMLButtonElement;
const downloadButton = document.getElementById("downloadButton") as HTMLAnchorElement;
const downloadQuestionsButton = document.getElementById("downloadQuestionsButton") as HTMLAnchorElement;
const saveButton = document.getElementById("saveButton") as HTMLButtonElement;
const toast = document.getElementById("toast") as HTMLDivElement;
const questionsContainer = document.getElementById("questions") as HTMLDivElement;

let mediaRecorder: MediaRecorder;
let recordedChunks: BlobPart[] = [];
let stream: MediaStream;
let shuffledQuestions: string[] = [];

const questions = [
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

function showToast(message: string) {
    toast.textContent = message;
    toast.className = "toast show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
}

function shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestions() {
    shuffledQuestions = [...questions];
    shuffleArray(shuffledQuestions);
    questionsContainer.innerHTML = "";
    shuffledQuestions.forEach(question => {
        const p = document.createElement("p");
        p.textContent = question;
        p.style.animation = "slideIn 0.5s forwards";
        questionsContainer.appendChild(p);
    });
}

function startRecording() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(mediaStream => {
            stream = mediaStream;
            preview.srcObject = stream;
            mediaRecorder = new MediaRecorder(stream);
            recordedChunks = [];

            mediaRecorder.ondataavailable = (event: BlobEvent) => {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(recordedChunks, { type: 'video/webm' });
                recording.src = URL.createObjectURL(blob);
                downloadButton.href = recording.src;
                downloadButton.download = "RecordedVideo.webm";

                // Create a blob for the questions and set the download link
                const questionsBlob = new Blob([JSON.stringify(shuffledQuestions, null, 2)], { type: 'application/json' });
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
        .catch(error => {
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
    stream.getTracks().forEach(track => track.stop());
}

function saveVideo(blob: Blob) {
    const formData = new FormData();
    const videoFile = new File([blob], "recorded_video.webm", { type: "video/webm" });
    formData.append('videoFile', videoFile);

    // Convert shuffledQuestions array to a JSON Blob and append it to the form data
    const questionsBlob = new Blob([JSON.stringify(shuffledQuestions)], { type: 'application/json' });
    const questionsFile = new File([questionsBlob], "recorded_questions.json", { type: 'application/json' });
    formData.append('questionsFile', questionsFile);

    fetch('/video/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.error('Error uploading video:', error));
}

startButton.addEventListener('click', () => {
    startRecording();
    stopButton.disabled = false;
}, false);
stopButton.addEventListener('click', () => stopRecording(), false);
saveButton.addEventListener('click', () => {
    const blobUrl = saveButton.dataset.blobUrl;
    fetch(blobUrl)
        .then(response => response.blob())
        .then(blob => {
            saveVideo(blob);
            showToast('Video saved.');
        })
        .catch(error => console.error('Error saving video:', error));
}, false);
const preview = document.getElementById("preview") as HTMLVideoElement;
const recording = document.getElementById("recording") as HTMLVideoElement;
const startButton = document.getElementById("startButton") as HTMLButtonElement;
const stopButton = document.getElementById("stopButton") as HTMLButtonElement;
const downloadButton = document.getElementById("downloadButton") as HTMLAnchorElement;
const downloadQuestionsButton = document.getElementById("downloadQuestionsButton") as HTMLAnchorElement;
const saveButton = document.getElementById("saveButton") as HTMLButtonElement;
const toast = document.getElementById("toast") as HTMLDivElement;
const questionsContainer = document.getElementById("questions") as HTMLDivElement;

let mediaRecorder: MediaRecorder;
let recordedChunks: BlobPart[] = [];
let stream: MediaStream;
let shuffledQuestions: string[] = [];

const questions = [
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

function showToast(message: string) {
    toast.textContent = message;
    toast.className = "toast show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
}

function shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestions() {
    shuffledQuestions = [...questions];
    shuffleArray(shuffledQuestions);
    questionsContainer.innerHTML = "";
    shuffledQuestions.forEach(question => {
        const p = document.createElement("p");
        p.textContent = question;
        p.style.animation = "slideIn 0.5s forwards";
        questionsContainer.appendChild(p);
    });
}

function startRecording() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(mediaStream => {
            stream = mediaStream;
            preview.srcObject = stream;
            mediaRecorder = new MediaRecorder(stream);
            recordedChunks = [];

            mediaRecorder.ondataavailable = (event: BlobEvent) => {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(recordedChunks, { type: 'video/webm' });
                recording.src = URL.createObjectURL(blob);
                downloadButton.href = recording.src;
                downloadButton.download = "RecordedVideo.webm";

                // Create a blob for the questions and set the download link
                const questionsBlob = new Blob([JSON.stringify(shuffledQuestions, null, 2)], { type: 'application/json' });
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
        .catch(error => {
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
    stream.getTracks().forEach(track => track.stop());
}

function saveVideo(blob: Blob) {
    const formData = new FormData();
    const videoFile = new File([blob], "recorded_video.webm", { type: "video/webm" });
    formData.append('videoFile', videoFile);

    // Convert shuffledQuestions array to a JSON Blob and append it to the form data
    const questionsBlob = new Blob([JSON.stringify(shuffledQuestions)], { type: 'application/json' });
    const questionsFile = new File([questionsBlob], "recorded_questions.json", { type: 'application/json' });
    formData.append('questionsFile', questionsFile);

    fetch('/video/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.error('Error uploading video:', error));
}

startButton.addEventListener('click', () => {
    startRecording();
    stopButton.disabled = false;
}, false);
stopButton.addEventListener('click', () => stopRecording(), false);
saveButton.addEventListener('click', () => {
    const blobUrl = saveButton.dataset.blobUrl;
    fetch(blobUrl)
        .then(response => response.blob())
        .then(blob => {
            saveVideo(blob);
            showToast('Video saved.');
        })
        .catch(error => console.error('Error saving video:', error));
}, false);
