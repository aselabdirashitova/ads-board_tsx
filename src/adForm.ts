import { ADS_URL, form, titleInput, descInput, priceInput, imageInput, preview, submitBtn, formStatus, setStatus, errorMessage } from "./shared";
import { loadAds } from "./ads";

export function initAdForm(): void {
imageInput.addEventListener("change", () => {
  const file = imageInput.files?.[0];
  if (preview.src.startsWith("blob:")) URL.revokeObjectURL(preview.src);
  if (file) {
    preview.src = URL.createObjectURL(file);
    preview.hidden = false;
  } else {
    preview.removeAttribute("src");
    preview.hidden = true;
  }
});

function validate(): string | null {
  if (!titleInput.value.trim()) return "Введите заголовок.";
  if (!descInput.value.trim()) return "Введите описание.";
  const price = parseFloat(priceInput.value);
  if (!Number.isFinite(price) || price < 0) return "Укажите корректную цену.";
  const file = imageInput.files?.[0];
  if (!file) return "Выберите изображение.";
  if (!file.type.startsWith("image/")) return "Файл должен быть изображением.";
  return null;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const error = validate();
  if (error) {
    setStatus(formStatus, error, "error");
    return;
  }

  const body = new FormData();
  body.append("title", titleInput.value.trim());
  body.append("description", descInput.value.trim());
  body.append("price", String(parseFloat(priceInput.value)));
  body.append("image", imageInput.files![0]);

  submitBtn.disabled = true;
  setStatus(formStatus, "Отправка...");
  try {
    // Content-Type не задаём вручную: браузер сам добавит boundary для multipart/form-data
    const res = await fetch(ADS_URL, { method: "POST", body });
    if (!res.ok) {
      let detail = "";
      try { detail = JSON.stringify((await res.json()).detail ?? ""); } catch (_) {}
      throw new Error(`Ошибка сервера: ${res.status} ${detail}`.trim());
    }
    await res.json();
    form.reset();
    imageInput.dispatchEvent(new Event("change"));
    setStatus(formStatus, "Объявление опубликовано.", "ok");
    await loadAds(1);
  } catch (err) {
    setStatus(formStatus, "Не удалось отправить объявление: " + errorMessage(err), "error");
  } finally {
    submitBtn.disabled = false;
  }
});


}
