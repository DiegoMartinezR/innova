import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import Base from "./components/Tailwind/Base";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
import CreateReactScript from "./Utils/CreateReactScript";
import { CarritoProvider } from "./context/CarritoContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
    Calendar,
    Star,
    ShieldCheck,
    Users,
    Activity,
    ChevronDown,
    Clock,
    MapPin,
    CheckCircle2,
    ArrowRight,
    Menu,
    X,
    Quote,
    Phone,
    HeartPulse,
    Sparkles,
    Award,
    ArrowUpRight,
    Mail,
} from "lucide-react";
import { Facebook } from "lucide-react";
import { Instagram } from "lucide-react";
import TextWithHighlight from "./Utils/TextWithHighlight";
import MessagesRest from "./actions/MessagesRest";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import Global from "./Utils/Global";

import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaYoutube,
    FaTiktok,
    FaWhatsapp,
    FaTelegram,
    FaDiscord,
    FaSnapchat,
    FaPinterest,
    FaReddit,
} from "react-icons/fa";
import WhatsApp from "./Utils/WhatsApp";

const messagesRest = new MessagesRest();

const SocialIcon = ({ icon, className = "w-4 h-4" }) => {
    if (icon?.includes("fa-facebook"))
        return <FaFacebook className={className} />;
    if (icon?.includes("fa-instagram"))
        return <FaInstagram className={className} />;
    if (icon?.includes("fa-twitter"))
        return <FaTwitter className={className} />;
    if (icon?.includes("fa-linkedin"))
        return <FaLinkedin className={className} />;
    if (icon?.includes("fa-youtube"))
        return <FaYoutube className={className} />;
    if (icon?.includes("fa-tiktok")) return <FaTiktok className={className} />;
    if (icon?.includes("fa-whatsapp"))
        return <FaWhatsapp className={className} />;
    if (icon?.includes("fa-telegram"))
        return <FaTelegram className={className} />;
    if (icon?.includes("fa-discord"))
        return <FaDiscord className={className} />;
    if (icon?.includes("fa-snapchat"))
        return <FaSnapchat className={className} />;
    if (icon?.includes("fa-pinterest"))
        return <FaPinterest className={className} />;
    if (icon?.includes("fa-reddit")) return <FaReddit className={className} />;
    return null;
};

// --- HOOKS Y COMPONENTES UI ---
function useScrollReveal(threshold = 0.1) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold, rootMargin: "0px 0px -50px 0px" },
        );
        if (ref.current) observer.observe(ref.current);
        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [threshold]);
    return [ref, isVisible];
}

const CustomDropdown = ({
    id,
    label,
    value,
    options,
    onChange,
    placeholder,
    icon: Icon,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const selectedOption = options.find((opt) => opt.id == value);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative group w-full" ref={dropdownRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-gray-50 border-2 transition-all duration-300 rounded-2xl px-5 py-3 pt-6 cursor-pointer flex justify-between items-center ${
                    isOpen
                        ? "bg-white border-[#96263e] ring-4 ring-[#96263e]/10"
                        : "border-transparent"
                }`}
            >
                <div className="flex flex-col overflow-hidden">
                    <span
                        className={`text-[#96263e] text-[10px] font-bold uppercase tracking-wider mb-0.5 transition-all duration-300 ${
                            isOpen || value
                                ? "opacity-100 visible"
                                : "opacity-0 invisible"
                        }`}
                    >
                        {label}
                    </span>
                    <span
                        className={`font-medium transition-all duration-300 truncate ${
                            value ? "text-gray-900" : "text-gray-400"
                        }`}
                    >
                        {selectedOption
                            ? selectedOption.name || selectedOption.title
                            : placeholder}
                    </span>
                </div>
                <Icon
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180 text-[#96263e]" : ""
                    }`}
                />
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-[100] mt-2 w-full bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden"
                    >
                        <div className="max-h-64 overflow-y-auto custom-scrollbar">
                            {options.map((opt) => (
                                <div
                                    key={opt.id}
                                    onClick={() => {
                                        onChange({
                                            target: { id, value: opt.id },
                                        });
                                        setIsOpen(false);
                                    }}
                                    className={`px-6 py-4 cursor-pointer transition-colors flex items-center justify-between group/item ${
                                        value == opt.id
                                            ? "bg-[#96263e]/5 text-[#96263e]"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                                >
                                    <span className="font-medium">
                                        {opt.name || opt.title}
                                    </span>
                                    {value == opt.id && (
                                        <CheckCircle2 className="w-4 h-4 text-[#96263e]" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ButtonPrimary = ({ children, className = "", onClick }) => (
    <button
        onClick={onClick}
        className={`relative overflow-hidden group bg-[#96263e] text-white px-10 py-4 md:px-12 md:py-5 rounded-full font-bold text-lg hover:shadow-[0_15px_30px_rgba(150,38,62,0.4)] hover:-translate-y-1 active:scale-95 transition-all duration-300 ease-out flex items-center justify-center gap-3 ${className}`}
    >
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
        <span className="relative z-10 flex items-center gap-3">
            {children}
        </span>
    </button>
);

const WhatsAppIcon = ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

const getStoredUTMs = () => {
    const utms = {};
    [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_term",
        "utm_content",
    ].forEach((key) => {
        const val = sessionStorage.getItem(key);
        if (val) utms[key] = val;
    });
    return utms;
};

const smoothScrollTo = (targetY, duration = 1200) => {
    if (typeof window === "undefined") return;
    const startY = window.scrollY;
    const difference = targetY - startY;
    const startTime = performance.now();

    const step = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        // Easing cubic easeInOut: lento - rápido - lento
        const ease =
            progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(0, startY + difference * ease);

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };

    requestAnimationFrame(step);
};

// --- MAIN APP COMPONENT ---
const Home = ({
    linkWhatsApp,
    randomImage,
    showSlogan = true,
    strenghts,
    indicators,
    landing,
    specialities,
    benefits,
    services,
    testimonies,
    staffs,
    facilities,
    generals,
    socials,
    RECAPTCHA_SITE_KEY,
}) => {
    const [isScrolled, setIsScrolled] = useState(
        typeof window !== "undefined" ? window.scrollY > 50 : false,
    );
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined" ? window.innerWidth < 1024 : false,
    );
    const [selectedSedeIdx, setSelectedSedeIdx] = useState(0);

    const sedes =
        facilities?.map((f) => {
            let mapUrl = f.link;
            if (!mapUrl && f.latitude && f.longitude) {
                mapUrl = `https://maps.google.com/maps?q=${f.latitude},${f.longitude}&z=15&output=embed`;
            }
            return {
                id: f.id,
                name: f.title,
                address: f.ubications?.[0] || "",
                phone: f.phones?.[0] || "",
                hours:
                    f.business_hours?.map((bh) => {
                        const [days, ...timeParts] = bh.split(":");
                        return {
                            days: days?.trim() || "",
                            time: timeParts.join(":")?.trim() || "",
                        };
                    }) || [],
                mapUrl: mapUrl || "",
            };
        }) || [];

    const recaptchaDesktopRef = useRef(null);
    const recaptchaMobileRef = useRef(null);
    const [captchaToken, setCaptchaToken] = useState(null);

    const recaptchaSiteKey =
        RECAPTCHA_SITE_KEY ||
        Global.get("RECAPTCHA_SITE_KEY") ||
        "6LfhiBMqAAAAAC0h7yWk25-gM56fqMJAp_Lpdizv";

    const [formLoading, setFormLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        facility_id: "",
        service_id: "",
        description: "Nueva cita agendada desde la web.",
    });

    const handleInputChange = (e) => {
        const { id, value, name } = e.target;
        const field = id || name;
        let fieldValue = value;
        if (field === "phone") {
            // Solo permitir números en la casilla de WhatsApp
            fieldValue = value.replace(/\D/g, "");
        }
        setFormData((prev) => ({
            ...prev,
            [field]: fieldValue,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // 1. Validar mínimo 9 números en WhatsApp
        const phoneDigits = (formData.phone || "").replace(/\D/g, "");
        if (phoneDigits.length < 9) {
            Swal.fire({
                icon: "warning",
                title: "Número incompleto",
                text: "En la casilla de WhatsApp se requiere ingresar como mínimo 9 números.",
                confirmButtonColor: "#96263e",
            });
            return;
        }

        // 2. Validar Google reCAPTCHA v2
        if (!captchaToken) {
            Swal.fire({
                icon: "warning",
                title: "Verificación requerida",
                text: "Por favor, completa la casilla de verificación (captcha de Google) para verificar que no eres un robot.",
                confirmButtonColor: "#96263e",
            });
            return;
        }

        setFormLoading(true);

        const selectedService = services.find(
            (s) => s.id === formData.service_id,
        );
        const subject = `Reserva de Cita - ${selectedService?.title || "General"}`;

        try {
            const result = await messagesRest.save(
                {
                    ...formData,
                    ...getStoredUTMs(),
                    captcha: captchaToken,
                    subject,
                },
                null,
                false,
            );
            if (!result) throw new Error();

            setFormData({
                name: "",
                phone: "",
                email: "",
                facility_id: "",
                service_id: "",
                description: "Nueva cita agendada desde la web.",
            });

            recaptchaDesktopRef.current?.reset();
            recaptchaMobileRef.current?.reset();
            setCaptchaToken(null);

            window.location.href = "/thanks";
        } catch (error) {
            recaptchaDesktopRef.current?.reset();
            recaptchaMobileRef.current?.reset();
            setCaptchaToken(null);

            Swal.fire({
                title: "Error",
                text:
                    error?.message ||
                    "Hubo un problema al procesar tu reserva. Por favor, inténtalo de nuevo o contáctanos directamente.",
                icon: "error",
                confirmButtonColor: "#96263e",
            });
        } finally {
            setFormLoading(false);
        }
    };

    useLayoutEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        const handleResize = () => setIsMobile(window.innerWidth < 1024);

        handleScroll();
        handleResize();

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleResize);

        // Manejo genérico de hashes externos
        if (window.location.hash) {
            const targetId = window.location.hash.substring(1);
            setTimeout(() => {
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 800);
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const scrollToForm = () => {
        if (isMobile) {
            const formElement = document.getElementById("hero-form");
            if (formElement) {
                const targetY =
                    formElement.getBoundingClientRect().top +
                    window.scrollY -
                    100;
                smoothScrollTo(targetY, 1200);
            } else {
                smoothScrollTo(0, 1200);
            }
        } else {
            smoothScrollTo(0, 1200);
        }
        setIsMobileMenuOpen(false);
    };

    const scrollToFormDown = () => {
        const formElement = document.getElementById("down-hero-form");
        if (formElement) {
            const targetY =
                formElement.getBoundingClientRect().top + window.scrollY - 100;
            smoothScrollTo(targetY, 1200);
        } else {
            smoothScrollTo(0, 1200);
        }
        setIsMobileMenuOpen(false);
    };

    const landingHero = landing?.find(
        (item) => item.correlative === "page_home_hero",
    );
    const landingNosotros = landing?.find(
        (item) => item.correlative === "page_home_mensaje",
    );
    const landingServices = landing?.find(
        (item) => item.correlative === "page_home_services",
    );
    const landingEnfoque = landing?.find(
        (item) => item.correlative === "page_home_enfoque",
    );
    const landingTestimonios = landing?.find(
        (item) => item.correlative === "page_home_testimonios",
    );
    const landingStaff = landing?.find(
        (item) => item.correlative === "page_home_staff",
    );
    const landingCta = landing?.find(
        (item) => item.correlative === "page_home_cta",
    );
    const landingContact = landing?.find(
        (item) => item.correlative === "page_home_ubicaciones",
    );

    const footerDescription =
        generals.find((x) => x.correlative === "footer_description")
            ?.description || "";
    const supportPhone =
        generals.find((x) => x.correlative === "support_phone")?.description ||
        "";
    const supportEmail =
        generals.find((x) => x.correlative === "support_email")?.description ||
        "";
    return (
        <Base>
            <div className="font-inter bg-[#fcfcfc] overflow-x-hidden selection:bg-[#b4d121] selection:text-[#1a1a1a] text-gray-800">
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap);
        .font-title { font-family: 'Raleway', sans-serif; }
        *{ font-family: 'Quicksand', sans-serif; }

        
        /* Custom Animations */
          @keyframes slideUpFade {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-up-fade {
            animation: slideUpFade 0.3s ease-out forwards;
          }
        @keyframes subtle-zoom { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
        .animate-subtle-zoom { animation: subtle-zoom 25s infinite ease-in-out; }
        
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float 7s ease-in-out infinite 2s; }
        
        @keyframes shimmer { 100% { transform: translateX(100%); } }
        
        @keyframes scroll-down { 0% { transform: translateY(0); opacity: 1; } 50% { transform: translateY(14px); opacity: 1; } 100% { transform: translateY(14px); opacity: 0; } }
        .animate-scroll-down { animation: scroll-down 1.8s infinite ease-in-out; }

        /* SVG Patterns */
        .bg-pattern-dots { background-image: radial-gradient(#96263e 1px, transparent 1px); background-size: 32px 32px; opacity: 0.04; }
        .bg-pattern-grid { background-image: linear-gradient(rgba(150,38,62,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(150,38,62,0.05) 1px, transparent 1px); background-size: 40px 40px; }
        
        @keyframes drop-bounce {
          0% { transform: translateY(-50px); opacity: 0; }
          60% { transform: translateY(10px); opacity: 1; }
          80% { transform: translateY(-5px); }
          100% { transform: translateY(0); opacity: 1; }
        }
      `,
                    }}
                />

                {/* HEADER NAVBAR (Elegante y difuminado) */}
                <header
                    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-white/90 backdrop-blur-lg shadow-sm py-3 " : "bg-transparent py-3"}`}
                >
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
                        <div className="flex items-center gap-2 cursor-pointer group">
                            {isScrolled ? (
                                <img
                                    src="/assets/img/logo.png"
                                    alt="Quiroinnova"
                                    className={`transition-all duration-500 w-auto object-contain transform group-hover:scale-105 h-10 md:h-20 drop-shadow-sm`}
                                />
                            ) : (
                                <img
                                    src="/assets/img/logo-white.png"
                                    alt="Quiroinnova"
                                    className={`transition-all duration-500 w-auto object-contain transform group-hover:scale-105 h-12 md:h-20  drop-shadow-sm`}
                                />
                            )}
                        </div>
                        <nav className="hidden  items-center gap-8 bg-white/5 px-6 py-2 rounded-full border border-white/10 backdrop-blur-sm">
                            {[
                                "Servicios",
                                "Señales",
                                "Profesionales",
                                "Testimonios",
                            ].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className={`text-sm font-semibold tracking-wide transition-colors ${isScrolled ? "text-gray-600 hover:text-[#96263e]" : "text-gray-100 hover:text-[#b4d121]"}`}
                                >
                                    {item}
                                </a>
                            ))}
                        </nav>
                        <div className="hidden md:block">
                            {isScrolled && (
                                <button
                                    onClick={scrollToForm}
                                    className={`px-8 py-4 rounded-full font-extrabold text-sm tracking-wide transition-all text-extrabold duration-300 shadow-lg ${isScrolled ? "bg-[#96263e] text-white hover:bg-[#7a1e32] hover:shadow-[#96263e]/30" : "bg-[#b4d121] text-gray-900  hover:bg-[#7a1e32] hover:text-white hover:-translate-y-1"}`}
                                >
                                    Agendar cita
                                </button>
                            )}
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
                        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-2xl transition-all duration-300 origin-top border-t border-gray-100 ${isMobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}`}
                    >
                        <div className="flex flex-col px-6 py-6 gap-2">
                            {["Servicios", "Señales", "Profesionales"].map(
                                (item) => (
                                    <a
                                        key={item}
                                        href={`#${item.toLowerCase()}`}
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                        className="text-gray-800 font-bold text-lg py-3 border-b border-gray-50 flex items-center justify-between group"
                                    >
                                        {item}{" "}
                                        <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-[#96263e] transition-colors" />
                                    </a>
                                ),
                            )}
                            <button
                                onClick={scrollToForm}
                                className="mt-6 bg-gradient-to-r text-extrabold from-[#96263e] to-[#7a1e32] text-white w-full py-4 rounded-2xl font-bold shadow-lg shadow-[#96263e]/20"
                            >
                                Agendar Cita Ahora
                            </button>
                        </div>
                    </div>
                </header>

                {/* 1. HERO SECTION (EXPERIENCIA INMERSIVA) */}
                <section
                    id="hero"
                    className="relative min-h-[100dvh] max-h-screen flex items-center justify-center overflow-hidden bg-white "
                >
                    <div className="absolute inset-0 w-full h-full bg-[#0a0a0a] overflow-hidden pointer-events-none">
                        {landingHero?.video &&
                            (() => {
                                const videoId =
                                    landingHero.video.match(
                                        /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/,
                                    )?.[1] || landingHero.video;
                                return (
                                    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                                        <iframe
                                            src={`https://youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1`}
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-[177.77vh] h-[56.25vw] max-w-none"
                                            allow="autoplay; encrypted-media"
                                            allowFullScreen
                                            frameBorder="0"
                                            style={{ border: "none" }}
                                        ></iframe>
                                    </div>
                                );
                            })()}
                    </div>

                    {/* Gradientes radiales para darle profundidad al video */}

                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#96263e]/30 to-[#96263e]" />
                    <div className="absolute top-0 right-0 w-[800px] lg:h-[800px] bg-[#b4d121]/10 rounded-full blur-[150px] mix-blend-overlay"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] lg:h-[600px] bg-[#96263e]/40 rounded-full blur-[120px]"></div>
                    <div className="relative z-20 max-w-7xl mx-auto px-6 mt-32 pb-24 md:pb-16 w-full">
                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
                            {/* COLUMNA IZQUIERDA: TEXTO */}
                            <div className="w-full lg:w-6/12 text-center lg:text-left flex flex-col items-center lg:items-start">
                                {/* Badge Flotante Glassmorphism */}
                                {landingHero?.subtitle && (
                                    <div className="animate-[slideUp_1s_ease-out_forwards] opacity-0 mb-6">
                                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl shadow-black/10">
                                            <span className="relative flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b4d121] opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#b4d121]"></span>
                                            </span>
                                            <span className="text-white text-xs lg:text-sm font-semibold tracking-wider uppercase">
                                                {landingHero?.subtitle}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <div className="animate-[slideUp_1s_ease-out_0.2s_forwards] opacity-0 w-full">
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-title font-extrabold text-white leading-[1.1] mb-6 drop-shadow-2xl">
                                        {landingHero &&
                                            landingHero.title &&
                                            landingHero.title
                                                .split("*")
                                                .map((part, index) => {
                                                    if (index % 2 !== 0) {
                                                        return (
                                                            <React.Fragment
                                                                key={index}
                                                            >
                                                                <br className="hidden md:block" />
                                                                <span className="relative inline-block mt-2 md:mt-0">
                                                                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#b4d121] to-[#e4ff4a]">
                                                                        {part}
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
                                                                </span>{" "}
                                                                <br className="hidden md:block" />
                                                            </React.Fragment>
                                                        );
                                                    }
                                                    return (
                                                        <React.Fragment
                                                            key={index}
                                                        >
                                                            {part
                                                                .split(
                                                                    /<br\s*\/?>|\n/i,
                                                                )
                                                                .map(
                                                                    (
                                                                        line,
                                                                        lineIdx,
                                                                        linesArray,
                                                                    ) => (
                                                                        <React.Fragment
                                                                            key={
                                                                                lineIdx
                                                                            }
                                                                        >
                                                                            {
                                                                                line
                                                                            }
                                                                            {lineIdx <
                                                                                linesArray.length -
                                                                                    1 && (
                                                                                <br className="hidden md:block" />
                                                                            )}
                                                                        </React.Fragment>
                                                                    ),
                                                                )}
                                                        </React.Fragment>
                                                    );
                                                })}
                                    </h1>
                                </div>

                                <div className="animate-[slideUp_1s_ease-out_0.4s_forwards] opacity-0 max-w-2xl w-full">
                                    {landingHero?.description && (
                                        <p className="text-lg md:text-xl text-gray-100 mb-8 font-light leading-relaxed drop-shadow-md">
                                            {landingHero?.description}
                                        </p>
                                    )}

                                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                        <button
                                            onClick={scrollToForm}
                                            className="w-full lg:hidden sm:w-auto bg-[#b4d121] text-gray-900 px-8 py-4 rounded-full font-extrabold text-base hover:bg-[#cdeb26] hover:shadow-[0_0_30px_rgba(180,209,33,0.5)] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg group"
                                        >
                                            ¡Agenda tu evaluación!{" "}
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                        {/*  <a
                                            href={linkWhatsApp}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full hidden sm:flex sm:w-auto bg-white/5 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold text-base hover:bg-white hover:text-[#96263e] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 group"
                                        >
                                            <WhatsAppIcon className="w-6 h-6 group-hover:text-[#25D366] transition-colors" />{" "}
                                            WhatsApp
                                        </a>*/}
                                    </div>
                                </div>
                            </div>

                            {/* COLUMNA DERECHA: FORMULARIO */}
                            <div className="hidden w-full lg:w-6/12 lg:flex justify-center lg:justify-end animate-[slideUp_1s_ease-out_0.4s_forwards] opacity-0">
                                <div
                                    id={
                                        isMobile
                                            ? "down-hero-form"
                                            : "hero-form"
                                    }
                                    className="w-full max-w-xl bg-white p-6 md:p-10 relative rounded-[2rem] shadow-2xl border border-gray-100"
                                >
                                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
                                        Asegura tu Promo
                                    </h3>
                                    <p className="text-gray-500 mb-6 font-medium text-sm md:text-base">
                                        Ingresa tus datos y coordinaremos tu
                                        cita por WhatsApp en minutos.
                                    </p>

                                    <form
                                        className="space-y-4"
                                        onSubmit={handleFormSubmit}
                                    >
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    id="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="peer w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-2xl px-5 py-3 pt-6 focus:bg-white focus:border-[#96263e] focus:ring-4 focus:ring-[#96263e]/10 transition-all outline-none font-medium placeholder-transparent text-sm"
                                                    placeholder="Nombre completo"
                                                    required
                                                />
                                                <label
                                                    htmlFor="name"
                                                    className="absolute left-5 top-2 text-gray-400 text-[10px] font-bold uppercase tracking-wider peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-[#96263e] transition-all pointer-events-none"
                                                >
                                                    Nombre completo
                                                </label>
                                            </div>
                                            <div className="relative">
                                                <input
                                                    type="tel"
                                                    inputMode="numeric"
                                                    id="phone"
                                                    pattern="[0-9]{9,}"
                                                    minLength={9}
                                                    maxLength={15}
                                                    title="Ingresa como mínimo 9 números"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="peer w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-2xl px-5 py-3 pt-6 focus:bg-white focus:border-[#96263e] focus:ring-4 focus:ring-[#96263e]/10 transition-all outline-none font-medium placeholder-transparent text-sm"
                                                    placeholder="Celular (WhatsApp )"
                                                    required
                                                />
                                                <label
                                                    htmlFor="phone"
                                                    className="absolute left-5 top-2 text-gray-400 text-[10px] font-bold uppercase tracking-wider peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-[#96263e] transition-all pointer-events-none"
                                                >
                                                    Celular (WhatsApp)
                                                </label>
                                                {formData.phone && formData.phone.length > 0 && formData.phone.length < 9 && (
                                                    <span className="block text-[11px] text-amber-600 font-medium mt-1 pl-2">
                                                        Mínimo 9 números ({formData.phone.length}/9)
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <input
                                                type="email"
                                                id="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="peer w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-2xl px-5 py-3 pt-6 focus:bg-white focus:border-[#96263e] focus:ring-4 focus:ring-[#96263e]/10 transition-all outline-none font-medium placeholder-transparent text-sm"
                                                placeholder="Correo Electrónico"
                                                required
                                            />
                                            <label
                                                htmlFor="email"
                                                className="absolute left-5 top-2 text-gray-400 text-[10px] font-bold uppercase tracking-wider peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-[#96263e] transition-all pointer-events-none"
                                            >
                                                Correo Electrónico
                                            </label>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4">
                                            <CustomDropdown
                                                id="facility_id"
                                                label="Sede de atención"
                                                value={formData.facility_id}
                                                options={sedes}
                                                onChange={handleInputChange}
                                                placeholder="Selecciona sede"
                                                icon={ChevronDown}
                                            />
                                            <div hidden>
                                                <CustomDropdown
                                                    id="service_id"
                                                    label="Motivo principal"
                                                    value={formData.service_id}
                                                    options={services}
                                                    onChange={handleInputChange}
                                                    placeholder="Selecciona motivo"
                                                    icon={ChevronDown}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center justify-center pt-2">
                                            <ReCAPTCHA
                                                ref={recaptchaDesktopRef}
                                                sitekey={recaptchaSiteKey}
                                                onChange={(val) => setCaptchaToken(val)}
                                                onExpired={() => setCaptchaToken(null)}
                                            />
                                            <p className="text-[11px] text-gray-500 mt-2 text-center flex items-center justify-center gap-1 font-medium">
                                                <span>🔒</span> Protegido por Google reCAPTCHA v2 para evitar bots
                                            </p>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={formLoading}
                                            className="w-full mt-6 bg-gradient-to-r from-[#96263e] to-[#c42e4f] text-white py-4 rounded-full font-bold text-base shadow-[0_10px_20px_rgba(150,38,62,0.3)] hover:shadow-[0_15px_30px_rgba(150,38,62,0.5)] hover:-translate-y-1 active:scale-95 transition-all duration-300 flex justify-center items-center gap-3 group relative overflow-hidden disabled:opacity-50"
                                        >
                                            <span className="relative z-10 flex items-center gap-2">
                                                {formLoading
                                                    ? "PROCESANDO..."
                                                    : "RESERVAR OFERTA AHORA"}{" "}
                                                {!formLoading && (
                                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                )}
                                            </span>
                                            {!formLoading && (
                                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scroll Indicator Premium (Más arriba y con mejor diseño) */}
                    <div
                        className="absolute hidden lg:flex bottom-28 md:bottom-0 left-1/2 transform -translate-x-1/2  flex-col items-center gap-2 cursor-pointer z-30 group"
                        onClick={() =>
                            document
                                .getElementById("sobre-nosotros")
                                .scrollIntoView({ behavior: "smooth" })
                        }
                    >
                        <span className=" hidden text-[10px] font-bold text-white uppercase tracking-[0.25em] text-blacktransition-colors duration-300">
                            Explorar
                        </span>
                        <div className="w-[30px] h-[48px] border-2 border-white rounded-full flex justify-center pt-2.5  backdrop-blur-md transition-all duration-300 group-hover:border-[#b4d121]/50 bg-[#b4d121]/10 shadow-xl">
                            <div className="w-1.5 h-3 bg-[#b4d121] rounded-full animate-scroll-down shadow-[0_0_12px_rgba(180,209,33,1)]"></div>
                        </div>
                        <ChevronDown className="w-5 h-5 text-[#b4d121] animate-bounce-subtle -mt-1 transition-colors duration-300" />
                    </div>

                    {/* Separador SVG Wave inferior: Bajamos z-index a 10 y desactivamos clicks */}
                    <div className="absolute -bottom-[2px] left-0 w-[101%] overflow-hidden leading-none z-10 pointer-events-none scale-y-[1.02] origin-bottom">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1440 230"
                        >
                            <path
                                fill="#ffffff"
                                fill-opacity="1"
                                d="M0,64L80,90.7C160,117,320,171,480,186.7C640,203,800,181,960,181.3C1120,181,1280,203,1360,213.3L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
                            ></path>
                        </svg>
                    </div>

                    <style>{`@keyframes slideUp { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }`}</style>
                </section>
                <div className="max-w-7xl mx-auto px-6 lg:px-8 my-10 w-full lg:hidden  justify-center lg:justify-end ">
                    <div
                        id={isMobile ? "hero-form" : "down-hero-form"}
                        className="w-full max-w-xl bg-white p-6 md:p-10 relative rounded-[2rem]  border border-gray-100"
                    >
                        <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
                            Asegura tu Promo
                        </h3>
                        <p className="text-gray-500 mb-6 font-medium text-sm md:text-base">
                            Ingresa tus datos y coordinaremos tu cita por
                            WhatsApp en minutos.
                        </p>

                        <form className="space-y-4" onSubmit={handleFormSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="peer w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-2xl px-5 py-3 pt-6 focus:bg-white focus:border-[#96263e] focus:ring-4 focus:ring-[#96263e]/10 transition-all outline-none font-medium placeholder-transparent text-sm"
                                        placeholder="Nombre completo"
                                        required
                                    />
                                    <label
                                        htmlFor="name"
                                        className="absolute left-5 top-2 text-gray-400 text-[10px] font-bold uppercase tracking-wider peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-[#96263e] transition-all pointer-events-none"
                                    >
                                        Nombre completo
                                    </label>
                                </div>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        inputMode="numeric"
                                        id="phone"
                                        pattern="[0-9]{9,}"
                                        minLength={9}
                                        maxLength={15}
                                        title="Ingresa como mínimo 9 números"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="peer w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-2xl px-5 py-3 pt-6 focus:bg-white focus:border-[#96263e] focus:ring-4 focus:ring-[#96263e]/10 transition-all outline-none font-medium placeholder-transparent text-sm"
                                        placeholder="Celular (WhatsApp - mín. 9 números)"
                                        required
                                    />
                                    <label
                                        htmlFor="phone"
                                        className="absolute left-5 top-2 text-gray-400 text-[10px] font-bold uppercase tracking-wider peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-[#96263e] transition-all pointer-events-none"
                                    >
                                        Celular (WhatsApp - mín. 9 números)
                                    </label>
                                    {formData.phone && formData.phone.length > 0 && formData.phone.length < 9 && (
                                        <span className="block text-[11px] text-amber-600 font-medium mt-1 pl-2">
                                            Mínimo 9 números ({formData.phone.length}/9)
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="peer w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-2xl px-5 py-3 pt-6 focus:bg-white focus:border-[#96263e] focus:ring-4 focus:ring-[#96263e]/10 transition-all outline-none font-medium placeholder-transparent text-sm"
                                    placeholder="Correo Electrónico"
                                    required
                                />
                                <label
                                    htmlFor="email"
                                    className="absolute left-5 top-2 text-gray-400 text-[10px] font-bold uppercase tracking-wider peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-[#96263e] transition-all pointer-events-none"
                                >
                                    Correo Electrónico
                                </label>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <CustomDropdown
                                    id="facility_id"
                                    label="Sede de atención"
                                    value={formData.facility_id}
                                    options={sedes}
                                    onChange={handleInputChange}
                                    placeholder="Selecciona sede"
                                    icon={ChevronDown}
                                />
                                <div hidden>
                                    <CustomDropdown
                                        id="service_id"
                                        label="Motivo principal"
                                        value={formData.service_id}
                                        options={services}
                                        onChange={handleInputChange}
                                        placeholder="Selecciona motivo"
                                        icon={ChevronDown}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center pt-2">
                                <div className="w-full flex justify-center overflow-hidden">
                                    <div className="scale-[0.88] sm:scale-100 origin-center">
                                        <ReCAPTCHA
                                            ref={recaptchaMobileRef}
                                            sitekey={recaptchaSiteKey}
                                            onChange={(val) => setCaptchaToken(val)}
                                            onExpired={() => setCaptchaToken(null)}
                                        />
                                    </div>
                                </div>
                                <p className="text-[11px] text-gray-500 mt-2 text-center flex items-center justify-center gap-1 font-medium">
                                    <span>🔒</span> Protegido por Google reCAPTCHA v2 para evitar bots
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={formLoading}
                                className="w-full mt-6 bg-gradient-to-r from-[#96263e] to-[#c42e4f] text-white py-4 rounded-full font-bold text-base shadow-[0_10px_20px_rgba(150,38,62,0.3)] hover:shadow-[0_15px_30px_rgba(150,38,62,0.5)] hover:-translate-y-1 active:scale-95 transition-all duration-300 flex justify-center items-center gap-3 group relative overflow-hidden disabled:opacity-50"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {formLoading
                                        ? "PROCESANDO..."
                                        : "RESERVAR OFERTA AHORA"}{" "}
                                    {!formLoading && (
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    )}
                                </span>
                                {!formLoading && (
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Whatsapp */}
                <WhatsApp data={generals} />

                {/* 2. SOBRE NOSOTROS (REDISTRIBUCIÓN DE LAYOUT) */}
                <section
                    id="sobre-nosotros"
                    className="py-32 bg-[#fcfcfc] relative overflow-hidden"
                >
                    {/* Elementos orgánicos y abstractos de fondo */}
                    <div className="absolute top-0 left-0 w-full h-full bg-pattern-dots pointer-events-none opacity-[0.03]"></div>
                    <div className="absolute -left-20 top-40 w-[40rem] h-[40rem] bg-[#96263e]/5 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute -right-20 bottom-0 w-[35rem] h-[35rem] bg-[#b4d121]/10 rounded-full blur-[100px] animate-pulse delay-700"></div>

                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                        {/* HEADER DE SECCIÓN EN FULL WIDTH */}
                        <div className=" mb-16 text-center">
                            {landingNosotros?.subtitle && (
                                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#96263e]/10 text-[#96263e] font-extrabold text-xs uppercase tracking-[0.2em] mb-6 animate-slide-up-fade">
                                    <Sparkles className="w-4 h-4" />
                                    {landingNosotros?.subtitle}
                                </div>
                            )}

                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-title font-bold text-gray-900 leading-[1.1] tracking-tight">
                                <TextWithHighlight
                                    text={landingNosotros?.title}
                                    color=" text-[#96263e] font-extrabold"
                                />
                            </h2>
                        </div>

                        {/* CONTENIDO EN DOS COLUMNAS ABAJO */}
                        <div className="flex flex-col lg:flex-row gap-16 items-start">
                            {/* COLUMNA IZQUIERDA: DESCRIPCIÓN Y FORTALEZAS */}
                            <div className="lg:w-5/12 space-y-10">
                                {landingNosotros?.description && (
                                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-light border-l-4 border-[#b4d121] pl-6 py-2">
                                        {landingNosotros?.description}
                                    </p>
                                )}

                                {strenghts?.length > 0 && (
                                    <div className="grid grid-cols-1 gap-4">
                                        {strenghts?.map((item, idx) => {
                                            const [ref, isVisible] =
                                                useScrollReveal(0.1);
                                            return (
                                                <div
                                                    key={idx}
                                                    ref={ref}
                                                    className={`flex items-center gap-4 group transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                                                    style={{
                                                        transitionDelay: `${idx * 100}ms`,
                                                    }}
                                                >
                                                    <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-[#b4d121] transition-all duration-500 transform group-hover:-rotate-6">
                                                        <CheckCircle2 className="w-6 h-6 text-[#b4d121] group-hover:text-white transition-colors" />
                                                    </div>
                                                    <div className="">
                                                        <span className="font-noprmal text-gray-900 text-base md:text-lg block group-hover:text-[#96263e] transition-colors">
                                                            {item.name}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                <div className="pt-6 w-full flex justify-center lg:justify-start">
                                    <button
                                        onClick={scrollToForm}
                                        className="bg-[#96263e] text-xs lg:text-base text-white px-10 py-5 rounded-full font-bold shadow-xl shadow-[#96263e]/20 hover:shadow-[#96263e]/40 hover:-translate-y-1 transition-all flex items-center gap-3 group"
                                    >
                                        ¡Agenda tu evaluación ahora!
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>

                            {/* COLUMNA DERECHA: IMAGEN CON COMPOSICIÓN DE CIRCULITOS */}
                            <div className="lg:w-7/12 relative w-full lg:pl-10">
                                <div className="relative group">
                                    {/* Frame principal */}
                                    <div className="relative rounded-[3rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.08)] border-[1px] border-gray-100 z-10">
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-60"></div>
                                        <img
                                            src={`/api/landing_home/media/${landingNosotros?.image}`}
                                            alt={landingNosotros?.subtitle}
                                            className="w-full h-[500px] md:h-[600px] object-cover object-top transform group-hover:scale-105 transition-transform duration-1000"
                                            onError={(e) =>
                                                (e.target.src =
                                                    "/api/cover/thumbnail/null")
                                            }
                                        />
                                    </div>

                                    {/* Decoraciones abstractas (Los "circulitos" que le gustaron al usuario) */}
                                    {/* Círculo decorativo 1 */}
                                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border-[20px] border-[#b4d121]/10 -z-10 animate-float"></div>
                                    <div className="absolute -bottom-10 -left-16 w-40 h-40 rounded-full border-[20px] border-[#b4d121]/10 -z-10 animate-float"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2.5 INDICADORES DE CONFIANZA (NUEVA SECCIÓN DEDICADA) */}
                <section className="py-16 bg-white  relative overflow-hidden">
                    {/* Glow central sutil */}

                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                            {indicators?.map((stat, idx) => {
                                const [ref, isVisible] = useScrollReveal(0.1);
                                return (
                                    <div
                                        key={idx}
                                        ref={ref}
                                        className={`flex flex-col items-center justify-center text-center p-4 group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"} transition-all duration-1000`}
                                        style={{
                                            transitionDelay: `${idx * 200}ms`,
                                            transitionTimingFunction:
                                                "cubic-bezier(0.34, 1.56, 0.64, 1)",
                                        }}
                                    >
                                        <img
                                            src={`/api/indicator/media/${stat.symbol}`}
                                            alt={stat.name}
                                            className="w-20 h-20 object-contain mb-4"
                                            onError={(e) =>
                                                (e.target.src =
                                                    "/api/cover/thumbnail/null")
                                            }
                                        />

                                        <h4 className="text-4xl md:text-5xl font-black text-gray-900  mb-2 tracking-tight">
                                            {stat.name}
                                        </h4>
                                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                                            {stat.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
                {/* 7. RESERVA (DISEÑO TICKET VIP S/199) */}
                <section id="reserva" className="py-24 bg-[#0a0a0a] relative ">
                    {/* Separador de onda superior */}
                    <div className="absolute top-0 left-0 w-full leading-none rotate-180 z-20">
                        <svg
                            className="relative block w-full h-[40px] md:h-[60px]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1200 120"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,121.57,189.9,109.28,233.93,100,277.6,80.8,321.39,56.44Z"
                                fill="#ffffff"
                            ></path>
                        </svg>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 pt-10">
                        <div className="flex flex-col lg:flex-row shadow-[0_30px_60px_rgba(0,0,0,0.5)] rounded-[2rem] lg:rounded-[3rem] bg-white overflow-visible">
                            {/* IZQUIERDA: Imagen */}
                            <div className="lg:w-7/12 relative rounded-t-[2rem]  lg:rounded-l-[3rem] overflow-hidden min-h-[350px] h-full lg:min-h-[500px]">
                                <img
                                    src={`/api/landing_home/media/${landingCta?.image}`}
                                    alt={landingCta?.title}
                                    className="w-full min-h-[350px] h-full lg:min-h-[500px] lg:h-full object-cover"
                                    onError={(e) =>
                                        (e.target.src =
                                            "/api/cover/thumbnail/null")
                                    }
                                />
                            </div>

                            {/* DERECHA: TICKET VIP S/199 */}
                            <div className="lg:w-5/12 relative bg-[#96263e] text-white p-10 flex flex-col justify-center rounded-b-[2rem] lg:rounded-b-none lg:rounded-r-[3rem] overflow-hidden">
                                {/* Efecto de Ticket (Borde dentado virtual via CSS y sombras) */}
                                <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-8 border-r-4 border-dashed border-white/20 transform -translate-x-4"></div>
                                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full hidden lg:block"></div>

                                <div className="absolute top-0 right-0 w-full h-full bg-pattern-dots opacity-20"></div>
                                <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-[#b4d121] to-transparent opacity-20 rounded-tl-full blur-2xl"></div>

                                <div className="relative z-10">
                                    {landingCta?.subtitle && (
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#b4d121]/20 border border-[#b4d121] text-[#b4d121] rounded-full text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
                                            <Award className="w-4 h-4" />{" "}
                                            {landingCta?.subtitle}
                                        </div>
                                    )}
                                    {landingCta?.title && (
                                        <h2 className="text-4xl md:text-5xl font-black  mb-2 leading-tight">
                                            <TextWithHighlight
                                                text={landingCta?.title}
                                                color="text-[#b4d121] "
                                                split={true}
                                                split_coma={true}
                                            />
                                        </h2>
                                    )}

                                    <div className="space-y-4 bg-black/10 mt-4 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                                        {(() => {
                                            // Procesamiento dinámico
                                            const title =
                                                landingCta?.description.match(
                                                    /\*(.*?)\*/,
                                                )?.[1] || "El paquete incluye:";
                                            const items =
                                                landingCta?.description
                                                    .split("\n")
                                                    .filter((line) =>
                                                        line.includes("-"),
                                                    )
                                                    .map((item) =>
                                                        item
                                                            .split("-")[1]
                                                            .trim(),
                                                    );

                                            return (
                                                <div className="space-y-4">
                                                    {/* Título dinámico */}
                                                    <p className="font-bold text-sm uppercase tracking-wider text-[#b4d121] mb-4">
                                                        {title}
                                                    </p>

                                                    {/* Lista de beneficios */}
                                                    <div className="grid gap-3">
                                                        {items.map(
                                                            (item, idx) => (
                                                                <div
                                                                    key={idx}
                                                                    className="flex items-start gap-3 text-sm md:text-base"
                                                                >
                                                                    <CheckCircle2 className="w-5 h-5 text-[#b4d121] shrink-0 mt-0.5" />
                                                                    <span className="font-medium text-white">
                                                                        {item}
                                                                    </span>
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                    <div className="pt-6">
                                        <button
                                            onClick={scrollToForm}
                                            className="bg-accent text-xs lg:text-base text-black px-10 py-5 rounded-full font-bold shadow-xl shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-1 transition-all flex items-center gap-3 group"
                                        >
                                            ¡Agenda tu evaluación ahora!
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* 3. SERVICIOS (TARJETAS PREMIUM CON HOVER EFFECTS) */}
                {services?.length > 0 && (
                    <section id="servicios" className="py-24 bg-white relative">
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                        <div className="max-w-7xl mx-auto px-6 lg:px-8">
                            <div className="text-center max-w-3xl mx-auto mb-20">
                                <span className="text-[#b4d121] font-bold tracking-widest uppercase text-xs mb-4 block">
                                    Nuestras Especialidades
                                </span>
                                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900  tracking-tight">
                                    Bienestar completo diseñado a tu medida
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 ">
                                {services?.map((service, idx) => {
                                    const [ref, isVisible] =
                                        useScrollReveal(0.1);
                                    return (
                                        <div
                                            key={idx}
                                            ref={ref}
                                            className={`group bg-white rounded-[2.5rem] p-1 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(150,38,62,0.12)] border border-gray-100 transition-all duration-500 hover:-translate-y-2 overflow-hidden ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
                                            style={{
                                                transitionDelay: `${idx * 150}ms`,
                                            }}
                                        >
                                            <div className="flex flex-col md:flex-row h-full">
                                                {/* Parte Izquierda: Icono y Título */}
                                                <div className="md:w-2/5 p-8 flex flex-col justify-center items-center text-center bg-gray-50/50 relative">
                                                    <div className="absolute top-0 left-0 w-1 h-full bg-[#96263e] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                    <div className="w-24 h-24 rounded-3xl bg-white flex items-center justify-center p-5 shadow-xl border border-gray-50 mb-6 transform transition-transform">
                                                        <img
                                                            src={`/api/service/media/${service.image}`}
                                                            alt={service.title}
                                                            loading="lazy"
                                                            className="w-full h-full object-contain  transition-all"
                                                            onError={(e) =>
                                                                (e.target.src =
                                                                    "/api/cover/thumbnail/null")
                                                            }
                                                        />
                                                    </div>
                                                    <h3 className="text-xl font-black text-gray-900 leading-tight">
                                                        {service.title}
                                                    </h3>
                                                </div>

                                                {/* Parte Derecha: Info y Lista */}
                                                <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center bg-white border-l border-gray-100">
                                                    <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">
                                                        {service.description}
                                                    </p>
                                                    <ul className="space-y-3">
                                                        {service?.characteristics?.map(
                                                            (item, i) => (
                                                                <li
                                                                    key={i}
                                                                    className="flex items-start gap-3 text-sm text-gray-600 font-semibold"
                                                                >
                                                                    <CheckCircle2 className="w-5 h-5 text-[#b4d121] shrink-0 mt-0.5" />
                                                                    {item}
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}
                {/* 4. SEÑALES / CONDICIONES (SPLIT LAYOUT) */}
                <section
                    id="señales"
                    className="py-24  bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a] to-transparent  relative overflow-hidden"
                >
                    {/* Imagen de fondo en el lado derecho con máscara de degradado */}
                    <div className="absolute top-0 right-0 w-full lg:w-3/5 h-full ">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent z-10 block"></div>
                        {landingEnfoque?.image && (
                            <img
                                src={`/api/landing_home/media/${landingEnfoque.image}`}
                                alt="Terapia Quiropráctica"
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>

                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
                        <div className="lg:w-2/3 pr-0 lg:pr-12">
                            {landingEnfoque?.subtitle && (
                                <span className="inline-block py-1 px-4 rounded-full border border-white/20 text-[#b4d121] text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm bg-white/5">
                                    {landingEnfoque.subtitle}
                                </span>
                            )}
                            {landingEnfoque?.title && (
                                <h2 className="text-4xl md:text-[3rem] font-extrabold text-white  leading-[1.1] mb-6 drop-shadow-lg">
                                    {landingEnfoque.title}
                                </h2>
                            )}
                            {landingEnfoque?.description && (
                                <p className="text-gray-300 text-lg mb-10 font-light leading-relaxed">
                                    {landingEnfoque.description}
                                </p>
                            )}

                            {specialities?.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {specialities?.map((senal, idx) => {
                                        const [ref, isVisible] =
                                            useScrollReveal(0.1);
                                        return (
                                            <div
                                                key={idx}
                                                ref={ref}
                                                className={`flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-700 hover:bg-white/10 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                                                style={{
                                                    transitionDelay: `${idx * 100}ms`,
                                                }}
                                            >
                                                <div className="w-8 h-8 rounded-full bg-[#b4d121] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(180,209,33,0.3)]">
                                                    <CheckCircle2 className="w-5 h-5 text-[#0a0a0a]" />
                                                </div>
                                                <span className="text-white font-medium text-sm leading-tight pt-1">
                                                    {senal.name}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* 5. PROFESIONALES (DISEÑO EDITORIAL) */}
                {staffs?.length > 0 && (
                    <section
                        id="profesionales"
                        className="py-28 bg-[#f8f9fa] relative"
                    >
                        <div className="absolute top-0 right-0 w-full h-full bg-pattern-grid pointer-events-none"></div>

                        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                            <div className="text-center max-w-2xl mx-auto mb-20">
                                {landingStaff?.title && (
                                    <h2 className="text-4xl md:text-5xl font-extrabold  text-gray-900 mb-6 tracking-tight">
                                        {landingStaff.title}
                                    </h2>
                                )}
                                {landingStaff?.description && (
                                    <p className="text-gray-600 text-lg">
                                        {landingStaff.description}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                                {staffs.map((prof, idx) => {
                                    const [ref, isVisible] =
                                        useScrollReveal(0.2);
                                    return (
                                        <div
                                            key={idx}
                                            ref={ref}
                                            className={`group bg-white cursor-pointer rounded-[2.5rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 transform hover:-translate-y-0 transition-all duration-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-0 opacity-0"}`}
                                            style={{
                                                transitionDelay: `${idx * 150}ms`,
                                            }}
                                        >
                                            <div className="relative h-96 overflow-hidden bg-gray-100">
                                                <img
                                                    src={`/api/staff/media/${prof.image}`}
                                                    alt={prof.name}
                                                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                                                {/* Uni Logo overlay */}
                                                <div className="absolute top-6 right-6 w-16 h-16 bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-white/50 transform group-hover:scale-110 transition-transform duration-500">
                                                    <img
                                                        src={`/api/staff/media/${prof.banner}`}
                                                        alt={
                                                            "Universidad de estudios de " +
                                                            prof.name
                                                        }
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>

                                                <div className="absolute bottom-6 left-6 right-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                    {/* Badge Titulo integrado */}
                                                    <div className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30 text-white text-[10px] font-bold uppercase tracking-wider w-max mb-4">
                                                        {prof.job}
                                                    </div>
                                                    <h3 className="text-3xl font-black  mb-2 shadow-sm">
                                                        {prof.name}
                                                    </h3>

                                                    <p className="text-xs text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 group-hover:line-clamp-none transition-opacity duration-500 mb-3">
                                                        {prof.description}
                                                    </p>
                                                    <div className="w-10 h-1 bg-[#b4d121] rounded-full group-hover:w-full transition-all duration-500"></div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}
                {/* 6. TESTIMONIOS (CON GLOW EFFECT) */}
                {testimonies?.length > 0 && (
                    <section
                        id="testimonios"
                        className="py-24 bg-white relative overflow-hidden"
                    >
                        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
                            <div className="inline-flex flex-col items-center justify-center mb-16 relative">
                                <div className="absolute inset-0 bg-yellow-400/20 blur-[50px] rounded-full"></div>
                                <h3 className="text-6xl md:text-7xl font-black text-gray-900  mb-3 tracking-tighter">
                                    4.8
                                    <span className="text-3xl text-gray-400 font-bold">
                                        /5
                                    </span>
                                </h3>
                                <div className="flex gap-1.5 mb-4 relative z-10">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <Star
                                            key={i}
                                            className="w-7 h-7 fill-yellow-400 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-500 font-medium uppercase tracking-widest text-sm">
                                    Reseñas Verificadas
                                </p>
                            </div>

                            {(() => {
                                const prevRef = useRef(null);
                                const nextRef = useRef(null);
                                return (
                                    <div className="relative">
                                        <style>{`
                                        .testimonies-swiper .swiper-slide { height: auto; }
                                        .testimonies-swiper { overflow: visible !important; }
                                        .testimonies-swiper-wrap { overflow: hidden; }
                                        .test-nav-btn {
                                            width: 44px; height: 44px;
                                            background: white;
                                            border-radius: 50%;
                                            box-shadow: 0 4px 20px rgba(0,0,0,0.12);
                                            color: #96263e;
                                            border: none;
                                            cursor: pointer;
                                            display: flex; align-items: center; justify-content: center;
                                            transition: all 0.2s ease;
                                            font-size: 18px;
                                        }
                                        .test-nav-btn:hover {
                                            background: #96263e;
                                            color: white;
                                            transform: scale(1.1);
                                        }
                                        .test-pagination .swiper-pagination-bullet {
                                            background: #d1d5db; opacity: 1;
                                            width: 8px; height: 8px;
                                            display: inline-block;
                                            border-radius: 4px;
                                            margin: 0 4px;
                                            cursor: pointer;
                                            transition: all 0.3s ease;
                                        }
                                        .test-pagination .swiper-pagination-bullet-active {
                                            background: #96263e; width: 24px;
                                        }
                                    `}</style>

                                        {/* Flechas externas arriba a la derecha */}
                                        <div className="flex items-center justify-end gap-3 mb-6">
                                            <button
                                                ref={prevRef}
                                                className="test-nav-btn"
                                                aria-label="Anterior"
                                            >
                                                &#8592;
                                            </button>
                                            <button
                                                ref={nextRef}
                                                className="test-nav-btn"
                                                aria-label="Siguiente"
                                            >
                                                &#8594;
                                            </button>
                                        </div>

                                        {/* Swiper con overflow clip */}
                                        <div className="testimonies-swiper-wrap">
                                            <Swiper
                                                className="testimonies-swiper !py-4 !px-4"
                                                modules={[
                                                    Autoplay,
                                                    Navigation,
                                                    Pagination,
                                                ]}
                                                slidesPerView={1}
                                                spaceBetween={24}
                                                loop={testimonies.length > 3}
                                                autoplay={{
                                                    delay: 5000,
                                                    disableOnInteraction: false,
                                                    pauseOnMouseEnter: true,
                                                }}
                                                navigation={{
                                                    prevEl: prevRef.current,
                                                    nextEl: nextRef.current,
                                                }}
                                                pagination={{
                                                    clickable: true,
                                                    el: ".test-pagination",
                                                }}
                                                onSwiper={(swiper) => {
                                                    // Reasignar refs después del mount
                                                    setTimeout(() => {
                                                        if (
                                                            swiper.params
                                                                ?.navigation
                                                        ) {
                                                            swiper.params.navigation.prevEl =
                                                                prevRef.current;
                                                            swiper.params.navigation.nextEl =
                                                                nextRef.current;
                                                            swiper.navigation.destroy();
                                                            swiper.navigation.init();
                                                            swiper.navigation.update();
                                                        }
                                                    }, 0);
                                                }}
                                                breakpoints={{
                                                    768: { slidesPerView: 2 },
                                                    1024: { slidesPerView: 3 },
                                                }}
                                            >
                                                {testimonies.map(
                                                    (test, idx) => (
                                                        <SwiperSlide
                                                            key={idx}
                                                            className="h-auto"
                                                        >
                                                            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_10px_20px_rgba(0,0,0,0.1)]  border border-gray-100 text-left hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(150,38,62,0.08)] transition-all duration-500 relative flex flex-col h-full">
                                                                <Quote className="absolute top-8 right-8 w-10 h-10 text-gray-100" />
                                                                <div className="flex gap-1 mb-6">
                                                                    {[
                                                                        1, 2, 3,
                                                                        4, 5,
                                                                    ].map(
                                                                        (i) => (
                                                                            <Star
                                                                                key={
                                                                                    i
                                                                                }
                                                                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                                                            />
                                                                        ),
                                                                    )}
                                                                </div>
                                                                <p className="text-gray-700 leading-relaxed mb-8 relative z-10 text-lg flex-1">
                                                                    "
                                                                    {
                                                                        test.description
                                                                    }
                                                                    "
                                                                </p>
                                                                <div className="flex items-center gap-4 pt-6 border-t border-gray-100 mt-auto">
                                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#96263e] to-[#b4d121] flex items-center justify-center font-black text-xl text-white uppercase shadow-md shrink-0">
                                                                        {test.name.charAt(
                                                                            0,
                                                                        )}
                                                                    </div>
                                                                    <div className="text-left">
                                                                        <h4 className="font-bold text-gray-900">
                                                                            {
                                                                                test.name
                                                                            }
                                                                        </h4>
                                                                        <p className="text-xs text-gray-400 font-medium">
                                                                            {
                                                                                test.date
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </SwiperSlide>
                                                    ),
                                                )}
                                            </Swiper>
                                        </div>

                                        {/* Paginación externa debajo */}
                                        <div className="test-pagination flex justify-center mt-8"></div>
                                    </div>
                                );
                            })()}
                        </div>
                    </section>
                )}

                {/* 8. UBÍCANOS (MAPA DINÁMICO) */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-12">
                            {landingContact?.title && (
                                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 ">
                                    {landingContact?.title}
                                </h2>
                            )}
                            {landingContact?.description && (
                                <p className="text-gray-500 mt-4">
                                    {landingContact?.description}
                                </p>
                            )}
                        </div>

                        {sedes.length > 0 && (
                            <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                                <div className="flex flex-wrap p-2 bg-gray-50/50 border-b border-gray-100">
                                    {sedes.map((sede, idx) => (
                                        <button
                                            key={sede.id}
                                            onClick={() =>
                                                setSelectedSedeIdx(idx)
                                            }
                                            className={`flex-1 min-w-[140px] m-1 py-3 px-4 rounded-2xl text-center font-bold text-sm transition-all duration-300 ${
                                                selectedSedeIdx === idx
                                                    ? "bg-white text-[#96263e] shadow-sm border border-gray-100 scale-100"
                                                    : "bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900 scale-95"
                                            }`}
                                        >
                                            {sede.name}
                                        </button>
                                    ))}
                                </div>

                                <div className="h-[450px] w-full bg-gray-100 relative">
                                    <iframe
                                        src={sedes[selectedSedeIdx]?.mapUrl}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className="absolute inset-0 filter contrast-[0.9] saturate-[1.2]"
                                    ></iframe>

                                    {/* Tarjeta de info flotante sobre el mapa */}
                                    <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white">
                                        <h4 className="font-bold text-xl text-gray-900  mb-3">
                                            {sedes[selectedSedeIdx]?.name}
                                        </h4>
                                        <div className="space-y-3 mb-5">
                                            <div className="flex items-start gap-3 text-gray-600">
                                                <MapPin className="w-5 h-5 text-[#96263e] shrink-0 mt-0.5" />
                                                <span className="text-sm font-medium leading-snug">
                                                    {
                                                        sedes[selectedSedeIdx]
                                                            ?.address
                                                    }
                                                </span>
                                            </div>
                                            <div className="flex items-start gap-3 text-gray-600">
                                                <Clock className="w-5 h-5 text-[#96263e] shrink-0 mt-0.5" />
                                                <div className="flex flex-col gap-1">
                                                    {sedes[
                                                        selectedSedeIdx
                                                    ]?.hours.map((h, i) => (
                                                        <div
                                                            key={i}
                                                            className="text-xs font-medium leading-none"
                                                        >
                                                            <span className="text-[#96263e] font-bold">
                                                                {h.days}:
                                                            </span>{" "}
                                                            {h.time}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <a
                                            href={`tel:${sedes[selectedSedeIdx]?.phone}`}
                                            className="flex items-center justify-center gap-2 w-full py-3 bg-[#96263e] text-white rounded-xl font-bold hover:bg-[#7a1e32] transition-colors shadow-lg"
                                        >
                                            <Phone className="w-4 h-4" /> Llamar
                                            sede
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>

            <Footer
                generals={generals}
                services={services}
                socials={socials}
                scrollToForm={scrollToForm}
            />
        </Base>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Home {...properties} />
        </CarritoProvider>,
    );
});
