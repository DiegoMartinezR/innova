<!DOCTYPE html>
<html lang="en">
@php
    $support_phone = $generals->where('correlative', 'support_phone')->first()->description ?? '';
    $support_email = $generals->where('correlative', 'support_email')->first()->description ?? '';
    $address = $generals->where('correlative', 'address')->first()->description ?? '';
    $copyright_notice = $generals->where('correlative', 'copyright_notice')->first()->description ?? ('© ' . date('Y') . ' Azamora Cleaning Services. All rights reserved.');
@endphp

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Azamora - Contact Confirmation</title>
    <style>
        /* Reset and base styles */
        body,
        html {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f0f2f5;
            color: #2c3e50;
            line-height: 1.5;
        }

        /* Main wrapper */
        .email-wrapper {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08), 0 6px 12px rgba(0, 0, 0, 0.05);
        }

        /* Header with logo and primary background */
        .email-header {
            background-color: #1b3f90;
            /* primary */
            padding: 30px 30px 20px;
            text-align: center;
        }

        .email-header img {
            max-width: 200px;
            height: auto;
            margin-bottom: 10px;
        }

        .email-header h1 {
            color: #ffffff;
            margin: 10px 0 0;
            font-weight: 400;
            font-size: 24px;
            letter-spacing: 0.5px;
            opacity: 0.95;
        }

        /* Email body */
        .email-body {
            padding: 40px 35px;
        }

        /* Typography */
        h2 {
            color: #1b3f90;
            /* primary */
            font-size: 28px;
            font-weight: 600;
            margin-top: 0;
            margin-bottom: 10px;
        }

        .greeting {
            font-size: 18px;
            color: #4a5568;
            margin-bottom: 25px;
        }

        .highlight {
            color: #b8cf38;
            /* accent */
            font-weight: 600;
        }

        hr {
            border: none;
            border-top: 2px solid #e9eef2;
            margin: 30px 0;
        }

        h3 {
            color: #1b3f90;
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        h3:before {
            content: '';
            display: inline-block;
            width: 6px;
            height: 24px;
            background-color: #b8cf38;
            /* accent */
            border-radius: 12px;
            margin-right: 10px;
        }

        /* Table styles */
        .details-table {
            width: 100%;
            border-collapse: collapse;
            background-color: #f9fafc;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
        }

        .details-table tr {
            border-bottom: 1px solid #e2e8f0;
        }

        .details-table tr:last-child {
            border-bottom: none;
        }

        .details-table td {
            padding: 14px 18px;
            vertical-align: top;
        }

        .details-table td:first-child {
            width: 38%;
            font-weight: 600;
            color: #1b3f90;
            background-color: #f1f5f9;
            letter-spacing: 0.3px;
        }

        .details-table td:last-child {
            color: #1e293b;
            background-color: #ffffff;
        }

        /* Additional comments */
        .comment-box {
            margin-top: 30px;
            padding: 20px 25px;
            background-color: #f0f7ff;
            border-left: 6px solid #b8cf38;
            /* accent */
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
        }

        .comment-box strong {
            color: #1b3f90;
            font-size: 16px;
            display: block;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .comment-box p {
            margin: 0;
            font-size: 16px;
            color: #2d3748;
        }

        /* Footer */
        .email-footer {
            background-color: #f8fafc;
            padding: 25px;
            text-align: center;
            font-size: 14px;
            color: #5f6b7a;
            border-top: 1px solid #e2e8f0;
        }

        .email-footer p {
            margin: 5px 0;
        }

        .email-footer a {
            color: #1b3f90;
            text-decoration: none;
            font-weight: 500;
        }

        .email-footer a:hover {
            text-decoration: underline;
        }

        /* Responsive */
        @media (max-width: 600px) {
            .email-body {
                padding: 30px 20px;
            }

            .details-table td {
                display: block;
                width: 100% !important;
                box-sizing: border-box;
            }

            .details-table td:first-child {
                background-color: #f1f5f9;
                border-bottom: none;
                padding-bottom: 8px;
            }

            .details-table td:last-child {
                padding-top: 8px;
                border-bottom: 1px solid #e2e8f0;
            }

            .details-table tr:last-child td:last-child {
                border-bottom: none;
            }
        }
    </style>
</head>

<body>
    <div class="email-wrapper">
        <!-- Header with logo -->
        <div class="email-header">
            <img src="https://azamora.mundoweb.pe/assets/img/logo.png" alt="Azamora Cleaning Services" style="display: block; margin: 0 auto;">
            <h1>Cleaning Services</h1>
        </div>

        <!-- Email body -->
        <div class="email-body">
            <h2>Hello, {{ $contact['name'] }}!</h2>
            <p class="greeting">Thank you for reaching out to us. We have received your request and our team will contact you <span class="highlight">within the next 24 hours</span>.</p>

            <hr>

            <h3>Request details</h3>

            <table class="details-table">
                @if(!empty($contact['service']))
                <tr>
                    <td>Service requested</td>
                    <td>{{ $contact['service']['title'] }}</td>
                </tr>
                @endif
                @if(!empty($contact['email']))
                <tr>
                    <td>Email address</td>
                    <td>{{ $contact['email'] }}</td>
                </tr>
                @endif
                @if(!empty($contact['company']))
                <tr>
                    <td>Company</td>
                    <td>{{ $contact['company'] }}</td>
                </tr>
                @endif
                @if(!empty($contact['phone']) || !empty($contact['number']))
                <tr>
                    <td>Phone number</td>
                    <td>{{ $contact['phone'] ?? ($contact['number'] ?? '') }}</td>
                </tr>
                @endif
                @if(!empty($contact['date']))
                <tr>
                    <td>Requested date</td>
                    <td>{{ \Carbon\Carbon::parse($contact['date'])->format('m/d/Y') }}</td>
                </tr>
                @endif
                @if(!empty($contact['time']))
                <tr>
                    <td>Requested time</td>
                    <td>{{ $contact['time'] }}</td>
                </tr>
                @endif
                @if(!empty($contact['property_type']))
                <tr>
                    <td>Property type</td>
                    <td>{{ $contact['property_type'] }}</td>
                </tr>
                @endif
                @if(!empty($contact['sqft']))
                <tr>
                    <td>Area (sq ft)</td>
                    <td>{{ number_format($contact['sqft']) }} ft²</td>
                </tr>
                @endif
                @if(!empty($contact['floors']))
                <tr>
                    <td>Number of floors</td>
                    <td>{{ $contact['floors'] }}</td>
                </tr>
                @endif
                @if(!empty($contact['work_type']))
                <tr>
                    <td>Work type</td>
                    <td>{{ $contact['work_type'] }}</td>
                </tr>
                @endif
                @if(!empty($contact['residue_level']))
                <tr>
                    <td>Residue level</td>
                    <td>{{ $contact['residue_level'] }}</td>
                </tr>
                @endif
                @if(!empty($contact['business_type']))
                <tr>
                    <td>Business type</td>
                    <td>{{ $contact['business_type'] }}</td>
                </tr>
                @endif
                @if(!empty($contact['frequency']))
                <tr>
                    <td>Service frequency</td>
                    <td>{{ $contact['frequency'] }}</td>
                </tr>
                @endif
                @if(!empty($contact['preferred_time']))
                <tr>
                    <td>Preferred schedule</td>
                    <td>{{ $contact['preferred_time'] }}</td>
                </tr>
                @endif
                @if(!empty($contact['pets']))
                <tr>
                    <td>Pets on premises</td>
                    <td>{{ $contact['pets'] }}</td>
                </tr>
                @endif
                @if(!empty($contact['address']) || !empty($contact['city']) || !empty($contact['zip']))
                <tr>
                    <td>Full address</td>
                    <td>
                        {{ $contact['address'] ?? '' }}<br>
                        {{ $contact['city'] ?? '' }} {{ $contact['zip'] ?? '' }}
                    </td>
                </tr>
                @endif
            </table>

            @if(!empty($contact['description']))
            <div class="comment-box">
                <strong>Additional comments</strong>
                <p>{{ $contact['description'] }}</p>
            </div>
            @endif

            <!-- Optional follow-up message -->
            <div style="margin-top: 35px; text-align: center;">
                <p style="color: #5f6b7a;">If you need to modify any details, feel free to reply directly to this email.</p>
            </div>
        </div>

        <!-- Footer -->
        <div class="email-footer">
            <p>{{ $copyright_notice }}</p>
            <p>
                @if($support_email)
                <a href="mailto:{{ $support_email }}">Email us</a> |
                @endif
                @if($support_phone)
                <a href="tel:{{ $support_phone }}">Call us</a>
                @endif
            </p>
            @if($address)
            <p style="font-size: 12px; margin-top: 15px;">{{ $address }}</p>
            @endif
        </div>
    </div>
</body>

</html>