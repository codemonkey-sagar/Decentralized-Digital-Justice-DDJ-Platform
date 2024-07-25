<div class="container">
  <h1>Job Listings</h1>
  <a href="{{ route('job_listings.create') }}" class="btn btn-primary">Create New Job Listing</a>
  @if(session('success'))
  <div class="alert alert-success mt-4">
    {{ session('success') }}
  </div>
  @endif
  <table class="table table-striped mt-4">
    <thead>
      <tr>
        <th>Title</th>
        <th>Company</th>
        <th>Location</th>
        <th>Type</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      @foreach($jobListings as $jobListing)
      <tr>
        <td>{{ $jobListing->title }}</td>
        <td>{{ $jobListing->company }}</td>
        <td>{{ $jobListing->location }}</td>
        <td>{{ $jobListing->type }}</td>
        <td>
          <a href="{{ route('job_listings.show', $jobListing->id) }}" class="btn btn-info">View</a>
          <a href="{{ route('job_listings.edit', $jobListing->id) }}" class="btn btn-warning">Edit</a>
          <form action="{{ route('job_listings.destroy', $jobListing->id) }}" method="POST" style="display:inline-block;">
            @csrf
            @method('DELETE')
            <button type="submit" class="btn btn-danger">Delete</button>
          </form>
        </td>
      </tr>
      @endforeach
    </tbody>
  </table>
</div>