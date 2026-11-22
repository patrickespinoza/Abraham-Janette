import React, { useState } from "react";
import {
  Link2,
  Copy,
  Ticket,
  ShieldCheck,
  MessageCircle,
  Loader2,
} from "lucide-react";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY
// ==========================================

const CONFIG = {
  novios: "Abraham & Janette",
  fecha: "10 de abril de 2027",
  hora: "4:30 p. m.",
  portada: "/portada.png",

  // Misma clave que en Confirmacion.jsx
  claveCifrado: "Wedly-Abraham-Janette-10042027-v1",

  // Vacío para utilizar el dominio actual
  urlInvitacion: "",
};

// ==========================================
// CIFRADO AES-GCM
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
    ["encrypt"]
  );
};

const bytesABase64 = (bytes) => {
  const texto = Array.from(
    bytes,
    (byte) => String.fromCharCode(byte)
  ).join("");

  return btoa(texto)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
};

const cifrarInvitacion = async (datos) => {
  const clave = await obtenerClave();

  const iv = crypto.getRandomValues(
    new Uint8Array(12)
  );

  const contenido = new TextEncoder().encode(
    JSON.stringify(datos)
  );

  const cifrado = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    clave,
    contenido
  );

  const resultado = new Uint8Array(
    iv.length + cifrado.byteLength
  );

  resultado.set(iv, 0);
  resultado.set(new Uint8Array(cifrado), iv.length);

  return bytesABase64(resultado);
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function Generador() {
  const [nombre, setNombre] = useState("");
  const [pases, setPases] = useState("1");
  const [link, setLink] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [generando, setGenerando] = useState(false);
  const [error, setError] = useState("");
  const [copiado, setCopiado] = useState("");

  const limpiarResultado = () => {
    setLink("");
    setMensaje("");
    setError("");
    setCopiado("");
  };

  // ========================================
  // GENERAR ENLACE CIFRADO
  // ========================================

  const generarLink = async (e) => {
    e.preventDefault();

    if (generando || link) return;

    const nombreLimpio = nombre.trim();
    const numeroPases = Number(pases);

    if (!nombreLimpio) {
      setError("Escribe el nombre del invitado.");
      return;
    }

    if (
      !Number.isInteger(numeroPases) ||
      numeroPases < 1 ||
      numeroPases > 100
    ) {
      setError("Ingresa un número de pases válido.");
      return;
    }

    setGenerando(true);
    setError("");

    try {
      const datos = {
        id: crypto.randomUUID(),
        nombre: nombreLimpio,
        pases: numeroPases,
      };

      const token = await cifrarInvitacion(datos);

      const url = new URL(
        CONFIG.urlInvitacion ||
          `${window.location.origin}/`,
        window.location.origin
      );

      url.searchParams.set("id", token);

      const enlaceFinal = url.toString();

      setLink(enlaceFinal);

      const textoPases =
        numeroPases === 1
          ? "1 lugar"
          : `${numeroPases} lugares`;

      setMensaje(`✨ Invitación especial ✨

Hola ${nombreLimpio} 🤍

Con mucha alegría queremos compartir nuestra invitación de boda.

Hemos reservado especialmente ${
        numeroPases === 1 ? "para ti" : "para ustedes"
      }:

🎟️ ${textoPases}

📅 ${CONFIG.fecha}
🕟 ${CONFIG.hora}

Consulta todos los detalles de nuestra celebración y confirma tu asistencia en el siguiente enlace:

${enlaceFinal}

Será un gusto compartir este momento tan especial.

${CONFIG.novios} 🤍`);
    } catch (err) {
      console.error(err);

      setError(
        "No se pudo generar el enlace. Verifica que estés utilizando HTTPS o localhost."
      );
    } finally {
      setGenerando(false);
    }
  };

  // ========================================
  // COPIAR TEXTO
  // ========================================

  const copiarTexto = async (texto, tipo) => {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(tipo);
      setError("");
    } catch {
      setError(
        "No se pudo copiar automáticamente. Copia el texto manualmente."
      );
    }
  };

  const nuevaInvitacion = () => {
    setNombre("");
    setPases("1");
    limpiarResultado();
  };

  // ========================================
  // ESTILOS
  // ========================================

  const estiloCampo = `
    w-full
    border border-[#C6A57B]/70
    bg-[#FAF7F1]
    px-4 py-3.5
    font-playfair
    text-base text-[#1D344C]
    outline-none
    focus:border-[#1D344C]
    placeholder:text-[#1D344C]/40
    transition-colors
  `;

  const estiloBoton = `
    flex w-full items-center
    justify-center gap-3
    border border-[#1D344C]
    bg-[#1D344C]
    px-5 py-4
    text-xs uppercase
    tracking-[0.12em]
    text-[#F1E6D3]
    transition-colors
    hover:bg-[#304C64]
    disabled:opacity-50
    disabled:cursor-not-allowed
  `;

  return (
    <main className="
      min-h-screen w-full
      bg-[#FAF7F1]
      px-4 py-10
      text-[#1D344C]
      sm:px-8 sm:py-14
    ">

      {/* ENCABEZADO */}

      <header className="mx-auto mb-12 max-w-5xl text-center">

        <p className="
          text-xs uppercase
          tracking-[0.35em]
          text-[#92754D]
        ">
          {CONFIG.novios}
        </p>

        <h1 className="
          mt-5 font-playfair
          text-4xl sm:text-5xl lg:text-6xl
        ">
          Generador de invitaciones
        </h1>

        <div className="
          mx-auto my-6
          h-px w-20 bg-[#C6A57B]
        " />

        <p className="font-playfair text-[#92754D]">
          Invitaciones personalizadas · Wedly
        </p>

      </header>

      <div className="
        mx-auto grid max-w-6xl
        gap-10 lg:grid-cols-2 lg:gap-14
      ">

        {/* PANEL DEL GENERADOR */}

        <section className="
          border border-[#C6A57B]
          bg-[#F1E6D3]
          p-5 sm:p-8
        ">

          <form onSubmit={generarLink}>

            <fieldset disabled={generando} className="min-w-0">

              <p className="
                text-[10px] uppercase
                tracking-[0.25em] text-[#92754D]
              ">
                Invitaciones personalizadas
              </p>

              <h2 className="mt-3 font-playfair text-3xl">
                Datos del invitado
              </h2>

              <p className="
                mt-4 font-playfair text-sm
                leading-relaxed text-[#1D344C]/75
              ">
                Introduce el nombre del invitado o familia
                y asigna el número de pases correspondientes.
              </p>

              {/* NOMBRE */}

              <div className="mt-7">

                <label
                  htmlFor="nombre"
                  className="mb-3 block text-sm font-medium"
                >
                  Nombre o familia
                </label>

                <input
                  id="nombre"
                  type="text"
                  value={nombre}
                  maxLength={150}
                  required
                  placeholder="Ej. Familia Hernández"
                  onChange={(e) => {
                    setNombre(e.target.value);
                    limpiarResultado();
                  }}
                  className={estiloCampo}
                />

              </div>

              {/* PASES */}

              <div className="mt-6">

                <label
                  htmlFor="pases"
                  className="mb-3 flex items-center gap-2 text-sm"
                >
                  <Ticket size={17} strokeWidth={1.5} />
                  Número de pases
                </label>

                <input
                  id="pases"
                  type="number"
                  min="1"
                  max="100"
                  step="1"
                  required
                  value={pases}
                  onChange={(e) => {
                    setPases(e.target.value);
                    limpiarResultado();
                  }}
                  className={estiloCampo}
                />

              </div>

              <button
                type="submit"
                disabled={generando || Boolean(link)}
                className={`mt-7 ${estiloBoton}`}
              >
                {generando ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Generando...
                  </>
                ) : link ? (
                  <>
                    <ShieldCheck size={18} />
                    Invitación generada
                  </>
                ) : (
                  <>
                    <Link2 size={18} />
                    Generar invitación
                  </>
                )}
              </button>

            </fieldset>

          </form>

          {error && (
            <p
              role="alert"
              className="
                mt-5 border border-red-300
                bg-red-50 p-4 text-sm text-red-800
              "
            >
              {error}
            </p>
          )}

          {/* RESULTADO */}

          {link && (
            <div className="mt-8">

              <div className="flex items-center gap-2 text-[#657358]">
                <ShieldCheck size={22} />

                <p className="text-sm font-medium">
                  Enlace generado correctamente
                </p>
              </div>

              <div className="
                mt-5 border border-[#C6A57B]
                bg-[#FAF7F1]
                px-5 py-6 text-center
              ">

                <p className="
                  text-[10px] uppercase
                  tracking-[0.2em] text-[#92754D]
                ">
                  Invitación especial para
                </p>

                <h3 className="
                  mt-3 break-words
                  font-playfair text-3xl
                ">
                  {nombre}
                </h3>

                <div className="
                  mx-auto my-4
                  h-px w-12 bg-[#C6A57B]
                " />

                <Ticket
                  size={30}
                  strokeWidth={1.3}
                  className="mx-auto text-[#92754D]"
                />

                <p className="mt-3 font-playfair text-xl">
                  {pases} {Number(pases) === 1 ? "pase" : "pases"}
                </p>

              </div>

              <label className="
                mb-3 mt-6 block
                text-xs uppercase tracking-[0.15em]
              ">
                Enlace personalizado
              </label>

              <textarea
                readOnly
                rows={4}
                value={link}
                onFocus={(e) => e.target.select()}
                className={`${estiloCampo} resize-none text-xs`}
              />

              <button
                type="button"
                onClick={() => copiarTexto(link, "link")}
                className={`mt-3 ${estiloBoton}`}
              >
                <Copy size={16} />

                {copiado === "link"
                  ? "Enlace copiado ✓"
                  : "Copiar enlace"}
              </button>

              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-3 block border border-[#C6A57B]
                  p-3 text-center text-sm
                  hover:bg-[#FAF7F1]
                "
              >
                Abrir invitación
              </a>

              {/* MENSAJE PARA WHATSAPP */}

              <div className="
                mt-8 border-t border-[#C6A57B] pt-7
              ">

                <h3 className="
                  flex items-center gap-3
                  font-playfair text-2xl
                ">
                  <MessageCircle size={22} />
                  Mensaje para WhatsApp
                </h3>

                <p className="mt-3 text-sm text-[#92754D]">
                  Puedes editar el mensaje antes de copiarlo.
                </p>

                <textarea
                  value={mensaje}
                  onChange={(e) => {
                    setMensaje(e.target.value);
                    setCopiado("");
                  }}
                  rows={15}
                  className={`mt-5 resize-y ${estiloCampo}`}
                />

                <button
                  type="button"
                  onClick={() => copiarTexto(mensaje, "mensaje")}
                  className={`mt-3 ${estiloBoton}`}
                >
                  <Copy size={16} />

                  {copiado === "mensaje"
                    ? "Mensaje copiado ✓"
                    : "Copiar mensaje para WhatsApp"}
                </button>

              </div>

              <button
                type="button"
                onClick={nuevaInvitacion}
                className="
                  mt-7 w-full border border-[#C6A57B]
                  bg-[#FAF7F1] px-5 py-4
                  font-playfair
                  hover:bg-[#DCCAB7]
                  transition-colors
                "
              >
                Crear nueva invitación
              </button>

            </div>
          )}

        </section>

        {/* VISTA PREVIA */}

        <section>

          <div className="mb-6 text-center">

            <p className="
              text-[10px] uppercase
              tracking-[0.30em] text-[#92754D]
            ">
              Vista previa de la invitación
            </p>

            <h2 className="
              mt-3 font-playfair text-3xl italic
            ">
              {CONFIG.novios}
            </h2>

          </div>

          <div className="
            mx-auto max-w-[430px]
            border border-[#C6A57B] p-[6px]
          ">

            <img
              src={CONFIG.portada}
              alt={`Portada de ${CONFIG.novios}`}
              className="block h-auto w-full object-contain"
            />

          </div>

          {mensaje && (
            <div className="mx-auto mt-9 max-w-[430px]">

              <p className="
                mb-4 text-center text-xs uppercase
                tracking-[0.20em] text-[#92754D]
              ">
                Vista previa del mensaje
              </p>

              <div className="rounded-xl bg-[#EFEAE2] p-4">

                <div className="
                  ml-auto max-w-[95%]
                  rounded-xl rounded-tr-sm
                  bg-[#D9FDD3] px-4 py-4
                ">

                  <p className="
                    whitespace-pre-wrap break-words
                    text-sm leading-relaxed
                    text-[#1D344C]
                  ">
                    {mensaje}
                  </p>

                </div>

              </div>

            </div>
          )}

        </section>

      </div>

    </main>
  );
}