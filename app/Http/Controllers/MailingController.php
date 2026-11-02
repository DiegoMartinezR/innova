<?php

namespace App\Http\Controllers;

use App\Helpers\EmailConfig;
use App\Models\General;
use App\Models\Message;

use App\Models\Ordenes;
use App\Models\Social;
use App\Models\User;
use SoDe\Extend\File;
use SoDe\Extend\JSON;
use SoDe\Extend\Text;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Log;

class MailingController extends BasicController
{
    public $model = 'Mailing';
    static function notifyContact(object $jpa)
    {
        try {
            $general = General::where('correlative', 'email_template')->first();
            $template = $general ? $general->description : null;

            $generals = General::all();
            $corporativeEmail = $generals->where('correlative', 'email_corporative')->first()->description ?? null;

            $data = [
                'company' => $jpa->company,
                'name' => $jpa->name,
                'lastname_father' => $jpa->lastname_father ?? '',
                'lastname_mother' => $jpa->lastname_mother ?? '',
                'email' => $jpa->email,
                'number' => $jpa->number ?? $jpa->phone ?? '',
                'address' => $jpa->address,
                'city' => $jpa->city,
                'zip' => $jpa->zip,
                'property_type' => $jpa->property_type,
                'business_type' => $jpa->business_type,
                'sqft' => $jpa->sqft,
                'floors' => $jpa->floors,
                'rooms' => $jpa->rooms,
                'bathrooms' => $jpa->bathrooms,
                'frequency' => $jpa->frequency,
                'pets' => $jpa->pets,
                'has_pets' => $jpa->has_pets,
                'pet_type' => $jpa->pet_type,
                'pet_count' => $jpa->pet_count,
                'pet_details' => $jpa->pet_details,
                'cleaning_type' => $jpa->cleaning_type,
                'move_type' => $jpa->move_type,
                'service_mode' => $jpa->service_mode,
                'rental_frequency' => $jpa->rental_frequency,
                'is_empty' => $jpa->is_empty,
                'work_type' => $jpa->work_type,
                'residue_level' => $jpa->residue_level,
                'project_category' => $jpa->project_category,
                'current_stage' => $jpa->current_stage,
                'operational_window' => $jpa->operational_window,
                'extra_services' => $jpa->extra_services,
                'access_method' => $jpa->access_method,
                'date' => $jpa->date,
                'time' => $jpa->time ?? $jpa->preferred_time ?? '',
                'service_title' => $jpa->service ? $jpa->service->title : 'General',
                'facility_title' => $jpa->facility ? $jpa->facility->title : 'N/A',
                'description' => $jpa->description,
                'domain' => env('APP_DOMAIN'),
                'support_phone' => $generals->where('correlative', 'support_phone')->first()->description ?? '',
                'support_email' => $generals->where('correlative', 'support_email')->first()->description ?? '',
                'address_contact' => $generals->where('correlative', 'address')->first()->description ?? '',
            ];


            if ($template) {
                $m = new \Mustache\Engine(['entity_flags' => ENT_QUOTES]);
                $content = $m->render($template, $data);
            } else {
                $content = View::make('mailing.contact', ['contact' => $jpa->toArray(), 'domain' => env('APP_DOMAIN')])->render();
            }

            $mail = EmailConfig::config();
            $mail->Subject = $jpa->subject ?? '¡Gracias por contactar con Quiroinnova!';
            $mail->isHTML(true);
            $mail->Body = $content;
            $mail->addAddress($jpa->email, $jpa->name);
            $mail->send();

            if ($corporativeEmail) {
                $serviceName = $jpa->service ? $jpa->service->title : 'Consulta General';
                $adminMail = EmailConfig::config();
                $adminMail->Subject = $jpa->subject ?? "Nueva cita: {$serviceName} - {$jpa->name}";
                $adminMail->isHTML(true);
                $adminMail->Body = $content;
                $adminMail->addAddress($corporativeEmail, 'Quiroinnova Admin');
                $adminMail->send();
            }
        } catch (\Throwable $th) {
            Log::error('Error enviando correo de contacto: ' . $th->getMessage(), [
                'exception' => $th,
                'data' => $jpa->toArray()
            ]);
            if (\env('APP_ENV') == 'local') {
                dump($th->getMessage());
            }
        }
    }


    static function simpleNotify(string $view, string $email, array $data, array $ccs = [])
    {
        try {

            $socials = Social::where('visible', true)->where('status', true)->get();
            $data =  \array_merge(
                ['socials' => $socials->toArray()],
                $data
            );
            $content = View::make($view, $data)->render();

            $mail = EmailConfig::config();
            $mail->Subject = $data['title'] ?? 'Hola que tal?';
            $mail->isHTML(true);
            $mail->Body = $content;
            $mail->addAddress($email);
            foreach ($ccs as $cc) {
                $mail->addCC($cc);
            }
            $mail->send();
        } catch (\Throwable $th) {
            Log::error('Error en simpleNotify: ' . $th->getMessage(), [
                'exception' => $th,
                'email' => $email,
                'data' => $data
            ]);
            if (\env('APP_ENV') == 'local') {
                dump($th->getMessage());
            }
        }
    }
}
