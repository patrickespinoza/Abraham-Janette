import React from "react";
import { motion } from "framer-motion";
import {
  Wine,
  HeartHandshake,
  Heart,
  UtensilsCrossed,
  Music2,
  MoonStar,
} from "lucide-react";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY
// ==========================================

const CONFIG = {


  titulo: "Itinerario",

  descripcion:
    "Cada instante será parte de una historia inolvidable. Acompáñanos a celebrar cada momento.",

  fraseFinal: "¡Te esperamos!",
};

// ==========================================
// HORARIOS DEL EVENTO
// ==========================================

const eventos = [
  {
    titulo: "Recepción Social",
    hora: "4:30 p. m.",
    icono: Wine,
  },
  {
    titulo: "Bendición",
    hora: "5:00 p. m.",
    icono: HeartHandshake,
  },
  {
    titulo: "Entrada de los novios",
    hora: "6:30 p. m.",
    icono: Heart,
  },
  {
    titulo: "Cena",
    hora: "6:45 p. m.",
    icono: UtensilsCrossed,
  },
  {
    titulo: "Fiesta",
    hora: "8:20 p. m.",
    icono: Music2,
  },
  {
    titulo: "Nos vamos a casa",
    hora: "11:00 p. m.",
    icono: MoonStar,
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
// DECORACIÓN BOTÁNICA
// MISMAS HOJAS DEL CONTADOR
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
// EVENTO INDIVIDUAL
// ==========================================

const EventoItinerario = ({
  titulo,
  hora,
  icono: Icono,
  ultimo,
  index,
}) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.7,
        delay: Math.min(index * 0.08, 0.24),
        ease: "easeOut",
      }}
      className="
        relative
        flex items-start
        gap-5
        sm:gap-8
      "
    >
      {/* ======================================
          LÍNEA VERTICAL DORADA
      ====================================== */}

      {!ultimo && (
        <div
          className="
            pointer-events-none
            absolute
            left-[32px]
            top-[64px]
            bottom-0
            w-px
            bg-[#C6A57B]
            sm:left-[40px]
            sm:top-[80px]
          "
        />
      )}

      {/* ======================================
          ICONO DEL EVENTO
      ====================================== */}

      <div
        className="
          relative z-10
          flex shrink-0
          h-16 w-16
          items-center justify-center
          rounded-full
          border border-[#C6A57B]
          bg-[#FAF7F1]
          sm:h-20 sm:w-20
        "
      >
        {/* CÍRCULO INTERIOR */}

        <div
          className="
            pointer-events-none
            absolute inset-[4px]
            rounded-full
            border border-[#C6A57B]/35
          "
        />

        <Icono
          strokeWidth={1.2}
          className="
            h-7 w-7
            text-[#1D344C]
            sm:h-9 sm:w-9
          "
        />
      </div>

      {/* ======================================
          INFORMACIÓN DEL EVENTO
      ====================================== */}

      <div
        className={`
          flex min-w-0 flex-1
          flex-col justify-center
          min-h-[64px]
          pt-2
          sm:min-h-[80px]
          sm:pt-3
          ${ultimo ? "pb-2" : "pb-10 sm:pb-12"}
        `}
      >
        {/* HORA */}

        <p
          className="
            font-playfair
            font-medium
            text-[13px]
            tracking-[0.12em]
            text-[#92754D]
            sm:text-base
          "
        >
          {hora}
        </p>

        {/* NOMBRE DEL EVENTO */}

        <h3
          className="
            mt-2
            font-playfair
            font-normal
            text-[23px]
            leading-snug
            text-[#1D344C]
            sm:text-[28px]
            lg:text-[30px]
          "
        >
          {titulo}
        </h3>
      </div>
    </motion.li>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL - ITINERARIO
// ==========================================

const Itinerario = () => {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#FAF7F1]
        px-5 py-20
        sm:px-10 sm:py-28
      "
    >
      {/* ======================================
          HOJAS EN LA ESQUINA SUPERIOR
      ====================================== */}

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

      {/* ======================================
          HOJAS EN LA ESQUINA INFERIOR
      ====================================== */}

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

      {/* ======================================
          CONTENEDOR PRINCIPAL
      ====================================== */}

      <div
        className="
          relative z-10
          mx-auto max-w-4xl
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
        

          {/* TÍTULO PRINCIPAL */}

          <h2
            className="
              mt-5
              font-playfair
              font-normal italic
              text-[48px]
              leading-tight
              text-[#1D344C]
              sm:text-6xl
              lg:text-7xl
            "
          >
            {CONFIG.titulo}
          </h2>

          {/* SEPARADOR SENCILLO */}

          <div
            className="
              mx-auto my-7
              h-px w-16
              bg-[#C6A57B]
              sm:my-9 sm:w-24
            "
          />

          {/* DESCRIPCIÓN */}

          <p
            className="
              mx-auto
              max-w-xl
              px-3
              font-playfair
              text-[17px]
              leading-relaxed
              text-[#1D344C]/90
              sm:text-xl
              sm:leading-loose
            "
          >
            {CONFIG.descripcion}
          </p>
        </motion.div>

        {/* ==================================
            LÍNEA DE TIEMPO
        ================================== */}

        <ol
          className="
            relative
            mx-auto mt-12
            max-w-[350px]
            sm:mt-16
            sm:max-w-[480px]
            lg:max-w-[520px]
          "
        >
          {eventos.map((evento, index) => (
            <EventoItinerario
              key={`${evento.titulo}-${index}`}
              {...evento}
              index={index}
              ultimo={index === eventos.length - 1}
            />
          ))}
        </ol>

        {/* ==================================
            FRASE FINAL
        ================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="
            mt-12
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
              text-[30px]
              text-[#1D344C]
              sm:text-[38px]
              lg:text-[42px]
            "
          >
            {CONFIG.fraseFinal}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Itinerario;