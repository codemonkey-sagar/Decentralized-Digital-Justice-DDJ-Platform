<!-- resources/views/layouts/master.blade.php -->
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Home</title>
  <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
</head>

<body>
  @include('layouts.header')
  @include('layouts.nav')

  <main>
    @yield('content')
  </main>

  @include('layouts.footer')

</body>

</html>