// src/Button.tsx
import "react";
import { jsx } from "react/jsx-runtime";
var Button = ({ children }) => {
  return /* @__PURE__ */ jsx("button", { style: { padding: "0.5rem 1rem" }, children });
};

// src/App.tsx
import { MessageFormat } from "messageformat";
var App = () => {
  const msg = "Hello {$user}";
  const mf = new MessageFormat(["en", "no"], msg);
  const result = mf.format();
  console.log(result);
};
export {
  App,
  Button
};
//# sourceMappingURL=index.mjs.map