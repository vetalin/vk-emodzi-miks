# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Назначение репозитория

Шаблон для быстрого старта VK Mini-Apps. Используется как основа для новых проектов в рамках автоматизированного pipeline: идея → разработка → деплой → публикация в VK → монетизация.

## Технологический стек

| Компонент | Технология |
|-----------|------------|
| Frontend | React 18+ (functional components only) |
| UI Library | VKUI v7+ |
| Platform API | VK Bridge (`@vkontakte/vk-bridge`) |
| Language | TypeScript (strict mode) |
| Icons | `@vkontakte/icons` |
| Build | Vite |
| Tests | Vitest |

## Команды разработки

```bash
npm run dev        # Локальный dev-сервер
npm run build      # Сборка для продакшена (output: build/)
npm run lint       # Проверка ESLint
npm run lint:fix   # Автоисправление ESLint
npm run tsc        # Проверка типов TypeScript
npm run test       # Запуск unit-тестов
npm run deploy     # Деплой через @vkontakte/vk-miniapps-deploy
```

## Структура проекта

```
src/
  App.tsx           — Корневой компонент: ConfigProvider → AppRoot → SplitLayout → Router
  panels/           — Экраны приложения (один файл = одна Panel)
  components/       — Переиспользуемые UI-компоненты
  api/              — VK Bridge вызовы и серверные запросы
  hooks/            — Кастомные React-хуки
  store/            — Стейт-менеджмент (Zustand)
docs/               — Архитектурные решения, схемы, ADR
.claude/
  skills/           — Многоразовые воркфлоу (/deploy-vk, /generate-panel и т.д.)
vk-hosting-config.json  — Конфиг деплоя на хостинг ВКонтакте
```

## Соглашения по коду

**VKUI Layout:** Обязательная обёртка — `ConfigProvider` → `AppRoot` → `AdaptivityProvider` → `SplitLayout` → `SplitCol`.

**VK Bridge Init:** Вызывать `bridge.send('VKWebAppInit')` в точке входа до загрузки основных ресурсов (в течение первых 30 секунд).

**Навигация:** Структура `Epic/Root` → `View` → `Panel`. Каждый экран обязан иметь `PanelHeader`. **Не использовать параметр `after` у `PanelHeader`** — он зарезервирован под нативные кнопки VK.

**Bridge вызовы:** Все `bridge.send(...)` — async, обёрнуты в `try/catch`. Обрабатывать сценарий отказа пользователя. Централизовать подписки через `bridge.subscribe`, не внутри компонентов.

**TypeScript:** Запрет на `any`. Все пропсы и API-ответы типизируются интерфейсами. Только именованные экспорты (no default exports).

**Авторизация:** Использовать `VKWebAppGetSilentToken` → обмен на `access_token` на бэкенде. Никогда не передавать полный `access_token` на клиент.

**Производительность:** Бандл < 300 КБ, TTI < 1.3с. `React.lazy` + `Suspense` для второстепенных панелей. `React.memo` для предотвращения лишних ре-рендеров.

**Swipeback:** На стартовом экране включать системный свайп назад через `VKWebAppSetSwipeSettings`. Обрабатывать аппаратную кнопку «Назад» на Android.

## Деплой

### VK Hosting (основной способ)
```bash
# vk-hosting-config.json должен содержать: app_id, static_path: "build"
npm run build && npm run deploy
```

### VPS (Nginx)
- Обязателен HTTPS (Let's Encrypt / Certbot)
- Nginx: `try_files $uri $uri/ /index.html` для SPA-роутинга
- Данные пользователей хранятся на российских серверах (ФЗ-152)

### Настройка в VK
После деплоя: Настройки → Размещение → URL → вставить адрес `index.html` для мобильной, веб и mvk версий.

## VK Mini-App Pipeline

Этот шаблон — часть pipeline полного цикла:
1. **Идея** — анализ, MVP-скоуп
2. **Дизайн** — VKUI гайдлайны, мобильный WebView
3. **Разработка** — Claude Code с этим шаблоном
4. **Деплой** — VPS/VK Hosting
5. **Публикация** — модерация VK
6. **Монетизация** — VK Pay (`VKWebAppOpenPayForm`), реклама, подписки
