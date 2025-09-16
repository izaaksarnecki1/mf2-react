import { FormatMessage } from "./components/FormatMessage";

export default function Home() {
  const msg = "Hello {#bold}Navn{/bold}"
  return <>
    <FormatMessage

      msg={"Hello {#italic}{#bold}{#underline}{$user} {$etternavn}{/underline}{/bold}{/italic}."}
      input={{ user: "Emilie", etternavn: "Hamang"}}
    />
    <br></br>
    {/* <FormatMessage
      mf={new MessageFormat(["no"], "Jeg er {#italic}skeiv{/italic}.")}
      input = {{}}
    /> */}
  </>;
}


