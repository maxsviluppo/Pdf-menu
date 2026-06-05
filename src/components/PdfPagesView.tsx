import React, { useState } from "react";
import { CoralHeader, CoralFooter } from "./MarineDecor";
import { MENU_ITEMS, CATEGORIES } from "../data/menuData";
import { MenuItem } from "../types";
import { 
  ChevronLeft, 
  ChevronRight, 
  Grid, 
  BookOpen, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Printer, 
  Search, 
  Share2, 
  Sparkles,
  Award,
  Calendar,
  Waves,
  MapPin,
  Clock,
  Phone,
  FileText
} from "lucide-react";

// Structure our brochure pages to pull items dynamically
interface PageStructure {
  pageNumber: number;
  title: string;
  subtitle?: string;
  type: "cover" | "info" | "items";
  categories?: string[];
  showPromoCard?: boolean;
}

const BROCHURE_PAGES: PageStructure[] = [
  { 
    pageNumber: 1, 
    title: "Copertina", 
    type: "cover" 
  },
  { 
    pageNumber: 2, 
    title: "Benvenuto & Servizi", 
    type: "info" 
  },
  { 
    pageNumber: 3, 
    title: "Bar Caffetteria", 
    subtitle: "Inizia la giornata al meglio o concediti una fresca pausa relax",
    type: "items", 
    categories: ["bar_caffetteria"] 
  },
  { 
    pageNumber: 4, 
    title: "Bibite & Stuzzichini", 
    subtitle: "Bibite fresche, cole, tè freddi e le golose patatine San Carlo",
    type: "items", 
    categories: ["bibite", "patatine"] 
  },
  { 
    pageNumber: 5, 
    title: "Pasticceria & Rosticceria", 
    subtitle: "Cornetti caldi, squisiti pasticciotti leccesi e rustici salati",
    type: "items", 
    categories: ["pasticceria_rosticceria"] 
  },
  { 
    pageNumber: 6, 
    title: "Birre & Liquori", 
    subtitle: "Pregiate birre fresche nazionali e estere, amari tradizionali",
    type: "items", 
    categories: ["birre", "liquori_amari"] 
  },
  { 
    pageNumber: 7, 
    title: "Bottiglie & Bollicine", 
    subtitle: "Selezionata cantina di spumanti, prosecco doc e pregiati vini locali",
    type: "items", 
    categories: ["bottiglie"] 
  },
  { 
    pageNumber: 8, 
    title: "Cocktail d'Autore", 
    subtitle: "Dai freschi Sprit-z ai cocktail tropicali per il tuo aperitivo perfetto",
    type: "items", 
    categories: ["cocktail_aperitivi"] 
  },
  { 
    pageNumber: 9, 
    title: "I Gelati Algida", 
    subtitle: "Magnum speciali, biscotti Cucciolone e l'intramontabile Cornetto",
    type: "items", 
    categories: ["gelati_algida"] 
  },
  { 
    pageNumber: 10, 
    title: "I Gelati Sammontana", 
    subtitle: "Gruvi d'autore, Coppa Oro e i freschissimi ghiaccioli alla frutta",
    type: "items", 
    categories: ["gelati_sammontana"] 
  },
  { 
    pageNumber: 11, 
    title: "Torte & Varie", 
    subtitle: "Viennette, torte gelato, accendini, carte francesi e napoletane",
    type: "items", 
    categories: ["altri_gelati", "varie"],
    showPromoCard: true 
  }
];

export const PdfPagesView: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"book" | "grid">("book");
  const [zoom, setZoom] = useState(1.0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePromoModal, setActivePromoModal] = useState(false);

  // Page navigation logic
  const handleNext = () => {
    if (currentPage < BROCHURE_PAGES.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Zoom controls
  const handleZoomIn = () => {
    if (zoom < 1.3) setZoom(prev => Math.min(prev + 0.15, 1.3));
  };

  const handleZoomOut = () => {
    if (zoom > 0.7) setZoom(prev => Math.max(prev - 0.15, 0.7));
  };

  // Browser print action
  const handlePrint = () => {
    window.print();
  };

  // Simulated download menu items catalog action
  const handleDownload = () => {
    let textContent = "★ LISTINO PREZZI MOLO 18 - BAIA AZZURRA 2026 ★\n\n";
    MENU_ITEMS.forEach(it => {
      const catLabel = CATEGORIES.find(c => c.id === it.category)?.label || it.category;
      textContent += `[${catLabel}] ${it.name} - Banco: €${it.bancoPrice.toFixed(2)}`;
      if (it.tavoloPrice !== undefined) {
        textContent += ` | Tavolo: €${it.tavoloPrice.toFixed(2)}`;
      }
      textContent += "\n";
    });

    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Molo18_Menu_2026.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full bg-gray-150 border border-gray-250 rounded-lg shadow-inner overflow-hidden select-none">
      
      {/* 1. PDF CONTROL HEADER BAR */}
      <div className="bg-white border-b border-gray-250 py-3 px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-3 relative z-30">
        
        {/* PDF Metadata Logo */}
        <div className="flex items-center space-x-2.5 shrink-0 self-start md:self-auto">
          <div className="bg-black text-white p-1.5 rounded-sm font-mono font-bold text-xs tracking-tight flex items-center">
            <FileText className="w-4 h-4 mr-1 text-white" />
            PDF
          </div>
          <div className="text-left">
            <span className="block font-sans text-xs font-black text-gray-900 tracking-tight leading-none uppercase">
              Molo_18_Menu_Brochure_2026.pdf
            </span>
            <span className="block text-[9px] text-gray-400 font-mono">
              Vector high-fidelity • 11 Pagine • Sincronizzato
            </span>
          </div>
        </div>

        {/* Center Page Controller */}
        <div className="flex items-center space-x-1.5 bg-gray-50 border border-gray-200 rounded p-1">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1 || viewMode === "grid"}
            className="p-1 px-2.5 rounded hover:bg-white text-gray-700 disabled:opacity-25 disabled:cursor-not-allowed hover:shadow-2xs duration-150 transition-all text-xs font-bold"
            title="Pagina Precedente"
          >
            <ChevronLeft className="w-4 h-4 inline" /> Prec.
          </button>
          
          <span className="text-xs font-mono font-extrabold text-gray-900 px-3">
            {viewMode === "book" ? `${currentPage} / ${BROCHURE_PAGES.length}` : "TUTTE"}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === BROCHURE_PAGES.length || viewMode === "grid"}
            className="p-1 px-2.5 rounded hover:bg-white text-gray-700 disabled:opacity-25 disabled:cursor-not-allowed hover:shadow-2xs duration-150 transition-all text-xs font-bold"
            title="Pagina Successiva"
          >
            Succ. <ChevronRight className="w-4 h-4 inline" />
          </button>
        </div>

        {/* Right Tools - Search, Zoom, Print and Layout View Swapper */}
        <div className="flex flex-wrap items-center justify-end gap-3 w-full md:w-auto">
          
          {/* Zoom controls */}
          {viewMode === "book" && (
            <div className="hidden sm:flex items-center space-x-1 bg-gray-50 border border-gray-200 rounded p-1">
              <button
                onClick={handleZoomOut}
                className="p-1 hover:bg-white rounded text-gray-650"
                title="Riduci Zoom"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[10px] font-bold text-gray-900 px-1.5 w-11 text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1 hover:bg-white rounded text-gray-650"
                title="Aumenta Zoom"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Page Display Layout Mode */}
          <div className="bg-gray-50 border border-gray-200 p-1 rounded flex space-x-1">
            <button
              onClick={() => setViewMode("book")}
              className={`p-1.5 px-2.5 rounded-sm text-[10px] font-bold uppercase transition-all flex items-center space-x-1 cursor-pointer ${
                viewMode === "book"
                  ? "bg-black text-white"
                  : "text-gray-500 hover:text-black hover:bg-gray-150"
              }`}
              title="Visualizza come libro"
            >
              <BookOpen className="w-3 h-3" />
              <span>Singola</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 px-2.5 rounded-sm text-[10px] font-bold uppercase transition-all flex items-center space-x-1 cursor-pointer ${
                viewMode === "grid"
                  ? "bg-black text-white"
                  : "text-gray-500 hover:text-black hover:bg-gray-150"
              }`}
              title="Visualizza tutte le pagine"
            >
              <Grid className="w-3 h-3" />
              <span>Panoramica</span>
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-1">
            <button
              onClick={handlePrint}
              className="p-1.5 bg-white border border-gray-250 hover:bg-gray-50 text-gray-800 rounded shadow-2xs transition-colors cursor-pointer"
              title="Stampa Brochure"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              className="p-1.5 bg-white border border-gray-250 hover:bg-gray-50 text-gray-800 rounded shadow-2xs transition-colors cursor-pointer"
              title="Esporta in file di testo"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* 2. MAIN DOCUMENT VIEWPORT WORKSPACE - Expanded to full width with floating sliders */}
      <div className="flex flex-row min-h-[850px] md:h-[880px] overflow-hidden bg-gray-100 relative">
        
        {/* WORKSPACE MIDDLE VIEWPORT - Full container with elegant floaters */}
        <main className="flex-1 p-3 md:p-6 flex items-center justify-center overflow-y-auto scrollbar-thin relative lg:px-16 bg-gray-50">
          
          {/* SEARCH BAR FLOATING BADGE inside document viewport */}
          <div className="absolute top-4 right-4 sm:right-6 z-20 w-fit max-w-xs flex items-center bg-white border border-gray-200 rounded px-2.5 py-1.5 shadow-sm">
            <Search className="w-3.5 h-3.5 text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Cerca nella brochure..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs focus:outline-hidden bg-transparent text-gray-800 placeholder-gray-400 w-32 sm:w-40 py-0.5"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="text-[10px] text-gray-400 hover:text-black font-bold ml-1.5"
              >
                ✕
              </button>
            )}
          </div>

          {/* RENDER MODE A: SINGLE PAGE VIEW (BOOK LAYOUT) WITH ZOOM AND MAXIMUM WIDTH */}
          {viewMode === "book" && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-6xl relative pt-10 sm:pt-0">
              {/* Previous Page Button - Left of layout (static space on desktop, styled cleanly) */}
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="hidden sm:flex shrink-0 p-3.5 sm:p-4 rounded-full bg-white border border-gray-200 text-gray-850 hover:bg-black hover:text-white disabled:opacity-20 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-sm duration-150 transition-all cursor-pointer z-10"
                title="Pagina Precedente"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* PDF Document Card */}
              <div 
                style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
                className="transition-transform duration-200 shadow-xl border border-gray-200 w-full max-w-4xl min-h-[750px] sm:min-h-[800px] md:min-h-[820px] rounded overflow-hidden flex flex-col justify-between bg-[#FCFAF5]"
              >
                <BrochurePage page={BROCHURE_PAGES[currentPage - 1]} searchQuery={searchQuery} />
              </div>

              {/* Next Page Button - Right of layout (static space on desktop, styled cleanly) */}
              <button
                onClick={handleNext}
                disabled={currentPage === BROCHURE_PAGES.length}
                className="hidden sm:flex shrink-0 p-3.5 sm:p-4 rounded-full bg-white border border-gray-200 text-gray-855 hover:bg-black hover:text-white disabled:opacity-20 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-sm duration-150 transition-all cursor-pointer z-10"
                title="Pagina Successiva"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Mobile-only elegant bottom navigation row */}
              <div className="flex sm:hidden items-center justify-center space-x-6 mt-4 w-full">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="flex items-center space-x-1.5 p-2 px-5 rounded-full bg-white border border-gray-250 text-gray-800 hover:bg-black hover:text-white disabled:opacity-25 shadow-xs text-xs font-bold transition-all"
                >
                  <ChevronLeft className="w-4 h-4" /> <span>Precedente</span>
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentPage === BROCHURE_PAGES.length}
                  className="flex items-center space-x-1.5 p-2 px-5 rounded-full bg-white border border-gray-250 text-gray-800 hover:bg-black hover:text-white disabled:opacity-25 shadow-xs text-xs font-bold transition-all"
                >
                  <span>Successivo</span> <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* RENDER MODE B: PANORAMIC VIEW (GRID LAYOUT) */}
          {viewMode === "grid" && (
            <div className="w-full h-full overflow-y-auto p-2 pt-14">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center max-w-7xl mx-auto">
                {BROCHURE_PAGES.map(page => (
                  <div 
                    key={page.pageNumber}
                    className="shadow-md border border-gray-200 w-full max-w-4xl min-h-[750px] rounded overflow-hidden flex flex-col justify-between bg-[#FCFAF5]"
                  >
                    <BrochurePage page={page} searchQuery={searchQuery} />
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};

/* =========================================================================
   INDIVIDUAL COMPONENT FOR A RENDERED BROCHURE PAGE SHEET
   - This dynamically parses the structure config and loads live data!
   - Solves the user's issue by retrieving 100% of items assigned.
   ========================================================================= */
const BrochurePage: React.FC<{ page: PageStructure; searchQuery: string }> = ({ page, searchQuery }) => {
  return (
    <div className="h-full flex flex-col justify-between p-5 md:p-6 select-none bg-sea-shell relative">
      
      {/* Page Header (watercolor visual decor element on active menus) */}
      {page.type !== "cover" && (
        <div className="w-full scale-90 mb-1">
          <CoralHeader />
        </div>
      )}

      {/* Main Page Layout Content Router */}
      <div className="flex-1 overflow-y-auto pr-0.5 pb-2 no-scrollbar">
        {page.type === "cover" && <RenderCover />}
        {page.type === "info" && <RenderWelcome />}
        {page.type === "items" && (
          <RenderItems categories={page.categories || []} title={page.title} subtitle={page.subtitle} searchQuery={searchQuery} showPromo={page.showPromoCard} />
        )}
      </div>

      {/* Page Footer (watercolor visual decor on active menus) */}
      {page.type !== "cover" && (
        <div className="w-full scale-80 mt-1">
          <CoralFooter />
        </div>
      )}

      {/* Footer page number indicator */}
      <div className="text-center font-mono font-bold text-[10px] text-gray-400 mt-2 border-t border-gray-150/60 pt-1.5">
        MOLO 18 • Pagina {page.pageNumber} di {BROCHURE_PAGES.length}
      </div>
    </div>
  );
};

// --- Cover Content Renderer ---
const RenderCover = () => {
  return (
    <div className="h-full flex flex-col items-center justify-between py-8">
      {/* Top Graphic Coral logo in black-minimal styling */}
      <div className="w-full mb-2">
        <CoralHeader />
      </div>

      {/* Center Display Logo Typography */}
      <div className="text-center my-auto flex flex-col items-center">
        <span className="text-[11px] font-sans font-black uppercase tracking-widest text-amber-600 bg-amber-55 border border-amber-200 px-3 py-1 rounded-sm mb-4">
          LIDO BAIA AZZURRA
        </span>
        
        <h1 className="font-sans text-5xl font-black text-gray-900 tracking-tighter leading-none uppercase">
          MOLO 18
        </h1>
        
        <div className="h-1 bg-black w-24 my-6 rounded"></div>
        
        <h2 className="font-sans text-3xl font-bold tracking-tight text-gray-800">
          Listino Sapori
        </h2>
        
        <p className="text-[11px] text-gray-400 font-mono tracking-wider uppercase mt-3">
          Spiaggia, Caffetteria, Bar, Cocktail d'Autore & Gelateria
        </p>
      </div>

      {/* Bottom wave graphic */}
      <div className="w-full mt-4">
        <CoralFooter />
      </div>
    </div>
  );
};

// --- Welcome / Welcome Info Content Renderer ---
const RenderWelcome = () => {
  return (
    <div className="h-full flex flex-col justify-between py-4 select-none">
      
      {/* Logos group */}
      <div className="text-center space-y-4">
        {/* Double Brand Identity */}
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-1.5 border-b border-gray-200 pb-2 mb-1.5">
            <span className="text-3xl font-black text-gray-900 leading-none">B</span>
            <span className="text-3xl font-semibold tracking-wider text-gray-500 leading-none">A</span>
            <div className="h-6 w-[1.5px] bg-gray-200 mx-1"></div>
            <div className="text-left leading-none">
              <span className="block font-extrabold text-lg text-gray-950 uppercase tracking-tight leading-none">Baia</span>
              <span className="block font-sans text-[10px] tracking-widest text-gray-500 font-bold uppercase leading-none">Azzurra</span>
            </div>
          </div>
          <p className="text-amber-600 font-black text-[9px] uppercase tracking-widest">Estate 2026</p>
        </div>

        {/* Brand secondary logo */}
        <div className="flex flex-col items-center pt-2">
          <h2 className="font-sans text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none">
            Molo 18
          </h2>
          <p className="text-[10px] font-bold tracking-widest text-gray-400 mt-1 uppercase">
            BAIA AZZURRA
          </p>
        </div>
      </div>

      {/* Structured Guidelines and service notes */}
      <div className="bg-white border border-gray-200 rounded-md p-4 space-y-3.5 my-auto shadow-3xs">
        <div className="flex items-center space-x-2 border-b border-gray-100 pb-1.5">
          <Award className="w-4 h-4 text-black" />
          <span className="text-xs font-black text-gray-950 uppercase tracking-wider">Servizio Ombrellone</span>
        </div>

        <p className="text-[11px] text-gray-500 leading-relaxed font-normal">
          Gentile Ospite, per favorire il massimo relax e un servizio ottimale, offriamo la consegna di snack, bibite e gelati <strong>direttamente sotto l'ombrellone</strong>. 
        </p>

        {/* Useful tips details in greyscale layout */}
        <div className="space-y-2 text-[10px] text-gray-400 font-mono">
          <div className="flex items-start">
            <span className="mr-1.5 text-gray-900">●</span>
            <span><strong>Allergeni:</strong> Consulta i codici nei listini (GF = Gluten Free, LF = Senza Lattosio, 🌱 = Vegano). Far presente intolleranze gravi al personale.</span>
          </div>
          <div className="flex items-start">
            <span className="mr-1.5 text-gray-900">●</span>
            <span><strong>Tariffe:</strong> I prezzi indicati sotto la colonna "Tavolo" o "Spiaggia" includono il servizio di consegna.</span>
          </div>
          <div className="flex items-start">
            <span className="mr-1.5 text-gray-900">●</span>
            <span><strong>Prenotazioni:</strong> Contatta il bagnino o invia un WhatsApp al <span className="text-gray-900 font-bold font-sans underline cursor-pointer">+39 348 444 8543</span>.</span>
          </div>
        </div>
      </div>

      <p className="text-center font-mono font-bold text-[9px] text-gray-400 tracking-wider">
        CON CURA • LIDO BAIA AZZURRA SALENTO
      </p>

    </div>
  );
};

// --- Live Items Renderers (Pulls items dynamically) ---
interface RenderItemsProps {
  categories: string[];
  title: string;
  subtitle?: string;
  searchQuery: string;
  showPromo?: boolean;
}

const RenderItems: React.FC<RenderItemsProps> = ({ categories, title, subtitle, searchQuery, showPromo }) => {
  // Query and filter elements from menuData dynamically.
  // This guarantees that absolutely every element is loaded and matched accurately.
  let items = MENU_ITEMS.filter(item => categories.includes(item.category));

  if (searchQuery) {
    const query = searchQuery.toLowerCase().trim();
    items = items.filter(it => 
      it.name.toLowerCase().includes(query) || 
      it.category.replace("_", " ").toLowerCase().includes(query)
    );
  }

  // Split list dynamically in columns if there are items (> 14) to space columns beautifully like original offset brochure
  const needsTwoColumns = items.length > 14;
  const col1Items = needsTwoColumns ? items.slice(0, Math.ceil(items.length / 2)) : items;
  const col2Items = needsTwoColumns ? items.slice(Math.ceil(items.length / 2)) : [];

  return (
    <div className="space-y-4">
      
      {/* Title Header Section */}
      <div className="border-b border-gray-200 pb-2 mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-1.5">
        <div>
          <h3 className="font-sans text-base sm:text-lg font-black text-gray-900 uppercase tracking-widest flex items-center">
            <span className="mr-1.5 text-amber-500 font-sans">✦</span>
            {title}
          </h3>
          {subtitle && (
            <p className="text-[10px] sm:text-[11px] text-gray-400 font-mono leading-relaxed mt-0.5 italic">
              {subtitle}
            </p>
          )}
        </div>
        
        {/* Price column labels precisely matching the widths in SimpleBrochureItem */}
        <div className="hidden sm:flex space-x-3 text-right font-mono text-[10px] font-bold uppercase text-gray-400 shrink-0 pb-1">
          <span className="w-12">Banco</span>
          <span className="w-12">Tavolo</span>
        </div>
      </div>

      {/* List content rendered either single or dual page layout columns */}
      {items.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-xs font-mono font-bold">Nessun prodotto trovato</p>
          <p className="text-[10px] mt-1 text-gray-300">Modifica i filtri di ricerca</p>
        </div>
      ) : needsTwoColumns ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1 sm:gap-y-2.5 align-top items-start">
          
          {/* Column 1 items list */}
          <div className="space-y-1 sm:space-y-2">
            {col1Items.map(item => (
              <SimpleBrochureItem key={item.id} item={item} />
            ))}
          </div>

          {/* Column 2 items list */}
          <div className="space-y-1 sm:space-y-2">
            {col2Items.map(item => (
              <SimpleBrochureItem key={item.id} item={item} />
            ))}
          </div>

        </div>
      ) : (
        <div className="space-y-1 sm:space-y-2 max-w-2xl mx-auto">
          {items.map(item => (
            <SimpleBrochureItem key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* If promo visual card is flag enabled (Page 11 only) */}
      {showPromo && (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded p-4 border border-gray-200 text-center space-y-2.5 relative overflow-hidden shadow-3xs mt-4">
          <span className="absolute -top-1 -right-1 bg-amber-500 text-white font-mono font-black text-[7px] rotate-12 px-1 text-center select-none uppercase tracking-widest border border-amber-400">
            FESTE
          </span>
          <h4 className="font-sans text-xs font-black text-gray-900 tracking-wider uppercase">
            🎉 Festeggia con noi il tuo Evento!
          </h4>
          <p className="text-[10px] text-gray-400 max-w-xs mx-auto leading-relaxed">
            Spiaggia attrezzata, compleanni esclusivi, apericena d'autore al calar del sole pugliese. Contatta la direzione!
          </p>
          <div className="flex items-center justify-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-mono font-extrabold text-xs text-gray-800">
              WhatsApp: +39 348 444 8543
            </span>
          </div>
        </div>
      )}

    </div>
  );
};

// --- Pure Brochure List Row with Clean Dot Leaders and Columns Alignment ---
interface RenderItemProps {
  item: MenuItem;
}

const SimpleBrochureItem: React.FC<RenderItemProps> = ({ item }) => {
  return (
    <div className="flex justify-between items-end py-1 sm:py-1.5 text-xs sm:text-sm text-gray-800 font-medium group">
      
      {/* Product label & allergy mini badges */}
      <div className="flex-1 min-w-0 pr-2" title={item.name}>
        <div className="inline">
          <span className="font-sans font-bold text-gray-900 break-normal whitespace-normal mr-1.5 text-xs sm:text-sm">
            {item.name}
          </span>
          
          {/* Diet Badges micro-capsules */}
          <span className="inline-flex gap-1 scale-90 sm:scale-100 align-middle">
            {item.isGlutenFree && (
              <span className="bg-amber-50 text-[9px] text-amber-700 font-black px-1 border border-amber-200 rounded-sm">
                GF
              </span>
            )}
            {item.isLactoseFree && (
              <span className="bg-blue-50 text-[9px] text-blue-700 font-black px-1 border border-blue-200 rounded-sm">
                LF
              </span>
            )}
            {item.isVegan && (
              <span className="bg-emerald-50 text-[9px] text-emerald-700 font-semibold px-1 border border-emerald-200 rounded-sm leading-none flex items-center py-0.5">
                🌱
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Center leader dotted track */}
      <div className="dot-leader"></div>

      {/* Prices Banco vs Tavolo aligned right with fixed width to prevent wrapping */}
      <div className="flex space-x-3 text-right font-mono font-bold shrink-0">
        <span className="w-12 text-gray-600 block text-xs sm:text-[13px]" title="Prezzo al Banco">
          €{item.bancoPrice.toFixed(2)}
        </span>
        <span className="w-12 text-gray-950 bg-gray-50 border border-gray-200 px-1 rounded-sm text-xs sm:text-[13px] block" title="Prezzo al Tavolo / Spiaggia">
          {item.tavoloPrice ? `€${item.tavoloPrice.toFixed(2)}` : "—"}
        </span>
      </div>
    </div>
  );
};
