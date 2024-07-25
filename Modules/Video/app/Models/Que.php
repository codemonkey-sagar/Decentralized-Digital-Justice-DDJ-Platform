<?php

namespace Modules\Video\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Video\Database\Factories\QueFactory;

class Que extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [];

    protected static function newFactory(): QueFactory
    {
        //return QueFactory::new();
    }
}
