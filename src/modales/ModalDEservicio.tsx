import { useState } from "react";
import type { Servicio } from "../types/types";
import { Alert, Button, Modal, Spinner } from "react-bootstrap";

type FormProps ={
  props: Servicio | null
  changeState: (val: "standby" | "success" | "error" | "loading")=> void
}
type ModalProps = {
    obj: Servicio | null;
    show: boolean;
    hide: (val: boolean) => void
}

const ServicioEditForm = ({props, changeState}: FormProps)=> {
  const [formData, setFormData] = useState<Servicio>({
    id: (props && props.id) ? props?.id : 0,
    nombre: (props && props.nombre) ? props?.nombre : "",
    topico: (props && props.topico) ? props?.topico : "",
    telefono: (props && props.telefono) ? props?.telefono : "",
    descripcion: props ? props.descripcion : "",
    imagenLogo: props ? props.imagenLogo : "",
    clase: props ? props.clase : "SERVICIO",
    contacto: props ? props.contacto : "",
    redSocial: props ? props.redSocial : "",
    finDeSuscripcion: props ? props.finDeSuscripcion : ""
  });
const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFile = e.target.files?.[0];
  if (selectedFile) {
    setFile(selectedFile);
    // opcional: mostrar preview
    const url = URL.createObjectURL(selectedFile);
    setFormData((prev) => ({ ...prev, imagen: url }));
  }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    changeState("loading")
    const formDataToSend = new FormData();
    formDataToSend.append("nombre", formData.nombre);
    formDataToSend.append("contacto", formData.contacto);
    formDataToSend.append("telefono", formData.telefono);
    formDataToSend.append("contacto", formData.contacto);
    formDataToSend.append("redSocial", formData.redSocial);
    formDataToSend.append("finDeSuscripcion", formData.finDeSuscripcion);
    
    // imagen como archivo
    if (file) {
      formDataToSend.append("imagen", file);
    }
    /*for (const [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }
    setTimeout(() => {
      changeState("standby")
    }, 2000);
    */
    try {
      const response = await fetch("servPutEndpoint", {
      method: "PUT",
      body: formDataToSend,
      });
      const result = await response.json();
      if(result.message === "EXITO") {
        changeState("success")
      }
    } catch (error) {
      changeState("error")
      console.log("Error detectado: ", error)
    }
  };
  return (
    <form onSubmit={handleSubmit} className="p-3 new-form">
      <details>
        <summary>Perfil Personal</summary>
        <div>
          <div className="mb-3">{/* NOMBRE */}
            <label className="form-label">Nombre *</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={formData.nombre}
              onChange={handleChange}
              required
              placeholder="Nombre del profesional"
            />
            
          </div>
          <div className="mb-3">{/* IMAGEN */}
            <label className="form-label">Foto de perfil *</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleFileChange}
            />
            
          </div>

          <div className="mb-3">{/* Topico */}
            <label className="form-label">Topico</label>
            <input
              type="text"
              name="topico"
              className="form-control"
              value={formData.topico}
              onChange={handleChange}
              placeholder="Tema del servicio"
            />
            
          </div>

          <div className="mb-3">{/* Descripcion */}
            <label className="form-label">Descripcion</label>
            <input
              type="text"
              name="descripcion"
              className="form-control"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Descripcion del servicio"
            />
            
          </div>

          <div className="mb-3">{/* TELEFONO */}
            <label className="form-label">Teléfono</label>
            <input
              type="text"
              name="telefono"
              className="form-control"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="2236666666"
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
              placeholder="nombre de responsable a cargo"
            />

          </div>
            
        <div className="mb-3">{/* Tipo */}
          <label className="form-label">Tipo de posteo *</label>
          <select name="clase" id="clase" className="form-control" onChange={handleChange}>
            <option value="SERVICIO">SERVICIO</option>
            <option value="PRODUCTO">PRODUCTO</option>
          </select>
        </div>
          <div className="mb-3">{/* redsocial */}
            <label className="form-label">Red Social</label>
            <input
              type="redsocial"
              name="redSocial"
              className="form-control"
              value={formData.redSocial}
              onChange={handleChange}
              placeholder="@Instagram-link"
            />
          </div>
          <div className="mb-3">{/* Limite de Suscripcion */}
            <label className="form-label">Limite de suscripcion</label>
            <input
              type="date"
              name="finDeSuscripcion"
              className="form-control"
              value={formData.finDeSuscripcion}
              onChange={handleChange}
              />
          </div>
        </div>
      </details>

      <button type="submit" className="btn btn-success">
        Guardar Servicio
      </button>
    </form>
  );
}
export const ModalDEservicios = (props: ModalProps) => {
  const [requestState,setRequestState] = useState<"standby" | "success" | "error" | "loading">("standby")

  return (
    <Modal show={props.show} onHide={() => props.hide(false)}>
          <Modal.Body>
                {requestState === "standby" && <ServicioEditForm props={props.obj} changeState={setRequestState}/>}
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