import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY
// ==========================================

const CONFIG = {

  titulo: "Código de Vestimenta",

  codigo: "Formal",

  titulaDamas: "Damas",

  coloresDamas: "Beige, champagne, blanco y amarillo",

  mensajeDamas: "quedan reservados para la novia.",

  tituloCaballeros: "Caballeros",

  colorCaballeros: "Azul marino",

  mensajeCaballeros: "queda reservado para el novio.",

  fraseFinal:
    "¡Gracias por acompañarnos y respetar estos detalles de nuestro día especial!",
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
// SEPARADOR CLÁSICO
// ==========================================

const Separador = () => (
  <div
    className="
      flex items-center
      justify-center gap-4
    "
    aria-hidden="true"
  >
    <span
      className="
        h-px w-12
        bg-[#C6A57B]
        sm:w-20
      "
    />

    <Heart
      size={15}
      strokeWidth={1.2}
      className="text-[#C6A57B]"
    />

    <span
      className="
        h-px w-12
        bg-[#C6A57B]
        sm:w-20
      "
    />
  </div>
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
        strokeWidth="1.2"
      />

      <circle
        cx="33"
        cy="19"
        r="14"
        stroke={COLORES.dorado}
        strokeWidth="1.2"
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
);

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

const Vestimenta = () => {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#F1E6D3]
        px-4 py-14
        sm:px-10 sm:py-24
      "
    >
      {/* ======================================
          CONTENEDOR PRINCIPAL
      ====================================== */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.9,
          ease: "easeOut",
        }}
        viewport={{ once: true }}
        className="
          relative
          mx-auto max-w-4xl
          border border-[#C6A57B]/80
          p-[6px]
          sm:p-[9px]
        "
      >
        {/* MARCO INTERIOR */}

        <div
          className="
            relative
            border border-[#C6A57B]/35
            px-5 py-10
            text-center
            sm:px-12 sm:py-16
            lg:px-20
          "
        >
        

          {/* ==================================
              TÍTULO PRINCIPAL
          ================================== */}

          <h2
            className="
              mx-auto mt-5
              max-w-xl
              font-playfair
              font-normal italic
              text-[36px]
              leading-[1.25]
              text-[#1D344C]
              sm:text-[50px]
              lg:text-[58px]
            "
          >
            {CONFIG.titulo}
          </h2>

          {/* SEPARADOR */}

          <div className="my-7 sm:my-9">
            <Separador />
          </div>

          {/* ==================================
              CÓDIGO DE VESTIMENTA
          ================================== */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3
              className="
                font-playfair
                font-normal
                text-[48px]
                leading-tight
                text-[#1D344C]
                sm:text-[60px]
                lg:text-[70px]
              "
            >
              {CONFIG.codigo}
            </h3>

            <div
              className="
                mx-auto mt-5
                h-px w-12
                bg-[#C6A57B]
                sm:w-16
              "
            />
          </motion.div>

          {/* ==================================
              INDICACIONES DE VESTIMENTA
          ================================== */}

          <div
            className="
              relative
              mx-auto mt-8
              grid max-w-3xl
              grid-cols-1
              items-start
              gap-6
              sm:mt-12
              md:grid-cols-2
              md:gap-0
            "
          >
            {/* ==================================
                DAMAS
            ================================== */}

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="
                flex flex-col
                items-center
                px-2 py-3
                sm:px-6 sm:py-6
              "
            >
              <h4
                className="
                  font-playfair
                  font-normal italic
                  text-[29px]
                  text-[#92754D]
                  sm:text-[34px]
                "
              >
                {CONFIG.titulaDamas}
              </h4>

              <div
                className="
                  mx-auto my-5
                  h-px w-8
                  bg-[#C6A57B]
                "
              />

              <p
                className="
                  max-w-sm
                  font-playfair
                  text-[19px]
                  leading-[1.9]
                  text-[#1D344C]
                  sm:text-[22px]
                "
              >
                <span className="font-semibold">
                  {CONFIG.coloresDamas}
                </span>
                {" "}
                {CONFIG.mensajeDamas}
              </p>
            </motion.div>

            {/* SEPARADOR HORIZONTAL - CELULAR */}

            <div
              className="
                mx-auto
                h-px w-2/3
                bg-[#C6A57B]/60
                md:hidden
              "
            />

            {/* SEPARADOR VERTICAL - COMPUTADORA */}

            <div
              className="
                pointer-events-none
                absolute
                left-1/2 top-1/2
                hidden
                h-[85%] w-px
                -translate-y-1/2
                bg-[#C6A57B]/60
                md:block
              "
            />

            {/* ==================================
                CABALLEROS
            ================================== */}

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
              }}
              viewport={{ once: true }}
              className="
                flex flex-col
                items-center
                px-2 py-3
                sm:px-6 sm:py-6
              "
            >
              <h4
                className="
                  font-playfair
                  font-normal italic
                  text-[29px]
                  text-[#92754D]
                  sm:text-[34px]
                "
              >
                {CONFIG.tituloCaballeros}
              </h4>

              <div
                className="
                  mx-auto my-5
                  h-px w-8
                  bg-[#C6A57B]
                "
              />

              <p
                className="
                  max-w-sm
                  font-playfair
                  text-[19px]
                  leading-[1.9]
                  text-[#1D344C]
                  sm:text-[22px]
                "
              >
                <span className="font-semibold">
                  {CONFIG.colorCaballeros}
                </span>
                {" "}
                {CONFIG.mensajeCaballeros}
              </p>
            </motion.div>
          </div>

          {/* ==================================
              MENSAJE FINAL
          ================================== */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="
              mx-auto mt-8
              max-w-xl
              sm:mt-12
            "
          >
            <SeparadorAnillos />

            <p
              className="
                mt-7
                font-playfair
                font-normal italic
                text-[18px]
                leading-[1.8]
                text-[#1D344C]
                sm:text-[22px]
                lg:text-[24px]
              "
            >
              {CONFIG.fraseFinal}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Vestimenta;