import React, { useState, useMemo } from "react";
import { MENU_ITEMS, CATEGORIES } from "../data/menuData";
import { MenuItem, MenuCategory, CartItem } from "../types";
import {
  Coffee,
  CupSoda,
  Croissant,
  Beer,
  GlassWater,
  Wine,
  Citrus,
  IceCream,
  Sparkles,
  Search,
  SlidersHorizontal,
  Plus,
  Minus,
  Trash2,
  Share2,
  ShoppingBag,
  X,
  AlertCircle,
  Utensils,
  Store,
  Check,
  Smartphone
} from "lucide-react";

// Safe dynamic mapping for Category Icons
const IconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Coffee: Coffee,
  CupSoda: CupSoda,
  Croissant: Croissant,
  Cookie: ({ className }) => <span className={className}>🍪</span>,
  Beer: Beer,
  GlassWater: GlassWater,
  Wine: Wine,
  Citrus: Citrus,
  IceCream: IceCream,
  IceCreamBowl: IceCream,
  Cake: ({ className }) => <span className={className}>🍰</span>,
  Sparkles: Sparkles
};

export const DigitalMenuView: React.FC = () => {
  // Search and Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | "all">("all");
  const [dietFilter, setDietFilter] = useState<{
    glutenFree: boolean;
    lactoseFree: boolean;
    vegan: boolean;
  }>({
    glutenFree: false,
    lactoseFree: false,
    vegan: false
  });

  // Basket / Comanda State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [serviceType, setServiceType] = useState<"banco" | "tavolo">("tavolo");
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Toggle Diet filters
  const toggleDiet = (type: "glutenFree" | "lactoseFree" | "vegan") => {
    setDietFilter(prev => ({ ...prev, [type]: !prev[type] }));
  };

  // Clear all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setDietFilter({ glutenFree: false, lactoseFree: false, vegan: false });
  };

  // Filter Menu Items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      // Category filter
      if (selectedCategory !== "all") {
        if (selectedCategory === "gelati_algida") {
          if (item.category !== "gelati_algida") return false;
        } else if (selectedCategory === "gelati_sammontana") {
          if (item.category !== "gelati_sammontana") return false;
        } else if (selectedCategory === "altri_gelati") {
          if (item.category !== "altri_gelati") return false;
        } else {
          if (item.category !== selectedCategory) return false;
        }
      }

      // Search Query filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesSub = item.subCategory?.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesSub) return false;
      }

      // Diet filters
      if (dietFilter.glutenFree && !item.isGlutenFree) return false;
      if (dietFilter.lactoseFree && !item.isLactoseFree) return false;
      if (dietFilter.vegan && !item.isVegan) return false;

      return true;
    });
  }, [selectedCategory, searchQuery, dietFilter]);

  // Group filtered items by category for structured view
  const groupedItems = useMemo(() => {
    const groups: { [key in MenuCategory]?: MenuItem[] } = {};
    filteredItems.forEach(item => {
      const cat = item.category;
      if (!groups[cat]) {
        groups[cat] = [];
      }
      groups[cat]!.push(item);
    });
    return groups;
  }, [filteredItems]);

  // Add Item to Tray
  const addToCart = (item: MenuItem, type: "banco" | "tavolo") => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        cartItem => cartItem.item.id === item.id && cartItem.serviceType === type
      );

      if (existingIndex > -1) {
        const newCart = [...prev];
        newCart[existingIndex].quantity += 1;
        return newCart;
      } else {
        return [...prev, { item, quantity: 1, serviceType: type }];
      }
    });

    // Short tactile feedback if desired, or open basket briefly
    if (!isCartOpen && cart.length === 0) {
      setIsCartOpen(true);
    }
  };

  // Modify Cart item quantity
  const updateQuantity = (itemId: string, type: "banco" | "tavolo", delta: number) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        cartItem => cartItem.item.id === itemId && cartItem.serviceType === type
      );
      if (existingIndex === -1) return prev;

      const newCart = [...prev];
      const newQty = newCart[existingIndex].quantity + delta;

      if (newQty <= 0) {
        newCart.splice(existingIndex, 1);
      } else {
        newCart[existingIndex].quantity = newQty;
      }
      return newCart;
    });
  };

  // Remove Item fully from Basket
  const removeFromCart = (itemId: string, type: "banco" | "tavolo") => {
    setCart(prev => prev.filter(c => !(c.item.id === itemId && c.serviceType === type)));
  };

  // Totals calculations
  const cartTotals = useMemo(() => {
    let subtotal = 0;
    cart.forEach(cartItem => {
      const price = cartItem.serviceType === "banco" 
        ? cartItem.item.bancoPrice 
        : (cartItem.item.tavoloPrice ?? cartItem.item.bancoPrice);
      subtotal += price * cartItem.quantity;
    });
    return subtotal;
  }, [cart]);

  const totalItemCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Generate beautiful WhatsApp message text
  const shareComandaText = () => {
    if (cart.length === 0) return "";
    let text = `🌊 *Il Mio Ordine - Baia Azzurra Molo 18* 🌊\n`;
    text += `------------------------------------\n`;
    cart.forEach((cartItem, idx) => {
      const price = cartItem.serviceType === "banco" 
        ? cartItem.item.bancoPrice 
        : (cartItem.item.tavoloPrice ?? cartItem.item.bancoPrice);
      text += `${idx + 1}. *${cartItem.quantity}x* ${cartItem.item.name} (${cartItem.serviceType === "banco" ? "al Banco" : "al Tavolo"}) - €${(price * cartItem.quantity).toFixed(2)}\n`;
    });
    text += `------------------------------------\n`;
    text += `💰 *Totale Stimato:* €${cartTotals.toFixed(2)}\n\n`;
    text += `📱 _Generato dal Menù Digitale di Baia Azzurra_`;
    return encodeURIComponent(text);
  };

  const copyToClipboard = () => {
    const rawText = decodeURIComponent(shareComandaText());
    navigator.clipboard.writeText(rawText).then(() => {
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    }).catch(err => {
      console.error("Failing copying text: ", err);
    });
  };

  return (
    <div className="relative w-full pb-16">
      {/* Category Selection Filter Line */}
      <div className="sticky top-0 z-20 backdrop-blur-md bg-white/95 border-b border-gray-200 py-3.5 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 flex items-center space-x-2.5 overflow-x-auto no-scrollbar scroll-smooth">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-xs md:text-sm font-bold transition-all shrink-0 ${
              selectedCategory === "all"
                ? "bg-black text-white border border-black shadow-xs scale-102"
                : "bg-white hover:bg-gray-50 text-gray-700 hover:text-black border border-gray-200"
            }`}
            id="cat-all"
          >
            <span>Tutto il Menu</span>
          </button>

          {CATEGORIES.map(cat => {
            const Icon = IconMap[cat.icon] || Sparkles;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-xs md:text-sm font-bold transition-all shrink-0 ${
                  isSelected
                    ? "bg-black text-white border border-black shadow-xs scale-102"
                    : "bg-white hover:bg-gray-50 text-gray-700 hover:text-black border border-gray-200"
                }`}
                id={`cat-${cat.id}`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? "text-white" : "text-black"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        {/* Search, Filter Tools, and Dietary Indicators */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-xs mb-6">
          <div className="relative w-full mb-4.5">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <Search className="h-5 h-5 text-gray-400" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Cerca un gelato, caffè, bibita, cocktail..."
              className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 focus:outline-hidden focus:ring-1 focus:ring-black focus:border-black bg-gray-50/50 text-gray-800 text-sm"
              id="search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Diet filters row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => toggleDiet("glutenFree")}
                className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs font-semibold border transition-all ${
                  dietFilter.glutenFree
                    ? "bg-amber-50 border-amber-350 text-amber-900"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
                id="diet-gf"
              >
                <span className="text-amber-600 font-bold">Gluten Free</span>
                {dietFilter.glutenFree && <Check className="w-3.5 h-3.5 ms-1 text-amber-700" />}
              </button>

              <button
                onClick={() => toggleDiet("lactoseFree")}
                className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs font-semibold border transition-all ${
                  dietFilter.lactoseFree
                    ? "bg-blue-50 border-blue-350 text-blue-900"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
                id="diet-lf"
              >
                <span className="text-blue-600 font-bold">Senza Lattosio</span>
                {dietFilter.lactoseFree && <Check className="w-3.5 h-3.5 ms-1 text-blue-700" />}
              </button>

              <button
                onClick={() => toggleDiet("vegan")}
                className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs font-semibold border transition-all ${
                  dietFilter.vegan
                    ? "bg-emerald-50 border-emerald-350 text-emerald-900"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
                id="diet-vegan"
              >
                <span className="text-emerald-700 font-bold">Vegano🌱</span>
                {dietFilter.vegan && <Check className="w-3.5 h-3.5 ms-1 text-emerald-600" />}
              </button>
            </div>

            {/* Clear Filters Button */}
            {(searchQuery || selectedCategory !== "all" || dietFilter.glutenFree || dietFilter.lactoseFree || dietFilter.vegan) && (
              <button
                onClick={resetFilters}
                className="text-xs text-black font-semibold hover:underline underline-offset-2"
                id="reset-filter-btn"
              >
                Azzera Filtri
              </button>
            )}
          </div>
        </div>

        {/* Informative beach bar pricing notice */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-xs text-gray-700 mb-8 flex items-start gap-3 shadow-xs">
          <AlertCircle className="w-5 h-5 shrink-0 text-black mt-0.5" />
          <div>
            <p className="font-bold text-gray-900 mb-0.5">ℹ️ Differenza tariffe Banco vs Tavolo</p>
            <p className="text-gray-500 leading-relaxed font-normal">
              Alcuni prodotti serviti al tavolo prevedono un supplemento di servizio rispetto al banco (ad esempio la caffetteria ed alcune bibite). Puoi aggiungere gli articoli nel carrello scegliendo la tariffa desiderata per calcolare il preventivo preciso.
            </p>
          </div>
        </div>

        {/* Empty Search State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 px-4 bg-white rounded-3xl border border-slate-100 shadow-xs">
            <span className="text-4xl">🏝️</span>
            <h3 className="text-lg font-bold text-slate-800 mt-4">Nessun prodotto trovato</h3>
            <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
              Non abbiamo trovato alcun prodotto che corrisponde ai criteri inseriti. Prova ad azzerare i filtri di ricerca per esplorare l'intero menu.
            </p>
            <button
              onClick={resetFilters}
              className="mt-5 px-5 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-cyan-600/10 transition-all"
              id="empty-reset-btn"
            >
              Mostra tutto il menu
            </button>
          </div>
        )}

        {/* Grouped Category Lists */}
        {CATEGORIES.map(categoryMeta => {
          const items = groupedItems[categoryMeta.id];
          if (!items || items.length === 0) return null;

          return (
            <div key={categoryMeta.id} className="mb-10" id={`group-section-${categoryMeta.id}`}>
              <div className="flex items-center space-x-2.5 mb-4 px-1">
                <div className="p-2 rounded-md bg-black text-white shrink-0 shadow-xs">
                  {React.createElement(IconMap[categoryMeta.icon] || Sparkles, { className: "w-4.5 h-4.5" })}
                </div>
                <h2 className="text-lg font-extrabold font-sans text-gray-900 uppercase tracking-wider">
                  {categoryMeta.label}
                </h2>
                <span className="text-[10px] bg-gray-50 border border-gray-200 text-gray-500 px-2 py-0.5 rounded font-mono font-bold">
                  {items.length} {items.length === 1 ? "art." : "artt."}
                </span>
              </div>

              {/* Items Card List Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="group bg-white rounded-lg p-5 border border-gray-200 hover:border-black hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                    id={`menu-item-${item.id}`}
                  >
                    <div>
                      {/* Name and Tags */}
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="font-bold text-gray-900 text-base group-hover:text-black transition-colors">
                          {item.name}
                        </h3>

                        {/* Badges */}
                        <div className="flex space-x-1 shrink-0">
                          {item.isGlutenFree && (
                            <span className="bg-amber-55/70 text-amber-900 border border-amber-250 px-1.5 py-0.5 rounded-sm text-[9px] font-bold" title="Senza glutine">
                              GF
                            </span>
                          )}
                          {item.isLactoseFree && (
                            <span className="bg-blue-55/70 text-blue-900 border border-blue-250 px-1.5 py-0.5 rounded-sm text-[9px] font-bold" title="Senza lattosio">
                              LF
                            </span>
                          )}
                          {item.isVegan && (
                            <span className="bg-emerald-55/70 text-emerald-900 border border-emerald-250 px-1.5 py-0.5 rounded-sm text-[9px] font-bold" title="Vegano">
                              🌱
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Sub-Category Detail if present */}
                      {item.subCategory && (
                        <p className="text-[11px] text-gray-400 font-mono uppercase font-semibold tracking-wide mb-2.5">
                          {item.subCategory}
                        </p>
                      )}
                    </div>

                    {/* Pricing section with add to cart actions */}
                    <div className="pt-3.5 border-t border-gray-100 flex items-center justify-between gap-4 mt-auto">
                      <div className="flex space-x-4">
                        {/* Banco Price */}
                        <div>
                          <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold mb-0.5">Banco</p>
                          <p className="font-mono font-bold text-gray-800 text-sm">
                            €{item.bancoPrice.toFixed(2)}
                          </p>
                        </div>

                        {/* Tavolo Price */}
                        {item.tavoloPrice !== undefined && (
                          <div className="border-l border-gray-200 pl-4">
                            <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold mb-0.5">Tavolo</p>
                            <p className="font-mono font-bold text-gray-800 text-sm">
                              €{item.tavoloPrice.toFixed(2)}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Add Buttons */}
                      <div className="flex space-x-1.5">
                        <button
                          onClick={() => addToCart(item, "banco")}
                          className="px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-850 rounded text-xs font-semibold transition-colors flex items-center space-x-1"
                          title="Aggiungi comanda al Banco"
                          id={`add-banco-${item.id}`}
                        >
                          <Plus className="w-3 h-3 text-gray-500" />
                          <span>Banco</span>
                        </button>
                        {item.tavoloPrice !== undefined && (
                          <button
                            onClick={() => addToCart(item, "tavolo")}
                            className="px-2.5 py-1.5 bg-black hover:bg-gray-900 text-white rounded text-xs font-semibold transition-colors flex items-center space-x-1 shadow-xs"
                            title="Aggiungi comanda al Tavolo"
                            id={`add-tavolo-${item.id}`}
                          >
                            <Plus className="w-3 h-3 text-white" />
                            <span>Tavolo</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Cart Bar */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-md">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-black border border-black hover:bg-gray-950 text-white rounded-md py-3 px-4.5 shadow-lg flex items-center justify-between transition-all duration-300 transform active:scale-98"
            id="open-basket-bar"
          >
            <div className="flex items-center space-x-3">
              <div className="relative p-2.5 bg-white text-black rounded-sm border border-gray-200 shrink-0">
                <ShoppingBag className="w-4 h-4 text-black" />
                <span className="absolute -top-1.5 -right-1.5 bg-black text-white w-4.5 h-4.5 rounded-full text-[9px] font-bold flex items-center justify-center border border-white">
                  {totalItemCount}
                </span>
              </div>
              <div className="text-left">
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">La tua comanda</p>
                <p className="text-xs text-white font-medium">Visualizza riepilogo ordini</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Totale:</span>
              <span className="text-base font-bold font-mono text-white">
                €{cartTotals.toFixed(2)}
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Slide-over Tray Modal Backdrop */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex justify-end transition-opacity duration-300">
          {/* Modal Container */}
          <div className="w-full max-w-sm bg-white h-full flex flex-col shadow-2xl overflow-hidden relative border-l border-gray-200">
            
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-black text-white rounded-sm shrink-0">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-gray-900 uppercase tracking-wider">La tua Comanda</h3>
                  <p className="text-[10px] text-gray-450 font-medium">Preventivatore & riepilogo</p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-[10px] text-gray-450 hover:text-black font-bold uppercase tracking-widest px-2 py-1.5 border border-gray-200 rounded hover:bg-gray-55"
                id="close-basket-modal"
              >
                Chiudi
              </button>
            </div>

            {/* Tray Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 py-12">
                  <span className="text-3xl mb-3">🛒</span>
                  <p className="font-bold text-gray-800 text-xs uppercase tracking-wider">Comanda vuota</p>
                  <p className="text-[11px] text-gray-450 max-w-xs mt-1 leading-relaxed">
                    Aggiungi articoli dal menu per comporre la comanda del tuo ombrellone o tavolo e calcolarne il totale in tempo reale.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between pb-2 border-b border-gray-150">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Prodotto</span>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Totale</span>
                  </div>

                  <div className="space-y-4">
                    {cart.map(cartItem => {
                      const price = cartItem.serviceType === "banco" 
                        ? cartItem.item.bancoPrice 
                        : (cartItem.item.tavoloPrice ?? cartItem.item.bancoPrice);
                      return (
                        <div
                          key={`${cartItem.item.id}-${cartItem.serviceType}`}
                          className="flex justify-between items-start gap-4 pb-3 border-b border-gray-100"
                          id={`tray-item-${cartItem.item.id}-${cartItem.serviceType}`}
                        >
                          <div className="space-y-1">
                            <h4 className="font-bold text-gray-900 text-sm">
                              {cartItem.item.name}
                            </h4>
                            <div className="flex items-center space-x-1.5">
                              <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-sm ${
                                cartItem.serviceType === "banco" 
                                  ? "bg-gray-100 text-gray-700" 
                                  : "bg-black text-white"
                              }`}>
                                {cartItem.serviceType === "banco" ? "Al Banco" : "Al Tavolo"}
                              </span>
                              <span className="text-[10px] text-gray-400 font-mono">
                                €{price.toFixed(2)} cad.
                              </span>
                            </div>
                          </div>

                          <div className="text-right flex flex-col items-end space-y-1.5">
                            <span className="font-mono font-bold text-gray-900 text-xs">
                              €{(price * cartItem.quantity).toFixed(2)}
                            </span>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center bg-gray-50 border border-gray-200 rounded p-0.5">
                              <button
                                onClick={() => updateQuantity(cartItem.item.id, cartItem.serviceType, -1)}
                                className="p-1 hover:bg-white rounded transition-colors text-gray-600"
                                id={`tray-minus-${cartItem.item.id}-${cartItem.serviceType}`}
                              >
                                <Minus className="w-2.5 h-2.5" />
                              </button>
                              <span className="font-mono font-bold text-[11px] px-2 text-gray-900">
                                {cartItem.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(cartItem.item.id, cartItem.serviceType, 1)}
                                className="p-1 hover:bg-white rounded transition-colors text-gray-600"
                                id={`tray-plus-${cartItem.item.id}-${cartItem.serviceType}`}
                              >
                                <Plus className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Footer with Calculations */}
            {cart.length > 0 && (
              <div className="p-5 bg-white border-t border-gray-200 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-black text-gray-900 uppercase text-xs tracking-wider">Totale Comanda</span>
                  <span className="font-mono font-black text-base text-black bg-gray-50 px-3 py-1 rounded-sm shadow-xs border border-gray-200">
                    €{cartTotals.toFixed(2)}
                  </span>
                </div>

                <div className="text-[9px] text-gray-400 bg-gray-50 rounded p-3 border border-gray-100 leading-relaxed font-medium">
                  ⚠️ Questo è un riepilogo indicativo basato sulle tariffe ufficiali. Puoi mostrarlo al servizio bar/spiaggia o inviarlo tramite WhatsApp per agevolare l'ordinazione sotto l'ombrellone.
                </div>

                {/* Actions row */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={copyToClipboard}
                    className="w-full flex items-center justify-center space-x-1.5 px-3 py-2.5 bg-white hover:bg-gray-50 text-black font-semibold rounded-md border border-gray-200 transition-colors text-xs"
                    id="copy-clipboard-btn"
                  >
                    <Share2 className="w-3.5 h-3.5 text-gray-500" />
                    <span>{copiedNotification ? "Copiato! ✓" : "Copia Lista"}</span>
                  </button>

                  <a
                    href={`https://wa.me/?text=${shareComandaText()}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center space-x-1.5 px-3 py-2.5 bg-black hover:bg-gray-900 text-white font-semibold rounded-md transition-all text-center text-xs"
                    id="send-whatsapp-btn"
                  >
                    <span>Invia WhatsApp</span>
                  </a>
                </div>

                {/* Clear fully */}
                <button
                  onClick={() => {
                    if (confirm("Vuoi davvero svuotare la tua comanda?")) {
                      setCart([]);
                    }
                  }}
                  className="w-full text-center text-[10px] text-gray-400 hover:text-red-600 font-bold uppercase tracking-wider pt-1.5 duration-200 transition-colors block"
                  id="clear-basket-btn"
                >
                  Svuota Comanda
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
