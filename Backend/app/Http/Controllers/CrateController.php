<?php

namespace App\Http\Controllers;

use App\Models\Crate;
use App\Models\User;
use App\Models\Wallet;
use App\Models\Payment;
use App\Models\UserCrate;
use App\Models\Equipment;
use App\Models\CrateEquipment;
use App\Models\Inventory;
use App\Models\CrateRarity;
use Illuminate\Http\Request;
use Validator;

class CrateController extends Controller
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
            'crates' => Crate::all()
        ], 200);
    }

    public function count()
    {
        return response()->json([
            'success' => true,
            'crates' => count(Crate::all())
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
            'name' => 'required|string|between:2,255|unique:crates',
            'faction' => 'required|integer|gt:0',
            'level' => 'required|integer|gt:0',
            'quantity' => 'required|integer|gt:0',
            'price' => 'required|numeric|gt:0',
            'rarity' => 'required|array|min:1',
            'rarity.*' => 'required|integer|gt:0',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $validated = $validator->validated();
        $crate = Crate::create([
            'name' => $validated['name'],
            'faction_id' => $validated['faction'],
            'level' => $validated['level'],
            'quantity' => $validated['quantity'],
            'price' => $validated['price'],
        ]);

        foreach($validated['rarity'] as $rarity) {
            CrateRarity::create([
                'crate_id' => $crate->id,
                'rarity_id' => $rarity
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Crate successfully has been registered',
            'crate' => $crate
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Crate  $crate
     * @return \Illuminate\Http\Response
     */
    public function show(Crate $crate)
    {
        return response()->json([
            'success' => true,
            'crate' => $crate,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Crate  $crate
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Crate $crate)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer|gt:0',
            'name' => 'required|string|between:2,255',
            'faction' => 'required|integer|gt:0',
            'level' => 'required|integer|gt:0',
            'quantity' => 'required|integer|gt:0',
            'price' => 'required|numeric|gt:0',
            'rarity' => 'required|array|min:1',
            'rarity.*' => 'required|integer|gt:0',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $validated = $validator->validated();
        $crate = Crate::where('id', $validated['id'])->firstOrFail();
        $crate->update([
            'name' => $validated['name'],
            'faction_id' => $validated['faction'],
            'level' => $validated['level'],
            'quantity' => $validated['quantity'],
            'price' => $validated['price'],
        ]);

        $crate_rarities = CrateRarity::where('crate_id', $crate->id)->get();        
        foreach($crate_rarities as $crate_rarity) {
            $crate_rarity->delete();
        }

        foreach($validated['rarity'] as $rarity) {
            CrateRarity::create([
                'crate_id' => $crate->id,
                'rarity_id' => $rarity
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Crate successfully has been updated',
            'crate' => $crate
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Crate  $crate
     * @return \Illuminate\Http\Response
     */
    public function destroy(Crate $crate)
    {
        $crate->delete();

        return response()->json([
            'success' => true,
            'msg' => 'Crate has been deleted'
        ], 201);
    }

    /**
     * Buy crate from user
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function buy(Request $request) 
    {
        $validator = Validator::make($request->all(), [
            'crate_id' => 'required|integer|gt:0',
            'address' => 'required|string',
            'amount' => 'required|numeric|gt:0|between:0,99.99',
            'unit' => 'required|string|between:3,4',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $validated = $validator->validated();

        $user = auth()->user();
        $crate = Crate::find($validated['crate_id']);
        $wallet = Wallet::where('address', $validated['address'])->firstOrFail();
        $amount = floatval($validated['amount']);
        $unit = strval($validated['unit']);

        // Store payment history
        $payment = Payment::create([
            'user_id' => $user->id,
            'wallet_id' => $wallet->id,
            'amount' => $amount,
            'unit' => $unit
        ]);

        // Store UserCrate
        $user_crate = UserCrate::create([
            'user_id' => $user->id,
            'crate_id' => $crate->id,
            'payment_id' => $payment->id,
        ]);

        // distribute objects included in the crate
        $objects = array();
        foreach($crate->rarities as $rarity) {
            $objects = array_merge($objects, Equipment::where('rarity_id', $rarity->id)->where('assigned', false)->get()->toArray());
        }        

        $keys = array_rand($objects, $crate->quantity);

        $result = array();

        foreach($keys as $key) {            
            $equipment = Equipment::find($objects[$key]['id']);
            
            // Update equipment assigned flag to true
            $equipment->assigned = true;
            $equipment->save();

            // Store CrateEquipment
            $crate_equipment = CrateEquipment::create([
                'crate_id' => $crate->id,
                'equipment_id' => $equipment->id,
            ]);

            // Store Inventory
            $inventory = Inventory::create([
                'user_id' => $user->id,
                'equipment_id' => $equipment->id,
            ]);

            $result[] = $equipment->id;
        }

        return response()->json([
            'success' => true,
            'message' => 'Objects successfully has been distributed',
            'objects' => $result
        ], 201);
    }
}
