import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Importe suas páginas
import { HomePage } from './pages/home/home';
import { AboutPage } from './pages/sobre/sobre';
import { MapaPage } from './pages/mapa/mapa';
import Contato from './pages/contato/contato';

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
        element: <AboutPage />,
      },
      {
        path: "mapa",
        element: <MapaPage />,
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
