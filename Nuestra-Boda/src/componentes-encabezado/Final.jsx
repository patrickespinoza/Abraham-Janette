import React from "react";
import { motion } from "framer-motion";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY
// ==========================================

const CONFIG = {
  imagen: "/final.jpg",

  inicialNovio: "A",
  inicialNovia: "J",

  colorIniciales: "#FAF7F1",
  colorDetalle: "#C6A57B",
};

// ==========================================
// COMPONENTE FINAL DE BODA
// ==========================================

export default function FinalBoda() {
  return (
    <section
      className="
        relative w-full
        h-[100svh]
        overflow-hidden
        bg-[#1D344C]
      "
    >
      {/* ==================================
          IMAGEN DE FONDO
      ================================== */}

      <img
        src={CONFIG.imagen}
        alt="Abraham y Janette"
        loading="lazy"
        className="
          absolute inset-0
          h-full w-full
          object-cover
          object-center
        "
      />

      {/* ==================================
          INICIALES DE LOS NOVIOS
      ================================== */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
        className="
          absolute inset-x-0
          bottom-2 sm:bottom-4
          z-10
          flex flex-col
          items-center
          justify-center
          text-center
        "
      >
        <div
          className="
            flex items-center
            justify-center
            gap-3 sm:gap-5
            font-playfair
            font-normal
            leading-none
          "
          style={{
            color: CONFIG.colorIniciales,
            textShadow: "0 2px 10px rgba(0,0,0,0.35)",
          }}
        >
          <span className="text-[82px] sm:text-[110px] lg:text-[135px]">
            {CONFIG.inicialNovio}
          </span>

          <span
            className="
              text-[35px]
              sm:text-[45px]
              lg:text-[55px]
              italic
            "
            style={{
              color: CONFIG.colorDetalle,
            }}
          >
            &
          </span>

          <span className="text-[82px] sm:text-[110px] lg:text-[135px]">
            {CONFIG.inicialNovia}
          </span>
        </div>

        {/* DETALLE DORADO */}

        <div
          className="
            mt-2 h-px
            w-20 sm:w-28
            lg:w-36
          "
          style={{
            backgroundColor: CONFIG.colorDetalle,
          }}
        />
      </motion.div>
    </section>
  );
}