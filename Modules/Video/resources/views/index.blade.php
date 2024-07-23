<!-- Modules/Video/Resources/views/index.blade.php -->
@extends('video::layouts.master')

@section('content')
<div class="container">
  <h1>Videos</h1>
  @if (session('status'))
  <div class="alert alert-success">
    {{ session('status') }}
  </div>
  @endif
  <a href="{{ route('video.create') }}">Upload New Video</a>
</div>
@endsection