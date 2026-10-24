# Ads Board — TypeScript

Проект переписан с JavaScript на TypeScript. Используется Vite (без Babel).

## Локальный запуск

```bash
npm install
npm run dev
```

Откройте адрес, который покажет Vite (обычно http://localhost:5173).

## Проверка сборки

```bash
npm run build
npm run preview
```

## GitHub Pages без ветки gh-pages

1. Создайте пустой репозиторий GitHub и загрузите файлы в ветку `main`, включая `.github/workflows/deploy.yml`.
2. В GitHub откройте Settings → Pages → Build and deployment → Source: **GitHub Actions**.
3. Откройте Actions и дождитесь успешного workflow «Build and deploy TypeScript to GitHub Pages».
4. Откройте опубликованный адрес из вкладки Deployments/Pages.
5. Проверьте загрузку объявлений, поиск, пагинацию, выбор картинки и отправку формы. Если API недоступен или блокирует CORS, это нужно исправлять на стороне API.

**Примечание:** подключён внешний API `https://inai-col1.fishrungames.com`. Работу API из архива подтвердить нельзя; тестируйте через браузер после публикации.

## Структура кода
- `src/main.ts` — запуск и события
- `src/ads.ts` — загрузка и карточки
- `src/adForm.ts` — форма объявления
- `src/shared.ts` — типы, настройки, DOM и утилиты
