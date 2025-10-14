# @mf2/react

A tiny, fast **MessageFormat v2 (MF2)** post-processor for i18next / react-i18next.

It compiles MF2 messages (via @messageformat/core), caches them per-language, and converts your `{#tag}...{/tag}` helpers into real tags (e.g. `<strong>`) so you can render rich text safely with `<Trans>`.

## Installation

```bash
npm i @mf2/react @messageformat/core i18next react-i18next
```

## Why this exists

Pluralization, gender, and select-based grammar rules differ across languages. MF2 provides a clean, standards-based way to express those differences. It is what powers ICU message syntax such as `({count, plural, one {...} other {...}})`.

However, when building apps with i18next, you may also want rich text inside your translations. Mixing that kind of formatting with MF2's curly syntax quickly gets messy and unsafe if you rely on raw HTML strings.

This package bridges the gap by combining two worlds:

- It lets you keep/use MF2 syntax for logic (plural, select etc.)
- It adds support for lightweight markup using curly tags like {#strong} and {#em}.
- It converts those curly tags to real angle-bracket tags that can be safely rendered by `<Trans>` from `react-i18next`.

You get precise grammatical control and rich formatting, without giving up i18next's familiar API or resorting to `dangerouslySetInnerHTML`

## Qucik start

1. Register the post-processor

```ts
// i18n.ts
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { MF2PostProcessor } from "@mf2/react";

i18next
  .use(MF2PostProcessor)
  .use(initReactI18next)
  .init({
    lng: "en",
    postProcess: ["mf2"]
    resources: {/***/},
  });
```

2. Render with `<Trans>`

```ts
// App.tsx
import { Trans } from "react-i18next";

export function App() {
  return (
    <p>
      <Trans
        i18nKey="key"
        values={
          {
            /**/
          }
        }
      />
    </p>
  );
}
```

## Notes and limitations

- The plugin must return a string. This is a i18next requirement. Use `<Trans>` (or your own parser) to turn those strings into JSX
- Messages are compiled and cached per language for performance
- The cury-tag conversion is intentionally minimal and safe. It only recognizes tags defined in the alias list.
- If you switch languages at runtime, the plugin automatically reuses or recompiles as needed.
- Nested styling is currently not possible (`{#bold}{#italics}text{/italics}{/bold}`)

## Acknowledgements

- [i18next](https://www.i18next.com/) - the internalization framework
- [react-i18next](https://react.i18next.com/) - React bindings for i18next
- [@messageformat/core](https://github.com/messageformat/messageformat) - MessageFormat2 engine used for compiling and evaluating MF2 syntax.
