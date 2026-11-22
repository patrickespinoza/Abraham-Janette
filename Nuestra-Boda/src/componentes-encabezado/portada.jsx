import React from "react";
import { motion } from "framer-motion";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY
// ==========================================

const CONFIG = {
  novio: "Abraham",
  novia: "Janette",
  fecha: "10 de Abril de 2027",
  subtitulo: "Nuestra Boda",
  imagen: "/portada.jpg",
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
        "
      />

      {/* ======================================
          CONTENIDO PRINCIPAL
      ====================================== */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
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
          px-5 pb-20
          text-center
          text-white
          sm:px-8
          sm:pb-24
          lg:pb-28
        "
        style={{
          textShadow: "0 2px 12px rgba(0,0,0,0.45)",
        }}
      >
        {/* SUBTÍTULO */}

        <p
          className="
            mb-6
            font-playfair
            text-[11px]
            uppercase
            tracking-[0.45em]
            sm:text-sm
          "
        >
          {CONFIG.subtitulo}
        </p>

        {/* NOMBRES DE LOS NOVIOS */}

        <h1
          className="
            flex flex-col
            items-center
            justify-center
            font-playfair
            font-normal
            italic
            leading-none
            text-[48px]
            sm:text-[65px]
            md:text-[80px]
            lg:flex-row
            lg:gap-6
            lg:text-[95px]
          "
        >
          <span>{CONFIG.novio}</span>

          <span
            className="
              my-1
              text-[32px]
              font-normal
              sm:text-[42px]
              lg:my-0
              lg:text-[55px]
            "
          >
            &amp;
          </span>

          <span>{CONFIG.novia}</span>
        </h1>

        {/* SEPARADOR CLÁSICO */}

        <div
          className="
            my-7
            flex items-center
            justify-center
            gap-3
            sm:my-9
          "
          aria-hidden="true"
        >
          <span className="h-px w-12 bg-white/80 sm:w-20" />

          <svg
            width="38"
            height="17"
            viewBox="0 0 38 17"
            fill="none"
          >
            <path
              d="M1 8.5H10L19 1L28 8.5H37"
              stroke="currentColor"
              strokeWidth="0.8"
            />

            <path
              d="M1 8.5H10L19 16L28 8.5H37"
              stroke="currentColor"
              strokeWidth="0.8"
            />

            <circle
              cx="19"
              cy="8.5"
              r="2"
              fill="currentColor"
            />
          </svg>

          <span className="h-px w-12 bg-white/80 sm:w-20" />
        </div>

        {/* FECHA DE LA BODA */}

        <p
          className="
            font-playfair
            text-[13px]
            uppercase
            tracking-[0.22em]
            sm:text-base
            sm:tracking-[0.30em]
            lg:text-lg
          "
        >
          {CONFIG.fecha}
        </p>
      </motion.div>
    </section>
  );
}