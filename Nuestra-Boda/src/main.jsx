import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import PaginaPrincipal from "./PaginaPrincipal";
import Generador from "./pages/Generador";

// ==========================================
// SISTEMA DE RUTAS - WEDLY
// ==========================================

const ruta = window.location.pathname
  .replace(/\/+$/, "")
  .toLowerCase();

const esGenerador = ruta === "/generador";

// ==========================================
// RENDERIZADO PRINCIPAL
// ==========================================

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <>
    {esGenerador ? (
      <Generador />
    ) : (
      <main className="w-full min-h-screen">
        <PaginaPrincipal />
      </main>
    )}
  </>
);