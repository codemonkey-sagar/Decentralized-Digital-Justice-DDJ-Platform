<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('job_listings', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Job title
            $table->text('description'); // Job description
            $table->string('company'); // Company name
            $table->string('location'); // Job location
            $table->decimal('salary', 8, 2)->nullable(); // Salary
            $table->string('type'); // Job type (e.g., full-time, part-time)
            $table->string('contact_email'); // Contact email
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_listings');
    }
};
