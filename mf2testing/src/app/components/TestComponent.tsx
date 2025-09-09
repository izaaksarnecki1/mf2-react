import { MessageFormat } from "messageformat";
import { parseMessageParts } from "../parser/Parser";

type TestComponentProps = {
  message: string;
};

export default function TestComponent({ message }: TestComponentProps) {
  const mf = new MessageFormat(["en", "no"], message);
  const result = mf.formatToParts({ user: "Izaak" });

  return <div>{parseMessageParts({ parts: result })}</div>;
}
