<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\User;
use App\Models\Image;
use App\Models\Comment;

class Gallery extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'user_id'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function images() {
        return $this->hasMany(Image::class)->latest();
    }

    public function preview() {
        return $this->hasOne(Image::class)->oldest();
    }

    public function comments() {
        return $this->hasMany(Comment::class)->latest();
    }
}
