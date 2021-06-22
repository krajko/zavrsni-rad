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
        'description'
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

    public static function getAll() {
        return Gallery::with(['user', 'preview'])
                      ->latest()
                      ->get();
    }

    public static function getUser($id) {
        return Gallery::where('user_id', $id)
                      ->with('preview')
                      ->latest()
                      ->get();
    }

    public static function search($query) {
        return Gallery::with(['user', 'preview'])
                      ->where('title', 'like', $query)
                      ->orWhere('description', 'like', $query)
                      ->orWhereHas('user', function ($qb) use ($query) {
                          $qb->where('first_name', 'like', $query)
                             ->orWhere('last_name', 'like', $query)
                             ->orWhereRaw('concat(first_name, " ", last_name) like ?', [$query])
                             ->orWhereRaw('concat(last_name, " ", first_name) like ?', [$query]);
                      })
                      ->latest()
                      ->get();
    }

    public static function searchUser($id, $query) {
        return Gallery::where('user_id', $id)
                      ->with('preview')
                      ->where(function ($qb) use ($query) {
                          $qb->where('title', 'like', $query)
                             ->orWhere('description', 'like', $query);
                        })
                      ->latest()
                      ->get();
    }
}
