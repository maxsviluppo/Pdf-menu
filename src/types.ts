export interface MenuItem {
  id: string;
  name: string;
  bancoPrice: number;
  tavoloPrice?: number;
  category: MenuCategory;
  subCategory?: string;
  isGlutenFree?: boolean;
  isLactoseFree?: boolean;
  isVegan?: boolean;
}

export type MenuCategory =
  | "bar_caffetteria"
  | "bibite"
  | "pasticceria_rosticceria"
  | "patatine"
  | "birre"
  | "liquori_amari"
  | "bottiglie"
  | "varie"
  | "cocktail_aperitivi"
  | "gelati_algida"
  | "gelati_sammontana"
  | "altri_gelati";

export interface CategoryMetadata {
  id: MenuCategory;
  label: string;
  icon: string; // Lucide icon name
  color: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  serviceType: "banco" | "tavolo";
}
