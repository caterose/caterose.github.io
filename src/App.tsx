import "./App.css";
import CursorContextProvider from "./context/cursor-context-provider";
import Cursor from "./components/cursor/cursor";

import HomePage from "./pages/home-page/home";

function App() {
  return (
    <div className="app-test">
      <CursorContextProvider>
        <Cursor />
        <HomePage text="now!" />
      </CursorContextProvider>
    </div>
  );
}

export default App;
