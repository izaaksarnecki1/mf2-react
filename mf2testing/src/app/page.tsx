import { FormatMessage } from "./components/FormatMessage";

export default function Home() {
  return (
    <>
      <FormatMessage
        msg={
          "Hello {#italic}{#bold}{#underline}{$user} {$etternavn}{/underline}{/bold}{/italic}."
        }
        input={{ user: "Emilie", etternavn: "Hamang" }}
      />
    </>
  );
}
