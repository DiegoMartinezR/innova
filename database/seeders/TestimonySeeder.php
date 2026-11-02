<?php

namespace Database\Seeders;

use App\Models\Lang;
use App\Models\Testimony;
use Illuminate\Database\Seeder;

class TestimonySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $lang = Lang::where('is_default', true)->first() ?? Lang::first();
        if (!$lang) return;

        $reviews = [
            [
                'name' => 'Sarah Jenkins',
                'description' => 'Incredible attention to detail. The post-construction cleanup was flawless. They saved us so much time and effort before opening our new office.',
                'rating' => 5,
                'correlative' => 'Google Reviews',
            ],
            [
                'name' => 'Michael T.',
                'description' => 'We switched to Azamora for our corporate building two months ago. The professionalism of their staff is unmatched. Highly recommended.',
                'rating' => 5,
                'correlative' => 'Google Reviews',
            ],
            [
                'name' => 'Emily R.',
                'description' => 'They leave my house spotless every single time. I completely trust them. The team is always punctual and polite.',
                'rating' => 5,
                'correlative' => 'Google Reviews',
            ],
            [
                'name' => 'David Chen',
                'description' => 'Premium service through and through. The manual quoting process felt very personalized, and they delivered exactly what they promised.',
                'rating' => 5,
                'correlative' => 'Google Reviews',
            ],
        ];

        foreach ($reviews as $review) {
            Testimony::updateOrCreate(
                ['name' => $review['name'], 'description' => $review['description']],
                [
                    'rating' => $review['rating'],
                    'correlative' => $review['correlative'],
                    'lang_id' => $lang->id,
                    'visible' => true,
                    'status' => true,
                ]
            );
        }
    }
}
