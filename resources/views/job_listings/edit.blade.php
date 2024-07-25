@extends('layouts.app')

@section('content')
<div class="container">
  <h1>Edit Job Listing</h1>
  <form action="{{ route('job_listings.update', $jobListing->id) }}" method="POST">
    @csrf
    @method('PUT')
    <div class="form-group">
      <label for="title">Job Title</label>
      <input type="text" name="title" class="form-control" value="{{ $jobListing->title }}" required>
    </div>
    <div class="form-group">
      <label for="description">Job Description</label>
      <textarea name="description" class="form-control" required>{{ $jobListing->description }}</textarea>
    </div>
    <div class="form-group">
      <label for="company">Company</label>
      <input type="text" name="company" class="form-control" value="{{ $jobListing->company }}" required>
    </div>
    <div class="form-group">
      <label for="location">Location</label>
      <input type="text" name="location" class="form-control" value="{{ $jobListing->location }}" required>
    </div>
    <div class="form-group">
      <label for="salary">Salary</label>
      <input type="number" name="salary" class="form-control" value="{{ $jobListing->salary }}">
    </div>
    <div class="form-group">
      <label for="type">Job Type</label>
      <input type="text" name="type" class="form-control" value="{{ $jobListing->type }}" required>
    </div>
    <div class="form-group">
      <label for="contact_email">Contact Email</label>
      <input type="email" name="contact_email" class="form-control" value="{{ $jobListing->contact_email }}" required>
    </div>
    <button type="submit" class="btn btn-success">Update Job Listing</button>
  </form>
</div>
@endsection