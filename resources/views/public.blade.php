@php
$component = Route::currentRouteName();
@endphp


<!DOCTYPE html>
<html lang="es">

<head>
    {{-- Google Tag Manager --}}
    @if(!empty($gtmId))
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','{{ $gtmId }}');</script>
    @endif

    {{-- Google Analytics (GA4) --}}
    @if(!empty($gaId))
    <script async src="https://www.googletagmanager.com/gtag/js?id={{ $gaId }}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '{{ $gaId }}');
    </script>
    @endif

    {{-- Facebook Pixel --}}
    @if(!empty($facebookPixel))
    <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '{{ $facebookPixel }}');
    fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id={{ $facebookPixel }}&ev=PageView&noscript=1"/></noscript>
    @endif

    {{-- TikTok Pixel --}}
    @if(!empty($tiktokPixel))
    <script>
    !function (w, d, t) {
      w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=d.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=d.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
      ttq.load('{{ $tiktokPixel }}');
      ttq.page();
    }(window, document, 'ttq');
    </script>
    @endif






    @viteReactRefresh
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ $seoTitle ?? env('APP_NAME') }}</title>

    <meta name="description" content="{{ $seoDescription ?? '' }}" />
    <meta name="keywords" content="{{ $seoKeywords ?? '' }}" />
    <meta name="author" content="{{ $companyName ?? env('APP_NAME') }}">
    <meta name="robots" content="index, follow">

    {{-- Verification --}}
    @if(!empty($googleVerification))
    <meta name="google-site-verification" content="{{ $googleVerification }}" />
    @endif
    @if(!empty($bingVerification))
    <meta name="msvalidate.01" content="{{ $bingVerification }}" />
    @endif

    {{-- Open Graph --}}
    <meta property="og:title" content="{{ $seoTitle ?? env('APP_NAME') }}" />
    <meta property="og:description" content="{{ $seoDescription ?? '' }}" />
    <meta property="og:image" content="{{ $ogImageDefault ?? asset('assets/img/logo.png') }}" />
    <meta property="og:url" content="{{ url()->current() }}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="{{ $companyName ?? env('APP_NAME') }}" />

    {{-- Twitter --}}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $seoTitle ?? env('APP_NAME') }}">
    <meta name="twitter:description" content="{{ $seoDescription ?? '' }}">
    <meta name="twitter:image" content="{{ $ogImageDefault ?? asset('assets/img/logo.png') }}">
    @if(!empty($twitterSite))
    <meta name="twitter:site" content="{{ $twitterSite }}">
    @endif

    <link rel="canonical" href="{{ url()->current() }}">
    <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml">
    <link rel="shortcut icon" href="/assets/img/favicon.png" type="image/png">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    {{-- JSON-LD Schema --}}
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "{{ $companyName }}",
      "description": "{{ $companyDescription }}",
      "url": "{{ $companyUrl }}",
      "logo": "{{ $companyLogo }}",
      "image": "{{ $ogImageDefault }}",
      "telephone": "{{ $companyPhone }}",
      "email": "{{ $companyEmail }}",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "{{ $companyAddress }}",
        "addressLocality": "{{ $companyLocality }}",
        "addressRegion": "{{ $companyRegion }}",
        "addressCountry": "{{ $companyCountry }}"
      },
      "sameAs": [
        "{{ $facebookPage }}",
        "{{ $instagramProfile }}",
        "{{ $linkedinProfile }}"
      ]
    }
    </script>

    <link href="/lte/assets/css/icons.min.css" rel="stylesheet" type="text/css" />

    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Quicksand:wght@300;400;500;600;700&display=swap"
        rel="stylesheet">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />


    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">

    <!-- Añadido para traducir -->
    <script>
        function loadGoogleTranslate() {
            new google.translate.TranslateElement({
                pageLanguage: 'es',
                includedLanguages: 'es,en',
                autoDisplay: false
            }, 'google_translate_element');
        }
    </script>
    <script src="https://translate.google.com/translate_a/element.js?cb=loadGoogleTranslate"></script>

    <style>
        * {
            font-family: 'Quicksand', sans-serif;
            box-sizing: border-box;
        }
    </style>

    @if ($component == 'Checkout.jsx')
    <script type="application/javascript" src="https://checkout.culqi.com/js/v4"></script>
    @elseif ($component == 'MyAccount.jsx')
    <link href="/lte/assets/libs/dxdatagrid/css/dx.light.compact.css?v=06d3ebc8-645c-4d80-a600-c9652743c425"
        rel="stylesheet" type="text/css" id="dg-default-stylesheet" />
    <link href="/lte/assets/libs/dxdatagrid/css/dx.dark.compact.css?v=06d3ebc8-645c-4d80-a600-c9652743c425"
        rel="stylesheet" type="text/css" id="dg-dark-stylesheet" disabled="disabled" />
    @endif

    @vite(['resources/css/app.css', 'resources/js/' . Route::currentRouteName()])
    @inertiaHead

    <link href="/lte/assets/libs/quill/quill.snow.css" rel="stylesheet" type="text/css" />
    <link href="/lte/assets/libs/quill/quill.bubble.css" rel="stylesheet" type="text/css" />
    <style>
        .ql-editor blockquote {
            border-left: 4px solid #f8b62c;
            padding-left: 16px;
        }

        .ql-editor * {
            color: #475569;
        }

        .ql-editor img {
            border-radius: 8px;
        }
    </style>

 
  
    <!-- End Meta Pixel Code -->
    <link rel="stylesheet" href="/assets/fonts/aspekta/font-face.css" />

    {!! $headScripts !!}
</head>
<style>
    body {
        /*background-image: url('/assets/img/maqueta/Blog.png');*/
        width: 100%;
        height: auto;
        background-size: 100% auto;
        background-repeat: no-repeat;
        /* Asegura que la imagen no se repita */
        background-position: top center;
        /* Centra la imagen en la parte superior */
        overflow-x: hidden;
    }
</style>

<body class="antialiased overflow-x-hidden">
    {!! $bodyScripts !!}
    {{-- Google Tag Manager (noscript) --}}
    @if(!empty($gtmId))
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id={{ $gtmId }}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    @endif
    @inertia

    <script src="/lte/assets/js/vendor.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/flowbite@2.4.1/dist/flowbite.min.js"></script>
    <script src="/lte/assets/libs/moment/min/moment.min.js"></script>
    <script src="/lte/assets/libs/moment/moment-timezone.js"></script>
    <script src="/lte/assets/libs/moment/locale/es.js"></script>
    <script src="/lte/assets/libs/quill/quill.min.js"></script>

    @if ($component == 'MyAccount.jsx')
    <script src="/lte/assets/libs/dxdatagrid/js/dx.all.js"></script>
    <script src="/lte/assets/libs/dxdatagrid/js/localization/dx.messages.es.js"></script>
    <script src="/lte/assets/libs/dxdatagrid/js/localization/dx.messages.en.js"></script>
    @endif

    <script src="/lte/assets/libs/tippy.js/tippy.all.min.js"></script>

    <script>
        (function() {
            function getUTMParams() {
                const urlParams = new URLSearchParams(window.location.search);
                const utms = {};
                ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
                    const value = urlParams.get(param);
                    if (value) utms[param] = value;
                });
                return utms;
            }

            const utms = getUTMParams();
            if (Object.keys(utms).length > 0) {
                // Store in sessionStorage to persist across page navigations in the same session
                Object.keys(utms).forEach(key => {
                    sessionStorage.setItem(key, utms[key]);
                });
            }

            // Track visit once per session
            if (!sessionStorage.getItem('visit_tracked')) {
                const storedUtms = {};
                ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(key => {
                    const val = sessionStorage.getItem(key);
                    if (val) storedUtms[key] = val;
                });

                fetch('/api/track-visit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    },
                    body: JSON.stringify({
                        url: window.location.href,
                        ...storedUtms
                    })
                })
                .then(res => {
                    if (res.ok) sessionStorage.setItem('visit_tracked', 'true');
                })
                .catch(err => console.error('Tracking error:', err));
            }
        })();

        document.addEventListener('click', function(event) {
            const target = event.target;

            if (target.tagName === 'BUTTON' && target.hasAttribute('href')) {
                const href = target.getAttribute('href');

                if (target.getAttribute('target') === '_blank') {
                    window.open(href, '_blank');
                } else {
                    window.location.href = href;
                }
            }
        });
    </script>
</body>

</html>