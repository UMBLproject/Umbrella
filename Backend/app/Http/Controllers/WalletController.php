<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Wallet;
use App\Models\UserWallet;
use Validator;

class WalletController extends Controller
{
    public function connect(Request $request) {
        $validator = Validator::make($request->all(), [
            'wallet' => 'required|string|between:2,255',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $validated = $validator->validated();

        $wallet = Wallet::firstOrCreate([
            'address' => $validated['wallet']
        ]);

        $user_wallets = UserWallet::where('wallet_id', $wallet->id)->where('user_id', '!=', auth()->user()->id)->get();
        if(count($user_wallets)) {
            return response()->json([
                'success' => false,
                'message' => 'Wallet was registered by other user',
                'wallet' => $wallet
            ], 201);

        }

        // Set active flag to false for all of previous user wallet
        UserWallet::where('user_id', auth()->user()->id)->where('wallet_id', '!=', $wallet->id)->update([
            'active' => false
        ]);

        // Set active flag to true for current user wallet
        $user_wallet = UserWallet::where('user_id', auth()->user()->id)->where('wallet_id', $wallet->id)->first();
        if(is_null($user_wallet)) {
            $user_wallet = UserWallet::create([
                'user_id' => auth()->user()->id,
                'wallet_id' => $wallet->id,
                'active' => true
            ]);
        } else {
            $user_wallet->update([
                'active' => true
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Wallet successfully has been connected',
            'wallet' => $wallet
        ], 201);
    }
}
