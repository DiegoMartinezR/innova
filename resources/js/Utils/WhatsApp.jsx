import { useState, useRef, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

const WhatsApp = ({ data }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Obtener asesores de WhatsApp
    const advisors = (() => {
        const raw = data.find(
            (x) => x.correlative === "whatsapp_advisors",
        )?.description;
        if (!raw) return [];
        try {
            return typeof raw === "string" ? JSON.parse(raw) : raw;
        } catch (e) {
            return [];
        }
    })();

    // Cerrar dropdown al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleClick = (e) => {
        if (advisors.length === 0) return;

        if (advisors.length === 1) {
            // Si solo hay un asesor, abrir WhatsApp directamente
            const advisor = advisors[0];
            window.open(
                `https://api.whatsapp.com/send?phone=${advisor.phone}&text=${encodeURIComponent(advisor.message || "¡Hola! Necesito información")}`,
                "_blank",
            );
        } else {
            // Si hay múltiples asesores, mostrar dropdown
            e.preventDefault();
            setIsDropdownOpen(!isDropdownOpen);
        }
    };

    const handleAdvisorClick = (advisor) => {
        window.open(
            `https://api.whatsapp.com/send?phone=${advisor.phone}&text=${encodeURIComponent(advisor.message || "¡Hola! Necesito información")}`,
            "_blank",
        );
        setIsDropdownOpen(false);
    };

    if (advisors.length === 0) return null;

    return (
        <>
            <style>{`
                @keyframes bounce-subtle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                .animate-bounce-subtle {
                    animation: bounce-subtle 2s infinite ease-in-out;
                }
                @keyframes slide-up-fade {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-up-fade {
                    animation: slide-up-fade 0.3s ease-out forwards;
                }
            `}</style>
            <div
                id={data?.element_id || null}
                ref={dropdownRef}
                className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3"
            >
                {/* Dropdown de asesores */}
                <AnimatePresence>
                    {isDropdownOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className="mb-4 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 p-6 w-[280px] overflow-hidden relative"
                        >
                            <div className="absolute top-0 inset-x-0 h-1 bg-[#25D366]"></div>

                            <div className="flex items-center justify-between mb-5">
                                <h4 className="font-black text-gray-900 text-sm  flex items-center gap-2">
                                    <svg
                                        className="w-5 h-5 text-[#25D366]"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>{" "}
                                    Asesores WhatsApp
                                </h4>
                                <button
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="text-gray-400 hover:text-gray-900 transition-colors"
                                >
                                    ✕
                                </button>
                            </div>

                             <div className="flex flex-col gap-2 max-h-[350px] overflow-y-auto pr-1">
                                 {advisors.map((advisor, index) => (
                                     <a
                                         key={index}
                                         href={`https://api.whatsapp.com/send?phone=${advisor.phone}&text=${encodeURIComponent(advisor.message || "¡Hola! Necesito información")}`}
                                         target="_blank"
                                         rel="noopener noreferrer"
                                         onClick={() => setIsDropdownOpen(false)}
                                         className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 hover:bg-[#25D366]/10 border border-transparent hover:border-[#25D366]/30 transition-all group/item text-left w-full"
                                     >
                                         <div className="flex items-center gap-3 pointer-events-none">
                                             <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                                                 {advisor.photo ? (
                                                     <img
                                                         src={`/assets/resources/${advisor.photo}`}
                                                         alt={advisor.name}
                                                         className="w-full h-full object-cover"
                                                         onError={(e) => {
                                                             e.target.src =
                                                                 "/api/cover/thumbnail/null";
                                                         }}
                                                     />
                                                 ) : (
                                                     <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xs font-bold">
                                                         {advisor.name
                                                             ?.charAt(0)
                                                             .toUpperCase()}
                                                     </div>
                                                 )}
                                             </div>
                                             <div className="flex flex-col min-w-0">
                                                 <span className="font-bold text-gray-900 text-xs truncate">
                                                     {advisor.name}
                                                 </span>
                                                 <span className="text-[10px] text-gray-500 font-medium truncate">
                                                     {advisor.position ||
                                                         "Asesor"}
                                                 </span>
                                             </div>
                                         </div>
                                         <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 group-hover/item:text-[#25D366] group-hover/item:scale-110 transition-all shadow-sm shrink-0 pointer-events-none">
                                             <svg
                                                 className="w-4 h-4"
                                                 fill="none"
                                                 stroke="currentColor"
                                                 viewBox="0 0 24 24"
                                             >
                                                 <path
                                                     strokeLinecap="round"
                                                     strokeLinejoin="round"
                                                     strokeWidth="2"
                                                     d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                 />
                                             </svg>
                                         </div>
                                     </a>
                                 ))}
                             </div>
                         </motion.div>
                     )}
                 </AnimatePresence>
 
                 {/* Botón Principal Toggle */}
                 {advisors.length === 1 ? (
                     <motion.a
                         href={`https://api.whatsapp.com/send?phone=${advisors[0].phone}&text=${encodeURIComponent(advisors[0].message || "¡Hola! Necesito información")}`}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex items-center justify-center bg-[#25D366] text-white p-4 lg:p-5 rounded-full shadow-[0_15px_35px_rgba(37,211,102,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 relative border-2 border-white group z-50 animate-bounce-subtle"
                         whileHover={{ scale: 1.1 }}
                         whileTap={{ scale: 0.9 }}
                     >
                         <img
                             src="/assets/img/whatsapp.svg"
                             alt="WhatsApp"
                             className="w-8 h-8 lg:w-9 lg:h-9 pointer-events-none"
                         />
 
                         <span className="absolute -top-12 right-0 bg-white text-gray-900 text-[11px] font-black uppercase px-4 py-2 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all -translate-y-2 group-hover:translate-y-0 whitespace-nowrap pointer-events-none border border-gray-100">
                             ¿En qué podemos ayudarte?
                         </span>
                     </motion.a>
                 ) : (
                     <motion.button
                         onClick={handleClick}
                         className={`flex items-center justify-center bg-[#25D366] text-white p-4 lg:p-5 rounded-full shadow-[0_15px_35px_rgba(37,211,102,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 relative border-2 border-white group z-50 ${
                             !isDropdownOpen ? "animate-bounce-subtle" : ""
                         }`}
                         whileHover={{ scale: 1.1 }}
                         whileTap={{ scale: 0.9 }}
                     >
                         {isDropdownOpen ? (
                             <span className="text-xl font-bold px-2 pointer-events-none">✕</span>
                         ) : (
                             <img
                                 src="/assets/img/whatsapp.svg"
                                 alt="WhatsApp"
                                 className="w-8 h-8 lg:w-9 lg:h-9 pointer-events-none"
                             />
                         )}
 
                         {!isDropdownOpen && (
                             <span className="absolute -top-12 right-0 bg-white text-gray-900 text-[11px] font-black uppercase px-4 py-2 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all -translate-y-2 group-hover:translate-y-0 whitespace-nowrap pointer-events-none border border-gray-100">
                                 ¿En qué podemos ayudarte?
                             </span>
                         )}
                     </motion.button>
                 )}
            </div>
        </>
    );
};

export default WhatsApp;
