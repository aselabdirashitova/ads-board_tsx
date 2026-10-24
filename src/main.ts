import { searchInput, refreshBtn, prevBtn, nextBtn } from "./shared";
import { loadAds, renderList, getCurrentPage } from "./ads";
import { initAdForm } from "./adForm";

initAdForm();
searchInput.addEventListener("input", renderList);
refreshBtn.addEventListener("click", () => void loadAds(getCurrentPage()));
prevBtn.addEventListener("click", () => void loadAds(getCurrentPage() - 1));
nextBtn.addEventListener("click", () => void loadAds(getCurrentPage() + 1));
void loadAds(1);
