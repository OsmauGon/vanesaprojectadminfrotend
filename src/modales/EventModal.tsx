import { Alert, Button, Modal, Spinner } from "react-bootstrap"
import { useState } from "react";
import type { Event } from "../types/types";
import { eventPutEndpoint } from "../endpoints";

type FormProps ={
  props: Event | null
  reload?: (val:true)=> void
}
type ModalProps = {
    obj: Event | null;
    show: boolean;
    hide: (val: boolean) => void
    tipo: "view" | "put-form" | "hide"
    reload: (val:true)=> void
}

const EventInfoView = ({props}: FormProps) => {
  return (
    props && 
    <div>
      <p><b>ID: </b>{props.id}</p>
      <p><b>Titulo: </b>{props.titulo}</p>
      <p><b>Fecha: </b>{props.fecha}</p>
      <p><b>Hora: </b>{props.hora}</p>
      <p><b>responsable: </b>{props.responsable}</p>
      <p><b>contacto: </b>{props.contacto}</p>
      <p><b>tipo: </b>{props.tipo}</p>
    </div>
  )
}

const EventEditForm = ({props, reload}: FormProps)=> {
   const [state,setState] = useState<"standby" | "loading" | "success"  | "error">("standby")
    const [formData, setFormData] = useState<Event>({
    id: 0,
        titulo: props ? props.titulo : "",
        fecha: props ? props.fecha : "",
        hora: props ? props.hora : "",
        ubicacion: props ? props.ubicacion : "",
        tipo: props ? props.tipo : "",
        contacto: props ? props.contacto: "",
        responsable: props ? props.responsable : "",
      });
    
      const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState("loading")
        
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
          const response = await fetch(eventPutEndpoint + props?.id, {
          method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
            });
            const result = await response.json();
            if(result.message === "PUT EXITOSO") {
            setState("success")
            if(reload) reload(true)
          }
        } catch (error) {
          setState("error")
          console.log("Error detectado: ", error)
        }
      };
    
      return (
        <>
        {state === "standby" &&
            <form onSubmit={handleSubmit} className="p-3 new-form">
                <div className="mb-3">{/* Titulo */}
                    <label className="form-label">Titulo *</label>
                    <input
                    type="text"
                    name="titulo"
                    className="form-control"
                    value={formData.titulo}
                    onChange={handleChange}
                    placeholder="Titulo del evento"
                    />
                </div>
                <div className="mb-3">{/* Fecha */}
                    <label className="form-label">Fecha *</label>
                    <input
                    type="date"
                    name="fecha"
                    className="form-control"
                    value={formData.fecha}
                    onChange={handleChange}
                    required
                    placeholder="Fecha del evento"
                    />
                </div>
                <div className="mb-3">{/* Hora */}
                    <label className="form-label">Hora *</label>
                    <input
                    type="text"
                    name="hora"
                    className="form-control"
                    value={formData.hora}
                    onChange={handleChange}
                    required
                    placeholder="Hora del evento"
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
                    placeholder="Nombre de la presona u organismo"
                    />
                </div>
                <div className="mb-3">{/* UBICACION */}
                    <label className="form-label">Ubicación *</label>
                    <input
                    type="text"
                    name="ubicacion"
                    className="form-control"
                    value={formData.ubicacion}
                    onChange={handleChange}
                    required
                    placeholder="Ubicacion del evento"
                    />
                </div>
                <div className="mb-3">{/* Tipo */}
                    <label className="form-label">Tipo</label>
                    <input
                    type="text"
                    name="tipo"
                    className="form-control"
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
                    value={formData.contacto}
                    onChange={handleChange}
                    placeholder="Enlace a la publicacion"
                    required
                    />
                </div>

                <button type="submit" className="btn btn-success" disabled={false}>
                    Guardar Cambios
                </button>
            </form>

        }
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
        
    
    </>
    )
}

export const EventModal = (props: ModalProps) => {
    return (
    <Modal show={props.show} onHide={() => props.hide(false)}>
          <Modal.Body>
                {props.tipo === "put-form" && <EventEditForm props={props.obj} reload={props.reload}/>}
                {props.tipo === "view" && <EventInfoView props={props.obj} />}
                
          </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={()=> {props.hide(true)}}>Salir</button>
          </Modal.Footer>
      </Modal>
  )
}