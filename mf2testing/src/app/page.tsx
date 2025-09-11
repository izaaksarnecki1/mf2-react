import { MessageFormat } from "messageformat";
import { parseMessageParts } from "./parser/Parser";

export default function Home() {
  const msg = "Hello {#bold}{$user}{/bold}. {$user2}";

  const mf = new MessageFormat(["en", "no"], msg);

  const message = mf.format({ user: "Izaak" });
  const result = mf.formatToParts({ user: "Izaak", user2: "Emilie" });

  console.log(result);

  return (
    <>
      <div>
        Hello <strong>Izaak</strong>
      </div>
    </>
  );
  // return <div>{message}</div>;
  return <>{parseMessageParts({ parts: result })}</>;
}
