<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Gallery;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        return Gallery::with(['user', 'preview'])
                      ->latest('id')
                      ->simplePaginate(10);
    }

    public function search(Request $request) {
        $query = '%'.$request->input('query').'%';

        return Gallery::with(['user', 'preview'])
                      ->where('title', 'like', $query)
                      ->orWhere('description', 'like', $query)
                      ->orWhereHas('user', function ($qb) use ($query) {
                          $qb->where('first_name', 'like', $query)
                             ->orWhere('last_name', 'like', $query)
                             ->orWhereRaw('concat(first_name, " ", last_name) like ?', [$query])
                             ->orWhereRaw('concat(last_name, " ", first_name) like ?', [$query]);
                      })
                      ->simplePaginate(10);
    }

    public function indexUser(Request $request, $id) {
        return Gallery::where('user_id', $id)
                      ->with('preview')
                      ->latest('id')
                      ->paginate(10);
    }

    public function searchUser(Request $request, $id) {
        $query = '%'.$request->input('query').'%';

        return Gallery::where('user_id', $id)
                      ->with('preview')
                      ->where(function ($qb) use ($query) {
                          $qb->where('title', 'like', $query)
                          ->orWhere('description', 'like', $query);
                      })
                      ->paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id) {
        return Gallery::with(['images', 'user'])
                      ->with('comments', function ($qb) {
                          $qb->with('user');
                      })
                      ->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id) {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {
        return Gallery::destroy($id);
    }
}
