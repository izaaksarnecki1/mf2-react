import { MessageFormat } from "messageformat";

export const App = () => {
  const msg = "Hello {$user}";
  const mf = new MessageFormat(["en", "no"], msg);
  const result = mf.format();
  console.log(result);
};
