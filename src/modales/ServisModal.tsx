import { Alert, Button, Modal, Spinner } from "react-bootstrap"
import { useState } from "react";
import type { Servicio } from "../types/types";

type FormProps ={
  props: Servicio | null
}
type ModalProps = {
    obj: Servicio | null;
    show: boolean;
    hide: (val: boolean) => void
    tipo: "view" | "put-form" | "hide"
}

const ServisInfoView = ({props}: FormProps) => {
  console.log(props)
  return (
    props && 
    <div>
      <p><b>ID: </b>{props.id}</p>
      <p><b>Nombre: </b>{props.nombre}</p>
      <p><b>Topico: </b>{props.topico}</p>
      <p><b>Descripcion: </b>{props.descripcion}</p>
      <p><b>Telefono: </b>{props.telefono}</p>
      <p><b>Clase: </b>{props.clase}</p>
      <p><b>Contacto: </b>{props.contacto}</p>
      <p><b>Red Social: </b>{props.redSocial ? props.redSocial : "No asignado"}</p>
      <p><b>Fin de Suscripcion: </b>{props.finDeSuscripcion ? props.finDeSuscripcion : "No asigndado"}</p>
      <p><b>Fecha de creacion: </b>{props.createdAt}</p>
      <div><b>Notas: </b>
      {props.notas.length === 0 && <p>Ninguna registrada</p>} 
      <ul>
        {props.notas.map(i => (<li>{i}</li>))}
      </ul>
      </div>
      {props.imagenLogo === null && <p>Ninguna imagen registrada</p>} 
      <img className='w-25' src={props.imagenLogo} alt="" />
    </div>
  )
}
const ServisEditForm = ({props}: FormProps) => {
    const [state,setState] = useState<"standby" | "loading" | "success"  | "error">("standby")
    const [formData, setFormData] = useState<Servicio>({
        id: (props && props.id) ? props?.id : 0,
        nombre: (props && props.nombre) ? props?.nombre : "",
        topico: (props && props.topico) ? props?.topico : "",
        telefono: (props && props.telefono) ? props?.telefono : "",
        descripcion: props ? props.descripcion : "",
        clase: props ? props.clase : "SERVICIO",
        contacto: props ? props.contacto : "",
        redSocial: props ? props.redSocial : "",
        finDeSuscripcion: props ? props.finDeSuscripcion : "",
        notas: props ? props.notas : []
    });
    const [notasInput, setNotaInput] = useState("");
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
        ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const addNota = () => {
          if (notasInput.trim() !== "") {
            setFormData((prev) => ({
              ...prev,
              notas: [...(prev.notas ?? []), notasInput.trim()],
            }));
            setNotaInput("");
          }
        };
        const removeNota = (index: number) => {
          setFormData((prev) => ({
            ...prev,
            notas: prev.notas?.filter((_, i) => i !== index),
          }));
        };
        /* ########################################### */
        const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState("loading")
        
        const dataToSend = {
        "nombre": formData.nombre,
        "contacto": formData.contacto,
        "telefono": formData.telefono,
        "redSocial": formData.redSocial,
        "finDeSuscripcion": formData.finDeSuscripcion,
        }
        console.log(dataToSend)
        try {
        const response = await fetch("servisPutEndpoint", {
        method: "PUT",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
                });
                const result = await response.json();
                if(result.message === "PUT EXITOSO") {
            setState("success")
        }
        } catch (error) {
        setState("error")
        console.log("Error detectado: ", error)
        }
        
        setTimeout(() => {
        setState("standby")
        }, 2000);
        
    };
    return (
    <>
    {state === "standby" &&
    <form onSubmit={handleSubmit} className="p-3 new-form">
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
          <div className="mb-3">{/* Notas */}
            <label className="form-label">Notas</label>
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                value={notasInput}
                onChange={(e) => setNotaInput(e.target.value)}
                placeholder="Notas"
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={addNota}
              >
                Agregar
              </button>
            </div>
          </div>
          <div className="d-flex flex-wrap">{/* CONJUNTO DE Notas */}
              {formData.notas?.map((p, i) => (
                <span key={i} className="badge bg-secondary me-2">
                  {p}{" "}
                  <button
                    type="button"
                    className="btn-close btn-close-white ms-1"
                    onClick={() => removeNota(i)}
                  ></button>
                </span>
              ))}
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


      <button type="submit" className="btn btn-success">
        Guardar Servicio
      </button>
    </form>
    }
    {state === "error" && <Alert  variant={"danger"}>This is a {"danger"} alert—check it out!</Alert>}
    {state === "success" && <Alert  variant={"success"}>This is a {"success"} alert—check it out!</Alert>}
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
  );
}
export const ServisModal = (props: ModalProps) => {
    const editarImagen = ()=>{
        alert("en construccion")
    }
    return (
    <Modal show={props.show} onHide={() => props.hide(false)}>
          <Modal.Body>
                {props.tipo === "put-form" && <ServisEditForm props={props.obj}/>}
                {props.tipo === "view" && <ServisInfoView props={props.obj} />}
                
          </Modal.Body>
        <Modal.Footer>
          {/* <button className="btn btn-success">Enviar</button> */}
          <button className="btn btn-danger" onClick={()=> {props.hide(true)}}>Salir</button>
          {props.tipo === "put-form" && <button className="btn btn-warning" onClick={editarImagen}>Editar Imagen</button>}
        </Modal.Footer>
      </Modal>
  )
}