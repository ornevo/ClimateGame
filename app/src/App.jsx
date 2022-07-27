import React from 'react';
// import GameView from './components/GameView';
// import WelcomeView from './components/WelcomeView';
import { AppFooter } from './components/AppFooter.jsx';
// import About from './components/About.jsx';
import {
  // BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import routes from './routes'
import '../src/assets/css/main.css';

export class App extends React.Component {

   render() {
    
    return (
      <div className="App">
        {/* <BrowserRouter>
          <Routes>
            <Route path="/" element={<WelcomeView />} />
            <Route path="/play" element={<GameView />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter> */}
        <main className="routes-container">
          <Routes>
            {routes.map(route =>
              <Route key={route.path}
                exact={true}
                element={route.component}
                path={route.path} />)}
          </Routes>
          <div className="footer flex flex-column">
            <AppFooter />
          </div> 
        </main>
      </div>
    );
  }
}