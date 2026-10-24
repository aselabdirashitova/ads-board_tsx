import { ADS_URL, PAGE_LIMIT, adsEl, listStatus, totalEl, refreshBtn, prevBtn, nextBtn, pageInfo, searchInput, setStatus, errorMessage, imageSrc, formatPrice } from "./shared";
import type { Ad, AdsResponse } from "./shared";


export function renderAd(ad: Ad) {
  const card = document.createElement("article");
  card.className = "ad";

  const src = imageSrc(ad.image_url);
  if (src) {
    const img = document.createElement("img");
    img.className = "ad-image";
    img.src = src;
    img.alt = ad.title || "";
    img.loading = "lazy";
    img.addEventListener("error", () => {
      const ph = document.createElement("div");
      ph.className = "ad-placeholder";
      ph.textContent = "Изображение недоступно";
      img.replaceWith(ph);
    });
    card.appendChild(img);
  } else {
    const ph = document.createElement("div");
    ph.className = "ad-placeholder";
    ph.textContent = "Нет изображения";
    card.appendChild(ph);
  }

  const body = document.createElement("div");
  body.className = "ad-body";

  const title = document.createElement("h3");
  title.className = "ad-title";
  title.textContent = ad.title;

  const desc = document.createElement("p");
  desc.className = "ad-desc";
  desc.textContent = ad.description;

  const price = document.createElement("div");
  price.className = "ad-price";
  price.textContent = formatPrice(ad.price);

  body.append(title, desc, price);
  card.appendChild(body);
  return card;
}


let currentPage = 1;
let totalPages = 1;
let currentItems: Ad[] = [];

// Поиск выполняется на клиенте: в API для GET /ads нет параметров фильтрации
export function renderList() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = query
    ? currentItems.filter((ad) =>
        `${ad.title ?? ""} ${ad.description ?? ""}`.toLowerCase().includes(query))
    : currentItems;

  adsEl.replaceChildren(...filtered.map(renderAd));

  if (!currentItems.length) {
    setStatus(listStatus, "Объявлений пока нет.");
  } else if (!filtered.length) {
    setStatus(listStatus, "Ничего не найдено.");
  } else {
    setStatus(listStatus, query ? `Найдено: ${filtered.length}` : "");
  }
}

export async function loadAds(page: number = currentPage) {
  setStatus(listStatus, "Загрузка...");
  refreshBtn.disabled = true;
  try {
    const url = `${ADS_URL}?page=${page}&limit=${PAGE_LIMIT}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Ошибка сервера: " + res.status);
    const data = (await res.json()) as AdsResponse;

    const items = Array.isArray(data.items) ? data.items : [];
    const total = Number(data.total) || items.length;
    const limit = Number(data.limit) || PAGE_LIMIT;

    currentPage = Number(data.page) || page;
    totalPages = Math.max(1, Math.ceil(total / limit));

    currentItems = items;
    totalEl.textContent = `(всего: ${total})`;
    pageInfo.textContent = `Страница ${currentPage} из ${totalPages}`;
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= totalPages;
    renderList();
  } catch (err) {
    setStatus(listStatus, "Не удалось загрузить объявления: " + errorMessage(err), "error");
  } finally {
    refreshBtn.disabled = false;
  }
}


export function getCurrentPage(): number { return currentPage; }
