import Portada from "./componentes-encabezado/portada";
import Contador from "./componentes-encabezado/Contador";
import Celebracion from "./componentes-encabezado/Celebracion";
import Dresscode from "./componentes-encabezado/Dresscode";
import Regalos from "./componentes-encabezado/MesadeRegalos";
import Confirmacion from "./componentes-encabezado/Confirmacion";
import Musica from "./componentes-encabezado/musica";
import Padres from "./componentes-encabezado/Padres";
import Itinerario from "./componentes-encabezado/Itinerario";
import Frase from "./componentes-encabezado/frase";
import Galeria from "./componentes-encabezado/Galeria";

export default function PaginaPrincipal() {
  return (
    <div>

      <Musica/>

      <Portada />

      <Contador />

      <Frase/>

      <Padres/>

      <Celebracion />

      <Dresscode />

      <Itinerario/>

      <Galeria/>

      <Regalos />

      <Confirmacion />

    </div>
  );
}