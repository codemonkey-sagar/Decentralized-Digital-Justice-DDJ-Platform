<div class="container">
  <h1>{{ $jobListing->title }}</h1>
  <p><strong>Company:</strong> {{ $jobListing->company }}</p>
  <p><strong>Location:</strong> {{ $jobListing->location }}</p>
  <p><strong>Type:</strong> {{ $jobListing->type }}</p>
  <p><strong>Salary:</strong> {{ $jobListing->salary ? '$' . $jobListing->salary : 'Not specified' }}</p>
  <p><strong>Contact Email:</strong> {{ $jobListing->contact_email }}</p>
  <p><strong>Description:</strong></p>
  <p>{{ $jobListing->description }}</p>
  <a href="{{ route('job_listings.index') }}" class="btn btn-secondary">Back to Listings</a>
</div>