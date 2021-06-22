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
    public function index(Request $request) {
        $skip = $request->input('skip');
        $take = $request->input('take');

        if ($skip == 0) {
            $galleries = Gallery::getAll();

            return [
                'galleries' => $galleries->skip($skip)->take($take),
                'total' => $galleries->count()
            ];
        }

        return Gallery::getAll()->skip($skip)->take($take);
    }

    public function indexUser(Request $request, $id) {
        $skip = $request->input('skip');
        $take = $request->input('take');

        if ($skip == 0) {
            $galleries = Gallery::getUser($id);

            return [
                'galleries' => $galleries->skip($skip)->take($take),
                'total' => $galleries->count()
            ];
        }

        return Gallery::getUser($id)->skip($skip)->take($take);
    }

    public function search(Request $request) {
        $skip = $request->input('skip');
        $take = $request->input('take');
        $query = '%'.$request->input('query').'%';

        if ($skip == 0) {
            $galleries = Gallery::search($query);

            return [
                'galleries' => $galleries->take($take),
                'total' => $galleries->count()
            ];
        }

        return Gallery::search($query)->skip($skip)->take($take);
    }

    public function searchUser(Request $request) {
        $skip = $request->input('skip');
        $take = $request->input('take');
        $query = '%'.$request->input('query').'%';
        $user_id = $request->input('user_id');

        if ($skip == 0) {
            $galleries = Gallery::searchUser($user_id, $query);

            return [
                'galleries' => $galleries->take($take),
                'total' => $galleries->count()
            ];
        }

        return Gallery::searchUser($user_id, $query)->skip($skip)->take($take);
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
        return Gallery::with(['images', 'user', 'comments']);
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
