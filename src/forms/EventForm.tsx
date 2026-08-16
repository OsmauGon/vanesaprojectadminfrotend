import { useState } from "react";
import type { Event } from "../types/types";
import { Alert, Button, Spinner } from "react-bootstrap";
import { eventPostEndpoint } from "../endpoints";

type innerFormType = {
  changeState: (val: "standby" | "success" | "error" | "loading")=> void
  state: "standby" | "success" | "error" | "loading"
}
const InnerForm = ({changeState, state}: innerFormType) =>{
  const [obligatorios,setObligatorios] = useState<boolean>(false)
  const [formData, setFormData] = useState<Event>({
    id: 0,
    titulo: "",
    fecha: "",
    hora: "",
    ubicacion: "",
    tipo: "",
    contacto: "",
    responsable: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if(
          formData.titulo.length === 0 || 
          formData.fecha.length === 0 || 
          formData.hora.length === 0 || 
          formData.ubicacion.length === 0 
          ){
          alert("Verificar los datos obligatorios")
          setObligatorios(true)
          return
        }
    changeState("loading")
    const dataToSend = {
    
    titulo: formData.titulo,
    fecha: formData.fecha,
    hora: formData.hora,
    ubicacion: formData.ubicacion,
    tipo: formData.tipo,
    contacto: formData.contacto,
    responsable: formData.responsable,
    }
    
    try {
      console.log(dataToSend)
      const response = await fetch(eventPostEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
      });
      const result = await response.json();
      if(result.message === "EXITO") {
        changeState("success")
      }
    } catch (error) {
      changeState("error")
      console.log("Error detectado: ", error)
    }
      
     
    /*
     for (const [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }
    setTimeout(() => {
      changeState("standby")
    }, 2000);
    */
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 new-form">
      <div className="mb-3">{/* Titulo */}
        <label className="form-label">Titulo *</label>
        <input
          type="text"
          name="titulo"
          className="form-control"
          disabled={state === "loading"}
          value={formData.titulo}
          onChange={handleChange}
          required
          placeholder="Titulo del evento"
        />
        {obligatorios && formData.titulo.length === 0 && <p>⛔</p>}
      </div>
      <div className="mb-3">{/* Fecha */}
        <label className="form-label">Fecha *</label>
        <input
          type="date"
          name="fecha"
          className="form-control"
          disabled={state === "loading"}
          value={formData.fecha}
          onChange={handleChange}
          required
          placeholder="Fecha del evento"
        />
        {obligatorios && formData.fecha.length === 0 && <p>⛔</p>}
      </div>
      <div className="mb-3">{/* Hora */}
        <label className="form-label">Hora *</label>
        <input
          type="text"
          name="hora"
          className="form-control"
          disabled={state === "loading"}
          value={formData.hora}
          onChange={handleChange}
          required
          placeholder="Hora del evento"
        />
        {obligatorios && formData.hora.length === 0 && <p>⛔</p>}
      </div>
      <div className="mb-3">{/* Responsable */}
        <label className="form-label">Responsable</label>
        <input
          type="text"
          name="responsable"
          className="form-control"
          disabled={state === "loading"}
          value={formData.responsable}
          onChange={handleChange}
          placeholder="Nombre de la presona u organismo"
        />
      </div>
      <div className="mb-3">{/* UBICACION */}
        <label className="form-label">Ubicación *</label>
        <input
          type="text"
          name="ubicacion"
          className="form-control"
          disabled={state === "loading"}
          value={formData.ubicacion}
          onChange={handleChange}
          required
          placeholder="Ubicacion del evento"
        />
        {obligatorios && formData.ubicacion.length === 0 && <p>⛔</p>}
      </div>
      <div className="mb-3">{/* Tipo */}
        <label className="form-label">Tipo</label>
        <input
          type="text"
          name="tipo"
          className="form-control"
          disabled={state === "loading"}
          value={formData.tipo}
          onChange={handleChange}
          placeholder="Tipo del evento"
        />
      </div>
      <div className="mb-3">{/* Contacto */}
        <label className="form-label">Contacto *</label>
        <input
          type="text"
          name="contacto"
          className="form-control"
          disabled={state === "loading"}
          value={formData.contacto}
          onChange={handleChange}
          placeholder="Enlace a la publicacion"
          required
        />
        {obligatorios && formData.contacto.length === 0 && <p>⛔</p>}
      </div>

      <button type="submit" className="btn btn-success" disabled={state === "loading"}>
        Guardar Profesional
      </button>








      {state === "error" && <Alert variant={"danger"}>Operacion fallida</Alert>}
      {state === "success" && <Alert  variant={"success"}>Operacion Exitosa</Alert>}
      {state === "loading" && <Button variant="primary" disabled>
                                                  <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                  />
                                                   Loading...
                                                </Button> }
    </form>
  );
}
export const EventForm = () =>{
  const [requestState,setRequestState] = useState<"standby" | "success" | "error" | "loading">("standby")
  return <>
    <InnerForm  changeState={setRequestState} state={requestState}/>
                
                
  </>
}
