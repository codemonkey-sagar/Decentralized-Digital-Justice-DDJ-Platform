const preview = document.getElementById("preview") as HTMLVideoElement;
const recording = document.getElementById("recording") as HTMLVideoElement;
const startButton = document.getElementById("startButton") as HTMLButtonElement;
const stopButton = document.getElementById("stopButton") as HTMLButtonElement;
const downloadButton = document.getElementById("downloadButton") as HTMLButtonElement;
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

                downloadButton.disabled = false;
                downloadButton.dataset.blobUrl = URL.createObjectURL(blob); // Store the blob URL for later use
                showToast('Video recording stopped.');
            };

            mediaRecorder.start();
            preview.classList.add('recording');
            startButton.disabled = true;
            stopButton.disabled = false;
            stopButton.style.backgroundColor = "#dc3545"; // Set enabled color
            downloadButton.disabled = true;
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

function downloadContent(videoBlob: Blob) {
    // Create a temporary link element
    const tempLink = document.createElement("a");
    document.body.appendChild(tempLink);
    
    // Download video file
    const videoUrl = URL.createObjectURL(videoBlob);
    tempLink.href = videoUrl;
    tempLink.download = "recorded_video.webm";
    tempLink.click();
    URL.revokeObjectURL(videoUrl);

    // Download questions file
    const questionsBlob = new Blob([JSON.stringify(shuffledQuestions, null, 2)], { type: 'application/json' });
    const questionsUrl = URL.createObjectURL(questionsBlob);
    tempLink.href = questionsUrl;
    tempLink.download = "recorded_questions.json";
    tempLink.click();
    URL.revokeObjectURL(questionsUrl);

    // Clean up the temporary link
    document.body.removeChild(tempLink);
}

downloadButton.addEventListener('click', () => {
    const blobUrl = downloadButton.dataset.blobUrl;
    fetch(blobUrl)
        .then(response => response.blob())
        .then(blob => {
            downloadContent(blob);
            showToast('Video and questions downloaded.');
        })
        .catch(error => console.error('Error downloading video:', error));
}, false);

startButton.addEventListener('click', () => {
    startRecording();
    stopButton.disabled = false;
}, false);

stopButton.addEventListener('click', () => stopRecording(), false);
