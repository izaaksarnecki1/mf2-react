import TestComponent from "./components/TestComponent";

export default function Home() {
  const msg = "Hello {#bold}{$user}{/bold}";

  return (
    <div>
      <TestComponent message={msg} />
    </div>
  );
}
