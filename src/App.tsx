import './App.css';
import CursorContextProvider from './context/cursor-context-provider';
import MobileBlocker from './components/mobile-blocker/mobile-blocker';

import HomePage from './pages/home-page/home';

function App() {
  return (
    <MobileBlocker>
      <div className="app-test">
        <CursorContextProvider>
          <HomePage text="now!" />
        </CursorContextProvider>
      </div>
    </MobileBlocker>
  );
}

export default App;
