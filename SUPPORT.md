# Поддержка StackMIREA

Выберите подходящий канал — так вопрос быстрее попадёт в нужный контекст.

| Ситуация | Куда обратиться |
| --- | --- |
| Ошибка на сайте, в сборке или поиске | [Создать bug report](https://github.com/minkinad/StackMIREA/issues/new?template=bug_report.yml) |
| Идея для новой возможности | [Создать feature request](https://github.com/minkinad/StackMIREA/issues/new?template=feature_request.yml) |
| Неточность или новый учебный материал | [Предложить обновление контента](https://github.com/minkinad/StackMIREA/issues/new?template=content_update.yml) или открыть PR |
| Вопрос о внесении изменений | Прочитать [CONTRIBUTING.md](./CONTRIBUTING.md), затем открыть issue |
| Потенциальная уязвимость | Использовать приватный процесс из [SECURITY.md](./SECURITY.md) |
| Нарушение правил общения | Следовать [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) |

## Перед созданием issue

Проверьте:

- не описана ли ситуация в [README.md](./README.md) или [CONTRIBUTING.md](./CONTRIBUTING.md);
- нет ли уже похожего [issue](https://github.com/minkinad/StackMIREA/issues) или [pull request](https://github.com/minkinad/StackMIREA/pulls);
- воспроизводится ли проблема на актуальном `main`;
- исчезает ли ошибка после чистой установки через `npm ci`.

Для локальной диагностики обычно достаточно:

```bash
npm run quality
npm test
npm run lint
npm run typecheck
npm run build
```

## Что приложить

Хорошее сообщение содержит:

- короткий заголовок без общей формулировки «не работает»;
- ожидаемое и фактическое поведение;
- минимальные шаги воспроизведения;
- точный путь к файлу или маршрут страницы;
- версию Node.js, ОС и браузер, если это важно;
- релевантный фрагмент лога без токенов и персональных данных;
- скриншот или короткую запись экрана для визуальной ошибки.

Если у вас уже есть исправление, можно открыть draft pull request и связать его с issue.

## Границы поддержки

Мы помогаем с устройством репозитория, публикацией материалов, рендерингом документации, поиском, CI и деплоем StackMIREA. Поддержка не включает выполнение учебных работ под ключ, персональный консалтинг и гарантированное время ответа.

Владелец репозитория: [@minkinad](https://github.com/minkinad).
