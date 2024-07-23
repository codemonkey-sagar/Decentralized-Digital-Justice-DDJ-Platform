<!-- Modules/Video/Resources/views/create.blade.php -->
@extends('video::layouts.master')

@section('content')
<div class="container">
  <h1>Upload Video</h1>
  <form action="{{ route('video.store') }}" method="POST" enctype="multipart/form-data">
    @csrf
    <div>
      <label for="video">Choose Video:</label>
      <input type="file" id="video" name="video" accept="video/*" required>
    </div>
    <button type="submit">Upload</button>
  </form>
</div>
@endsection