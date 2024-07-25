<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Submit Proposal</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.min.css">
</head>

<body>
  <div class="container mt-5">
    <h1>Submit Proposal</h1>

    <form action="{{ route('proposal.store') }}" method="POST">
      @csrf
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" name="title" required>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea class="form-control" id="description" name="description" required></textarea>
      </div>
      <div class="form-group">
        <label for="snapshot_url">Snapshot URL</label>
        <input type="url" class="form-control" id="snapshot_url" name="snapshot_url" required>
      </div>
      <div class="form-group">
        <label for="disclosure_url">Disclosure URL</label>
        <input type="url" class="form-control" id="disclosure_url" name="disclosure_url" required>
      </div>
      <button type="submit" class="btn btn-primary">Submit Proposal</button>
    </form>
  </div>
</body>

</html>