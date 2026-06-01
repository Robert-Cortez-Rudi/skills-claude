import { SlideDeck } from "./components/deck/SlideDeck";
import { SLIDES } from "./slides";

export default function App() {
  return <SlideDeck slides={SLIDES} />;
}
