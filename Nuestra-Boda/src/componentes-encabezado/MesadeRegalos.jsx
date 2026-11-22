import React from "react";
import { motion } from "framer-motion";
import {
  Gift,
  ArrowUpRight,
} from "lucide-react";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY
// ==========================================

const CONFIG = {

  titulo: "Mesa de Regalos",

  descripcion:
    "El mejor regalo para nosotros en este día tan importante es tu compañía, pero si deseas hacernos un obsequio, tenemos estas opciones:",

  fraseFinal:
    "Gracias por ser parte de nuestra historia.",
};

// ==========================================
// MESAS DE REGALOS
// ==========================================

const mesasRegalos = [
  {
    nombre: "Liverpool",

    subtitulo: "Mesa de regalos",

    numero: "60078575",

    titulares: "",

    enlace:
      "https://mesaderegalos.liverpool.com.mx/milistaderegalos/60078575",
  },

  {
    nombre: "Amazon",

    subtitulo: "Mesa de regalos",

    numero: "",

    titulares:
      "Abraham Licea Salinas y Janette Miguel Díaz",

    enlace:
      "https://www.amazon.com.mx/wedding/guest-view/WRN42P09A03R",
  },
];

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
// HOJAS DECORATIVAS
// MISMO ESTILO DEL CONTADOR
// ==========================================

const Rama = ({ className = "" }) => (
  <svg
    viewBox="0 0 120 150"
    className={className}
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M12 145 Q32 80 105 12"
      stroke={COLORES.verdeSalvia}
      strokeWidth="1.5"
    />

    <g fill={COLORES.verdeSalvia}>
      <path d="M24 116 Q-5 100 15 79 Q34 95 24 116Z" />

      <path d="M31 101 Q60 108 69 83 Q42 80 31 101Z" />

      <path d="M43 79 Q14 65 29 42 Q50 58 43 79Z" />

      <path d="M53 65 Q83 77 93 50 Q67 44 53 65Z" />

      <path d="M70 44 Q46 26 65 8 Q83 25 70 44Z" />

      <path d="M83 32 Q111 39 119 15 Q97 10 83 32Z" />

      <path d="M99 18 Q93 0 113 0 Q118 14 99 18Z" />
    </g>
  </svg>
);

// ==========================================
// IDENTIFICADORES DE LAS TIENDAS
// ==========================================

const LogoTienda = ({ nombre }) => {
  if (nombre === "Liverpool") {
    return (
      <svg
        viewBox="0 0 260 75"
        className="w-[180px] sm:w-[200px]"
        role="img"
        aria-label="Liverpool"
      >
        <g fill="#D6006D">

          <rect
            x="6"
            y="15"
            width="7"
            height="32"
          />

          <rect
            x="6"
            y="40"
            width="25"
            height="7"
          />

          <rect
            x="18"
            y="9"
            width="7"
            height="25"
          />

          <text
            x="40"
            y="45"
            fontFamily="Arial, sans-serif"
            fontSize="34"
            fontWeight="bold"
          >
            Liverpool
          </text>
        </g>
      </svg>
    );
  }

  if (nombre === "Amazon") {
    return (
      <svg
        viewBox="0 0 260 80"
        className="w-[165px] sm:w-[185px]"
        role="img"
        aria-label="Amazon"
      >
        <text
          x="130"
          y="44"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize="48"
          fontWeight="bold"
          fill="#252F3D"
        >
          amazon
        </text>

        <path
          d="M74 54 Q129 84 185 54"
          fill="none"
          stroke="#FF9900"
          strokeWidth="5"
          strokeLinecap="round"
        />

        <path
          d="M172 53 L188 51 L185 65"
          fill="none"
          stroke="#FF9900"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <span className="font-playfair text-3xl text-[#1D344C]">
      {nombre}
    </span>
  );
};

// ==========================================
// TARJETA DE MESA DE REGALOS
// ==========================================

const TarjetaRegalos = ({
  nombre,
  subtitulo,
  numero,
  titulares,
  enlace,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      className="
        relative
        flex h-full w-full
        flex-col
        border border-[#C6A57B]
        bg-[#FAF7F1]
        p-[5px]
        sm:p-[7px]
      "
    >
      {/* MARCO INTERIOR */}

      <div
        className="
          flex flex-1
          flex-col
          items-center
          border border-[#C6A57B]/35
          px-5 py-9
          text-center
          sm:px-8 sm:py-12
        "
      >
        {/* ==================================
            IDENTIFICADOR DE LA TIENDA
        ================================== */}

        <div
          className="
            flex h-[85px]
            w-full
            items-center
            justify-center
          "
        >
          <LogoTienda nombre={nombre} />
        </div>

        {/* SEPARADOR */}

        <div
          className="
            mx-auto my-5
            h-px w-12
            bg-[#C6A57B]
          "
        />



        {/* ==================================
            INFORMACIÓN DE LA MESA
        ================================== */}

        <div
          className="
            flex min-h-[95px]
            flex-1
            flex-col
            items-center
            justify-center
            py-5
          "
        >
          {/* NÚMERO DE MESA */}

          {numero && (
            <>
              <p
                className="
                  font-playfair
                  text-sm
                  text-[#1D344C]/75
                "
              >
                Número de evento
              </p>

              <p
                className="
                  mt-2
                  font-playfair
                  text-2xl
                  tracking-[0.08em]
                  text-[#1D344C]
                  sm:text-3xl
                "
              >
                {numero}
              </p>
            </>
          )}

          {/* TITULARES */}

          {titulares && (
            <p
              className="
                mx-auto
                max-w-[280px]
                font-playfair
                text-[19px]
                leading-relaxed
                text-[#1D344C]
                sm:text-xl
              "
            >
              {titulares}
            </p>
          )}
        </div>

        {/* ==================================
            BOTÓN MESA DE REGALOS
        ================================== */}

        <motion.a
          href={enlace}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver mesa de regalos de ${nombre}`}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="
            mt-4
            inline-flex
            w-full max-w-[280px]
            items-center
            justify-center
            gap-3
            border border-[#1D344C]
            bg-[#1D344C]
            px-4 py-4
            font-playfair
            text-[10px]
            uppercase
            tracking-[0.12em]
            text-[#F1E6D3]
            transition-colors
            duration-300
            hover:border-[#C6A57B]
            hover:bg-[#F1E6D3]
            hover:text-[#1D344C]
            sm:text-xs
          "
        >
          Ver mesa de regalos

          <ArrowUpRight
            size={16}
            strokeWidth={1.4}
            className="shrink-0"
          />
        </motion.a>
      </div>
    </motion.div>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

const Regalos = () => {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#F1E6D3]
        px-5 py-20
        sm:px-10 sm:py-28
      "
    >
      {/* ==================================
          HOJAS SUPERIORES
      ================================== */}

      <Rama
        className="
          pointer-events-none
          absolute
          -left-10 -top-12
          w-40
          rotate-[110deg]
          opacity-75
          sm:w-56
          lg:w-72
        "
      />

      {/* ==================================
          HOJAS INFERIORES
      ================================== */}

      <Rama
        className="
          pointer-events-none
          absolute
          -right-10 -bottom-12
          w-40
          -rotate-[70deg]
          opacity-75
          sm:w-56
          lg:w-72
        "
      />

      <div
        className="
          relative z-10
          mx-auto max-w-5xl
        "
      >
        {/* ==================================
            ENCABEZADO
        ================================== */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            ease: "easeOut",
          }}
          className="text-center"
        >
          {/* SUBTÍTULO */}

          <p
            className="
              font-playfair
              text-[10px]
              uppercase
              tracking-[0.30em]
              text-[#92754D]
              sm:text-xs
              sm:tracking-[0.35em]
            "
          >
            {CONFIG.subtitulo}
          </p>

          {/* TÍTULO PRINCIPAL */}

          <h2
            className="
              mx-auto mt-5
              font-playfair
              font-normal italic
              text-[42px]
              leading-tight
              text-[#1D344C]
              sm:text-6xl
              lg:text-7xl
            "
          >
            {CONFIG.titulo}
          </h2>

          {/* SEPARADOR */}

          <div
            className="
              mx-auto my-7
              h-px w-16
              bg-[#C6A57B]
              sm:my-9 sm:w-24
            "
          />

          {/* ICONO DE REGALO */}

          <Gift
            size={48}
            strokeWidth={1.1}
            className="
              mx-auto
              text-[#92754D]
              sm:h-14 sm:w-14
            "
          />

          {/* ==================================
              MENSAJE DE LOS NOVIOS
          ================================== */}

          <p
            className="
              mx-auto mt-7
              max-w-2xl
              px-2
              font-playfair
              text-[18px]
              leading-[1.9]
              text-[#1D344C]
              sm:text-xl
              sm:leading-loose
              lg:text-[23px]
            "
          >
            {CONFIG.descripcion}
          </p>
        </motion.div>

        {/* ==================================
            MESAS DE REGALOS
        ================================== */}

        <div
          className="
            mx-auto
            mt-10
            grid max-w-[850px]
            grid-cols-1
            items-stretch
            gap-6
            sm:mt-14
            md:grid-cols-2
            md:gap-8
          "
        >
          {mesasRegalos.map((mesa, index) => (
            <TarjetaRegalos
              key={mesa.nombre}
              {...mesa}
              index={index}
            />
          ))}
        </div>

        {/* ==================================
            FRASE FINAL
        ================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="
            mx-auto mt-12
            max-w-xl
            text-center
            sm:mt-16
          "
        >
          <div
            className="
              mx-auto mb-6
              h-px w-16
              bg-[#C6A57B]
              sm:w-24
            "
          />

          <p
            className="
              font-playfair
              font-normal italic
              text-[25px]
              leading-relaxed
              text-[#1D344C]
              sm:text-[32px]
              lg:text-[36px]
            "
          >
            {CONFIG.fraseFinal}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Regalos;