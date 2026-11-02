import React from "react";
import { Phone, Mail } from "lucide-react";
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

const Footer = ({
    generals = [],
    services = [],
    socials = [],
    scrollToForm,
}) => {
    const footerDescription =
        generals.find((x) => x.correlative === "footer_description")
            ?.description || "";
    const supportPhone =
        generals.find((x) => x.correlative === "support_phone")?.description ||
        "";
    const supportEmail =
        generals.find((x) => x.correlative === "support_email")?.description ||
        "";

    const isHomePage =
        typeof window !== "undefined" && window.location.pathname === "/";

    const handleFooterAction = (e, targetId) => {
        if (isHomePage) {
            e.preventDefault();
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <footer className="bg-[#0a0a0a] text-white pt-24 pb-12 relative overflow-hidden">
            {/* Glow de fondo */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#96263e]/20 rounded-t-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
                    <div className="lg:col-span-3 pr-0 ">
                        <img
                            src="/assets/img/logo.png"
                            alt="Quiroinnova"
                            className="h-40 w-auto object-contain  mb-2"
                        />
                        <p className="text-gray-400 text-sm leading-relaxed mb-8">
                            {footerDescription}
                        </p>
                        <div className="flex gap-3">
                            {socials?.map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#b4d121] hover:text-black transition-all"
                                    title={social.name}
                                >
                                    <SocialIcon icon={social.icon} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-3 ">
                        <p className="text-gray-400 text-sm leading-relaxed mb-8">
                            Quiroprácticos titulados internacionalmente
                            reconocidos por la:
                        </p>
                        <img
                            src="/assets/img/asociación-de-quiroprácticos-del-Peru.png"
                            alt="Asociación de Quiroprácticos del Perú"
                            className="w-full h-auto object-contain lg:px-6 mb-8 "
                        />
                        <img
                            src="/assets/img/world-federation-of-chiropractic.png"
                            alt="World Federation of Chiropractic"
                            className="w-full h-auto object-contain lg:px-6"
                        />
                    </div>

                    <div className="lg:col-span-3">
                        <h4 className="font-bold text-lg mb-6  text-white">
                            Servicios
                        </h4>
                        <ul className="space-y-3 text-sm text-gray-400 font-medium">
                            {services?.map((service, idx) => (
                                <li key={idx}>
                                    <a
                                        href={
                                            isHomePage
                                                ? "#servicios"
                                                : "/#servicios"
                                        }
                                        onClick={(e) =>
                                            handleFooterAction(e, "servicios")
                                        }
                                        className="hover:text-[#b4d121] transition-colors"
                                    >
                                        {service.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-3 bg-white/5 p-6 max-h-min rounded-3xl border border-white/10 backdrop-blur-sm">
                        <h4 className="font-bold text-base mb-4  text-white">
                            ¿Listo para sanar?
                        </h4>
                        <p className="text-xs text-gray-400 mb-6">
                            Aprovecha nuestra promoción web y agenda tu primera
                            evaluación hoy mismo.
                        </p>
                        <div className="space-y-3 mb-6">
                            {supportPhone && (
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <Phone className="w-4 h-4 text-[#b4d121]" />
                                    <span>{supportPhone}</span>
                                </div>
                            )}
                            {supportEmail && (
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <Mail className="w-4 h-4 text-[#b4d121]" />
                                    <span>{supportEmail}</span>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={(e) => {
                                if (isHomePage && scrollToForm) {
                                    scrollToForm();
                                } else {
                                    window.location.href = "/#reserva";
                                }
                            }}
                            className="bg-[#b4d121] text-gray-900 px-6 py-3 rounded-full font-bold text-sm hover:bg-white w-full transition-colors shadow-lg"
                        >
                            Agendar Cita
                        </button>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-500">
                    <p>
                        Copyright © 2026 Centro Quiropráctico Quiro Innova |
                        Powered by{" "}
                        <a
                            href="https://mundoweb.pe"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition font-medium italic"
                        >
                            Mundoweb
                        </a>
                    </p>
                    <div className="flex gap-6">
                        <a
                            href="/privacy-policy"
                            className="hover:text-white transition-colors"
                        >
                            Políticas de Privacidad
                        </a>
                        <a
                            href="/terms-and-conditions"
                            className="hover:text-white transition-colors"
                        >
                            Términos y Condiciones
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
