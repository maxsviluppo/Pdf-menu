import { useState } from "react";
import { DigitalMenuView } from "./components/DigitalMenuView";
import { PdfPagesView } from "./components/PdfPagesView";
import { CoralHeader, CoralFooter } from "./components/MarineDecor";
import {
  Compass,
  BookOpen,
  Phone,
  Clock,
  MapPin,
  Sparkles,
  Info,
  Calendar,
  Waves
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"interactive" | "pdf">("interactive");

  return (
    <div className="min-h-screen bg-watercolor flex flex-col justify-between selection:bg-black selection:text-white">
      {/* Hero Header Area in a pristine minimalist rounded container */}
      <div className="max-w-4xl mx-auto w-full px-4 mt-8">
        <header className="relative bg-white border border-gray-200 rounded-lg py-12 px-6 sm:px-10 text-center shadow-xs overflow-hidden">
          {/* Subtle minimal geometric top indicator */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-black w-full"></div>

          {/* Minimal branding badge */}
          <div className="inline-flex items-center space-x-1.5 bg-black text-white px-3.5 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest mb-5">
            <Waves className="w-3.5 h-3.5" />
            <span>Molo 18 • Lido Baia Azzurra</span>
          </div>

          {/* Clean Main Display Typography */}
          <h1 className="font-sans text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            Molo 18, Baia Azzurra
          </h1>
          
          <p className="font-sans text-xs sm:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
            Sfoglia comodamente il nostro listino sapori sotto l'ombrellone. Caffetteria, bibite ghiacciate, gelati Sammontana & Algida, aperitivi e cocktail d'autore.
          </p>

          {/* Beach Details Ribbons styled in ultra-clean greyscale */}
          <div className="flex flex-wrap justify-center items-center gap-y-20 gap-x-6 text-[11px] text-gray-500 font-semibold mt-6 pt-5 border-t border-gray-100">
            <span className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-black" />
              <span>Aperto Tutti i Giorni</span>
            </span>
            <span className="hidden sm:inline text-gray-300">•</span>
            <span className="flex items-center space-x-1.5 font-mono">
              <Phone className="w-3.5 h-3.5 text-black" />
              <span>+39 348 444 8543</span>
            </span>
            <span className="hidden sm:inline text-gray-300">•</span>
            <span className="flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-black" />
              <span>Salento, Puglia</span>
            </span>
          </div>
        </header>
      </div>

      {/* Tabs View Selector styled with crisp modern borders */}
      <section className="max-w-md mx-auto w-full px-4 mt-8 mb-8">
        <div className="bg-white p-1 rounded-lg border border-gray-200 shadow-xs flex space-x-1">
          {/* Tag: Interactive View */}
          <button
            onClick={() => setActiveTab("interactive")}
            className={`flex-1 py-2.5 px-4 rounded-md text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === "interactive"
                ? "bg-black text-white shadow-sm"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-950"
            }`}
            id="tab-btn-interactive"
          >
            <Compass className="w-4 h-4" />
            <span>📱 Menù Interattivo</span>
          </button>

          {/* Tag: Real reproduction pages book */}
          <button
            onClick={() => setActiveTab("pdf")}
            className={`flex-1 py-2.5 px-4 rounded-md text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === "pdf"
                ? "bg-black text-white shadow-sm"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-950"
            }`}
            id="tab-btn-pdf"
          >
            <BookOpen className="w-4 h-4" />
            <span>📖 Sfoglia Brochure</span>
          </button>
        </div>
      </section>

      {/* Main View Area */}
      <main className="flex-1 w-full pb-16">
        {activeTab === "interactive" ? (
          <div>
            <div className="text-center max-w-lg mx-auto px-4 mb-4">
              <span className="inline-block bg-black text-white px-2.5 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-widest mb-2.5">
                Ricerca & Calcolatore
              </span>
              <p className="text-xs text-gray-400">
                Filtra per intolleranze (Gluten Free, Lattosio, Vegano) e aggiungi gli articoli al carrello per sommare la tua comanda in tempo reale.
              </p>
            </div>
            <DigitalMenuView />
          </div>
        ) : (
          <div>
            <div className="text-center max-w-lg mx-auto px-4 mb-6">
              <span className="inline-block bg-black text-white px-2.5 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-widest mb-2.5">
                Brochure Originale
              </span>
              <p className="text-xs text-gray-400">
                Fedele riproduzione cartacea del listino, arricchita con dot leaders, prezzi differenziati e grafica ad alta definizione.
              </p>
            </div>
            <PdfPagesView />
          </div>
        )}
      </main>

      {/* Clean high-contrast white footer with sleek border */}
      <footer className="bg-white text-gray-600 pt-12 pb-8 border-t border-gray-200 mt-12 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          
          {/* Logo brand & Address */}
          <div className="md:col-span-1 space-y-3">
            <h3 className="font-sans text-lg font-extrabold text-gray-900 tracking-tight">
              MOLO 18 • BAIA AZZURRA
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Stabilimento Balneare d'eccellenza. Atmosfera rilassata, cocktail bar di qualità superiore e spiaggia cristallina del Salento.
            </p>
            <p className="text-[11px] text-gray-400 font-mono">
              © 2026 Baia Azzurra s.r.l.
            </p>
          </div>

          {/* Quick links & contacts */}
          <div className="space-y-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-gray-900">
              Contatti Rapidi
            </h4>
            <ul className="space-y-2 text-xs text-gray-500 font-medium">
              <li className="flex items-center space-x-1.5">
                <span>💬 WhatsApp:</span>
                <a href="https://wa.me/393484448543" className="hover:text-black font-mono font-bold underline underline-offset-2">
                  +39 348 444 8543
                </a>
              </li>
              <li className="flex items-center space-x-1.5">
                <span>🏝️ Servizio:</span>
                <span className="text-gray-950 font-semibold">Ombrelloni & Lettini</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span>🏖️ Consegna:</span>
                <span className="text-gray-950 font-semibold">Direttamente all'ombrellone</span>
              </li>
            </ul>
          </div>

          {/* Useful notes about service */}
          <div className="space-y-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-gray-900">
              Allergeni & Note
            </h4>
            <p className="text-[11px] text-gray-400 leading-relaxed font-normal">
              Si prega di far presente eventuali intolleranze alimentari gravi al nostro personale prima dell'ordine. Gli articoli contrassegnati con <strong>GF</strong> sono Gluten-Free di fabbrica, <strong>LF</strong> sono formulati senza derivati del latte, e <strong>🌱</strong> sono idonei per vegani.
            </p>
          </div>

        </div>

        <div className="max-w-4xl mx-auto px-4 mt-8 pt-6 border-t border-gray-100 text-center text-[11px] text-gray-400 font-mono tracking-wider">
          SVILUPPATO CON AMORE • PRONTO PER VERCEL SPA HOSTING
        </div>
      </footer>
    </div>
  );
}
