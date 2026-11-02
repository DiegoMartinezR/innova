<?php

namespace App\Http\Controllers;

use App\Jobs\SendSaleWhatsApp;
use App\Models\Sale;
use App\Models\General;
use App\Models\Social;
use Illuminate\Http\Request;

class ThankController extends BasicController
{
    public $reactView = 'Thanks';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $langId = app('current_lang_id');
        return [
            'generals' => General::where('lang_id', $langId)->get(),
            'socials' => Social::where('status', true)->get(),
        ];
    }
}
