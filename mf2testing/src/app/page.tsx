import { MessageFormat } from "messageformat";
import { FormatMessage } from "./parser/Parser";

export default function Home() {
  const msg = "Hello {#bold}{$user} {$etternavn}{/bold}.";

  const mf = new MessageFormat(["en", "no"], msg);

  // output of this is an array of messageparts
  const result = mf.formatToParts({ user: "Emilie", etternavn: "hamang"});

  console.log(result);

  return <>
    <FormatMessage
      mf={new MessageFormat(["no"], "Hello {#bold}{$user} {$etternavn}{/bold}.")}
      input={{ user: "Emilie", etternavn: "Hamang"}}
    />
    <br></br>
    <FormatMessage
      mf={new MessageFormat(["no"], "Jeg er {#italic}skeiv{/italic}.")}
      input = {{}}
    />
  </>;
}


