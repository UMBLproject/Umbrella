<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use Illuminate\Http\Request;

class EquipmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'success' => true,
            'equipment' => Equipment::all()
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tokenId' => 'required|integer|unique:equipment|gt:0',
            'name' => 'required|string|between:2,255',
            'description' => 'required|string',
            'image' => 'required|string|between:2,255',
            'category_id' => 'required|integer|gt:0',
            'rarity_id' => 'required|integer|gt:0',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $equipment = Equipment::create($validator->validated());

        return response()->json([
            'success' => true,
            'message' => 'Object successfully has been registered',
            'object' => $equipment
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Equipment  $equipment
     * @return \Illuminate\Http\Response
     */
    public function show(Equipment $equipment)
    {
        return response()->json([
            'success' => true,
            'object' => $equipment
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Equipment  $equipment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Equipment $equipment)
    {
        $validator = Validator::make($request->all(), [
            'tokenId' => 'integer|unique:equipment|gt:0',
            'name' => 'string|between:2,255',
            'description' => 'string',
            'image' => 'string|between:2,255',
            'category_id' => 'integer|gt:0',
            'rarity_id' => 'integer|gt:0',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $equipment->update($validator->validated());

        return response()->json([
            'success' => true,
            'message' => 'Object successfully has been updated',
            'object' => $equipment
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Equipment  $equipment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Equipment $equipment)
    {
        $equipment->delete();

        return response()->json([
            'success' => true,
            'msg' => 'Object has been deleted'
        ], 201);
    }

    public function switch(Equipment $equipment) 
    {
        // Check the inventory item's owner
        if($equipment->users->first()->id != auth()->user()->id) {
            return response()->json([
                'success' => false,
                'message' => 'The equipment owner is not current user',
            ], 400);
        }

        // Toggle equipped flag of the inventory item
        $equipment->equipped = !$equipment->equipped;
        $equipment->save();

        return response()->json([
            'success' => true,
            'message' => 'The equipment flag was updated',
            'equipment' => $equipment,
        ], 201);
    }
}
