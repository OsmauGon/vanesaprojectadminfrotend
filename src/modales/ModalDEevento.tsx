import { Alert, Button, Modal, Spinner} from 'react-bootstrap';
import { useState } from 'react';
import type { Event } from '../types/types';

type FormProps ={
  props: Event | null
  changeState: (val: "standby" | "success" | "error" | "loading")=> void
}
type ModalProps = {
    obj: Event | null;
    show: boolean;
    hide: (val: boolean) => void
    tipo: "view" | "put-form" | "hide"
}

const EventEditForm = ({props, changeState}: FormProps)=> {
  const [formData, setFormData] = useState<Event>({
    id: (props && props.id) ? props?.id : 0,
    titulo: (props && props.id) ? props?.titulo : "",
    fecha: props ? props.fecha : "",
    hora: props ? props.hora : "",
    ubicacion: props ? props.ubicacion : "",
    responsable: props ? props.responsable : "",
    contacto: props ? props.contacto : "",
    tipo: props ? props.tipo : ""
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
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
        console.log(dataToSend)//BORRAR
        const response = await fetch("eventPutEndpoint", {
        method: "PUT",
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
      
      console.log(dataToSend)
      setTimeout(() => {
        changeState("standby")
      }, 2000);
     
    };

  return (
    <form onSubmit={handleSubmit} className="p-3 new-form">
      <div className="mb-3">{/* Titulo */}
        <label className="form-label">Titulo</label>
        <input
          type="text"
          name="titulo"
          className="form-control"
          value={formData.titulo}
          onChange={handleChange}
          
        />
      </div>

      <div className="mb-3">{/* Fecha */}
        <label className="form-label">Fecha</label>
        <input
          type="date"
          name="fecha"
          className="form-control"
          value={formData.fecha}
          onChange={handleChange}
          
        />
      </div>
      <div className="mb-3">{/* Hora */}
        <label className="form-label">Hora</label>
        <input
          type="text"
          name="hora"
          className="form-control"
          value={formData.hora}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">{/* Responsable */}
        <label className="form-label">Responsable</label>
        <input
          type="text"
          name="responsable"
          className="form-control"
          value={formData.responsable}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">{/* UBICACION */}
        <label className="form-label">Ubicación</label>
        <input
          type="text"
          name="ubicacion"
          className="form-control"
          value={formData.ubicacion}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">{/* Tipo */}
        <label className="form-label">Tipo</label>
        <input
          type="email"
          name="tipo"
          className="form-control"
          value={formData.tipo}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">{/* Contacto */}
        <label className="form-label">Contacto</label>
        <input
          type="text"
          name="contacto"
          className="form-control"
          value={formData.contacto}
          onChange={handleChange}
        />
      </div>
      
      <button type="submit" className="btn btn-success">
        Guardar evento
      </button>
    </form>
  );
}
export const ModalDEevento = (props: ModalProps) => {
  const [requestState,setRequestState] = useState<"standby" | "success" | "error" | "loading">("standby")

  return (
    <Modal show={props.show} onHide={() => props.hide(false)}>
          <Modal.Body>
                {requestState === "standby" && <EventEditForm props={props.obj} changeState={setRequestState}/>}
                {requestState === "error" && <Alert  variant={"danger"}>This is a {"danger"} alert—check it out!</Alert>}
                {requestState === "success" && <Alert  variant={"success"}>This is a {"success"} alert—check it out!</Alert>}
                {requestState === "loading" && <Button variant="primary" disabled>
                                                  <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                  />
                                                   Loading...
                                                </Button> }
          </Modal.Body>
        <Modal.Footer>
          {/* <button className="btn btn-success">Enviar</button> */}
          <button className="btn btn-danger" onClick={()=> {props.hide(true)}}>{requestState === "success" ? "Hecho" : "Cancelar"}</button>
        </Modal.Footer>
      </Modal>
  )
}