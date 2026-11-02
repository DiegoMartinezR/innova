<?php

namespace App\Providers;

use App\Models\Sale;
use App\Models\User;
use App\Observers\SaleCreationObserver;
use App\Observers\SaleStatusObserver;
use App\Observers\UserNameObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {

        Sale::observe([
            SaleCreationObserver::class,
            SaleStatusObserver::class,
        ]);
        User::observe(UserNameObserver::class);

        \Illuminate\Support\Facades\View::composer('public', function ($view) {
            try {
                $langId = app()->bound('current_lang_id') ? app('current_lang_id') : 1; 
                $generals = \App\Models\General::where('lang_id', $langId)->pluck('description', 'correlative');
                
                $view->with('seoTitle', $generals['seo_title'] ?? env('APP_NAME'));
                $view->with('seoDescription', $generals['seo_description'] ?? '');
                $view->with('seoKeywords', $generals['seo_keywords'] ?? '');
                
                // Advanced SEO
                $view->with('companyName', $generals['company_name'] ?? env('APP_NAME'));
                $view->with('companyDescription', $generals['company_description'] ?? '');
                $view->with('companyLogo', $generals['company_logo'] ?? asset('assets/img/logo.png'));
                $view->with('companyUrl', $generals['company_url'] ?? url('/'));
                $view->with('companyLocality', $generals['company_locality'] ?? '');
                $view->with('companyRegion', $generals['company_region'] ?? '');
                $view->with('companyCountry', $generals['company_country'] ?? 'PE');
                $view->with('companyAddress', $generals['company_address'] ?? $generals['address'] ?? '');
                $view->with('companyPhone', $generals['company_phone'] ?? $generals['support_phone'] ?? '');
                $view->with('companyEmail', $generals['company_email'] ?? $generals['support_email'] ?? '');
                
                // Socials
                $view->with('twitterSite', $generals['twitter_site'] ?? '');
                $view->with('facebookPage', $generals['facebook_page'] ?? '');
                $view->with('instagramProfile', $generals['instagram_profile'] ?? '');
                $view->with('linkedinProfile', $generals['linkedin_profile'] ?? '');
                
                // Verification
                $view->with('googleVerification', $generals['google_site_verification'] ?? '');
                $view->with('bingVerification', $generals['bing_site_verification'] ?? '');
                $view->with('ogImageDefault', $generals['og_image_default'] ?? asset('assets/img/logo.png'));

                // Pixels
                $view->with('facebookPixel', $generals['facebook_pixel'] ?? '');
                $view->with('gtmId', $generals['google_tag_manager'] ?? '');
                $view->with('gaId', $generals['google_analytics'] ?? '');
                $view->with('tiktokPixel', $generals['tiktok_pixel'] ?? '');
                
                // Custom Scripts
                $view->with('headScripts', $generals['head_scripts'] ?? '');
                $view->with('bodyScripts', $generals['body_scripts'] ?? '');

            } catch (\Throwable $th) {
                $view->with('seoTitle', env('APP_NAME'));
                $view->with('seoDescription', '');
                $view->with('seoKeywords', '');
            }
        });
    }
}
