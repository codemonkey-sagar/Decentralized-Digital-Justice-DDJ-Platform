@extends('video::layouts.master')

@section('content')
<div class="container">
  <header>
    <h1>Video Recorder</h1>
  </header>

  <main class="main-content">
    <div class="column left">
      <button id="startButton" class="button">Start Recording</button>
      <h2>Preview</h2>
      <video id="preview" width="640" height="480" autoplay muted></video>
    </div>
    <div class="column center">
      <button id="stopButton" class="button" disabled>Stop Recording</button>
      <h2>Recording</h2>
      <video id="recording" width="640" height="250" controls></video>
      <div class="download-buttons">
        <a id="downloadButton" class="button" download>Download Video</a>
        <a id="downloadQuestionsButton" class="button" download>Download Questions</a>
      </div>
      <button id="saveButton" class="button" disabled>Save Recording</button>
    </div>
    <div class="column right">
      <h2>Questions</h2>
      <div id="questions" class="questions">
        <p>1. What is your name?</p>
        <p>2. How old are you?</p>
        <p>3. What is your favorite color?</p>
        <p>4. What is your hobby?</p>
        <p>5. What is your profession?</p>
        <p>6. Where do you live?</p>
        <p>7. What is your favorite food?</p>
        <p>8. What is your favorite movie?</p>
        <p>9. What is your favorite book?</p>
        <p>10. What is your favorite sport?</p>
      </div>
    </div>
    <div id="toast" class="toast">Security measure is standard</div>
  </main>
</div>

<script src="{{ asset('js/video.js') }}"></script>
<link rel="stylesheet" href="{{ asset('css/styles.css') }}">
@endsection