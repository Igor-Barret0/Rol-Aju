import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Importe suas páginas
import { HomePage } from './pages/home/home'; // Corrigido: com chaves
import SobreAracaju from './pages/SobreAracaju/index.tsx'; // Correto: sem chaves
import { Mapa } from './pages/mapa/mapa'; // Corrigido: com chaves
import Contato from './pages/contato/contato'; // Correto: sem chaves

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // O App é o elemento pai (layout)
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "sobre",
        element: <SobreAracaju />,
      },
      {
        path: "mapa",
        element: <Mapa />,
      },
      {
        path: "mapa/:categorySlug?",
        element: <Mapa />,
      },
      {
        path: "contato",
        element: <Contato />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
