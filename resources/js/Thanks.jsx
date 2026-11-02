import React, { useState, useEffect, useLayoutEffect } from "react";
import CreateReactScript from "./Utils/CreateReactScript";
import { createRoot } from "react-dom/client";
import Base from "./components/Tailwind/Base";
import { CarritoProvider } from "./context/CarritoContext";
import Footer from "./components/Tailwind/Footer";
import WhatsApp from "./Utils/WhatsApp";
import {
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
    Clock,
    ShieldCheck,
    MapPin,
    Sparkles,
    Menu,
    X,
    ArrowUpRight,
    HeartPulse,
    Calendar,
} from "lucide-react";

const Thanks = ({
    session,
    generals = [],
    socials = [],
    services = [],
    landing = [],
}) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        try {
            history.replaceState(null, "", "/thanks");
            localStorage.removeItem("carrito");
        } catch (e) {}
    }, []);

    useLayoutEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleReturnHome = () => {
        window.location.href = "/";
    };

    return (
        <Base>
            <div className="font-inter bg-[#fcfcfc] overflow-x-hidden selection:bg-[#b4d121] selection:text-[#1a1a1a] text-gray-800">
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');
        .font-title { font-family: 'Raleway', sans-serif; }
        * { font-family: 'Quicksand', sans-serif; }

        @keyframes slideUp { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUpFade {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up-fade {
            animation: slideUpFade 0.3s ease-out forwards;
        }
        @keyframes shimmer { 100% { transform: translateX(100%); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }

        .bg-pattern-dots { background-image: radial-gradient(#96263e 1px, transparent 1px); background-size: 32px 32px; opacity: 0.04; }
        .bg-pattern-grid { background-image: linear-gradient(rgba(150,38,62,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(150,38,62,0.05) 1px, transparent 1px); background-size: 40px 40px; }
                        `,
                    }}
                />

                {/* HEADER NAVBAR IDÉNTICO A HOME.JSX */}
                <header
                    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                        isScrolled
                            ? "bg-white/90 backdrop-blur-lg shadow-sm py-3"
                            : "bg-transparent py-3"
                    }`}
                >
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
                        <div
                            onClick={handleReturnHome}
                            className="flex items-center gap-2 cursor-pointer group"
                        >
                            {isScrolled ? (
                                <img
                                    src="/assets/img/logo.png"
                                    alt="Quiroinnova"
                                    className="transition-all duration-500 w-auto object-contain transform group-hover:scale-105 h-10 md:h-20 drop-shadow-sm"
                                />
                            ) : (
                                <img
                                    src="/assets/img/logo-white.png"
                                    alt="Quiroinnova"
                                    className="transition-all duration-500 w-auto object-contain transform group-hover:scale-105 h-12 md:h-20 drop-shadow-sm"
                                />
                            )}
                        </div>

                        <nav className="hidden md:flex items-center gap-8 bg-white/5 px-6 py-2 rounded-full border border-white/10 backdrop-blur-sm">
                            {[
                                { name: "Inicio", href: "/" },
                                { name: "Servicios", href: "/#servicios" },
                                { name: "Señales", href: "/#señales" },
                                {
                                    name: "Profesionales",
                                    href: "/#profesionales",
                                },
                            ].map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={`text-sm font-semibold tracking-wide transition-colors ${
                                        isScrolled
                                            ? "text-gray-600 hover:text-[#96263e]"
                                            : "text-gray-100 hover:text-[#b4d121]"
                                    }`}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </nav>

                        <div className="hidden md:block">
                            <button
                                onClick={handleReturnHome}
                                className={`px-8 py-4 rounded-full font-extrabold text-sm tracking-wide transition-all duration-300 shadow-lg ${
                                    isScrolled
                                        ? "bg-[#96263e] text-white hover:bg-[#7a1e32] hover:shadow-[#96263e]/30"
                                        : "bg-[#b4d121] text-gray-900 hover:bg-[#7a1e32] hover:text-white hover:-translate-y-1"
                                }`}
                            >
                                Volver al Inicio
                            </button>
                        </div>

                        <button
                            className="md:hidden p-2 rounded-full bg-black/10 backdrop-blur-md border border-white/20"
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                        >
                            {isMobileMenuOpen ? (
                                <X
                                    className={`w-6 h-6 ${isScrolled ? "text-gray-900" : "text-white"}`}
                                />
                            ) : (
                                <Menu
                                    className={`w-6 h-6 ${isScrolled ? "text-gray-900" : "text-white"}`}
                                />
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    <div
                        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-2xl transition-all duration-300 origin-top border-t border-gray-100 ${
                            isMobileMenuOpen
                                ? "scale-y-100 opacity-100"
                                : "scale-y-0 opacity-0"
                        }`}
                    >
                        <div className="flex flex-col px-6 py-6 gap-2">
                            {[
                                { name: "Inicio", href: "/" },
                                { name: "Servicios", href: "/#servicios" },
                                { name: "Señales", href: "/#señales" },
                                {
                                    name: "Profesionales",
                                    href: "/#profesionales",
                                },
                            ].map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-gray-800 font-bold text-lg py-3 border-b border-gray-50 flex items-center justify-between group"
                                >
                                    {item.name}{" "}
                                    <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-[#96263e] transition-colors" />
                                </a>
                            ))}
                            <button
                                onClick={handleReturnHome}
                                className="mt-6 bg-gradient-to-r from-[#96263e] to-[#7a1e32] text-white w-full py-4 rounded-2xl font-bold shadow-lg shadow-[#96263e]/20"
                            >
                                Volver al Inicio
                            </button>
                        </div>
                    </div>
                </header>

                {/* HERO SECTION DE AGRADECIMIENTO IDÉNTICO AL HERO DE HOME.JSX */}
                <section
                    id="hero"
                    className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-white"
                >
                    <div className="absolute inset-0 w-full h-full bg-[#0a0a0a] overflow-hidden pointer-events-none" />

                    {/* Gradientes radiales para darle profundidad visual */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#96263e]/30 to-[#96263e]" />
                    <div className="absolute top-0 right-0 w-[800px] lg:h-[800px] bg-[#b4d121]/10 rounded-full blur-[150px] mix-blend-overlay"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] lg:h-[600px] bg-[#96263e]/40 rounded-full blur-[120px]"></div>

                    <div className="relative z-20 max-w-7xl mx-auto px-6 mt-32 pb-24 md:pb-16 w-full">
                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-12">
                            {/* COLUMNA IZQUIERDA: MENSAJE PRINCIPAL */}
                            <div className="w-full lg:w-6/12 text-center lg:text-left flex flex-col items-center lg:items-start">
                                {/* Badge Flotante Glassmorphism */}
                                <div className="animate-[slideUp_1s_ease-out_forwards] opacity-0 mb-6">
                                    <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl shadow-black/10">
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b4d121] opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#b4d121]"></span>
                                        </span>
                                        <span className="text-white text-xs lg:text-sm font-semibold tracking-wider uppercase">
                                            ¡Solicitud Recibida con Éxito!
                                        </span>
                                    </div>
                                </div>

                                {/* Título con tipografía Raleway y resaltado en verde lima */}
                                <div className="animate-[slideUp_1s_ease-out_0.2s_forwards] opacity-0 w-full">
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-title font-extrabold text-white leading-[1.1] mb-6 drop-shadow-2xl">
                                        ¡Gracias por confiar en{" "}
                                        <span className="relative inline-block mt-2 md:mt-0">
                                            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#b4d121] to-[#e4ff4a]">
                                                Quiroinnova
                                            </span>
                                            <svg
                                                className="absolute w-full h-4 -bottom-1 left-0 text-[#b4d121]/60"
                                                viewBox="0 0 100 10"
                                                preserveAspectRatio="none"
                                            >
                                                <path
                                                    d="M0 5 Q 50 15 100 5"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                    fill="transparent"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        </span>
                                        !
                                    </h1>
                                </div>

                                {/* Descripción */}
                                <div className="animate-[slideUp_1s_ease-out_0.4s_forwards] opacity-0 max-w-2xl w-full">
                                    <p className="text-lg md:text-xl text-gray-100 mb-8 font-light leading-relaxed drop-shadow-md">
                                        Hemos recibido tus datos correctamente.
                                        Nuestro equipo de especialistas
                                        coordinará tu cita por WhatsApp en
                                        breves minutos para brindarte la mejor
                                        atención.
                                    </p>

                                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                        <button
                                            onClick={handleReturnHome}
                                            className="w-full sm:w-auto bg-[#b4d121] text-gray-900 px-8 py-4 rounded-full font-extrabold text-base hover:bg-[#cdeb26] hover:shadow-[0_0_30px_rgba(180,209,33,0.5)] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg group"
                                        >
                                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                            Volver a la Página Principal
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* COLUMNA DERECHA: TARJETA DE CONFIRMACIÓN CON EL ESTILO DEL FORMULARIO HERO */}
                            <div className="w-full lg:w-6/12 flex justify-center lg:justify-end animate-[slideUp_1s_ease-out_0.4s_forwards] opacity-0">
                                <div className="w-full max-w-xl bg-white p-6 md:p-10 relative rounded-[2rem] shadow-2xl border border-gray-100">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-14 h-14 rounded-2xl bg-[#96263e]/10 flex items-center justify-center shrink-0 border border-[#96263e]/20">
                                            <CheckCircle2 className="w-8 h-8 text-[#96263e]" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                                                Cita Registrada
                                            </h3>
                                            <p className="text-gray-500 font-medium text-xs md:text-sm">
                                                Pasos siguientes de tu atención
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#b4d121] transition-all">
                                            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-gray-100">
                                                <Clock className="w-5 h-5 text-[#96263e]" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-sm">
                                                    1. Contacto por WhatsApp
                                                </h4>
                                                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                                                    Te escribiremos en breve
                                                    para validar el horario y
                                                    sede que más te convenga.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#b4d121] transition-all">
                                            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-gray-100">
                                                <HeartPulse className="w-5 h-5 text-[#96263e]" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-sm">
                                                    2. Evaluación Especializada
                                                </h4>
                                                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                                                    Diagnóstico integral de tu
                                                    columna vertebral y postura.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#b4d121] transition-all">
                                            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-gray-100">
                                                <ShieldCheck className="w-5 h-5 text-[#96263e]" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-sm">
                                                    3. Quiroprácticos
                                                    Certificados
                                                </h4>
                                                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                                                    Atención segura y de primer
                                                    nivel en todas nuestras
                                                    sedes.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleReturnHome}
                                        className="w-full bg-gradient-to-r from-[#96263e] to-[#c42e4f] text-white py-4 rounded-full font-bold text-base shadow-[0_10px_20px_rgba(150,38,62,0.3)] hover:shadow-[0_15px_30px_rgba(150,38,62,0.5)] hover:-translate-y-1 active:scale-95 transition-all duration-300 flex justify-center items-center gap-3 group relative overflow-hidden"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            CONTINUAR EXPLORANDO
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Separador SVG Wave inferior idéntico al de Home.jsx */}
                    <div className="absolute -bottom-[2px] left-0 w-[101%] overflow-hidden leading-none z-10 pointer-events-none scale-y-[1.02] origin-bottom">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1440 230"
                        >
                            <path
                                fill="#ffffff"
                                fillOpacity="1"
                                d="M0,64L80,90.7C160,117,320,171,480,186.7C640,203,800,181,960,181.3C1120,181,1280,203,1360,213.3L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
                            ></path>
                        </svg>
                    </div>
                </section>

                {/* Footer oficial idéntico al de Home.jsx */}
                <Footer
                    generals={generals}
                    services={services}
                    socials={socials}
                    scrollToForm={handleReturnHome}
                />

                {/* Widget flotante oficial de WhatsApp */}
                <WhatsApp data={generals} />
            </div>
        </Base>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Thanks {...properties} />
        </CarritoProvider>,
    );
});
