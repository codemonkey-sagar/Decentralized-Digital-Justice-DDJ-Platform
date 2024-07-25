<?php

namespace Modules\Video\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Video\Database\Factories\VidFactory;

class Vid extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [];

    protected static function newFactory(): VidFactory
    {
        //return VidFactory::new();
    }
}
