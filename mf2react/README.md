# mf2react

A tiny, fast **MessageFormat v2 (MF2)** post-processor plugin for i18next / react-i18next.

It compiles MF2 messages (via @messageformat/core), caches them per-language, and converts your `{#tag}...{/tag}` helpers into real tags (e.g. `<strong>`) so you can render rich text safely with `<Trans>`.

## Installation

```bash
npm i mf2react
```

## Why this exists

Pluralization, gender, and select-based grammar rules differ across languages. MF2 provides a clean, standards-based way to express those differences. It is what powers ICU message syntax such as `({count, plural, one {...} other {...}})`.

However, when building apps with i18next, you may also want rich text inside your translations. Mixing that kind of formatting with MF2's curly syntax quickly gets messy and unsafe if you rely on raw HTML strings.

This package bridges the gap by combining two worlds:

- It lets you keep/use MF2 syntax for logic (plural, select etc.)
- It adds support for lightweight markup using curly tags like {#strong} and {#em}.
- It converts those curly tags to real angle-bracket tags that can be safely rendered by the `Trans` component from `react-i18next`.

You get precise grammatical control and rich formatting, without giving up i18next's familiar API or resorting to `dangerouslySetInnerHTML`

## Quick start

> **NOTE: As this is a react specific plugin for i18next, this guide assumes some knowledge/experience with both i18next and react-i18next.**

### 1. Register the post-processor

In your i18n configuration, you need to register the MF2 post processor. Additionally, you should add the MF2ReactPreset to enable curly tag (from mf2) to JSX conversion. This is to allow for nested stylings and proper conversion.

```ts
import i18n from "i18n";
import { initReactI18next } from "react-i18next";
import { MF2PostProcessor } from "mf2react";

i18n
  .use(MF2PostProcessor) // Enable the post-processor
  .use(MF2ReactPreset) // Enable curly-tag -> JSX conversion
  .use(initReactI18next)
  .init({
    lng: "en",
    postProcess: ["mf2"], // Apply MF2 to all translations
    resources: {
      /**/
    },
  });

export default i18n;
```

The `resources` field in the `init` function may directly contain translations, but preferably references to some json files where the translations are stored. This may look like this:

```ts
import en from "./locales/en/translation.json";
import no from "./locales/no/translation.json";

import i18n from "i18n";
import { initReactI18next } from "react-i18next";
import { MF2PostProcessor } from "mf2react";

i18n
  .use(MF2PostProcessor)
  .use(MF2ReactPreset)
  .use(initReactI18next)
  .init({
    lng: "en",
    postProcess: ["mf2"],
    resources: {
      en: { translation: en },
      no: { translation: no },
    },
  });

export default i18n;
```

#### About translations

The translations should follow standard key-value structure as desribed in the [i18next documentation](https://www.i18next.com/principles/translation-resolution). However, now it is possible to use MF2 syntax for the translations.

```json
{
  "{message name}": "{translation in mf2 format}"
}
```

An example may be:

```json
{
  "apples": "{#bold}How many apples:{/bold} {value, plural, one {# apple} other {# apples}}"
}
```

> **You can read more about MF2 syntax in the [MessageFormat2 syntax documentation](https://messageformat.unicode.org/docs/quick-start/#markup).**

---

### 2. Wrap your application in an I18nextProvider

To use MF2 translations in React, your components must be rendered inside an `I18nextProvider`.
Because `I18nextProvider` uses React context, it can only be used in a client component.

Option A: Use `I18nextProvider` directly:

```ts
"use client";

import { I18nextProvider } from "react-i18next";
import { i18n } from "./i18n";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

Option B: Use `I18nmf2Provider` (recommended)
This library also exports a convenience wrapper around I18nextProvider:

```ts
import { I18nmf2Provider } from "mf2react";
import { i18n } from "./i18n";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <I18nmf2Provider i18n={i18n}>{children}</I18nmf2Provider>;
}
```

Both options are functionally equivalent.

#### Choosing where to place the provider

Where you place the provider affects what becomes client-rendered.
You may either wrap your whole application in the provider, or each component that uses translations. This is because `I18nextProvider` must be used in a client component. Choose the placement based on how much of your UI should be client-rendered.

### 3. Render with `<Trans>`

Now you can render the `<Trans>` component as you usually would. For example:

```ts
import { Trans } from "react-i18next";

export default function Component() {
  let count: number;
  return (
    <Trans
      i18nKey="apples"
      values={
        {
          { value: count }
        }
      }
    />
  );
}
```

> You can read more about the Trans component in the [react-i18next documentation](https://react.i18next.com/latest/trans-component)

## Notes and limitations

- i18next post-processors must return **strings**. The JSX conversion happens inside `<Trans>`
- Messages are compiled and cached per language for performance
- The cury-tag conversion is intentionally minimal and safe. It only recognizes tags defined in the alias list.
- If you switch languages at runtime, the plugin automatically reuses or recompiles as needed.

## Acknowledgements

- [i18next](https://www.i18next.com/) - the internalization framework
- [react-i18next](https://react.i18next.com/) - React bindings for i18next
- [@messageformat/core](https://github.com/messageformat/messageformat) - MessageFormat2 engine used for compiling and evaluating MF2 syntax.
