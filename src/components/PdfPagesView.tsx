import React, { useState } from "react";
import { CoralHeader, CoralFooter } from "./MarineDecor";
import { ChevronLeft, ChevronRight, Grid, BookOpen, Clock, Phone, Sparkles } from "lucide-react";

export const PdfPagesView: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"book" | "grid">("book");
  const totalPages = 8;

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="w-full">
      {/* View Controller Top Toolbar */}
      <div className="max-w-4xl mx-auto px-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-gray-500 text-xs sm:text-sm">
          {viewMode === "book" ? (
            <p className="flex items-center gap-2 font-semibold">
              <BookOpen className="w-4 h-4 text-black" />
              <span>SFOGLIA BROCHURE: Pagina <strong className="text-black font-bold">{currentPage}</strong> di {totalPages}</span>
            </p>
          ) : (
            <p className="flex items-center gap-2 font-semibold">
              <Grid className="w-4 h-4 text-black" />
              <span>VISTA PANORAMICA: {totalPages} pagg. stese</span>
            </p>
          )}
        </div>

        {/* Mode Toggles */}
        <div className="bg-white p-1 rounded-md flex space-x-1 border border-gray-200 shadow-3xs">
          <button
            onClick={() => setViewMode("book")}
            className={`px-3.5 py-1.5 rounded-sm text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
              viewMode === "book"
                ? "bg-black text-white shadow-sm"
                : "text-gray-500 hover:text-black hover:bg-gray-50"
            }`}
            id="mode-book-btn"
          >
            <span>📖 Pagina Singola</span>
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`px-3.5 py-1.5 rounded-sm text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
              viewMode === "grid"
                ? "bg-black text-white shadow-sm"
                : "text-gray-500 hover:text-black hover:bg-gray-50"
            }`}
            id="mode-grid-btn"
          >
            <span>⊞ Pagine Stese</span>
          </button>
        </div>
      </div>

      {/* RENDER - BOOK MODE */}
      {viewMode === "book" && (
        <div className="max-w-md mx-auto px-4 flex flex-col items-center">
          {/* Main Book Card */}
          <div className="w-full aspect-[3/4.2] bg-white rounded-lg border border-gray-250 shadow-md overflow-hidden relative flex flex-col justify-between p-6 sm:p-8 bg-sea-shell select-none">
            
            {/* Page Header (watercolor and decor logic) */}
            {currentPage !== 1 && currentPage !== 2 && (
              <div className="w-full">
                <CoralHeader />
              </div>
            )}

            {/* Page Content Router */}
            <div className="flex-1 my-2 overflow-y-auto pr-1">
              {currentPage === 1 && <Page1Cover />}
              {currentPage === 2 && <Page2Welcome />}
              {currentPage === 3 && <Page3CaffetteriaBibite />}
              {currentPage === 4 && <Page4RosticceriaPatatine />}
              {currentPage === 5 && <Page5BirreBottiglie />}
              {currentPage === 6 && <Page6CocktailsGelati />}
              {currentPage === 7 && <Page7GelatiSammontana />}
              {currentPage === 8 && <Page8GelatiEventi />}
            </div>

            {/* Page Footer decor */}
            {currentPage !== 1 && currentPage !== 2 && (
              <div className="w-full">
                <CoralFooter />
              </div>
            )}

            {/* Static Tiny Page Num */}
            <div className="text-center text-xs font-mono font-bold text-gray-400 pt-2 border-t border-gray-100">
              Pagina {currentPage} di {totalPages}
            </div>
          </div>

          {/* Book Navigation controls */}
          <div className="flex items-center space-x-6 mt-6">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`p-3 rounded-md bg-white border border-gray-300 text-gray-700 shadow-xs transition-all hover:bg-gray-50 ${
                currentPage === 1 ? "opacity-25 cursor-not-allowed" : "active:scale-95 cursor-pointer"
              }`}
              id="prev-page-btn"
            >
              <ChevronLeft className="w-5 h-5 text-black" />
            </button>
            <span className="text-gray-700 text-xs font-bold font-mono">
              PAG. {currentPage} / {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`p-3 rounded-md bg-white border border-gray-300 text-gray-700 shadow-xs transition-all hover:bg-gray-50 ${
                currentPage === totalPages ? "opacity-25 cursor-not-allowed" : "active:scale-95 cursor-pointer"
              }`}
              id="next-page-btn"
            >
              <ChevronRight className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>
      )}

      {/* RENDER - GRID MODE (Shows all 8 pages as beautiful catalog sheets) */}
      {viewMode === "grid" && (
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(pageIndex => (
            <div
              key={pageIndex}
              className="w-full aspect-[3/4.2] bg-white rounded-lg border border-gray-250 shadow-sm overflow-hidden relative flex flex-col justify-between p-5 bg-sea-shell shadow-xs"
            >
              {pageIndex !== 1 && pageIndex !== 2 && (
                <div className="scale-90 origin-top">
                  <CoralHeader />
                </div>
              )}

              <div className="flex-1 my-2 overflow-y-auto text-[13px] pr-0.5">
                {pageIndex === 1 && <Page1Cover />}
                {pageIndex === 2 && <Page2Welcome />}
                {pageIndex === 3 && <Page3CaffetteriaBibite />}
                {pageIndex === 4 && <Page4RosticceriaPatatine />}
                {pageIndex === 5 && <Page5BirreBottiglie />}
                {pageIndex === 6 && <Page6CocktailsGelati />}
                {pageIndex === 7 && <Page7GelatiSammontana />}
                {pageIndex === 8 && <Page8GelatiEventi />}
              </div>

              {pageIndex !== 1 && pageIndex !== 2 && (
                <div className="scale-90 origin-bottom">
                  <CoralFooter />
                </div>
              )}

              <div className="text-center text-xs font-mono font-bold text-gray-400 pt-1.5 border-t border-gray-100">
                Pagina {pageIndex}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   INDIVIDUAL PHYSICAL PAGES REPRODUCTIONS
   Laying out menu text and visual styles exactly as screen-shot, 
   but beautifully rendering it vector/HTML for responsive scalability.
   ========================================================================= */

// --- Page 1: Cover ---
const Page1Cover: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-between py-6">
      {/* Cover Corals & Stars artwork */}
      <div className="w-full transform scale-125 my-1.5">
        <CoralHeader />
      </div>

      {/* Main Large Title */}
      <div className="text-center my-auto">
        <h1 className="font-display text-[72px] font-bold text-cyan-900 tracking-tight leading-none drop-shadow-xs">
          Menù
        </h1>
        <div className="w-16 h-1 bg-cyan-700/30 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Bottom Corals artwork */}
      <div className="w-full transform scale-125">
        <CoralFooter />
      </div>
    </div>
  );
};

// --- Page 2: Welcome / Logos ---
const Page2Welcome: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-between py-6">
      <div className="w-full text-center">
        <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <Sparkles className="w-6 h-6 text-cyan-600" />
        </div>
        <p className="font-display font-medium text-cyan-600/70 text-sm italic">Benvenuti a</p>
      </div>

      {/* Custom rendered logos matching the original layout */}
      <div className="my-auto space-y-12 text-center">
        {/* LOGO: Baia Azzurra 2026 */}
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-1 border-b-2 border-cyan-600/20 pb-3 mb-2">
            <span className="text-[38px] font-display font-extrabold text-cyan-800 leading-none">B</span>
            <span className="text-[38px] font-sans font-semibold tracking-wider text-cyan-600 leading-none">A</span>
            <div className="h-9 w-[1.5px] bg-cyan-600/30 mx-1"></div>
            <div className="text-left">
              <span className="block font-display text-2xl font-bold text-cyan-850 leading-none">Baia</span>
              <span className="block font-sans text-[13px] tracking-widest text-cyan-600 font-extrabold uppercase leading-none">Azzurra</span>
            </div>
          </div>
          <p className="text-amber-500 font-bold text-xs uppercase tracking-widest">Estate 2026</p>
        </div>

        {/* LOGO: Molo 18 */}
        <div className="flex flex-col items-center pt-4">
          <h2 className="font-display text-6xl font-semibold italic text-sky-700 leading-none tracking-tight">
            Molo18
          </h2>
          <p className="text-xs font-bold tracking-widest text-slate-400 mt-2 uppercase">
            BAIAZZURRA
          </p>
        </div>
      </div>

      {/* Bottom Corals artwork */}
      <div className="w-full transform scale-125">
        <CoralFooter />
      </div>
    </div>
  );
};

// --- Page 3: Caffetteria & Bibite ---
const Page3CaffetteriaBibite: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Section: Caffetteria */}
      <div>
        <div className="flex items-center justify-between border-b border-cyan-600/20 pb-1 mb-2">
          <h4 className="font-display text-lg font-extrabold text-cyan-900 uppercase tracking-wider">
            Bar Caffetteria
          </h4>
          <div className="flex space-x-4 text-[10px] font-bold text-cyan-800">
            <span>BANCO</span>
            <span>TAVOLO</span>
          </div>
        </div>

        <div className="space-y-1">
          <BookItem name="Caffè seddio" p1="1,50" p2="2,00" />
          <BookItem name="Caffè freddo o shakerato" p1="2,00" p2="2,50" />
          <BookItem name="Caffè nocciola" p1="2,50" p2="2,50" />
          <BookItem name="Caffè deca" p1="1,50" p2="2,00" />
          <BookItem name="Latte (bicch.)" p1="1,50" p2="2,00" />
          <BookItem name="Cappuccino" p1="2,00" p2="2,50" />
          <BookItem name="Cappuccino freddo" p1="2,00" p2="2,50" />
          <BookItem name="Crema caffè o granita caffè" p1="2,50" p2="3,00" />
          <BookItem name="Acqua piccola" p1="1,00" p2="1,00" />
          <BookItem name="Acqua grande" p1="2,00" p2="2,00" />
          <BookItem name="Spremuta" p1="3,50" p2="4,00" />
          <BookItem name="Succhi di frutta" p1="2,50" p2="3,00" />
          <BookItem name="Ginseng" p1="1,50" p2="2,00" />
          <BookItem name="Caffè ristorante" p1="1,50" p2="1,50" />
          <BookItem name="Granita" p1="2,00" p2="2,50" />
          <BookItem name="Caffè bagnini" p1="1,00" p2="1,00" />
          <BookItem name="Latte al cioccolato brick" p1="1,50" p2="2,00" />
          <BookItem name="Orzo" p1="1,50" p2="2,00" />
          <BookItem name="Orzata (bicch.)" p1="2,00" p2="2,50" />
          <BookItem name="Menta (bicch.)" p1="2,00" p2="2,50" />
          <BookItem name="Caffè macchiato" p1="1,50" p2="2,00" />
          <BookItem name="Pasta di mandorle" p1="1,00" p2="1,00" />
          <BookItem name="Caffè schiumato" p1="1,50" p2="2,00" />
          <BookItem name="Ginseng schiumato" p1="1,50" p2="1,50" />
          <BookItem name="Orzo schiumato" p1="1,50" p2="2,50" />
          <BookItem name="Latte macchiato" p1="2,00" p2="2,50" />
          <BookItem name="Sarchiapone" p1="1,50" p2="-" />
          <BookItem name="Hanuta" p1="1,50" p2="1,50" />
          <BookItem name="Carte pokemon" p1="2,00" p2="-" />
          <BookItem name="Melody pop" p1="1,50" p2="-" />
          <BookItem name="Pringles" p1="4,00" p2="-" />
        </div>
      </div>

      {/* Section: Bibite */}
      <div>
        <div className="flex items-center justify-between border-b border-cyan-600/20 pb-1 mb-2">
          <h4 className="font-display text-lg font-extrabold text-cyan-900 uppercase tracking-wider">
            Bibite
          </h4>
          <div className="flex space-x-4 text-[10px] font-bold text-cyan-800">
            <span>BANCO</span>
            <span>TAVOLO</span>
          </div>
        </div>

        <div className="space-y-1">
          <BookItem name="Tè freddo limone" p1="2,50" p2="3,00" />
          <BookItem name="Tè freddo a pesca" p1="2,50" p2="3,00" />
          <BookItem name="Cedrata" p1="2,50" p2="3,00" />
          <BookItem name="Coca Cola" p1="2,00" p2="2,50" />
          <BookItem name="Coca Cola zero" p1="2,00" p2="2,50" />
          <BookItem name="Bibite in lattina spiaggia" p1="1,50" p2="-" />
          <BookItem name="Red Bull spiaggia" p1="4,50" p2="-" />
          <BookItem name="Schweppes limone" p1="2,50" p2="3,00" />
          <BookItem name="Schweppes arancia" p1="2,50" p2="3,00" />
          <BookItem name="Chinotto" p1="2,00" p2="2,50" />
          <BookItem name="Red Bull" p1="3,00" p2="3,50" />
        </div>
      </div>
    </div>
  );
};

// --- Page 4: Pasticceria Rosticceria & Patatine ---
const Page4RosticceriaPatatine: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Section extras from top of page 4 */}
      <div className="space-y-1">
        <BookItem name="Sprite" p1="2,50" p2="2,50" />
        <BookItem name="Bitter" p1="2,50" p2="3,00" />
        <BookItem name="San Pellegrino" p1="2,50" p2="3,00" />
        <BookItem name="Crodino" p1="2,50" p2="3,00" />
      </div>

      {/* Section: Pasticceria Rosticceria */}
      <div>
        <div className="flex items-center justify-between border-b border-cyan-600/20 pb-1 mb-2">
          <h4 className="font-display text-lg font-extrabold text-cyan-900 uppercase tracking-wider">
            Pasticceria Rosticceria
          </h4>
          <div className="flex space-x-4 text-[10px] font-bold text-cyan-800">
            <span>BANCO</span>
            <span>TAVOLO</span>
          </div>
        </div>

        <div className="space-y-0.5">
          <BookItem name="Cornetto vuoto" p1="1,50" p2="1,50" />
          <BookItem name="Pasticciotto leccese" p1="2,00" p2="2,00" />
          <BookItem name="Treccia nutella" p1="2,00" p2="2,00" />
          <BookItem name="Pizzetta tonda" p1="2,00" p2="2,00" />
          <BookItem name="Hot Dog" p1="2,50" p2="3,00" />
          <BookItem name="Donuts Oreo" p1="2,50" p2="2,50" />
          <BookItem name="Panino napoletano" p1="2,50" p2="2,50" />
          <BookItem name="Graffa" p1="2,00" p2="2,00" />
          <BookItem name="Cornetto alla nutella" p1="1,50" p2="2,50" />
          <BookItem name="Pizzetta (tranci)" p1="2,50" p2="2,50" />
          <BookItem name="Cornetto vuoto vegano" p1="1,50" p2="1,50" />
          <BookItem name="Cornetto crema e amarena" p1="1,50" p2="1,50" />
          <BookItem name="Cornetto crema" p1="1,50" p2="1,50" />
          <BookItem name="Cornetto pistacchio" p1="1,50" p2="1,50" />
          <BookItem name="Cornetto integrale miele" p1="1,50" p2="1,50" />
          <BookItem name="Cornetto vegano melograno" p1="1,50" p2="1,50" />
          <BookItem name="Cornetto rodrigo frutti rossi" p1="1,50" p2="1,50" />
          <BookItem name="Cornetto marmellata albicocca" p1="1,50" p2="1,50" />
          <BookItem name="Cornetto rodrigo cioccolato" p1="1,50" p2="1,50" />
          <BookItem name="Treccia cioccolato" p1="2,00" p2="2,00" />
          <BookItem name="Polacca" p1="2,00" p2="2,00" />
          <BookItem name="Fagottino cioccolato" p1="1,50" p2="1,50" />
          <BookItem name="Treccia noci" p1="2,00" p2="2,00" />
          <BookItem name="Donuts milka" p1="2,50" p2="2,50" />
          <BookItem name="Graffa a nutella" p1="2,50" p2="-" />
          <BookItem name="Muffin + Waffel" p1="2,50" p2="2,50" />
          <BookItem name="Pasta di mandorle" p1="1,00" p2="1,00" />
          <BookItem name="Tramezzino" p1="3,50" p2="3,50" />
        </div>
      </div>

      {/* Section: Patatine */}
      <div>
        <div className="flex items-center justify-between border-b border-cyan-600/20 pb-1 mb-2">
          <h4 className="font-display text-lg font-extrabold text-cyan-900 uppercase tracking-wider">
            Patatine
          </h4>
          <div className="flex space-x-4 text-[10px] font-bold text-cyan-800">
            <span>BANCO</span>
            <span>TAVOLO</span>
          </div>
        </div>

        <div className="space-y-0.5">
          <BookItem name="San Carlo (busta)" p1="2,00" p2="2,00" />
          <BookItem name="Pringles piccola" p1="2,00" p2="2,00" />
          <BookItem name="Pringles tubo" p1="3,50" p2="4,00" />
          <BookItem name="Patatine+buono busta grande 90" p1="2,00" p2="-" />
          <BookItem name="Patatine+buono busta grande 50" p1="1,50" p2="-" />
          <BookItem name="Patatine+buono sorpresa 40" p1="2,00" p2="-" />
          <BookItem name="Patatine+buono tubo" p1="3,00" p2="2,00" />
          <BookItem name="Crostini (busta)" p1="2,00" p2="-" />
          <BookItem name="Cipster" p1="3,50" p2="-" />
          <BookItem name="Ritz" p1="3,50" p2="-" />
        </div>
      </div>
    </div>
  );
};

// --- Page 5: Birre, Liquori, Bottiglie ---
const Page5BirreBottiglie: React.FC = () => {
  return (
    <div className="space-y-5">
      {/* Section: Birre */}
      <div>
        <div className="flex items-center justify-between border-b border-cyan-600/20 pb-1 mb-2">
          <h4 className="font-display text-lg font-extrabold text-cyan-900 uppercase tracking-wider">
            Birre
          </h4>
          <div className="flex space-x-4 text-[10px] font-bold text-cyan-800">
            <span>BANCO</span>
            <span>TAVOLO</span>
          </div>
        </div>

        <div className="space-y-0.5">
          <BookItem name="Nastro azzurro 33cl" p1="2,50" p2="3,00" />
          <BookItem name="Corona" p1="3,50" p2="4,00" />
          <BookItem name="Tennent's" p1="4,00" p2="4,00" />
          <BookItem name="Chill lemon" p1="2,50" p2="3,00" />
          <BookItem name="Ceres" p1="4,00" p2="4,50" />
          <BookItem name="Ichunusa" p1="3,50" p2="4,50" />
          <BookItem name="Nastro grande" p1="4,00" p2="-" />
          <BookItem name="Heineken grande" p1="4,50" p2="-" />
          <BookItem name="Heineken 33cl" p1="3,50" p2="-" />
          <BookItem name="Peroni grande" p1="4,00" p2="-" />
        </div>
      </div>

      {/* Section: Liquori e Amari */}
      <div>
        <div className="flex items-center justify-between border-b border-cyan-600/20 pb-1 mb-2">
          <h4 className="font-display text-lg font-extrabold text-cyan-900 uppercase tracking-wider">
            Liquori e Amari
          </h4>
          <div className="flex space-x-4 text-[10px] font-bold text-cyan-800">
            <span>BANCO</span>
            <span>TAVOLO</span>
          </div>
        </div>

        <div className="space-y-0.5">
          <BookItem name="Liquori nazionali 0,04" p1="4,00" p2="5,00" />
          <BookItem name="Liquori esteri 0,04" p1="6,00" p2="6,00" />
          <BookItem name="Amari" p1="4,00" p2="5,00" />
          <BookItem name="Liquori di marca esteri" p1="8,00" p2="8,00" />
          <BookItem name="Champagne" p1="50,00" p2="80,00" />
        </div>
      </div>

      {/* Section: Bottiglie */}
      <div>
        <div className="flex items-center justify-between border-b border-cyan-600/20 pb-1 mb-2">
          <h4 className="font-display text-[15px] font-extrabold text-cyan-900 uppercase tracking-wider">
            Bottiglie
          </h4>
          <div className="flex space-x-4 text-[10px] font-bold text-cyan-800">
            <span>BANCO</span>
            <span>TAVOLO</span>
          </div>
        </div>

        <div className="space-y-0.5">
          <BookItem name="Champagne Ca Del Bosco" p1="65,00" p2="80,00" />
          <BookItem name="Champagne Ferrari" p1="35,00" p2="-" />
          <BookItem name="Champagne Berlucchi" p1="45,00" p2="-" />
          <BookItem name="Spumante Brut Cuvee Blanc" p1="10,00" p2="12,00" />
          <BookItem name="Prosecco Doc Treviso" p1="12,00" p2="15,00" />
          <BookItem name="Prosecco Superiore Docg Treviso" p1="14,00" p2="16,00" />
          <BookItem name="Prosecco Millesimo" p1="15,00" p2="19,00" />
          <BookItem name="Prosecco Astoria Valdobbiadene" p1="18,00" p2="21,00" />
          <BookItem name="Vino Primitivo" p1="18,00" p2="-" />
          <BookItem name="Vino Falerno" p1="15,00" p2="-" />
          <BookItem name="Vino Falanchina" p1="10,00" p2="12,00" />
          <BookItem name="Calice vino" p1="5,00" p2="-" />
          <BookItem name="Calice vino doc" p1="7,05" p2="-" />
        </div>
      </div>

      {/* Section: Varie */}
      <div>
        <div className="flex items-center justify-between border-b border-cyan-600/20 pb-1 mb-2">
          <h4 className="font-display text-[14px] font-extrabold text-cyan-800 uppercase tracking-wider">
            Varie (Accendini, Carte, ecc.)
          </h4>
          <div className="flex space-x-4 text-[10px] font-bold text-cyan-800">
            <span>BANCO</span>
            <span>TAVOLO</span>
          </div>
        </div>
        <div className="space-y-0.5">
          <BookItem name="Accendino antivento" p1="1,50" p2="1,50" />
          <BookItem name="Accendino normale" p1="1,50" p2="1,50" />
          <BookItem name="Accendino" p1="1,00" p2="1,00" />
          <BookItem name="Carte da gioco napoletane" p1="7,00" p2="7,00" />
          <BookItem name="Carte da gioco francesi Modiano" p1="14,00" p2="14,00" />
          <BookItem name="Rizla kingsize" p1="2,00" p2="2,00" />
          <BookItem name="Rizla combi pack" p1="3,00" p2="3,00" />
          <BookItem name="Rizla filtri ultra slim" p1="2,00" p2="2,00" />
        </div>
      </div>
    </div>
  );
};

// --- Page 6: Cocktails & Gelati ---
const Page6CocktailsGelati: React.FC = () => {
  return (
    <div className="space-y-5">
      {/* Page extras at top */}
      <div className="space-y-0.5">
        <BookItem name="Rizla cartine regular" p1="1,00" p2="-" />
        <BookItem name="Rizla slim x-long" p1="1,00" p2="-" />
        <BookItem name="David Ross" p1="1,20" p2="1,20" />
      </div>

      {/* Section: Cocktail e Aperitivi */}
      <div>
        <div className="flex items-center justify-between border-b border-cyan-600/20 pb-1 mb-2">
          <h4 className="font-display text-lg font-extrabold text-cyan-900 uppercase tracking-wider">
            Cocktail e Aperitivi
          </h4>
          <div className="flex space-x-4 text-[10px] font-bold text-cyan-800">
            <span>BANCO</span>
            <span>TAVOLO</span>
          </div>
        </div>

        <div className="space-y-0.5">
          <BookItem name="Cocktail" p1="7,00" p2="7,00" />
          <BookItem name="Analcolici accompagnati" p1="5,00" p2="6,00" />
          <BookItem name="Alcolici accompagnati" p1="7,00" p2="8,00" />
          <BookItem name="Prosecco" p1="3,00" p2="3,50" />
          <BookItem name="Spritz Aperol e Campari" p1="6,00" p2="7,00" />
          <BookItem name="Midori Sour" p1="6,00" p2="7,00" />
          <BookItem name="Apertass" p1="3,50" p2="4,00" />
          <BookItem name="Disaronno sour" p1="6,00" p2="7,00" />
          <BookItem name="Tris di vodka" p1="6,00" p2="7,00" />
          <BookItem name="Negroni" p1="7,00" p2="8,00" />
          <BookItem name="Negroni sbagliato" p1="7,00" p2="8,00" />
          <BookItem name="Gin Tonic linea base" p1="7,00" p2="8,00" />
          <BookItem name="Stuzzichini secchi" p1="2,00" p2="2,00" />
          <BookItem name="Aperitivo caldo (5pz)" p1="2,00" p2="2,00" />
          <BookItem name="Gin tonic Malfy" p1="8,00" p2="-" />
          <BookItem name="Gin tonic Portofino" p1="10,00" p2="-" />
          <BookItem name="Gin Mare" p1="10,00" p2="-" />
          <BookItem name="Gin tonic Capri" p1="7,00" p2="-" />
          <BookItem name="Gin Henrick" p1="9,00" p2="-" />
        </div>
      </div>

      {/* Section: Gelati */}
      <div>
        <div className="flex items-center justify-between border-b border-cyan-600/20 pb-1 mb-2">
          <h4 className="font-display text-lg font-extrabold text-cyan-900 uppercase tracking-wider">
            Gelati
          </h4>
          <div className="flex space-x-4 text-[10px] font-bold text-cyan-800">
            <span>BANCO</span>
            <span>TAVOLO</span>
          </div>
        </div>

        <div className="space-y-0.5">
          <BookItem name="Caffè zero algida" p1="3,50" p2="3,50" />
          <BookItem name="Cornetto esagerato XXL algida" p1="3,00" p2="3,00" />
          <BookItem name="Cornetto choc ball algida" p1="3,00" p2="3,00" />
          <BookItem name="Cornetto super cuore croccante" p1="3,00" p2="3,00" />
          <BookItem name="Cornetto royal amarena algida" p1="3,00" p2="3,00" />
          <BookItem name="Cornetto SG e SL algida" p1="2,60" p2="2,60" />
          <BookItem name="Magnum caffè bianco mandorle" p1="3,00" p2="3,00" />
          <BookItem name="Magnum speciali pistacchio" p1="3,30" p2="3,30" />
          <BookItem name="Bomboniera algida" p1="2,50" p2="2,50" />
          <BookItem name="King cone" p1="3,50" p2="3,50" />
          <BookItem name="Croccante amarena algida" p1="1,80" p2="1,80" />
          <BookItem name="Liuk algida" p1="1,80" p2="1,80" />
          <BookItem name="Cremino algida" p1="1,80" p2="1,80" />
          <BookItem name="Volcanix new" p1="2,70" p2="2,70" />
          <BookItem name="Remix cokie" p1="2,50" p2="2,50" />
          <BookItem name="Minecraft new bimbi" p1="2,00" p2="2,00" />
          <BookItem name="New twister" p1="2,30" p2="2,30" />
          <BookItem name="Fior di fragola algida" p1="1,80" p2="1,80" />
        </div>
      </div>
    </div>
  );
};

// --- Page 7: Gelati Sammontana & Algida ---
const Page7GelatiSammontana: React.FC = () => {
  return (
    <div className="space-y-4 text-xs">
      <div className="space-y-0.5 mb-3">
        <BookItem name="Lemonissimo algida" p1="1,80" p2="1,80" />
        <BookItem name="Iceberg algida" p1="1,80" p2="1,80" />
        <BookItem name="Bikini algida" p1="2,20" p2="2,20" />
        <BookItem name="Cucciolone maxi algida" p1="2,80" p2="-" />
        <BookItem name="Solero algida" p1="2,20" p2="2,20" />
        <BookItem name="Coppa rica amarena algida" p1="2,50" p2="2,50" />
        <BookItem name="Coppa kimbo algida" p1="2,50" p2="2,50" />
        <BookItem name="Ghiacciolo algida" p1="1,00" p2="1,00" />
        <BookItem name="Calippo algida" p1="2,20" p2="2,20" />
        <BookItem name="Twister algida" p1="1,80" p2="1,80" />
        <BookItem name="Treasure algida" p1="2,00" p2="2,00" />
      </div>

      <div>
        <div className="flex items-center justify-between border-b border-cyan-300 pb-1 mb-2">
          <h4 className="font-display text-sm font-extrabold text-cyan-850 uppercase tracking-widest">
            Sammontana Gelati
          </h4>
          <div className="flex space-x-3 text-[9px] font-bold text-cyan-800">
            <span>BANCO</span>
            <span>TAVOLO</span>
          </div>
        </div>

        <div className="space-y-0.5">
          <BookItem name="Cornetti 5 stelle sammontana" p1="2,70" p2="2,70" />
          <BookItem name="Gruvi sammontana" p1="2,50" p2="2,50" />
          <BookItem name="Bis sammontana" p1="2,50" p2="2,50" />
          <BookItem name="Fruttiamo sammontana" p1="2,50" p2="2,50" />
          <BookItem name="Amando frutta sammontana" p1="2,50" p2="2,50" />
          <BookItem name="Amando biscuit sammontana" p1="2,50" p2="2,50" />
          <BookItem name="Amando cornetto classico amarena" p1="2,50" p2="2,50" />
          <BookItem name="Coppa oro diverse tipologie" p1="2,50" p2="2,50" />
          <BookItem name="Intrigo sammontana" p1="2,50" p2="2,50" />
          <BookItem name="Granulato sammontana" p1="1,80" p2="1,80" />
          <BookItem name="Sorbetto sammontana" p1="1,50" p2="1,50" />
          <BookItem name="Stecco moro sammontana" p1="2,50" p2="2,50" />
          <BookItem name="Sorbello sammontana" p1="1,60" p2="1,60" />
          <BookItem name="Stecco ducale sammontana" p1="2,70" p2="2,70" />
          <BookItem name="XL cono sammontana" p1="2,00" p2="2,00" />
          <BookItem name="Bis caffè croccantino pistacchio" p1="2,50" p2="2,50" />
          <BookItem name="Amando cacao e lampone" p1="2,50" p2="2,50" />
          <BookItem name="Stecchi frutta sammontana" p1="2,30" p2="2,30" />
          <BookItem name="Blocco sammontana" p1="2,50" p2="2,50" />
          <BookItem name="Sansonì sammontana" p1="2,60" p2="2,60" />
          <BookItem name="Prezzemolo sammontana" p1="2,30" p2="2,30" />
          <BookItem name="Stecco unicorno sammontana (sm)" p1="1,30" p2="1,30" />
          <BookItem name="Loacker sammontana" p1="1,60" p2="1,60" />
          <BookItem name="Stecco unicorno sammontana (lg)" p1="2,20" p2="2,20" />
          <BookItem name="Mallow sammontana" p1="1,80" p2="1,80" />
          <BookItem name="Donny sammontana" p1="1,80" p2="1,80" />
          <BookItem name="Ghiacciolo sammontana" p1="1,00" p2="1,00" />
          <BookItem name="Duetto sammontana" p1="2,00" p2="2,00" />
          <BookItem name="Blanco sammontana" p1="1,80" p2="1,80" />
          <BookItem name="Stecco blocco" p1="2,50" p2="2,50" />
          <BookItem name="Longjonh gusti sammontana" p1="2,50" p2="-" />
          <BookItem name="Coppa del nonno" p1="3,00" p2="3,00" />
        </div>
      </div>
    </div>
  );
};

// --- Page 8: Ice cream & Events call ---
const Page8GelatiEventi: React.FC = () => {
  return (
    <div className="space-y-6 h-full flex flex-col justify-between">
      {/* Upper Icecream list */}
      <div className="space-y-0.5">
        <BookItem name="Pirulo" p1="2,80" p2="-" />
        <BookItem name="Pirulo tropical" p1="2,50" p2="-" />
        <BookItem name="Maxibon" p1="3,00" p2="-" />
        <BookItem name="Magnum classico algida" p1="3,00" p2="3,00" />
        <BookItem name="Donut" p1="2,00" p2="-" />
        <BookItem name="Nuii" p1="3,00" p2="-" />
        <BookItem name="Torta romantica" p1="25,00" p2="-" />
        <BookItem name="Vienetta" p1="9,00" p2="-" />
        <BookItem name="Frigo chuknet algida" p1="2,20" p2="2,50" />
      </div>

      {/* Decorative promotional call to action card exactly like the screenshots */}
      <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-2xl p-4 border border-indigo-100 text-center space-y-3 relative overflow-hidden shadow-xs shrink-0">
        <div className="absolute top-0 right-0 w-24 h-24 bg-pink-200/20 rounded-full blur-xl pointer-events-none"></div>

        <h3 className="font-display text-base font-extrabold text-blue-900 tracking-tight leading-snug">
          FESTEGGIA CON NOI IL TUO EVENTO
        </h3>
        <p className="inline-block bg-blue-950 text-white rounded-lg px-3 py-1 text-[10px] uppercase font-sans font-extrabold tracking-wider">
          Ti Aspettiamo!
        </p>

        {/* Whatsapp link / info */}
        <div className="flex items-center justify-center space-x-1.5 pt-1">
          <span className="text-emerald-500 font-bold text-sm">💬</span>
          <a
            href="https://wa.me/393484448543"
            className="font-mono font-bold text-slate-800 text-sm hover:text-emerald-600 transition-colors"
          >
            348 444 8543
          </a>
        </div>
      </div>

      {/* Bottom Specialties footer block */}
      <div className="bg-white rounded-xl p-3 border border-slate-150 text-center shadow-2xs shrink-0">
        <div className="flex justify-center space-x-2 text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">
          <span>Granita</span>
          <span>•</span>
          <span>Crema Caffè</span>
          <span>•</span>
          <span>Yogurt</span>
        </div>
        <p className="font-display font-semibold italic text-xs text-sky-800 uppercase tracking-widest leading-none">
          COCKTAIL – AMERICAN BAR
        </p>
      </div>
    </div>
  );
};

/* =========================================================================
   REUSABLE DOTTED-LINE LISTING ITEM
   ========================================================================= */
interface BookItemProps {
  name: string;
  p1: string;
  p2?: string;
}

const BookItem: React.FC<BookItemProps> = ({ name, p1, p2 }) => {
  return (
    <div className="flex justify-between items-end py-0.5 text-xs text-slate-800 font-medium">
      {/* Product Name */}
      <span className="shrink-0 max-w-[55%] whitespace-nowrap overflow-hidden text-ellipsis font-sans font-medium" title={name}>
        {name}
      </span>

      {/* Leader dots line linking name to price */}
      <div className="dot-leader"></div>

      {/* Prices aligned right */}
      <div className="flex space-x-3 text-right font-mono font-bold shrink-0">
        <span className="w-10 text-slate-700">
          {p1}
        </span>
        <span className="w-10 text-cyan-800">
          {p2 && p2 !== "-" ? p2 : "—"}
        </span>
      </div>
    </div>
  );
};
