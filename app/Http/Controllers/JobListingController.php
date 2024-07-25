<?php

namespace App\Http\Controllers;

use App\Models\JobListing;
use Illuminate\Http\Request;

class JobListingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jobListings = JobListing::all();
        return view('job_listings.index', compact('jobListings'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('job_listings.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'company' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'salary' => 'nullable|numeric',
            'type' => 'required|string|max:50',
            'contact_email' => 'required|email|max:255',
        ]);

        $jobListing = new JobListing();
        $jobListing->title = $request->input('title');
        $jobListing->description = $request->input('description');
        $jobListing->company = $request->input('company');
        $jobListing->location = $request->input('location');
        $jobListing->salary = $request->input('salary');
        $jobListing->type = $request->input('type');
        $jobListing->contact_email = $request->input('contact_email');
        $jobListing->save();

        return redirect()->route('job_listings.index')->with('success', 'Job listing created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(JobListing $jobListing)
    {
        return view('job_listings.show', compact('jobListing'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JobListing $jobListing)
    {
        return view('job_listings.edit', compact('jobListing'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, JobListing $jobListing)
    {
        // Validate the request data
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'company' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'salary' => 'nullable|numeric',
            'type' => 'required|string|max:50',
            'contact_email' => 'required|email|max:255',
        ]);

        $jobListing->title = $request->input('title');
        $jobListing->description = $request->input('description');
        $jobListing->company = $request->input('company');
        $jobListing->location = $request->input('location');
        $jobListing->salary = $request->input('salary');
        $jobListing->type = $request->input('type');
        $jobListing->contact_email = $request->input('contact_email');
        $jobListing->save();

        return redirect()->route('job_listings.index')->with('success', 'Job listing updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobListing $jobListing)
    {
        $jobListing->delete();
        return redirect()->route('job_listings.index')->with('success', 'Job listing deleted successfully!');
    }
}
