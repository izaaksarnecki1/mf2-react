import { FormatMessage } from "./components/FormatMessage";
import translations from './translations/1_en.json';

export default function Home() {
  return <>
    <FormatMessage
      msg={translations["Welcome"].message}
      input={{ user: "Emilie", etternavn: "Hamang" }}
    />
    <br></br>
    <FormatMessage
      msg={translations["Goodbye"].message}
      input={{ user: "Emilie" }}
    />
  </>;
}
