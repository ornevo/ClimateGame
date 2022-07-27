import React from 'react'
import { AppFooter } from './components/AppFooter.jsx'
import {
  Routes,
  Route
} from "react-router-dom"
import routes from './routes'
import '../src/assets/css/main.css'

export class App extends React.Component {

   render() {
    return (
      <div className="App">
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
    )
  }
}