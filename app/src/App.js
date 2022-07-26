import React from 'react';
import GameView from './components/GameView';
import WelcomeView from './components/WelcomeView';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import '../src/assets/css/main.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomeView />} />
          <Route path="/play" element={<GameView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
