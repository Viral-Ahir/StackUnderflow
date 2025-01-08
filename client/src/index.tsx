import { createRoot } from "react-dom/client";
import "./index.css";
import "./tailwind.css";
import "./styles/theme.css";
import FakeStackOverflow from "./components/fakestackoverflow";

/**
 * Entry point of the application
 * Render the FakeStackOverflow component
 */
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <>
      <FakeStackOverflow />
    </>
  );
}
