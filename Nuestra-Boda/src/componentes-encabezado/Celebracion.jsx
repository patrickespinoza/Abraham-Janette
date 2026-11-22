import React from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  MapPin,
  Heart,
  ArrowUpRight,
} from "lucide-react";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY
// ==========================================

const CONFIG = {

  titulo: "Celebración",

  descripcion:
    "Nos encantará compartir contigo el inicio de esta nueva etapa de nuestras vidas.",

  fecha: "10 de abril",

  dia: "Sábado",

  anio: "2027",

  hora: "4:30 p. m.",

  lugar: "Salón y jardín de fiestas Nirvana",

  direccion: "",

  ubicacion: "https://maps.app.goo.gl/QQrB3WsoUmp1PRXa9",

  fraseFinal: "¡Te esperamos!",
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
  arena: "#DCCAB7",
  blanco: "#FAF7F1",
};



// ==========================================
// ILUSTRACIÓN CLÁSICA DEL SALÓN
// ==========================================

const IconoSalon = () => (
  <svg
    viewBox="0 0 120 100"
    className="mx-auto w-24 sm:w-28"
    fill="none"
    stroke={COLORES.dorado}
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M15 90V40L60 10L105 40V90Z" />

    <path d="M8 44L60 5L112 44" />

    <path d="M4 90H116" />

    {/* PUERTA */}

    <path d="M46 90V59Q60 39 74 59V90" />

    <path d="M60 50V90" />

    {/* VENTANAS */}

    <rect x="25" y="49" width="12" height="20" />

    <rect x="83" y="49" width="12" height="20" />

    <path d="M31 49V69M25 59H37" />

    <path d="M89 49V69M83 59H95" />

    {/* VENTANA SUPERIOR */}

    <circle cx="60" cy="30" r="6" />

    {/* DECORACIÓN LATERAL */}

    <path d="M10 90Q0 69 7 53" />

    <path d="M110 90Q120 69 113 53" />

    <path d="M7 65L1 59M7 75L15 67" />

    <path d="M113 65L119 59M113 75L105 67" />
  </svg>
);

// ==========================================
// SEPARADOR DORADO
// ==========================================

const Separador = () => (
  <div
    className="
      flex items-center justify-center
      gap-4
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

    <Heart
      size={15}
      strokeWidth={1.2}
      className="text-[#C6A57B]"
    />

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

const Celebracion = ({
  titulo = CONFIG.titulo,
  fecha = CONFIG.fecha,
  hora = CONFIG.hora,
  lugar = CONFIG.lugar,
  direccion = CONFIG.direccion,
  ubicacion = CONFIG.ubicacion,
}) => {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#1D344C]
        px-4 py-14
        sm:px-10 sm:py-24
      "
    >
      {/* ======================================
          CONTENEDOR CON MARCO CLÁSICO
      ====================================== */}

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative
          mx-auto
          max-w-4xl
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
            px-4 py-10
            text-center
            sm:px-12 sm:py-16
            lg:px-20
          "
        >
         

          {/* TÍTULO PRINCIPAL */}

          <h2
            className="
              mt-5
              font-playfair
              font-normal italic
              text-[42px]
              leading-tight
              text-[#F1E6D3]
              sm:text-6xl
              lg:text-7xl
            "
          >
            {titulo}
          </h2>

          {/* DESCRIPCIÓN */}

          <p
            className="
              mx-auto mt-6
              max-w-lg
              font-playfair
              text-[16px]
              leading-relaxed
              text-[#F1E6D3]/90
              sm:text-lg
              sm:leading-loose
            "
          >
            {CONFIG.descripcion}
          </p>

          {/* SEPARADOR */}

          <div className="my-8 sm:my-10">
            <Separador />
          </div>

          {/* ==================================
              FECHA Y HORA
          ================================== */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.1,
            }}
            className="
              relative
              mx-auto
              grid max-w-xl grid-cols-2
              items-start
              gap-2
              sm:gap-6
            "
          >
            {/* FECHA */}

            <div
              className="
                flex flex-col
                items-center
                justify-center
                px-1 py-3
                sm:px-4
              "
            >
              <CalendarDays
                size={32}
                strokeWidth={1.2}
                className="mb-5 text-[#C6A57B]"
              />

              <p
                className="
                  font-playfair
                  text-[10px]
                  uppercase
                  tracking-[0.25em]
                  text-[#C6A57B]
                  sm:text-xs
                "
              >
                Fecha
              </p>

              <p
                className="
                  mt-3
                  font-playfair
                  text-[23px]
                  leading-tight
                  text-[#F1E6D3]
                  sm:text-3xl
                "
              >
                {fecha}
              </p>

              <p
                className="
                  mt-2
                  font-playfair
                  text-xs
                  text-[#F1E6D3]/80
                  sm:text-sm
                "
              >
                {CONFIG.dia}, {CONFIG.anio}
              </p>
            </div>

            {/* SEPARADOR VERTICAL */}

            <div
              className="
                pointer-events-none
                absolute
                left-1/2 top-1/2
                h-[85%] w-px
                -translate-y-1/2
                bg-[#C6A57B]/50
              "
            />

            {/* HORA */}

            <div
              className="
                flex flex-col
                items-center
                justify-center
                px-1 py-3
                sm:px-4
              "
            >
              <Clock
                size={32}
                strokeWidth={1.2}
                className="mb-5 text-[#C6A57B]"
              />

              <p
                className="
                  font-playfair
                  text-[10px]
                  uppercase
                  tracking-[0.25em]
                  text-[#C6A57B]
                  sm:text-xs
                "
              >
                Hora
              </p>

              <p
                className="
                  mt-3
                  font-playfair
                  text-[23px]
                  leading-tight
                  text-[#F1E6D3]
                  sm:text-3xl
                "
              >
                {hora}
              </p>
            </div>
          </motion.div>

          {/* ==================================
              SEPARADOR DE UBICACIÓN
          ================================== */}

          <div
            className="
              mx-auto
              my-9
              h-px
              w-full max-w-md
              bg-[#C6A57B]/40
              sm:my-12
            "
          />

          {/* ==================================
              UBICACIÓN
          ================================== */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="
              mx-auto
              max-w-xl
              text-center
            "
          >
            {/* ILUSTRACIÓN DEL SALÓN */}

            <div className="mb-6">
              <IconoSalon />
            </div>

            {/* SUBTÍTULO */}

            <p
              className="
                font-playfair
                text-[10px]
                uppercase
                tracking-[0.30em]
                text-[#C6A57B]
                sm:text-xs
              "
            >
              Ubicación
            </p>

            {/* NOMBRE DEL LUGAR */}

            <h3
              className="
                mx-auto mt-5
                max-w-md
                font-playfair
                font-normal
                text-[28px]
                leading-[1.4]
                text-[#F1E6D3]
                sm:text-[38px]
                lg:text-[42px]
              "
            >
              {lugar}
            </h3>

            {/* DIRECCIÓN OPCIONAL */}

            {direccion && (
              <p
                className="
                  mx-auto mt-5
                  max-w-sm
                  font-playfair
                  text-sm
                  leading-relaxed
                  text-[#F1E6D3]/80
                  sm:text-base
                "
              >
                {direccion}
              </p>
            )}

            {/* ==================================
                BOTÓN GOOGLE MAPS
            ================================== */}

            <motion.a
              href={ubicacion}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="
                mx-auto mt-8
                inline-flex
                w-full max-w-[280px]
                items-center
                justify-center
                gap-3
                rounded-[2px]
                border border-[#C6A57B]
                bg-[#F1E6D3]
                px-5 py-4
                font-playfair
                text-[11px]
                uppercase
                tracking-[0.15em]
                text-[#1D344C]
                transition-colors
                duration-300
                hover:bg-[#DCCAB7]
                sm:mt-10
                sm:text-xs
              "
            >
              <MapPin
                size={17}
                strokeWidth={1.5}
              />

              Ver ubicación

              <ArrowUpRight
                size={14}
                strokeWidth={1.5}
              />
            </motion.a>
          </motion.div>

          {/* ==================================
              FRASE FINAL
          ================================== */}

          <div className="mt-10 sm:mt-14">

            <div
              className="
                mx-auto mb-5
                h-px w-10
                bg-[#C6A57B]
              "
            />

            <p
              className="
                font-playfair
                text-xl
                font-normal italic
                text-[#C6A57B]
                sm:text-2xl
              "
            >
              {CONFIG.fraseFinal}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Celebracion;