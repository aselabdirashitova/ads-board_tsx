export interface Ad { title: string; description: string; price: number | string; image_url?: string | null; }
export interface AdsResponse { items: Ad[]; total: number; limit: number; page: number; }

export const API_BASE = "https://inai-col1.fishrungames.com";
export const ADS_URL = API_BASE + "/ads";
export const PAGE_LIMIT = 30;


export const form = document.getElementById("ad-form") as HTMLFormElement;
export const titleInput = document.getElementById("title") as HTMLInputElement;
export const descInput = document.getElementById("description") as HTMLTextAreaElement;
export const priceInput = document.getElementById("price") as HTMLInputElement;
export const imageInput = document.getElementById("image") as HTMLInputElement;
export const preview = document.getElementById("preview") as HTMLImageElement;
export const submitBtn = document.getElementById("submit-btn") as HTMLButtonElement;
export const formStatus = document.getElementById("form-status") as HTMLElement;

export const adsEl = document.getElementById("ads") as HTMLElement;
export const listStatus = document.getElementById("list-status") as HTMLElement;
export const totalEl = document.getElementById("total") as HTMLElement;
export const refreshBtn = document.getElementById("refresh-btn") as HTMLButtonElement;
export const prevBtn = document.getElementById("prev-btn") as HTMLButtonElement;
export const nextBtn = document.getElementById("next-btn") as HTMLButtonElement;
export const pageInfo = document.getElementById("page-info") as HTMLElement;

export const searchInput = document.getElementById("search") as HTMLInputElement;




export function setStatus(el: HTMLElement, text: string, kind?: string) {
  el.textContent = text || "";
  el.className = "status" + (kind ? " " + kind : "");
}

export function imageSrc(url?: string | null) {
  if (!url) return null;
  return /^https?:\/\//i.test(url) ? url : API_BASE + url;
}

export function formatPrice(value: number | string) {
  const num = Number(value);
  if (!Number.isFinite(num)) return "";
  return num.toLocaleString("ru-RU", { maximumFractionDigits: 2 }) + " сом";
}


export function errorMessage(error: unknown): string { return error instanceof Error ? error.message : String(error); }
