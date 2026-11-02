<?php

namespace Database\Seeders;

use App\Models\General;
use Illuminate\Database\Seeder;

class EmailTemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $template = <<<'HTML'
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f0f2f5; margin: 0; padding: 0;">
    <tr>
        <td align="center" style="padding: 30px 0;">
            <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 20px; overflow: hidden; border-collapse: separate;">
                <!-- Header -->
                <tr>
                    <td align="center" style="background-color: #1b3f90; padding: 30px 30px 20px;">
                        <img src="https://azamora.mundoweb.pe/assets/img/logo.png" alt="Azamora Cleaning Services" width="200" style="display: block; margin: 0 auto;">
                        <h1 style="color: #ffffff; margin: 10px 0 0; font-family: 'Segoe UI', Arial, sans-serif; font-weight: 400; font-size: 24px;">Cleaning Services</h1>
                    </td>
                </tr>
                <!-- Body -->
                <tr>
                    <td style="padding: 40px 35px; font-family: 'Segoe UI', Arial, sans-serif; color: #2c3e50;">
                        <h2 style="color: #1b3f90; font-size: 28px; font-weight: 600; margin: 0 0 10px 0;">Hello, {{ name }}!</h2>
                        <p style="font-size: 18px; color: #4a5568; margin: 0 0 25px 0;">Thank you for reaching out to us. We have received your request and our team will contact you <span style="color: #b8cf38; font-weight: 600;">within the next 24 hours</span>.</p>
                        <hr style="border: none; border-top: 2px solid #e9eef2; margin: 30px 0;">
                        <h3 style="color: #1b3f90; font-size: 20px; font-weight: 600; margin: 0 0 20px 0;">Request details</h3>
                        
                        <!-- Details Container -->
                        <div style="background-color: #f9fafc; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">
                            {{#service_title}}
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                                <tr>
                                    <td width="38%" style="padding: 14px 18px; font-weight: 600; color: #1b3f90; background-color: #f1f5f9; border-bottom: 1px solid #e2e8f0; font-family: 'Segoe UI', Arial, sans-serif;">Service requested</td>
                                    <td style="padding: 14px 18px; color: #1e293b; background-color: #ffffff; border-bottom: 1px solid #e2e8f0; font-family: 'Segoe UI', Arial, sans-serif;">{{ service_title }}</td>
                                </tr>
                            </table>
                            {{/service_title}}
                            {{#email}}
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                                <tr>
                                    <td width="38%" style="padding: 14px 18px; font-weight: 600; color: #1b3f90; background-color: #f1f5f9; border-bottom: 1px solid #e2e8f0; font-family: 'Segoe UI', Arial, sans-serif;">Email address</td>
                                    <td style="padding: 14px 18px; color: #1e293b; background-color: #ffffff; border-bottom: 1px solid #e2e8f0; font-family: 'Segoe UI', Arial, sans-serif;">{{ email }}</td>
                                </tr>
                            </table>
                            {{/email}}
                            {{#company}}
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                                <tr>
                                    <td width="38%" style="padding: 14px 18px; font-weight: 600; color: #1b3f90; background-color: #f1f5f9; border-bottom: 1px solid #e2e8f0; font-family: 'Segoe UI', Arial, sans-serif;">Company</td>
                                    <td style="padding: 14px 18px; color: #1e293b; background-color: #ffffff; border-bottom: 1px solid #e2e8f0; font-family: 'Segoe UI', Arial, sans-serif;">{{ company }}</td>
                                </tr>
                            </table>
                            {{/company}}
                            {{#number}}
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                                <tr>
                                    <td width="38%" style="padding: 14px 18px; font-weight: 600; color: #1b3f90; background-color: #f1f5f9; border-bottom: 1px solid #e2e8f0; font-family: 'Segoe UI', Arial, sans-serif;">Phone number</td>
                                    <td style="padding: 14px 18px; color: #1e293b; background-color: #ffffff; border-bottom: 1px solid #e2e8f0; font-family: 'Segoe UI', Arial, sans-serif;">{{ number }}</td>
                                </tr>
                            </table>
                            {{/number}}
                            {{#date}}
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                                <tr>
                                    <td width="38%" style="padding: 14px 18px; font-weight: 600; color: #1b3f90; background-color: #f1f5f9; border-bottom: 1px solid #e2e8f0; font-family: 'Segoe UI', Arial, sans-serif;">Requested date</td>
                                    <td style="padding: 14px 18px; color: #1e293b; background-color: #ffffff; border-bottom: 1px solid #e2e8f0; font-family: 'Segoe UI', Arial, sans-serif;">{{ date }}</td>
                                </tr>
                            </table>
                            {{/date}}
                            {{#time}}
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                                <tr>
                                    <td width="38%" style="padding: 14px 18px; font-weight: 600; color: #1b3f90; background-color: #f1f5f9; border-bottom: 1px solid #e2e8f0; font-family: 'Segoe UI', Arial, sans-serif;">Requested time</td>
                                    <td style="padding: 14px 18px; color: #1e293b; background-color: #ffffff; border-bottom: 1px solid #e2e8f0; font-family: 'Segoe UI', Arial, sans-serif;">{{ time }}</td>
                                </tr>
                            </table>
                            {{/time}}
                            {{#property_type}}
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                                <tr>
                                    <td width="38%" style="padding: 14px 18px; font-weight: 600; color: #1b3f90; background-color: #f1f5f9; border-bottom: 1px solid #e2e8f0; font-family: 'Segoe UI', Arial, sans-serif;">Property type</td>
                                    <td style="padding: 14px 18px; color: #1e293b; background-color: #ffffff; border-bottom: 1px solid #e2e8f0; font-family: 'Segoe UI', Arial, sans-serif;">{{ property_type }}</td>
                                </tr>
                            </table>
                            {{/property_type}}
                            {{#sqft}}
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                                <tr>
                                    <td width="38%" style="padding: 14px 18px; font-weight: 600; color: #1b3f90; background-color: #f1f5f9; border-bottom: 1px solid #e2e8f0; font-family: 'Segoe UI', Arial, sans-serif;">Area (sq ft)</td>
                                    <td style="padding: 14px 18px; color: #1e293b; background-color: #ffffff; border-bottom: 1px solid #e2e8f0; font-family: 'Segoe UI', Arial, sans-serif;">{{ sqft }} ft²</td>
                                </tr>
                            </table>
                            {{/sqft}}
                            {{#floors}}
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                                <tr>
                                    <td width="38%" style="padding: 14px 18px; font-weight: 600; color: #1b3f90; background-color: #f1f5f9; border-bottom: 1px solid #e2e8f0; font-family: 'Segoe UI', Arial, sans-serif;">Number of floors</td>
                                    <td style="padding: 14px 18px; color: #1e293b; background-color: #ffffff; border-bottom: 1px solid #e2e8f0; font-family: 'Segoe UI', Arial, sans-serif;">{{ floors }}</td>
                                </tr>
                            </table>
                            {{/floors}}
                            {{#frequency}}
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                                <tr>
                                    <td width="38%" style="padding: 14px 18px; font-weight: 600; color: #1b3f90; background-color: #f1f5f9; border-bottom: 1px solid #e2e8f0; font-family: 'Segoe UI', Arial, sans-serif;">Service frequency</td>
                                    <td style="padding: 14px 18px; color: #1e293b; background-color: #ffffff; border-bottom: 1px solid #e2e8f0; font-family: 'Segoe UI', Arial, sans-serif;">{{ frequency }}</td>
                                </tr>
                            </table>
                            {{/frequency}}
                            {{#pets}}
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                                <tr>
                                    <td width="38%" style="padding: 14px 18px; font-weight: 600; color: #1b3f90; background-color: #f1f5f9; border-bottom: 1px solid #e2e8f0; font-family: 'Segoe UI', Arial, sans-serif;">Pets on premises</td>
                                    <td style="padding: 14px 18px; color: #1e293b; background-color: #ffffff; border-bottom: 1px solid #e2e8f0; font-family: 'Segoe UI', Arial, sans-serif;">{{ pets }}</td>
                                </tr>
                            </table>
                            {{/pets}}
                            {{#address}}
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                                <tr>
                                    <td width="38%" style="padding: 14px 18px; font-weight: 600; color: #1b3f90; background-color: #f1f5f9; border-bottom: 1px solid #e2e8f0; font-family: 'Segoe UI', Arial, sans-serif;">Full address</td>
                                    <td style="padding: 14px 18px; color: #1e293b; background-color: #ffffff; border-bottom: 1px solid #e2e8f0; font-family: 'Segoe UI', Arial, sans-serif;">
                                        {{ address }}<br>
                                        {{ city }} {{ zip }}
                                    </td>
                                </tr>
                            </table>
                            {{/address}}
                        </div>

                        {{#description}}
                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 30px; background-color: #f0f7ff; border-left: 6px solid #b8cf38; border-radius: 12px; border-collapse: separate;">
                            <tr>
                                <td style="padding: 20px 25px; font-family: 'Segoe UI', Arial, sans-serif;">
                                    <strong style="color: #1b3f90; font-size: 16px; display: block; margin-bottom: 10px; text-transform: uppercase;">Additional comments</strong>
                                    <p style="margin: 0; font-size: 16px; color: #2d3748;">{{ description }}</p>
                                </td>
                            </tr>
                        </table>
                        {{/description}}

                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 35px;">
                            <tr>
                                <td align="center" style="font-family: 'Segoe UI', Arial, sans-serif; color: #5f6b7a;">
                                    <p style="margin: 0;">If you need to modify any details, feel free to reply directly to this email.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <!-- Footer -->
                <tr>
                    <td align="center" style="background-color: #f8fafc; padding: 25px; border-top: 1px solid #e2e8f0; font-family: 'Segoe UI', Arial, sans-serif; font-size: 14px; color: #5f6b7a;">
                        <p style="margin: 5px 0;">© 2026 Azamora Cleaning Services. All rights reserved.</p>
                        <p style="margin: 5px 0;">
                            {{#support_email}}
                            <a href="mailto:{{ support_email }}" style="color: #1b3f90; text-decoration: none; font-weight: 500;">Email us</a> |
                            {{/support_email}}
                            {{#support_phone}}
                            <a href="tel:{{ support_phone }}" style="color: #1b3f90; text-decoration: none; font-weight: 500;">Call us</a>
                            {{/support_phone}}
                        </p>
                        {{#address_contact}}
                        <p style="font-size: 12px; margin: 15px 0 0 0;">{{ address_contact }}</p>
                        {{/address_contact}}
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
HTML;



        General::updateOrCreate([
            'correlative' => 'email_template',
        ], [
            'name' => 'Booking Email Template',
            'description' => $template,
        ]);
    }
}
