<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Gallery;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'url'
    ];

    public function gallery() {
        return $this->belongsTo(Gallery::class);
    }
}
