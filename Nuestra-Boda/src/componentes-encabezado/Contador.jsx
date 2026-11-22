import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY
// ==========================================

const CONFIG = {
  inicialNovio: "A",
  inicialNovia: "J",

  titulo: "¡Estás invitado!",

  texto:
    "Nos encantaría que seas parte de este momento tan especial para nosotros.",

  frase: "Falta para nuestro gran día",

  fecha: "2027-04-10T16:30:00-06:00",


  mensajeFinal: "¡Ha llegado nuestro gran día!",
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
// DECORACIÓN BOTÁNICA
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
// CALCULAR TIEMPO RESTANTE
// ==========================================

const calcularTiempo = (fecha) => {
  const diferencia = Math.max(
    0,
    new Date(fecha).getTime() - Date.now()
  );

  return {
    Días: Math.floor(diferencia / (1000 * 60 * 60 * 24)),

    Horas: Math.floor(
      (diferencia / (1000 * 60 * 60)) % 24
    ),

    Minutos: Math.floor(
      (diferencia / (1000 * 60)) % 60
    ),

    Segundos: Math.floor(
      (diferencia / 1000) % 60
    ),
  };
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

const Contador = ({
  titulo = CONFIG.titulo,
  texto = CONFIG.texto,
  frase = CONFIG.frase,
  fecha = CONFIG.fecha,
}) => {
  const [timeLeft, setTimeLeft] = useState(() =>
    calcularTiempo(fecha)
  );

  useEffect(() => {
    const actualizar = () => {
      setTimeLeft(calcularTiempo(fecha));
    };

    actualizar();

    const timer = setInterval(actualizar, 1000);

    return () => clearInterval(timer);
  }, [fecha]);

  const eventoIniciado = Object.values(timeLeft).every(
    (valor) => valor === 0
  );

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#F1E6D3]
        px-4 py-16
        sm:px-8 sm:py-24
      "
    >
      {/* ======================================
          DECORACIONES BOTÁNICAS
      ====================================== */}

      <Rama
        className="
          pointer-events-none
          absolute -left-10 -top-12
          w-40
          rotate-[110deg]
          opacity-75
          sm:w-56
          lg:w-72
        "
      />

      <Rama
        className="
          pointer-events-none
          absolute -right-10 -bottom-12
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
          text-center
        "
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          {/* ==================================
              MONOGRAMA CLÁSICO
          ================================== */}

          <div
            className="
              relative mx-auto mb-7
              flex h-[95px] w-[85px]
              items-center justify-center
              rounded-t-full
              border border-[#C6A57B]
              border-b-0
              sm:h-[115px] sm:w-[105px]
            "
          >
            <div
              className="
                flex items-center gap-3
                font-playfair italic
                text-[36px]
                text-[#1D344C]
                sm:text-[44px]
              "
            >
              <span>{CONFIG.inicialNovio}</span>

              <span
                className="
                  h-12 w-px
                  bg-[#C6A57B]
                "
              />

              <span>{CONFIG.inicialNovia}</span>
            </div>
          </div>

          {/* FECHA */}

          <p
            className="
              font-playfair
              text-[10px]
              uppercase
              tracking-[0.35em]
              text-[#92754D]
              sm:text-sm
            "
          >
            {CONFIG.fechaVisible}
          </p>

          {/* TÍTULO */}

          <h2
            className="
              mt-5
              font-playfair
              font-normal italic
              text-[42px]
              leading-tight
              text-[#1D344C]
              sm:text-6xl
              lg:text-7xl
            "
          >
            {titulo}
          </h2>

          {/* MENSAJE */}

          <p
            className="
              mx-auto mt-6
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
            {texto}
          </p>

          {/* ==================================
              SEPARADOR DORADO
          ================================== */}

          <div
            className="
              my-9
              flex items-center
              justify-center gap-4
              sm:my-12
            "
          >
            <span
              className="
                h-px w-14
                bg-[#C6A57B]
                sm:w-24
              "
            />

            <Heart
              size={17}
              strokeWidth={1.2}
              color={COLORES.dorado}
            />

            <span
              className="
                h-px w-14
                bg-[#C6A57B]
                sm:w-24
              "
            />
          </div>

          {/* FRASE DEL CONTADOR */}

          <p
            className="
              font-playfair
              text-2xl
              font-normal italic
              text-[#1D344C]
              sm:text-3xl
              lg:text-4xl
            "
          >
            {eventoIniciado
              ? CONFIG.mensajeFinal
              : frase}
          </p>
        </motion.div>

        {/* ======================================
            CUENTA REGRESIVA
        ====================================== */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.15,
          }}
          viewport={{ once: true }}
          className="
            mx-auto mt-7
            max-w-[650px]
            sm:mt-10
          "
        >
          <div
            className="
              grid grid-cols-4
              gap-2
              sm:gap-4
              lg:gap-5
            "
          >
            {Object.entries(timeLeft).map(
              ([item, valor]) => (
                <motion.div
                  key={item}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="
                    relative
                    flex min-w-0
                    flex-col
                    items-center
                    justify-center
                    rounded-[3px]
                    border border-[#C6A57B]
                    bg-[#FAF7F1]
                    px-1 py-5
                    sm:py-8
                  "
                >
                  {/* MARCO INTERIOR */}

                  <div
                    className="
                      pointer-events-none
                      absolute inset-[4px]
                      rounded-[1px]
                      border border-[#C6A57B]/30
                    "
                  />

                  {/* NÚMERO */}

                  <span
                    className="
                      font-playfair
                      font-normal
                      tabular-nums
                      text-[clamp(24px,8vw,38px)]
                      leading-none
                      text-[#1D344C]
                      sm:text-5xl
                      lg:text-6xl
                    "
                  >
                    {String(valor).padStart(2, "0")}
                  </span>

                  {/* LÍNEA DORADA */}

                  <span
                    className="
                      my-3
                      h-px w-5
                      bg-[#C6A57B]
                      sm:my-4 sm:w-8
                    "
                  />

                  {/* ETIQUETA */}

                  <span
                    className="
                      font-playfair
                      text-[8px]
                      uppercase
                      tracking-[0.06em]
                      text-[#1D344C]
                      sm:text-[11px]
                      sm:tracking-[0.15em]
                    "
                  >
                    {item}
                  </span>
                </motion.div>
              )
            )}
          </div>

          {/* ==================================
              HORA DEL EVENTO
          ================================== */}

          <p
            className="
              mt-8
              font-playfair
              text-[10px]
              uppercase
              tracking-[0.20em]
              text-[#92754D]
              sm:mt-10
              sm:text-xs
              sm:tracking-[0.30em]
            "
          >
            {CONFIG.horaVisible}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contador;