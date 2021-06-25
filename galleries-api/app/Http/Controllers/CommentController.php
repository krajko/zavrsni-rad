<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Comment;
use App\Http\Requests\CreateCommentRequest;

class CommentController extends Controller
{
    public function store(CreateCommentRequest $request) {
        $data = $request->validated();
        $data['user_id'] = auth('api')->user()->id;
        $comment = Comment::create($data);

        return Comment::with('user')->findOrFail($comment['id']);
    }

    public function destroy($id) {
        return Comment::destroy($id);
    }
}
