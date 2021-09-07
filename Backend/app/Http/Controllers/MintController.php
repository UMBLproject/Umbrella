<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;

class MintController extends Controller
{
    public function mint(Request $request) {
        $validator = Validator::make($request->all(), [
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $imageName = time().'.'.$request->thumbnail->extension();  
     
        $request->thumbnail->move(public_path('img'), $imageName);
  
        return response()->json([
            'success' => true,
            'thumbnail' => $imageName
        ], 200);
    }
}
