<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Http\Requests\StoreMessageRequest;
use App\Http\Requests\UpdateMessageRequest;
use App\Http\Services\ReCaptchaService;
use Exception;
use Illuminate\Http\Request;

class MessageController extends BasicController
{
    public $model = Message::class;

    public function beforeSave(Request $request): array
    {
        if ($request->has('city_zip') && !$request->has('zip')) {
            $request->merge(['zip' => $request->city_zip]);
        }
        if ($request->has('extra_services') && is_array($request->extra_services)) {
            $request->merge(['extra_services' => implode(', ', $request->extra_services)]);
        }

        // Validación de reCAPTCHA para evitar bots si se envía captcha
        if ($request->has('captcha')) {
            if (empty($request->captcha) || !ReCaptchaService::verify($request->captcha)) {
                throw new Exception('Captcha inválido. Por favor, verifica que no eres un robot.');
            }
        }

        // Validación de mínimo 9 números en WhatsApp / teléfono
        $phoneDigits = preg_replace('/\D/', '', $request->phone ?? '');
        if (strlen($phoneDigits) < 9) {
            throw new Exception('El número de WhatsApp debe tener como mínimo 9 números.');
        }

        $messages = [
            'name.required' => 'The name is required.',
            'email.required' => 'The email is required.',
            'email.email' => 'The email must be a valid email address.',
            'phone.required' => 'The phone number is required.',
            'phone.min' => 'El número de WhatsApp debe tener como mínimo 9 números.',
            'description.required' => 'The message is required.'
        ];

        // Validación de los datos
        $validatedData = $request->validate([
            'company' => 'nullable|string',
            'name' => 'required|string',
            'email' => 'required|email|max:320',
            'phone' => 'required|string|min:9',
            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'zip' => 'nullable|string',
            'property_type' => 'nullable|string',
            'business_type' => 'nullable|string',
            'sqft' => 'nullable|string',
            'floors' => 'nullable|string',
            'rooms' => 'nullable|string',
            'bathrooms' => 'nullable|string',
            'frequency' => 'nullable|string',
            'pets' => 'nullable|string',
            'has_pets' => 'nullable|string',
            'pet_type' => 'nullable|string',
            'pet_count' => 'nullable|string',
            'pet_details' => 'nullable|string',
            'cleaning_type' => 'nullable|string',
            'move_type' => 'nullable|string',
            'service_mode' => 'nullable|string',
            'rental_frequency' => 'nullable|string',
            'is_empty' => 'nullable|string',
            'work_type' => 'nullable|string',
            'residue_level' => 'nullable|string',
            'project_category' => 'nullable|string',
            'current_stage' => 'nullable|string',
            'operational_window' => 'nullable|string',
            'extra_services' => 'nullable|string',
            'access_method' => 'nullable|string',
            'date' => 'nullable|string',
            'preferred_time' => 'nullable|string',
            'service_id' => 'nullable|string',
            'facility_id' => 'nullable|string',
            'subject' => 'nullable|string',
            'description' => 'required|string',
            'utm_source' => 'nullable|string',
            'utm_medium' => 'nullable|string',
            'utm_campaign' => 'nullable|string',
            'utm_term' => 'nullable|string',
            'utm_content' => 'nullable|string',
        ], $messages);

        return $validatedData;
    }

    public function afterSave(Request $request, object $jpa, bool $isNew)
    {
        $jpa->load('service', 'facility');
        MailingController::notifyContact($jpa);
    }
}
