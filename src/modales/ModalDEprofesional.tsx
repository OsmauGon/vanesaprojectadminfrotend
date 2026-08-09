
import { Alert, Button, Modal, Spinner} from 'react-bootstrap';
import type { Profesional } from '../types/types';
import { useState } from 'react';
type FormProps ={
  props: T | null
  state: "standby" | "success" | "error" | "loading" | "view"
  changeState: (val: "standby" | "success" | "error" | "loading")=> void
}
type ModalProps = {
    obj: Profesional | null;
    show: boolean;
    hide: (val: boolean) => void
}

const ProfesionalEditForm = ({props, changeState, state}: FormProps)=> {
  const [formData, setFormData] = useState<Profesional>({
    id: (props && props.id) ? props?.id : 0,
    nombre: (props && props.id) ? props?.nombre : "",
    especialidad: props ? props.practicas[0] : "",
    practicas: props ? props.practicas.splice(1,props.practicas.length) : [],
    ubicacion: props ? props.ubicacion : "",
    telefono: props ? props.telefono : "",
    email: props ? props.email : "",
    redSocial: props ? props.redSocial : "",
    finDEsuscripcion: props ? props.finDEsuscripcion : "",
    horarioDEcontacto: props ? props.horarioDEcontacto : "",
    insignias: props ? props.insignias.splice(1,props.insignias.length) : [],
    
  });
  const [practicaInput, setPracticaInput] = useState("");
  const [badges, setBadges] = useState<string[]>([])
  const badgeCollector = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    /*esta funcion es para agregar o quitar la insignia de correspondiente del establecimiento */
    const {id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: e.target.value }));
    if(value) setBadges((prev) => [ ...prev,id ]);
    else setBadges(badges.filter(item => item !=id))
    
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addPractica = () => {
    if (practicaInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        practicas: [...(prev.practicas ?? []), practicaInput.trim()],
      }));
      setPracticaInput("");
    }
  };
  const removePractica = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      practicas: prev.practicas?.filter((_, i) => i !== index),
    }));
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
    const servicios = [formData.especialidad].concat(formData.practicas)
    const domicilio = formData.hacedomicilio ? ["hacedomicilio"] : []
    

    formDataToSend.append("nombre", formData.nombre);
    formDataToSend.append("servicios", JSON.stringify(servicios));
    formDataToSend.append("ubicacion", formData.ubicacion);
    formDataToSend.append("telefono", formData.telefono);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("redSocial", formData.redSocial ? formData.redSocial : "");
    formDataToSend.append("insignias", JSON.stringify(domicilio));
    formDataToSend.append("finDeSuscripcion", formData.finDEsuscripcion);
    formDataToSend.append("horario", formData.horarioDEcontacto);

    // practicas como array
    formData.practicas.forEach((p, i) => {
      formDataToSend.append(`practicas[${i}]`, p);
    });

    // imagen como archivo
    if (file) {
      formDataToSend.append("imagen", file);
    }
    /*
    try {
      const response = await fetch(profPostEndpoint, {
      method: "POST",
      body: formDataToSend,
      });
      const result = await response.json();
      if(result.message === "EXITO") {
        changeState("success")
      }
    } catch (error) {
      changeState("error")
      console.log("Error detectado: ", error)
    }*/
     
    
     for (const [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }
    setTimeout(() => {
      changeState("standby")
    }, 2000);
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
              disabled={state === "loading"}           />
          </div>
          <div className="mb-3">{/* IMAGEN */}
            <label className="form-label">Foto de perfil *</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleFileChange}
              disabled={state === "loading"}
            />
            <img className='w-25' src={props?.imagen} alt={props?.nombre} />
          </div>

          <div className="mb-3">{/* UBICACION */}
            <label className="form-label">Ubicación</label>
            <input
              type="text"
              name="ubicacion"
              className="form-control"
              value={formData.ubicacion}
              onChange={handleChange}
              disabled={state === "loading"}           />
          </div>

          <div className="mb-3">{/* TELEFONO */}
            <label className="form-label">Teléfono</label>
            <input
              type="text"
              name="telefono"
              className="form-control"
              value={formData.telefono}
              onChange={handleChange}
              disabled={state === "loading"}           />
          </div>

          <div className="mb-3">{/* EMAIL */}
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              disabled={state === "loading"}           />
          </div>
          
          <div className="mb-3">{/* redsocial */}
            <label className="form-label">Instagram</label>
            <input
              type="redsocial"
              name="redsocial"
              className="form-control"
              value={formData.redSocial}
              onChange={handleChange}
              disabled={state === "loading"}           />
          </div>
        </div>
      </details>
      <details>
        <summary>Perfil Profesional</summary>
        <div>
          <div className="mb-3">{/* Horario de atencion */}
            <label className="form-label">Horario de contacto *</label>
            <input
              type="text"
              name="horarioDEcontacto"
              className="form-control"
              value={formData.horarioDEcontacto}
              onChange={handleChange}
              disabled={state === "loading"}           />
          </div>
          <div className="mb-3">{/* ESPECIALIDAD */}
            <label className="form-label">Especialidad</label>
            <input
              type="text"
              name="especialidad"
              className="form-control"
              value={formData.especialidad}
              onChange={handleChange}
              disabled={state === "loading"}           />
          </div>
          <div className="mb-3">{/* Practicas */}
            <label className="form-label">Prácticas</label>
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                value={practicaInput}
                onChange={(e) => setPracticaInput(e.target.value)}
                disabled={state === "loading"}           />
              <button
                type="button"
                className="btn btn-primary"
                onClick={addPractica}
              >
                Agregar
              </button>
            </div>
          </div>
          <div>{/* CONJUNTO DE PRACTICAS */}
              {formData.practicas.slice(1,formData.practicas.length)?.map((p, i) => (
                <span key={i} className="badge bg-secondary me-2">
                  {p}{" "}
                  <button
                    type="button"
                    className="btn-close btn-close-white ms-1"
                    onClick={() => removePractica(i)}
                  ></button>
                </span>
              ))}
          </div>
          <div className="mb-3">{/* Limite de Suscripcion */}
            <label className="form-label">Limite de suscripcion</label>
            <input
              type="date"
              name="finDEsuscripcion"
              className="form-control"
              value={formData.finDEsuscripcion}
              onChange={handleChange}
            />
          </div>
        </div>
      </details>
      <details>
        <summary>Insignias</summary>
        <div>
          <div className="form-check mb-3">{/* HACE DOMICILIO */}
            <input
              type="checkbox"
              className="form-check-input"
              checked={badges.includes("hacedomicilio")}
              onChange={badgeCollector}
              id="hacedomicilio"
            />
            <label className="form-check-label" htmlFor="hacedomicilio">
              Hace visitas a domicilio
            </label>
          </div>
        </div>
          <div className="form-check mb-3">{/* HACE URGENCIAS */}
            <input
              type="checkbox"
              className="form-check-input"
              checked={badges.includes("haceurgencias")}
              onChange={badgeCollector}
              id="haceurgencias"
            />
            <label className="form-check-label" htmlFor="haceurgencias">
              Hace visitas a urgencias
            </label>
          </div>
      </details>

      <button type="submit" className="btn btn-success" disabled={state === "loading"}>
        Guardar Profesional
      </button>
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
    </form>
  );
}
const ProfesionalModal = ({props}: FormProps) => {
  console.log(props)
  return (
    props && 
    <div>
      <p><b>ID: </b>{props.id}</p>
      <p><b>Nombre: </b>{props.nombre}</p>
      <p><b>Especialidades: </b>{props.servicios ? props.servicios.join(" - ") : ""}</p>
      <p><b>Insignias: </b>{props.insignias.join(" - ")}</p>
      <p><b>Ubicacion: </b>{props.ubicacion ? props.ubicacion : "No asignado"}</p>
      <p><b>Telefono: </b>{props.telefono}</p>
      <p><b>Email: </b>{props.email}</p>
      <p><b>Instagram: </b>{props.redSocial ? props.redSocial : "No asignado"}</p>
      <p><b>Fin de Suscripcion: </b>{props.finDeSuscripcion ? props.finDeSuscripcion : "No asigndado"}</p>
      <p><b>Horario de contacto: </b>{props.horario ? props.horario : "No asignado"}</p>
      <p><b>Fecha de creacion: </b>{props.createdAt}</p>
    </div>
  )
}


export const ModalDEprofesional = (props: ModalProps) => {
  const [requestState,setRequestState] = useState<"view" | "standby" | "success" | "error" | "loading">("standby")

  return (
    <Modal show={props.show} onHide={() => props.hide(false)}>
          <Modal.Body>
                {/*requestState === "standby" && <ProfesionalEditForm props={props.obj} changeState={setRequestState} state={requestState}/>}
                {requestState === "view" && <ProfesionalModal props={props.obj} changeState={setRequestState} state={requestState}/>*/}
                <ProfesionalModal props={props.obj} changeState={setRequestState} state={requestState}/>
                
          </Modal.Body>
        <Modal.Footer>
          {/* <button className="btn btn-success">Enviar</button> */}
          <button className="btn btn-danger" onClick={()=> {setRequestState("standby");props.hide(true)}}>{requestState === "success" ? "Hecho" : "Cancelar"}</button>
        </Modal.Footer>
      </Modal>
  )
}