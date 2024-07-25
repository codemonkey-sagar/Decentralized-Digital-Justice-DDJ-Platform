<div class="container">
  <h1>Create Job Listing</h1>
  <form action="{{ route('job_listings.store') }}" method="POST">
    @csrf
    <div class="form-group">
      <label for="title">Job Title</label>
      <input type="text" name="title" class="form-control" required>
    </div>
    <div class="form-group">
      <label for="description">Job Description</label>
      <textarea name="description" class="form-control" required></textarea>
    </div>
    <div class="form-group">
      <label for="company">Company</label>
      <input type="text" name="company" class="form-control" required>
    </div>
    <div class="form-group">
      <label for="location">Location</label>
      <input type="text" name="location" class="form-control" required>
    </div>
    <div class="form-group">
      <label for="salary">Salary</label>
      <input type="number" name="salary" class="form-control">
    </div>
    <div class="form-group">
      <label for="type">Job Type</label>
      <input type="text" name="type" class="form-control" required>
    </div>
    <div class="form-group">
      <label for="contact_email">Contact Email</label>
      <input type="email" name="contact_email" class="form-control" required>
    </div>
    <button type="submit" class="btn btn-success">Create Job Listing</button>
  </form>
</div>