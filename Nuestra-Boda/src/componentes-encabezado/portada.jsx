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
        h-screen
        overflow-hidden
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
            NOMBRES DE LOS NOVIOS
        ====================================== */}

        <h1
          className="
            flex flex-row
            items-baseline
            justify-center
            gap-2
            whitespace-nowrap
            font-playfair
            font-normal
            italic
            leading-tight
            text-[clamp(26px,8.5vw,46px)]
            sm:gap-3
            sm:text-[58px]
            md:text-[72px]
            lg:gap-5
            lg:text-[90px]
          "
        >
          <span>{CONFIG.novio}</span>

          <span
            className="
              text-[0.65em]
              font-normal
              italic
            "
          >
            &amp;
          </span>

          <span>{CONFIG.novia}</span>
        </h1>

        {/* ======================================
            SEPARADOR ORNAMENTAL CLÁSICO
        ====================================== */}

        <div
          className="
            my-3
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
            text-[12px]
            uppercase
            tracking-[0.22em]
            sm:text-[15px]
            sm:tracking-[0.28em]
            lg:text-lg
            lg:tracking-[0.35em]
          "
        >
          {CONFIG.fecha}
        </p>
      </motion.div>
    </section>
  );
}