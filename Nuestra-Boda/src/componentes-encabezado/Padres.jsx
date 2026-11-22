import React from "react";
import { motion } from "framer-motion";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY
// ==========================================

// MADRE DEL NOVIO

const padresNovio = {
  titulo: "Madre del novio",
  padre: "",
  madre: "Martha Licea Salinas",
  padreFallecido: false,
};

// PADRES DE LA NOVIA

const padresNovia = {
  titulo: "Padres de la novia",
  padre: "Emiliano Miguel López",
  madre: "Felisa Díaz Calvo",
  padreFallecido: true,
};

// TEXTOS DE LA SECCIÓN

const textos = {

  titulo: "Con la bendición de nuestros padres",

  descripcion:
    "Con el amor de quienes nos han acompañado en cada paso de nuestra vida, queremos compartir contigo este día tan especial.",

  fraseFinal:
    "El amor que hoy celebramos también nace del amor de nuestras familias.",
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
  arena: "#DCCAB7",
  blanco: "#FAF7F1",
};

// ==========================================
// ORNAMENTO BOTÁNICO SUPERIOR
// ==========================================

const Ornamento = () => (
  <svg
    viewBox="0 0 320 75"
    className="mx-auto w-56 sm:w-72"
    fill="none"
    aria-hidden="true"
  >
    {[0, 1].map((lado) => (
      <g
        key={lado}
        transform={
          lado === 1
            ? "translate(320 0) scale(-1 1)"
            : undefined
        }
      >
        <path
          d="M25 10 Q65 55 150 55"
          stroke={COLORES.verdeSalvia}
          strokeWidth="1.2"
        />

        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} fill={COLORES.verdeSalvia}>
            <ellipse
              cx={35 + i * 22}
              cy={12 + i * 8}
              rx="14"
              ry="4.5"
              transform={`rotate(
                35
                ${35 + i * 22}
                ${12 + i * 8}
              )`}
            />

            <ellipse
              cx={32 + i * 22}
              cy={29 + i * 6}
              rx="13"
              ry="4.5"
              transform={`rotate(
                -25
                ${32 + i * 22}
                ${29 + i * 6}
              )`}
            />
          </g>
        ))}
      </g>
    ))}

    <path
      d="
        M160 54
        C138 40 151 28 160 39
        C169 28 182 40 160 54Z
      "
      stroke={COLORES.dorado}
      strokeWidth="1.3"
    />
  </svg>
);

// ==========================================
// SEPARADOR DE ANILLOS
// ==========================================

const SeparadorAnillos = () => (
  <div
    className="
      flex items-center
      justify-center gap-4
    "
    aria-hidden="true"
  >
    <span
      className="
        h-px w-14
        bg-[#C6A57B]
        sm:w-28
      "
    />

    <svg
      width="55"
      height="40"
      viewBox="0 0 55 40"
      fill="none"
    >
      <circle
        cx="20"
        cy="20"
        r="15"
        stroke={COLORES.dorado}
        strokeWidth="1.3"
      />

      <circle
        cx="35"
        cy="20"
        r="15"
        stroke={COLORES.dorado}
        strokeWidth="1.3"
      />
    </svg>

    <span
      className="
        h-px w-14
        bg-[#C6A57B]
        sm:w-28
      "
    />
  </div>
);

// ==========================================
// BLOQUE INDIVIDUAL DE PADRES
// ==========================================

const GrupoPadres = ({
  titulo,
  padre,
  madre,
  padreFallecido = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      className="
        flex w-full
        flex-col
        items-center
        justify-center
        px-3 py-5
        text-center
        sm:px-8 sm:py-8
      "
    >
      {/* TÍTULO */}

      <h3
        className="
          font-playfair
          font-normal
          text-[22px]
          text-[#92754D]
          sm:text-[27px]
        "
      >
        {titulo}
      </h3>

      {/* LÍNEA DORADA */}

      <div
        className="
          mx-auto
          my-5
          h-px w-10
          bg-[#C6A57B]
          sm:my-6
        "
      />

      {/* NOMBRES */}

      <div
        className="
          flex flex-col
          items-center
          gap-2
          sm:gap-3
        "
      >
        {/* PADRE */}

        {padre && (
          <p
            className="
              font-playfair
              font-normal
              text-[24px]
              leading-relaxed
              text-[#1D344C]
              sm:text-[29px]
              lg:text-[32px]
            "
          >
            {padre}

            {/* CRUZ EN MEMORIA */}

            {padreFallecido && (
              <span
                className="
                  ml-2
                  inline-block
                  align-middle
                  text-[0.8em]
                  font-normal
                  text-[#92754D]
                "
                aria-label="En memoria"
              >
                †
              </span>
            )}
          </p>
        )}

        {/* AMPERSAND */}

        {padre && madre && (
          <span
            className="
              font-playfair
              font-normal italic
              text-[27px]
              leading-none
              text-[#C6A57B]
              sm:text-[32px]
            "
          >
            &amp;
          </span>
        )}

        {/* MADRE */}

        {madre && (
          <p
            className="
              font-playfair
              font-normal
              text-[24px]
              leading-relaxed
              text-[#1D344C]
              sm:text-[29px]
              lg:text-[32px]
            "
          >
            {madre}
          </p>
        )}
      </div>
    </motion.div>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

const Padres = () => {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#FAF7F1]
        px-5 py-16
        sm:px-10 sm:py-24
      "
    >
      <div
        className="
          relative
          mx-auto
          max-w-5xl
        "
      >
        {/* ==================================
            ENCABEZADO
        ================================== */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="
            mx-auto
            max-w-3xl
            text-center
          "
        >
          {/* DECORACIÓN BOTÁNICA */}

          <div className="mb-5 sm:mb-7">
            <Ornamento />
          </div>

        

          {/* TÍTULO PRINCIPAL */}

          <h2
            className="
              mx-auto mt-5
              max-w-[650px]
              font-playfair
              font-normal italic
              text-[36px]
              leading-[1.25]
              text-[#1D344C]
              sm:text-[48px]
              lg:text-[58px]
            "
          >
            {textos.titulo}
          </h2>

          {/* DESCRIPCIÓN */}

          <p
            className="
              mx-auto mt-6
              max-w-2xl
              font-playfair
              text-[16px]
              leading-relaxed
              text-[#1D344C]/85
              sm:text-lg
              sm:leading-loose
            "
          >
            {textos.descripcion}
          </p>

          {/* SEPARADOR */}

          <div
            className="
              mx-auto
              mt-8
              h-px w-20
              bg-[#C6A57B]
              sm:mt-10
            "
          />
        </motion.div>

        {/* ==================================
            PADRES
        ================================== */}

        <div
          className="
            relative
            mx-auto
            mt-7
            grid grid-cols-1
            items-center
            gap-2
            md:mt-12
            md:grid-cols-2
            md:gap-0
          "
        >
          {/* MADRE DEL NOVIO */}

          <GrupoPadres {...padresNovio} />

          {/* SEPARADOR HORIZONTAL - CELULAR */}

          <div
            className="
              mx-auto
              my-2
              h-px w-20
              bg-[#C6A57B]/70
              md:hidden
            "
          />

          {/* SEPARADOR VERTICAL - COMPUTADORA */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              hidden
              h-[75%] w-px
              -translate-y-1/2
              bg-[#C6A57B]/70
              md:block
            "
          />

          {/* PADRES DE LA NOVIA */}

          <GrupoPadres {...padresNovia} />
        </div>

        {/* ==================================
            FRASE FINAL
        ================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.15,
          }}
          className="
            mx-auto
            mt-10
            max-w-xl
            text-center
            sm:mt-14
          "
        >
          {/* ANILLOS DORADOS */}

          <SeparadorAnillos />

          {/* MENSAJE */}

          <p
            className="
              mt-7
              font-playfair
              font-normal italic
              text-lg
              leading-relaxed
              text-[#1D344C]/85
              sm:text-xl
              lg:text-2xl
            "
          >
            {textos.fraseFinal}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Padres;