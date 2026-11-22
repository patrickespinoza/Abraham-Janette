"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Music,
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
  Heart,
} from "lucide-react";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY
// ==========================================

const CONFIG = {
  nombres: "Abraham & Janette",

  inicialNovio: "A",
  inicialNovia: "J",

  subtitulo: "Nuestra boda",

  titulo: "Una melodía para nuestra historia",

  descripcion:
    "Hemos elegido una canción especial para acompañarte en este momento tan importante para nosotros.",

  musica: "/musica.mp3",

  volumen: 0.45,
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
// INDICADOR DE CARGA
// ==========================================

const Cargando = () => (
  <span
    className="
      h-4 w-4 animate-spin rounded-full
      border-2 border-white/40 border-t-white
    "
  />
);

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

const Musica = () => {
  const audioRef = useRef(null);

  const [mostrarModal, setMostrarModal] = useState(true);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [silenciado, setSilenciado] = useState(false);
  const [cargando, setCargando] = useState(false);

  // ==========================================
  // CONFIGURACIÓN DEL AUDIO
  // ==========================================

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = CONFIG.volumen;

    const detectarReproduccion = () => {
      setReproduciendo(true);
      setCargando(false);
      setMostrarModal(false);
    };

    const detectarPausa = () => {
      setReproduciendo(false);
      setCargando(false);
    };

    const detectarError = () => {
      setCargando(false);
      setReproduciendo(false);
    };

    const detectarVolumen = () => {
      setSilenciado(audio.muted);
    };

    audio.addEventListener("playing", detectarReproduccion);
    audio.addEventListener("pause", detectarPausa);
    audio.addEventListener("error", detectarError);
    audio.addEventListener("volumechange", detectarVolumen);

    return () => {
      audio.removeEventListener(
        "playing",
        detectarReproduccion
      );

      audio.removeEventListener("pause", detectarPausa);
      audio.removeEventListener("error", detectarError);

      audio.removeEventListener(
        "volumechange",
        detectarVolumen
      );
    };
  }, []);

  // ==========================================
  // BLOQUEAR SCROLL DURANTE LA BIENVENIDA
  // ==========================================

  useEffect(() => {
    if (!mostrarModal) return;

    const overflowAnterior = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflowAnterior;
    };
  }, [mostrarModal]);

  // ==========================================
  // REPRODUCIR MÚSICA
  // ==========================================

  const reproducirMusica = async () => {
    const audio = audioRef.current;

    if (!audio || cargando) return;

    try {
      setCargando(true);

      audio.muted = false;

      await audio.play();

      setReproduciendo(true);
      setMostrarModal(false);
    } catch (error) {
      console.error(
        "No se pudo reproducir la música:",
        error
      );

      setMostrarModal(false);
    } finally {
      setCargando(false);
    }
  };

  // ==========================================
  // CONTINUAR SIN MÚSICA
  // ==========================================

  const continuarSinMusica = () => {
    const audio = audioRef.current;

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    setCargando(false);
    setReproduciendo(false);
    setMostrarModal(false);
  };

  // ==========================================
  // REPRODUCIR / PAUSAR
  // ==========================================

  const alternarReproduccion = async () => {
    const audio = audioRef.current;

    if (!audio || cargando) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      setCargando(true);

      await audio.play();
    } catch (error) {
      console.error(
        "No se pudo reproducir la música:",
        error
      );
    } finally {
      setCargando(false);
    }
  };

  // ==========================================
  // SILENCIAR / ACTIVAR SONIDO
  // ==========================================

  const alternarSilencio = () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.muted = !audio.muted;
  };

  return (
    <>
      <style>{`
        @keyframes wedly-girar-disco {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .wedly-disco-abraham-janette {
          animation: wedly-girar-disco 8s linear infinite;
        }
      `}</style>

      {/* ======================================
          AUDIO
      ====================================== */}

      <audio
        ref={audioRef}
        src={CONFIG.musica}
        loop
        preload="auto"
      />

      {/* ======================================
          MODAL DE BIENVENIDA
      ====================================== */}

      <AnimatePresence>
        {mostrarModal && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Bienvenida musical"
            className="
              fixed inset-0 z-[9999]
              flex items-center justify-center
              overflow-y-auto overscroll-contain
              bg-[#1D344C]/85
              px-4 py-4
              backdrop-blur-sm
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="
                relative my-auto
                w-full max-w-[410px]
                overflow-hidden
                bg-[#F1E6D3]
                p-3
                shadow-2xl
              "
              initial={{
                opacity: 0,
                y: 25,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -35,
                scale: 0.98,
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
            >
              {/* MARCO DORADO */}

              <div
                className="
                  relative
                  overflow-hidden
                  border border-[#C6A57B]
                  px-5 py-7
                  text-center
                  sm:px-8 sm:py-10
                "
              >
                {/* DECORACIONES BOTÁNICAS */}

                <Rama
                  className="
                    pointer-events-none
                    absolute -left-5 -top-5
                    w-28 rotate-[105deg]
                    opacity-70
                  "
                />

                <Rama
                  className="
                    pointer-events-none
                    absolute -bottom-5 -right-5
                    w-28 -rotate-[75deg]
                    opacity-70
                  "
                />

                {/* BOTÓN CERRAR */}

                <button
                  type="button"
                  onClick={continuarSinMusica}
                  aria-label="Continuar sin música"
                  className="
                    absolute right-3 top-3 z-20
                    flex h-8 w-8
                    items-center justify-center
                    rounded-full
                    text-[#1D344C]
                    transition-colors
                    hover:bg-[#DCCAB7]
                  "
                >
                  <X size={18} strokeWidth={1.5} />
                </button>

                {/* CONTENIDO PRINCIPAL */}

                <div className="relative z-10">

                  {/* MONOGRAMA */}

   

<motion.div
  className="
    mx-auto mb-4
    flex h-[76px] w-[76px]
    items-center justify-center
    rounded-full
    border border-[#C6A57B]
  "
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{
    duration: 0.7,
    delay: 0.2,
  }}
>
  <div
    className="
      flex items-center
      justify-center
      gap-1.5
      font-caligrafia
      font-normal
      text-[39px]
      leading-none
      text-[#1D344C]
    "
  >
    <span>{CONFIG.inicialNovio}</span>

    <span
      className="
        h-9 w-px
        bg-[#C6A57B]
      "
    />

    <span>{CONFIG.inicialNovia}</span>
  </div>
</motion.div>
                  {/* SUBTÍTULO */}

                  <p
                    className="
                      mb-2
                      text-[10px]
                      uppercase
                      tracking-[0.35em]
                      text-[#1D344C]
                    "
                  >
                    {CONFIG.subtitulo}
                  </p>

                  {/* NOMBRES */}

                  <h2
                    className="
                      font-playfair
                      text-[32px]
                      font-normal italic
                      leading-tight
                      text-[#1D344C]
                      sm:text-[38px]
                    "
                  >
                    {CONFIG.nombres}
                  </h2>

                  {/* SEPARADOR */}

                  <div
                    className="
                      mx-auto my-4
                      flex items-center
                      justify-center gap-3
                    "
                  >
                    <span className="h-px w-10 bg-[#C6A57B]" />

                    <Heart
                      size={12}
                      strokeWidth={1.3}
                      color={COLORES.dorado}
                    />

                    <span className="h-px w-10 bg-[#C6A57B]" />
                  </div>

                  {/* DISCO MUSICAL */}

                  <button
                    type="button"
                    onClick={reproducirMusica}
                    disabled={cargando}
                    aria-label="Escuchar música y entrar"
                    className="
                      relative mx-auto mb-5
                      flex h-[76px] w-[76px]
                      items-center justify-center
                      rounded-full
                      border border-[#C6A57B]
                      bg-[#1D344C]
                      p-[5px]
                      transition-transform
                      hover:scale-105
                      disabled:opacity-70
                    "
                  >
                    <div
                      className="
                        wedly-disco-abraham-janette
                        relative
                        flex h-full w-full
                        items-center justify-center
                        rounded-full
                        border border-[#C6A57B]/50
                      "
                      style={{
                        animationPlayState: "running",
                      }}
                    >
                      <div
                        className="
                          absolute inset-[5px]
                          rounded-full
                          border border-[#C6A57B]/30
                        "
                      />

                      <div
                        className="
                          absolute inset-[10px]
                          rounded-full
                          border border-[#C6A57B]/30
                        "
                      />

                      <div
                        className="
                          absolute
                          left-1/2 top-1
                          h-2 w-px
                          bg-[#C6A57B]
                        "
                      />

                      <div
                        className="
                          flex h-10 w-10
                          items-center justify-center
                          rounded-full
                          bg-[#F1E6D3]
                          text-[#1D344C]
                        "
                      >
                        <Music
                          size={20}
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>
                  </button>

                  {/* TÍTULO */}

                  <h3
                    className="
                      mb-3
                      font-playfair
                      text-xl italic
                      leading-snug
                      text-[#1D344C]
                      sm:text-2xl
                    "
                  >
                    {CONFIG.titulo}
                  </h3>

                  {/* DESCRIPCIÓN */}

                  <p
                    className="
                      mx-auto mb-6
                      max-w-[290px]
                      text-[13px]
                      leading-6
                      text-[#1D344C]/80
                    "
                  >
                    {CONFIG.descripcion}
                  </p>

                  {/* BOTONES */}

                  <div className="flex flex-col gap-3">

                    {/* ESCUCHAR MÚSICA */}

                    <button
                      type="button"
                      onClick={reproducirMusica}
                      disabled={cargando}
                      className="
                        flex w-full
                        items-center justify-center
                        gap-3 rounded-full
                        border border-[#1D344C]
                        bg-[#1D344C]
                        px-4 py-3.5
                        text-[11px] uppercase
                        tracking-[0.15em]
                        text-[#F1E6D3]
                        transition
                        hover:bg-[#29465F]
                        disabled:cursor-not-allowed
                        disabled:opacity-70
                      "
                    >
                      {cargando ? (
                        <>
                          <Cargando />
                          Cargando...
                        </>
                      ) : (
                        <>
                          <Play
                            size={15}
                            fill="currentColor"
                          />
                          Escuchar música
                        </>
                      )}
                    </button>

                    {/* CONTINUAR SIN MÚSICA */}

                    <button
                      type="button"
                      onClick={continuarSinMusica}
                      className="
                        w-full rounded-full
                        border border-[#C6A57B]
                        bg-transparent
                        px-4 py-3.5
                        text-[11px] uppercase
                        tracking-[0.12em]
                        text-[#1D344C]
                        transition-colors
                        hover:bg-[#DCCAB7]/50
                      "
                    >
                      Continuar sin música
                    </button>
                  </div>

                  {/* TEXTO FINAL */}

                  <p
                    className="
                      mt-6
                      text-[9px]
                      uppercase
                      tracking-[0.3em]
                      text-[#92754D]
                    "
                  >
                    Con mucho amor
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================
          CONTROLES FLOTANTES
      ====================================== */}

      <AnimatePresence>
        {!mostrarModal && (
          <motion.div
            className="
              fixed bottom-4 right-4
              z-[9998]
              flex items-center gap-1
              rounded-full
              border border-[#C6A57B]
              bg-[#F1E6D3]
              p-1.5
              shadow-lg
              sm:bottom-6 sm:right-6
            "
            style={{
              bottom:
                "calc(16px + env(safe-area-inset-bottom, 0px))",
            }}
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* DISCO GIRATORIO */}

            <button
              type="button"
              onClick={alternarReproduccion}
              disabled={cargando}
              aria-label={
                reproduciendo
                  ? "Pausar música"
                  : "Reproducir música"
              }
              className="
                relative
                flex h-12 w-12
                items-center justify-center
                rounded-full
                bg-[#1D344C]
                text-[#F1E6D3]
                transition-transform
                hover:scale-105
              "
            >
              <div
                className="
                  wedly-disco-abraham-janette
                  pointer-events-none
                  absolute inset-[3px]
                  rounded-full
                  border border-[#C6A57B]/70
                "
                style={{
                  animationPlayState: reproduciendo
                    ? "running"
                    : "paused",
                }}
              >
                <div
                  className="
                    absolute inset-[4px]
                    rounded-full
                    border border-[#C6A57B]/30
                  "
                />

                <span
                  className="
                    absolute left-1/2 top-0
                    h-2 w-[2px]
                    rounded-full
                    bg-[#C6A57B]
                  "
                />
              </div>

              <span className="relative z-10">
                {cargando ? (
                  <Cargando />
                ) : reproduciendo ? (
                  <Pause size={17} fill="currentColor" />
                ) : (
                  <Play size={17} fill="currentColor" />
                )}
              </span>
            </button>

            {/* SEPARADOR */}

            <span className="h-6 w-px bg-[#C6A57B]/60" />

            {/* CONTROL DE VOLUMEN */}

            <button
              type="button"
              onClick={alternarSilencio}
              aria-label={
                silenciado
                  ? "Activar sonido"
                  : "Silenciar música"
              }
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-full
                text-[#1D344C]
                transition-colors
                hover:bg-[#DCCAB7]
              "
            >
              {silenciado ? (
                <VolumeX size={19} strokeWidth={1.7} />
              ) : (
                <Volume2 size={19} strokeWidth={1.7} />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Musica;