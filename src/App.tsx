// import { useState } from 'react'
import './App.css'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ResponsiveAppBar from './components/nav-bar/nav-bar';
// import ProductsPage from './pages/Products';
// import PricingPage from './pages/Pricing';
// import BlogPage from './pages/Blog';

// import ResponsiveAppBar from './components/nav-bar/nav-bar'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
        <ResponsiveAppBar />
        <section id="about">...</section>
        <section id="experience">...</section>
        <section id="projects">...</section>
        <section id="contact">...</section>
        <section id="resume">...</section>

      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
