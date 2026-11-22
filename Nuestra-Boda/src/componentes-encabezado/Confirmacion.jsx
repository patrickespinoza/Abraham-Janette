import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Ticket,
  CheckCircle2,
  XCircle,
  Loader2,
  Send,
} from "lucide-react";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY
// ==========================================

const CONFIG = {
  novios: "Abraham & Janette",

  titulo: "Confirmación de asistencia",

  descripcion:
    "Nos encantará contar con tu presencia en este día tan especial.",

  fraseFinal:
    "¡Gracias por ser parte de nuestra historia!",

  urlScript: "https://script.google.com/macros/s/AKfycbw2S7XaD5xKxmaaGDWMzRTcm2a6C8yv4HLe3NCLrhL51Gr_zy3SXKvZaH8cFH8aJjamSg/exec",

  // Debe coincidir con Generador.jsx
  claveCifrado: "Wedly-Abraham-Janette-10042027-v1",
};

// ==========================================
// DESCIFRADO AES-GCM
// ==========================================

const obtenerClave = async () => {
  const datos = new TextEncoder().encode(
    CONFIG.claveCifrado
  );

  const hash = await crypto.subtle.digest(
    "SHA-256",
    datos
  );

  return crypto.subtle.importKey(
    "raw",
    hash,
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );
};

const base64ABytes = (token) => {
  let base64 = token
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  base64 += "=".repeat(
    (4 - (base64.length % 4)) % 4
  );

  const texto = atob(base64);

  return Uint8Array.from(
    texto,
    (caracter) => caracter.charCodeAt(0)
  );
};

const descifrarInvitacion = async (token) => {
  const bytes = base64ABytes(token);

  if (bytes.length < 29) {
    throw new Error("Enlace inválido.");
  }

  const iv = bytes.slice(0, 12);
  const contenido = bytes.slice(12);

  const clave = await obtenerClave();

  const descifrado = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    clave,
    contenido
  );

  const datos = JSON.parse(
    new TextDecoder().decode(descifrado)
  );

  if (
    typeof datos.nombre !== "string" ||
    !datos.nombre.trim() ||
    datos.nombre.length > 150 ||
    !Number.isInteger(datos.pases) ||
    datos.pases < 1 ||
    datos.pases > 100 ||
    typeof datos.id !== "string" ||
    !datos.id
  ) {
    throw new Error("Invitación inválida.");
  }

  return datos;
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function Confirmacion() {
  const [invitado, setInvitado] = useState(null);
  const [cargando, setCargando] = useState(true);

  const [asistencia, setAsistencia] = useState("");
  const [confirmados, setConfirmados] = useState("");

  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const [error, setError] = useState("");
  const [errorInvitacion, setErrorInvitacion] = useState("");

  // ========================================
  // LEER INVITACIÓN DESDE LA URL
  // ========================================

  useEffect(() => {
    const cargarInvitacion = async () => {
      try {
        const parametros = new URLSearchParams(
          window.location.search
        );

        const token = parametros.get("id");

        if (!token) {
          setErrorInvitacion(
            "Para confirmar tu asistencia, ingresa desde el enlace personalizado que recibiste."
          );

          return;
        }

        const datos = await descifrarInvitacion(token);

        setInvitado(datos);
        setConfirmados(String(datos.pases));

        // Recuperar confirmación guardada en este navegador.

        try {
          const guardado = localStorage.getItem(
            `wedly-confirmacion-${datos.id}`
          );

          if (guardado) {
            const anterior = JSON.parse(guardado);

            setAsistencia(anterior.asistencia);
            setConfirmados(String(anterior.confirmados));
            setMensaje(anterior.mensaje || "");
            setEnviado(true);
          }
        } catch {
          // Si localStorage no está disponible,
          // se permite utilizar el formulario.
        }

      } catch (err) {
        console.error(err);

        setErrorInvitacion(
          "No pudimos validar tu invitación. Solicita nuevamente tu enlace personalizado."
        );

      } finally {
        setCargando(false);
      }
    };

    cargarInvitacion();
  }, []);

  // ========================================
  // ENVIAR CONFIRMACIÓN A GOOGLE SHEETS
  // ========================================

  const enviarConfirmacion = async (e) => {
    e.preventDefault();

    if (!invitado || enviando || enviado) return;

    if (!asistencia) {
      setError("Selecciona si podrás acompañarnos.");
      return;
    }

    const numeroConfirmados =
      asistencia === "si"
        ? Number(confirmados)
        : 0;

    if (
      asistencia === "si" &&
      (
        !Number.isInteger(numeroConfirmados) ||
        numeroConfirmados < 1 ||
        numeroConfirmados > invitado.pases
      )
    ) {
      setError(
        `Solo tienes ${invitado.pases} pases disponibles.`
      );

      return;
    }

    if (
      !CONFIG.urlScript.startsWith(
        "https://script.google.com/macros/s/"
      ) ||
      !CONFIG.urlScript.endsWith("/exec")
    ) {
      setError(
        "La conexión con el registro de asistencia aún no está configurada."
      );

      return;
    }

    setEnviando(true);
    setError("");

    // ÚNICAMENTE CUATRO DATOS PARA EL EXCEL

    const datos = {
      nombre: invitado.nombre,
      pases: invitado.pases,
      confirmados: numeroConfirmados,
      mensaje: mensaje.trim(),
    };

    try {
      const respuesta = await fetch(CONFIG.urlScript, {
        method: "POST",

        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },

        body: JSON.stringify(datos),
      });

      if (!respuesta.ok) {
        throw new Error("Error de conexión.");
      }

      const resultado = await respuesta.json();

      if (!resultado.ok) {
        throw new Error(
          resultado.error ||
          "No se pudo registrar la confirmación."
        );
      }

      setEnviado(true);

      // Guardado local para conservar la respuesta
      // al volver a abrir desde el mismo navegador.

      try {
        localStorage.setItem(
          `wedly-confirmacion-${invitado.id}`,

          JSON.stringify({
            asistencia,
            confirmados: numeroConfirmados,
            mensaje: mensaje.trim(),
          })
        );
      } catch {
        // El registro en Sheets ya se completó.
      }

    } catch (err) {
      console.error(err);

      setError(
        "No pudimos verificar el registro. Intenta nuevamente en unos momentos."
      );

    } finally {
      setEnviando(false);
    }
  };

  // ========================================
  // ESTILOS
  // ========================================

  const estiloCampo = `
    w-full
    border border-[#C6A57B]
    bg-[#FAF7F1]
    p-4
    text-[#1D344C]
    font-playfair
    outline-none
    focus:ring-1
    focus:ring-[#C6A57B]
  `;

  const estiloOpcion = (opcion) => `
    flex w-full items-center
    justify-center gap-3
    border border-[#C6A57B]
    px-4 py-4
    text-sm sm:text-base
    transition-colors duration-300
    ${
      asistencia === opcion
        ? "bg-[#F1E6D3] text-[#1D344C]"
        : "bg-transparent text-[#F1E6D3] hover:bg-[#F1E6D3]/10"
    }
  `;

  return (
    <section
      id="confirmacion"
      className="
        relative w-full overflow-hidden
        bg-[#1D344C]
        px-5 py-20
        sm:px-8 sm:py-28
        text-[#F1E6D3]
      "
    >

      {/* HOJAS DECORATIVAS */}

      <svg
        viewBox="0 0 120 150"
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -left-10 -top-10
          w-40 rotate-[110deg]
          opacity-50 sm:w-56
        "
      >
        <path
          d="M12 145 Q32 80 105 12"
          stroke="#A5A58E"
          strokeWidth="1.5"
          fill="none"
        />

        <g fill="#A5A58E">
          <path d="M24 116 Q-5 100 15 79 Q34 95 24 116Z" />
          <path d="M31 101 Q60 108 69 83 Q42 80 31 101Z" />
          <path d="M43 79 Q14 65 29 42 Q50 58 43 79Z" />
          <path d="M53 65 Q83 77 93 50 Q67 44 53 65Z" />
          <path d="M70 44 Q46 26 65 8 Q83 25 70 44Z" />
          <path d="M83 32 Q111 39 119 15 Q97 10 83 32Z" />
          <path d="M99 18 Q93 0 113 0 Q118 14 99 18Z" />
        </g>
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-xl"
      >

        <div className="border border-[#C6A57B]/70 p-[5px]">

          <div className="
            border border-[#C6A57B]/40
            px-5 py-12 sm:px-10 sm:py-16
          ">

            {/* ENCABEZADO */}

            <header className="text-center">

              <Heart
                size={32}
                strokeWidth={1.2}
                className="mx-auto text-[#C6A57B]"
              />

              <p className="
                mt-6 text-[10px] uppercase
                tracking-[0.35em]
                text-[#C6A57B]
              ">
                Nuestro gran día
              </p>

              <h2 className="
                mt-4 font-playfair italic
                text-[36px] leading-tight
                sm:text-5xl
              ">
                {CONFIG.titulo}
              </h2>

              <div className="
                mx-auto my-7 h-px w-20
                bg-[#C6A57B]
              " />

              <p className="
                font-playfair text-base
                leading-relaxed sm:text-lg
              ">
                {CONFIG.descripcion}
              </p>

            </header>

            {/* CARGANDO INVITACIÓN */}

            {cargando && (
              <div className="py-12 text-center">

                <Loader2
                  size={28}
                  className="mx-auto animate-spin text-[#C6A57B]"
                />

                <p className="mt-4 font-playfair">
                  Cargando tu invitación...
                </p>

              </div>
            )}

            {/* INVITACIÓN NO VÁLIDA */}

            {!cargando && errorInvitacion && (
              <div className="
                mt-8 border border-[#C6A57B]
                bg-[#F1E6D3] p-6
                text-center text-[#1D344C]
              ">

                <Ticket
                  size={30}
                  strokeWidth={1.3}
                  className="mx-auto text-[#92754D]"
                />

                <p className="
                  mt-4 font-playfair
                  leading-relaxed
                ">
                  {errorInvitacion}
                </p>

              </div>
            )}

            {/* DATOS DEL INVITADO */}

            {!cargando && invitado && (
              <>

                <div className="
                  mt-9 bg-[#F1E6D3]
                  border border-[#C6A57B]
                  px-5 py-8
                  text-center text-[#1D344C]
                ">

                  <p className="
                    text-[10px] uppercase
                    tracking-[0.2em]
                    text-[#92754D]
                  ">
                    Invitación especial para
                  </p>

                  <h3 className="
                    mt-4 break-words
                    font-playfair text-3xl
                  ">
                    {invitado.nombre}
                  </h3>

                  <div className="
                    mx-auto my-5 h-px w-14
                    bg-[#C6A57B]
                  " />

                  <Ticket
                    size={36}
                    strokeWidth={1.2}
                    className="mx-auto text-[#92754D]"
                  />

                  <p className="mt-4 font-playfair text-3xl">
                    {invitado.pases}{" "}
                    {invitado.pases === 1 ? "pase" : "pases"}
                  </p>

                  <p className="
                    mt-3 text-sm font-playfair
                    text-[#92754D]
                  ">
                    Hemos reservado{" "}
                    {invitado.pases === 1
                      ? "este lugar para ti."
                      : "estos lugares para ustedes."}
                  </p>

                </div>

                {/* FORMULARIO */}

                {!enviado ? (
                  <form
                    onSubmit={enviarConfirmacion}
                    className="mt-9"
                  >

                    <fieldset disabled={enviando}>

                      <p className="
                        mb-5 text-center
                        font-playfair text-xl
                      ">
                        ¿Podrás acompañarnos?
                      </p>

                      <div className="space-y-3">

                        <button
                          type="button"
                          aria-pressed={asistencia === "si"}
                          onClick={() => {
                            setAsistencia("si");

                            if (Number(confirmados) < 1) {
                              setConfirmados(
                                String(invitado.pases)
                              );
                            }

                            setError("");
                          }}
                          className={estiloOpcion("si")}
                        >
                          <CheckCircle2 size={20} />
                          Sí, con mucho gusto
                        </button>

                        <button
                          type="button"
                          aria-pressed={asistencia === "no"}
                          onClick={() => {
                            setAsistencia("no");
                            setError("");
                          }}
                          className={estiloOpcion("no")}
                        >
                          <XCircle size={20} />
                          No podré asistir
                        </button>

                      </div>

                      {/* SELECCIONAR CONFIRMADOS */}

                      {asistencia === "si" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-7"
                        >

                          <label
                            htmlFor="confirmados"
                            className="mb-3 block text-sm"
                          >
                            Número de personas que asistirán
                          </label>

                          <select
                            id="confirmados"
                            value={confirmados}
                            onChange={(e) =>
                              setConfirmados(e.target.value)
                            }
                            className={estiloCampo}
                          >

                            {Array.from(
                              { length: invitado.pases },
                              (_, i) => i + 1
                            ).map((numero) => (
                              <option
                                key={numero}
                                value={numero}
                              >
                                {numero}{" "}
                                {numero === 1
                                  ? "persona"
                                  : "personas"}
                              </option>
                            ))}

                          </select>

                        </motion.div>
                      )}

                      {/* MENSAJE */}

                      <div className="mt-7">

                        <label
                          htmlFor="mensaje"
                          className="mb-3 block text-sm"
                        >
                          Mensaje para los novios (opcional)
                        </label>

                        <textarea
                          id="mensaje"
                          value={mensaje}
                          onChange={(e) =>
                            setMensaje(e.target.value)
                          }
                          rows={4}
                          maxLength={1500}
                          placeholder="Escribe tus mejores deseos..."
                          className={`${estiloCampo} resize-y`}
                        />

                      </div>

                      {/* ERROR */}

                      {error && (
                        <p
                          role="alert"
                          className="
                            mt-4 border border-red-300
                            bg-red-50 p-3
                            text-sm text-red-800
                          "
                        >
                          {error}
                        </p>
                      )}

                      {/* BOTÓN ENVIAR */}

                      <button
                        type="submit"
                        disabled={enviando}
                        className="
                          mt-7 flex w-full
                          items-center justify-center gap-3
                          bg-[#C6A57B]
                          border border-[#C6A57B]
                          px-5 py-4
                          text-[#1D344C]
                          text-xs uppercase
                          tracking-[0.15em]
                          font-semibold
                          hover:bg-[#F1E6D3]
                          transition-colors
                          disabled:opacity-50
                        "
                      >

                        {enviando ? (
                          <>
                            <Loader2
                              size={18}
                              className="animate-spin"
                            />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send size={18} strokeWidth={1.5} />
                            Enviar confirmación
                          </>
                        )}

                      </button>

                    </fieldset>

                  </form>

                ) : (

                  /* CONFIRMACIÓN EXITOSA */

                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="
                      mt-8 border border-[#C6A57B]
                      bg-[#F1E6D3]
                      px-5 py-9
                      text-center text-[#1D344C]
                    "
                  >

                    <CheckCircle2
                      size={48}
                      strokeWidth={1.3}
                      className="mx-auto text-[#657358]"
                    />

                    <h3 className="
                      mt-5 font-playfair text-3xl
                    ">
                      ¡Gracias por confirmar!
                    </h3>

                    <p className="
                      mt-4 font-playfair leading-relaxed
                    ">
                      Tu respuesta ha sido registrada correctamente.
                    </p>

                    {asistencia === "si" ? (
                      <>

                        <p className="
                          mt-6 font-playfair text-2xl
                        ">
                          {confirmados}{" "}
                          {Number(confirmados) === 1
                            ? "persona confirmada"
                            : "personas confirmadas"}
                        </p>

                        <p className="mt-4 font-playfair italic">
                          ¡Nos vemos muy pronto!
                        </p>

                      </>
                    ) : (
                      <p className="mt-5 font-playfair italic">
                        Agradecemos mucho tu respuesta.
                        Te tendremos presente en nuestro día especial.
                      </p>
                    )}

                    <Heart
                      className="mx-auto mt-6 text-[#92754D]"
                      size={25}
                      strokeWidth={1.3}
                    />

                  </motion.div>
                )}

              </>
            )}

            {/* FRASE FINAL */}

            <div className="mt-10 text-center">

              <div className="
                mx-auto mb-5 h-px w-14
                bg-[#C6A57B]
              " />

              <p className="
                font-playfair italic
                text-sm leading-relaxed
                text-[#F1E6D3]
              ">
                {CONFIG.fraseFinal}
              </p>

            </div>

          </div>

        </div>

      </motion.div>

    </section>
  );
}