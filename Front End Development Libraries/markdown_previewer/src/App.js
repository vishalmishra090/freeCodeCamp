import React from 'react'
import "./App.scss";
import Header from './components/Header'
import Window from './components/Window'
import { ThemeProvider } from './context/ThemeContext';



function App() {
  return (
    <div id="app" className="app">
      <ThemeProvider>
          <Header />
          <Window />
      </ThemeProvider>
    </div>
  );
}

export default App;
