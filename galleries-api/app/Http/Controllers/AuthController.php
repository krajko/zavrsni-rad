<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;
use App\Models\User;

class AuthController extends Controller
{
    public function register(RegisterRequest $request) {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);

        $user = User::create($data);
        $token = auth('api')->login($user);

        return [
            'token' => $token,
            'user' => $user
        ];
    }

    public function login(Request $request) {
        $credentials = $request->only(['email', 'password']);
        $token = auth('api')->attempt($credentials);

        if (!$token) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return response()->json([
            'token' => $token,
            'user' => auth('api')->user()
        ]);
    }

    public function me() {
        return auth('api')->user();
    }

    public function logout() {
        auth('api')->logout();

        return response()->json(['message' => 'Successfully logged out.']);
    }

    public function refresh() {
        return auth('api')->refresh();
    }
}
