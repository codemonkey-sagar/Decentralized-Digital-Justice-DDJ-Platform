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
            'videoFile' => 'required|file|mimetypes:video/*',
            'questionsFile' => 'required|file|mimetypes:application/json',
        ]);

        $video = $request->file('videoFile');
        $questions = $request->file('questionsFile');

        $videoPath = 'videos/' . $video->getClientOriginalName();
        $questionsPath = 'videos/' . $questions->getClientOriginalName();

        // Save the video file and the questions file to the storage/videos directory
        Storage::disk('public')->putFileAs('videos', $video, $video->getClientOriginalName());
        Storage::disk('public')->putFileAs('videos', $questions, $questions->getClientOriginalName());

        return redirect()->route('video.index')->with('status', 'Video and questions uploaded successfully!');
    }

    public function show($id)
    {
        // Implement show functionality if needed
        return view('video::show');
    }
}
