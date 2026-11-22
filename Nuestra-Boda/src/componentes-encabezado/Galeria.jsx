import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY
// ==========================================

const CONFIG = {


  titulo: "Nuestros momentos",

  descripcion:
    "Una colección de instantes, recuerdos y sonrisas que forman parte de nuestra historia de amor.",

  fraseFinal:
    "Lo mejor de nuestra historia está por comenzar.",

  tiempoCarrusel: 5000,
};

// ==========================================
// FOTOGRAFÍAS
// ==========================================

const imagenes = [
  "/Carrusel01v.jpg",
  "/Carrusel02.jpg",
  "/Carrusel03.jpg",
  "/Carrusel04.jpg",
  "/Carrusel05.jpg",
  "/Carrusel06.jpg",
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
  arena: "#DCCAB7",
  blanco: "#FAF7F1",
};

// ==========================================
// HOJAS DECORATIVAS
// MISMO ESTILO DEL CONTADOR E ITINERARIO
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
// ANIMACIONES DEL CARRUSEL
// ==========================================

const animacionImagen = {
  entrada: (direccion) => ({
    x: direccion > 0 ? "100%" : "-100%",
    opacity: 0,
  }),

  centro: {
    x: 0,
    opacity: 1,
  },

  salida: (direccion) => ({
    x: direccion > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

const Galeria = () => {
  const [[indice, direccion], setPagina] =
    useState([0, 1]);

  const [reproduciendo, setReproduciendo] =
    useState(true);

  const [interactuando, setInteractuando] =
    useState(false);

  const inicioTouch = useRef(null);

  const total = imagenes.length;

  // ========================================
  // CAMBIAR FOTOGRAFÍA
  // ========================================

  const cambiarImagen = useCallback(
    (paso) => {
      setPagina(([actual]) => [
        (actual + paso + total) % total,
        paso,
      ]);
    },
    [total]
  );

  const irAImagen = (nuevoIndice) => {
    setPagina(([actual, direccionActual]) => {
      if (nuevoIndice === actual) {
        return [actual, direccionActual];
      }

      return [
        nuevoIndice,
        nuevoIndice > actual ? 1 : -1,
      ];
    });
  };

  // ========================================
  // REPRODUCCIÓN AUTOMÁTICA
  // ========================================

  useEffect(() => {
    if (!reproduciendo || interactuando) return;

    const intervalo = setTimeout(() => {
      cambiarImagen(1);
    }, CONFIG.tiempoCarrusel);

    return () => clearTimeout(intervalo);
  }, [
    indice,
    reproduciendo,
    interactuando,
    cambiarImagen,
  ]);

  // ========================================
  // PRECARGAR SIGUIENTE FOTOGRAFÍA
  // ========================================

  useEffect(() => {
    const siguiente = new Image();

    siguiente.src =
      imagenes[(indice + 1) % total];
  }, [indice, total]);

  // ========================================
  // DESPLAZAMIENTO TÁCTIL
  // ========================================

  const manejarTouchInicio = (e) => {
    inicioTouch.current =
      e.touches[0].clientX;

    setInteractuando(true);
  };

  const manejarTouchFinal = (e) => {
    if (inicioTouch.current !== null) {
      const finalTouch =
        e.changedTouches[0].clientX;

      const distancia =
        inicioTouch.current - finalTouch;

      if (distancia > 50) {
        cambiarImagen(1);
      }

      if (distancia < -50) {
        cambiarImagen(-1);
      }
    }

    inicioTouch.current = null;

    setInteractuando(false);
  };

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#1D344C]
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
          opacity-80
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
          opacity-80
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
          

          {/* TÍTULO */}

          <h2
            className="
              mx-auto mt-5
              font-playfair
              font-normal italic
              text-[39px]
              leading-tight
              text-[#F1E6D3]
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

          {/* DESCRIPCIÓN */}

          <p
            className="
              mx-auto
              max-w-xl
              px-2
              font-playfair
              text-[17px]
              leading-relaxed
              text-[#F1E6D3]/90
              sm:text-xl
              sm:leading-loose
            "
          >
            {CONFIG.descripcion}
          </p>
        </motion.div>

        {/* ==================================
            CARRUSEL PRINCIPAL
        ================================== */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="
            relative
            mx-auto mt-10
            max-w-[430px]
            sm:mt-14
            sm:max-w-[520px]
            lg:max-w-[650px]
          "
        >
          {/* MARCO DORADO EXTERIOR */}

          <div
            className="
              border border-[#C6A57B]
              p-[6px]
              sm:p-[9px]
            "
          >
            {/* MARCO INTERIOR */}

            <div
              className="
                relative
                border border-[#C6A57B]/40
                p-[3px]
              "
            >
              {/* CONTENEDOR DE FOTOGRAFÍAS */}

              <div
                onMouseEnter={() =>
                  setInteractuando(true)
                }
                onMouseLeave={() =>
                  setInteractuando(false)
                }
                onTouchStart={manejarTouchInicio}
                onTouchEnd={manejarTouchFinal}
                onTouchCancel={() => {
                  inicioTouch.current = null;
                  setInteractuando(false);
                }}
                className="
                  relative
                  w-full
                  aspect-[4/5]
                  overflow-hidden
                  bg-[#1D344C]
                  touch-pan-y
                  sm:aspect-[4/5]
                  lg:aspect-[5/4]
                "
              >
                <AnimatePresence
                  initial={false}
                  custom={direccion}
                >
                  <motion.img
                    key={indice}
                    src={imagenes[indice]}
                    alt={`Abraham y Janette - Fotografía ${
                      indice + 1
                    }`}
                    custom={direccion}
                    variants={animacionImagen}
                    initial="entrada"
                    animate="centro"
                    exit="salida"
                    transition={{
                      x: {
                        type: "tween",
                        duration: 0.65,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      opacity: {
                        duration: 0.4,
                      },
                    }}
                    draggable={false}
                    className="
                      absolute inset-0
                      h-full w-full
                      object-contain
                      object-center
                      select-none
                    "
                  />
                </AnimatePresence>

                {/* ==================================
                    FLECHA ANTERIOR
                ================================== */}

                <button
                  type="button"
                  onClick={() => cambiarImagen(-1)}
                  aria-label="Fotografía anterior"
                  className="
                    absolute
                    left-2 top-1/2
                    z-20
                    flex h-10 w-10
                    -translate-y-1/2
                    items-center justify-center
                    rounded-full
                    border border-[#C6A57B]
                    bg-[#1D344C]
                    text-[#F1E6D3]
                    transition-colors
                    duration-300
                    hover:bg-[#C6A57B]
                    hover:text-[#1D344C]
                    sm:left-4
                    sm:h-12 sm:w-12
                  "
                >
                  <ChevronLeft
                    size={22}
                    strokeWidth={1.4}
                  />
                </button>

                {/* ==================================
                    FLECHA SIGUIENTE
                ================================== */}

                <button
                  type="button"
                  onClick={() => cambiarImagen(1)}
                  aria-label="Fotografía siguiente"
                  className="
                    absolute
                    right-2 top-1/2
                    z-20
                    flex h-10 w-10
                    -translate-y-1/2
                    items-center justify-center
                    rounded-full
                    border border-[#C6A57B]
                    bg-[#1D344C]
                    text-[#F1E6D3]
                    transition-colors
                    duration-300
                    hover:bg-[#C6A57B]
                    hover:text-[#1D344C]
                    sm:right-4
                    sm:h-12 sm:w-12
                  "
                >
                  <ChevronRight
                    size={22}
                    strokeWidth={1.4}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* ==================================
              INDICADORES DE FOTOGRAFÍAS
          ================================== */}

          <div
            className="
              mt-5
              flex items-center
              justify-center gap-1
              sm:mt-6 sm:gap-2
            "
          >
            {imagenes.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => irAImagen(i)}
                aria-label={`Ver fotografía ${i + 1}`}
                aria-current={
                  indice === i ? "true" : undefined
                }
                className="
                  flex h-9 w-7
                  items-center justify-center
                "
              >
                <span
                  className={`
                    block rounded-full
                    transition-all duration-300
                    ${
                      indice === i
                        ? "h-[9px] w-6 bg-[#C6A57B]"
                        : "h-[7px] w-[7px] bg-[#F1E6D3]/35"
                    }
                  `}
                />
              </button>
            ))}
          </div>

          {/* ==================================
              CONTADOR Y REPRODUCCIÓN
          ================================== */}

          <div
            className="
              mt-1
              flex items-center
              justify-center gap-4
            "
          >
            <p
              className="
                font-playfair
                text-xs
                tracking-[0.20em]
                text-[#C6A57B]
                sm:text-sm
              "
            >
              {String(indice + 1).padStart(2, "0")}
              {" / "}
              {String(total).padStart(2, "0")}
            </p>

            <span
              className="
                h-4 w-px
                bg-[#C6A57B]/50
              "
            />

            <button
              type="button"
              onClick={() =>
                setReproduciendo((valor) => !valor)
              }
              aria-label={
                reproduciendo
                  ? "Pausar carrusel"
                  : "Reproducir carrusel"
              }
              className="
                flex h-8 w-8
                items-center justify-center
                rounded-full
                text-[#C6A57B]
                transition-colors
                hover:text-[#F1E6D3]
              "
            >
              {reproduciendo ? (
                <Pause
                  size={15}
                  strokeWidth={1.5}
                />
              ) : (
                <Play
                  size={15}
                  strokeWidth={1.5}
                />
              )}
            </button>
          </div>
        </motion.div>

        {/* ==================================
            MENSAJE FINAL
        ================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="
            mx-auto mt-10
            max-w-xl
            text-center
            sm:mt-14
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
              text-[22px]
              leading-relaxed
              text-[#F1E6D3]
              sm:text-[28px]
              lg:text-[32px]
            "
          >
            {CONFIG.fraseFinal}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Galeria;