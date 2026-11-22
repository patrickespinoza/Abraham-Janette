import React from "react";
import { motion } from "framer-motion";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY
// ==========================================

const CONFIG = {
  novio: "Abraham",
  novia: "Janette",
  fecha: "10 de Abril de 2027",
  imagen: "/portada.png",
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function Portada() {
  return (
    <section
      className="
        relative
        w-full
        h-[100svh]
        overflow-hidden
        bg-[#1D344C]
      "
    >
      {/* ======================================
          FOTOGRAFÍA ORIGINAL
          SIN FILTROS NI CAPAS DE COLOR
      ====================================== */}

      <img
        src={CONFIG.imagen}
        alt={`${CONFIG.novio} y ${CONFIG.novia}`}
        fetchPriority="high"
        className="
          absolute inset-0
          w-full h-full
          object-cover
          object-[center_35%]
          md:object-[center_40%]
        "
      />

      {/* ======================================
          CONTENIDO PRINCIPAL
      ====================================== */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.5,
          delay: 0.3,
          ease: "easeOut",
        }}
        className="
          relative z-10
          flex h-full w-full
          flex-col
          items-center
          justify-end
          px-3
          pb-8
          text-center
          text-[#FAF7F1]
          sm:px-6
          sm:pb-12
          lg:pb-16
        "
        style={{
          textShadow: `
            0 2px 4px rgba(0,0,0,0.85),
            0 3px 12px rgba(0,0,0,0.65),
            0 0 24px rgba(0,0,0,0.35)
          `,
        }}
      >
        
{/* ======================================
    NOMBRES CALIGRÁFICOS EN UNA SOLA LÍNEA
====================================== */}

<h1
  className="
    flex flex-row
    items-baseline
    justify-center
    whitespace-nowrap
    gap-2
    sm:gap-3
    lg:gap-5
    font-caligrafia
    font-normal
    leading-none
    text-[#FAF7F1]
    text-[clamp(50px,8vw,75px)]
    sm:text-[80px]
    md:text-[95px]
    lg:text-[115px]
  "
>
  {/* NOMBRE DEL NOVIO */}

  <span>
    {CONFIG.novio}
  </span>

  {/* AMPERSAND */}

  <span
    className="
      text-[0.65em]
      text-[#F1E6D3]
    "
  >
    &amp;
  </span>

  {/* NOMBRE DE LA NOVIA */}

  <span>
    {CONFIG.novia}
  </span>
</h1>

        {/* ======================================
            SEPARADOR ORNAMENTAL CLÁSICO
        ====================================== */}

        <div
          className="
            my-4
            flex items-center
            justify-center
            gap-3
            sm:my-5
            lg:my-6
          "
          aria-hidden="true"
          style={{
            filter:
              "drop-shadow(0 2px 3px rgba(0,0,0,0.8))",
          }}
        >
          <span
            className="
              h-px w-10
              bg-[#FAF7F1]/90
              sm:w-16
              lg:w-24
            "
          />

          <svg
            width="34"
            height="15"
            viewBox="0 0 38 17"
            fill="none"
          >
            <path
              d="M1 8.5H10L19 1L28 8.5H37"
              stroke="currentColor"
              strokeWidth="0.9"
            />

            <path
              d="M1 8.5H10L19 16L28 8.5H37"
              stroke="currentColor"
              strokeWidth="0.9"
            />

            <circle
              cx="19"
              cy="8.5"
              r="2"
              fill="currentColor"
            />
          </svg>

          <span
            className="
              h-px w-10
              bg-[#FAF7F1]/90
              sm:w-16
              lg:w-24
            "
          />
        </div>

        {/* ======================================
            FECHA DE LA BODA
        ====================================== */}

        <p
          className="
            font-playfair
            font-medium
            text-[17px]
            uppercase
            tracking-[0.22em]
            sm:text-[20px]
            sm:tracking-[0.28em]
            lg:text-lg
            lg:tracking-[0.45em]
          "
        >
          {CONFIG.fecha}
        </p>

      </motion.div>
    </section>
  );
}