import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const Header = ({ scrollToForm, forceFixed = false }) => {
    const [isScrolled, setIsScrolled] = useState(forceFixed);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (forceFixed) {
            setIsScrolled(true);
            return;
        }
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        handleScroll(); // Check initial position on mount

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [forceFixed]);

    const isHomePage = window.location.pathname === "/";

    const handleNavClick = (e, targetId) => {
        if (isHomePage) {
            e.preventDefault();
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                setIsMobileMenuOpen(false);
            }
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isScrolled
                    ? "bg-white/90 backdrop-blur-lg shadow-sm py-3 "
                    : "bg-transparent py-3"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
                <div className="flex items-center gap-2 cursor-pointer group">
                    <a href="/">
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
                                className="transition-all duration-500 w-auto object-contain transform group-hover:scale-105 h-12 md:h-20  drop-shadow-sm"
                            />
                        )}
                    </a>
                </div>
                <nav className="hidden items-center gap-8 bg-white/5 px-6 py-2 rounded-full border border-white/10 backdrop-blur-sm">
                    {[
                        "Servicios",
                        "Señales",
                        "Profesionales",
                        "Testimonios",
                    ].map((item) => (
                        <a
                            key={item}
                            href={isHomePage ? `#${item.toLowerCase()}` : `/#${item.toLowerCase()}`}
                            onClick={(e) => handleNavClick(e, item.toLowerCase())}
                            className={`text-sm font-semibold tracking-wide transition-colors ${
                                isScrolled
                                    ? "text-gray-600 hover:text-[#96263e]"
                                    : "text-gray-100 hover:text-[#b4d121]"
                            }`}
                        >
                            {item}
                        </a>
                    ))}
                </nav>
                <div className="hidden md:block">
                    <button
                        onClick={
                            isHomePage && scrollToForm
                                ? scrollToForm
                                : () => (window.location.href = "/#reserva")
                        }
                        className={`px-8 py-3 rounded-full font-bold text-sm tracking-wide transition-all duration-300 shadow-lg ${
                            isScrolled
                                ? "bg-[#96263e] text-white hover:bg-[#7a1e32] hover:shadow-[#96263e]/30"
                                : "bg-[#b4d121] text-gray-900 hover:bg-white hover:-translate-y-1"
                        }`}
                    >
                        AGENDAR CITA
                    </button>
                </div>
                <button
                    className="md:hidden p-2 rounded-full bg-black/10 backdrop-blur-md border border-white/20"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <X
                            className={`w-6 h-6 ${
                                isScrolled ? "text-gray-900" : "text-white"
                            }`}
                        />
                    ) : (
                        <Menu
                            className={`w-6 h-6 ${
                                isScrolled ? "text-gray-900" : "text-white"
                            }`}
                        />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden absolute top-full left-0 w-full bg-white shadow-2xl transition-all duration-300 origin-top border-t border-gray-100 ${
                    isMobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                }`}
            >
                <div className="flex flex-col px-6 py-6 gap-2">
                    {["Servicios", "Señales", "Profesionales"].map((item) => (
                        <a
                            key={item}
                            href={isHomePage ? `#${item.toLowerCase()}` : `/#${item.toLowerCase()}`}
                            onClick={(e) => {
                                handleNavClick(e, item.toLowerCase());
                                setIsMobileMenuOpen(false);
                            }}
                            className="text-gray-800 font-bold text-lg py-3 border-b border-gray-50 flex items-center justify-between group"
                        >
                            {item}
                            <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-[#96263e] transition-colors" />
                        </a>
                    ))}
                    <button
                        onClick={() => {
                            if (isHomePage && scrollToForm) {
                                scrollToForm();
                            } else {
                                window.location.href = "/#reserva";
                            }
                            setIsMobileMenuOpen(false);
                        }}
                        className="mt-6 bg-gradient-to-r from-[#96263e] to-[#7a1e32] text-white w-full py-4 rounded-2xl font-bold shadow-lg shadow-[#96263e]/20"
                    >
                        Agendar Cita Ahora
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
