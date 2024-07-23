<?php

namespace Modules\Video\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class VideoController extends Controller
{
    public function index()
    {
        return view('video::index');
    }

    public function create()
    {
        return view('video::create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'video' => 'required|file|mimetypes:video/*|max:102400', // 100MB max size
        ]);

        $video = $request->file('video');
        $path = $video->storeAs('public/videos', $video->getClientOriginalName());

        return redirect()->route('video.index')->with('status', 'Video uploaded successfully!');
    }


    public function show($id)
    {
        // Implement show functionality if needed
        return view('video::show');
    }
}
