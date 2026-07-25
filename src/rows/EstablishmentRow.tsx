import React from "react";
import type { Establishment } from "../types/types";

type EstablishmentRowProps = {
  prof: Establishment;
  setShowModal: (val: boolean)=>void
  setSelectedProf: (val: Establishment)=>void
};

const EstablishmentRow: React.FC<EstablishmentRowProps> = ({ prof, setSelectedProf, setShowModal }) => {
  const hoy = new Date();
  const fin = new Date(prof.finDEsuscripcion);

  const vencido = fin < hoy;

  return (
    <tr key={prof.id}>
      <td><b>{prof.id}</b></td>
      <td><b>{prof.nombre}</b></td>
      <td className="buttons-container">
        {/* <button className="btn btn-primary" onClick={()=> {setSelectedProf(prof); setShowModal(true)}}>Ver</button> */}
        <button className="btn btn-success" onClick={()=> {setSelectedProf(prof); setShowModal(true)}}>Editar</button>
        {/* <button className="btn btn-danger">Eliminar</button> */}
      </td>
      <td><button className="btn btn-danger">Eliminar</button></td>
      <td><span
            style={{
              fontWeight: "bold",
              marginLeft: "8px",
            }}
            title="Suscripción vencida"
          >
            {vencido ? "Vencido ❌" : "Al dia ✅"}
          </span>
      </td>
    </tr>
  );
};

export default EstablishmentRow;