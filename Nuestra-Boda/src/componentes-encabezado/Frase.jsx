import React from "react";
import { motion } from "framer-motion";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY
// ==========================================

const CONFIG = {
  frase: "Más valen dos que uno solo, si uno cae el otro lo levanta.",
  referencia: "Eclesiastés 4: 9-10",
};

// ==========================================
// PALETA DE COLORES
// ABRAHAM & JANETTE
// ==========================================

const COLORES = {
  champagne: "#F1E6D3",
  azulMarino: "#1D344C",
  verdeSalvia: "#A5A58E",
  dorado: "#C6A57B",
  doradoOscuro: "#92754D",
};

// ==========================================
// ORNAMENTO BOTÁNICO
// ==========================================

const Ornamento = () => (
  <svg
    viewBox="0 0 240 65"
    className="mx-auto w-40 sm:w-52"
    fill="none"
    aria-hidden="true"
  >
    {[0, 1].map((lado) => (
      <g
        key={lado}
        transform={
          lado === 1
            ? "translate(240 0) scale(-1 1)"
            : undefined
        }
      >
        <path
          d="M120 48 Q65 50 20 12"
          stroke={COLORES.verdeSalvia}
          strokeWidth="1.2"
        />

        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} fill={COLORES.verdeSalvia}>
            <ellipse
              cx={30 + i * 17}
              cy={14 + i * 6}
              rx="12"
              ry="4"
              transform={`rotate(
                35
                ${30 + i * 17}
                ${14 + i * 6}
              )`}
            />

            <ellipse
              cx={35 + i * 17}
              cy={32 + i * 5}
              rx="12"
              ry="4"
              transform={`rotate(
                -20
                ${35 + i * 17}
                ${32 + i * 5}
              )`}
            />
          </g>
        ))}
      </g>
    ))}

    <path
      d="
        M120 51
        C107 42 114 34 120 41
        C126 34 133 42 120 51Z
      "
      stroke={COLORES.dorado}
      strokeWidth="1.2"
    />
  </svg>
);

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

const Frase = () => {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#F1E6D3]
        px-6
        pt-2 pb-16
        sm:px-10
        sm:pt-4 sm:pb-24
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        viewport={{ once: true }}
        className="
          relative
          mx-auto
          max-w-3xl
          text-center
        "
      >
        {/* ==================================
            ANILLOS Y SEPARADOR DORADO
        ================================== */}

        <div
          className="
            mb-8
            flex items-center
            justify-center
            gap-4
            sm:mb-10
          "
          aria-hidden="true"
        >
          <span
            className="
              h-px w-14
              bg-[#C6A57B]
              sm:w-24
            "
          />

          <svg
            width="52"
            height="38"
            viewBox="0 0 52 38"
            fill="none"
          >
            <circle
              cx="19"
              cy="19"
              r="14"
              stroke={COLORES.dorado}
              strokeWidth="1.3"
            />

            <circle
              cx="33"
              cy="19"
              r="14"
              stroke={COLORES.dorado}
              strokeWidth="1.3"
            />
          </svg>

          <span
            className="
              h-px w-14
              bg-[#C6A57B]
              sm:w-24
            "
          />
        </div>

        {/* ==================================
            FRASE BÍBLICA
        ================================== */}

        <blockquote
          className="
            mx-auto
            max-w-[650px]
            font-playfair
            font-normal
            italic
            text-[27px]
            leading-[1.65]
            text-[#0e1f2f]
            sm:text-[36px]
            sm:leading-relaxed
            lg:text-[42px]
          "
        >
          “{CONFIG.frase}”
        </blockquote>

        {/* ==================================
            REFERENCIA BÍBLICA
        ================================== */}

        <p
          className="
            mt-7
            font-playfair
            text-[15px]
            uppercase
            tracking-[0.25em]
            text-[#92754D]
            sm:mt-8
            sm:text-[17px]
            sm:tracking-[0.35em]
          "
        >
          {CONFIG.referencia}
        </p>

        {/* ==================================
            DECORACIÓN INFERIOR
        ================================== */}

        <div className="mt-7 sm:mt-9">
          <Ornamento />
        </div>
      </motion.div>
    </section>
  );
};

export default Frase;