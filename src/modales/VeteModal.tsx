import { Alert, Button, Modal, Spinner } from "react-bootstrap"
import { useState } from "react";
import type { Establishment } from "../types/types";
import { vetesPutEndpoint } from "../endpoints";




type FormProps ={
  props: Establishment | null
  reload?: (val:true)=> void
}
type ModalProps = {
    obj: Establishment | null;
    show: boolean;
    hide: (val: boolean) => void
    tipo: "view" | "put-form" | "hide"
    reload: (val:true)=> void
}

const VeteInfoView = ({props}: FormProps) => {
  return (
    props && 
    <div>
      <p><b>ID: </b>{props.id}</p>
      <p><b>Nombre: </b>{props.nombre}</p>
      <p><b>Especialidades: </b>{props.servicios ? props.servicios.join(" - ") : ""}</p>
      <p><b>Insignias: </b>{props.insignias.length > 0 ? props.insignias.join(" - ") : "Ninguna asignada"}</p>
      <p><b>Ubicacion: </b>{props.ubicacion ? props.ubicacion : "No asignado"}</p>
      <p><b>Telefono: </b>{(props.telefono && props.telefono ?.length > 0) ? props.telefono.join(" - ") : "Ninguno asinado"}</p>
      <p><b>Email: </b>{props.email ? props.email : "Ninguno asinado"}</p>
      <p><b>Instagram: </b>{props.redSocial ? props.redSocial : "No asignado"}</p>
      <p><b>Fin de Suscripcion: </b>{props.finDeSuscripcion ? props.finDeSuscripcion : "No asigndado"}</p>
      <p><b>Horario de contacto: </b>{props.horario ? props.horario : "No asignado"}</p>
      <p><b>Fecha de creacion: </b>{props.createdAt}</p>
      <div><b>Notas: </b>
      {props.notas.length === 0 && <p>Ninguna registrada</p>} 
      <ul>
        {props.notas.map(i => (<li>{i}</li>))}
      </ul>
      </div>
      {props.imagen === null && <p>Ninguna imagen registrada</p>} 
      <img className='w-25' src={props.imagen} alt="" />
    </div>
  )
}
const VeteEditForm = ({props, reload}: FormProps) => {
    const [state,setState] = useState<"standby" | "loading" | "success"  | "error">("standby")
    const [formData, setFormData] = useState<Establishment>({
    id: (props && props.id) ? props?.id : 0,
    nombre: (props && props.id) ? props?.nombre : "",
    ubicacion: props ? props.ubicacion : "",
    telefono: props ? props.telefono : [],
    email: props ? props.email : "",
    redSocial: props ? props.redSocial : "",
    especialidades: props ? props.servicios[0] : "",
    finDeSuscripcion: props ? props.finDeSuscripcion : "",
    horario: props ? props.horario : "",
    servicios: props ? props.servicios : [],
    insignias: props ? props.insignias : [],
    notas: props ? props.notas : [],
    imagen: "",//no se usa, pero no se puede borrar
    practicas: (props && props.servicios) ? props.servicios.splice(1,props.servicios.length) : [],
    
    profesionalesVinculados: props ? props.profesionalesVinculados : [],
    latitud: (props && props.latitud) ? props?.latitud : "",
    longitud: (props && props.longitud) ? props?.longitud : "",
  });

  const [practicaInput, setPracticaInput] = useState("");
  const [notasInput, setNotasInput] = useState("");
  const [profesionalInput, setProfesionalInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  //const [especialidadInput, setEspecialidadInput] = useState("");
  const [badges, setBadges] = useState<string[]>(formData.insignias)
  const toggleBadge = (value: string)=>{
    /*esta funcion es para agregar o quitar la insignia de correspondiente del establecimiento */
    if(!badges.includes(value))setBadges((prev) => [ ...prev,value ]);
    else setBadges(badges.filter(item => item != value))
    
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      setNotasInput("");
    }
  };
  const removeNota = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      notas: prev.notas?.filter((_, i) => i !== index),
    }));
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
  const addPhone = () => {
    if (phoneInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        telefono: [...(prev.telefono ?? []), phoneInput.trim()],
      }));
      setPhoneInput("");
    }
  };
  const removePhone = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      telefono: prev.telefono?.filter((_, i) => i !== index),
    }));
  };
  const addProf = () => {
    if (profesionalInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        profesionalesVinculados: [...(prev.profesionalesVinculados ?? []), profesionalInput.trim()],
      }));
      setProfesionalInput("");
    }
  };
  const removeProf = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      profesionalesVinculados: prev.profesionalesVinculados?.filter((_, i) => i !== index),
    }));
  };
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading")
    
    const dataToSend = {
                    nombre: formData.nombre,
                    ubicacion: formData.ubicacion,
                    telefono: formData.telefono,
                    email: formData.email,
                    redSocial: formData.redSocial,
                    finDeSuscripcion: new Date(formData.finDeSuscripcion),
                    horario: formData.horario,
                    insignias: badges,
                    servicios: [formData.especialidades].concat(formData.practicas),
                    notas: formData.notas,
                    latitud: formData.latitud,
                    longitud: formData.longitud ,
                    profesionalesVinculados: formData.profesionalesVinculados 
    }
    setState("error")
    try {
                    const response = await fetch(vetesPutEndpoint + props?.id, {
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
      
      <details>
        <summary>Perfil del Establecimiento</summary>
        <div>
          <div className="mb-3">{/* NOMBRE */}
            <label className="form-label">Nombre *</label>
            <input
            placeholder="Ej. VetLove"
              type="text"
              name="nombre"
              className="form-control"
              value={formData.nombre}
              onChange={handleChange}
              
            />
            </div>
          <div className="mb-3">{/* Horario de atencion */}
            <label className="form-label">Horario del establecimiento *</label>
            <input
            placeholder="Ej. De lunes a viernes de 16 a 23 / A convenir"
              type="text"
              name="horario"
              className="form-control"
              value={formData.horario}
              onChange={handleChange}
              
            />
            
            </div>
          <div className="mb-3">{/* UBICACION */}
            <label className="form-label">Ubicación *</label>
            <input
            placeholder="Ej. Tejedor 1234"
              type="text"
              name="ubicacion"
              className="form-control"
              value={formData.ubicacion}
              onChange={handleChange}
              
            />
            
            </div>
          <div className="mb-3">{/* latitud */}
            <label className="form-label">Latitud</label>
            <input
              type="text"
              name="latitud"
              className="form-control"
              value={formData.latitud}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">{/* longitud */}
            <label className="form-label">Longitud</label>
            <input
              type="text"
              name="longitud"
              className="form-control"
              value={formData.longitud}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">{/* Telefono */}
            <label className="form-label">Telefonos</label>
            <div className="input-group mb-2">
              <input
              placeholder="Ej. 22312345678, 2234941010, etc."
                type="text"
                className="form-control"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={addPhone}
              >
                Agregar
              </button>
            </div>
          </div>
          <div>{/* CONJUNTO DE Telefonos */}
              {formData.telefono?.map((p, i) => (
                <span key={i} className="badge bg-secondary me-2">
                  {p}{" "}
                  <button
                    type="button"
                    className="btn-close btn-close-white ms-1"
                    onClick={() => removePhone(i)}
                  ></button>
                </span>
              ))}
          </div>
          <div className="mb-3">{/* EMAIL */}
            <label className="form-label">Email</label>
            <input
            placeholder="Ej. vetlove@gmail.com"
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">{/* Red Social */}
            <label className="form-label">Red Social</label>
            <input
            placeholder="Ej. vetlove@gmail.com"
              type="text"
              name="redSocial"
              className="form-control"
              value={formData.redSocial}
              onChange={handleChange}
            />
          </div>
        </div>
      </details>
      <details>
        <summary>Perfil Profesional</summary>
        <div>
          
          <div className="mb-3">{/* ESPECIALIDAD */}
            <label className="form-label">Especialidad *</label>
            <input
              placeholder="Ej. Medicina General"
              type="text"
              name="especialidades"
              className="form-control"
              value={formData.especialidades}
              onChange={handleChange}
              
            />
            
            </div>
          <div className="mb-3">{/* Servicios no filtrables*/}
            <label className="form-label">Servicios</label>
            <div className="input-group mb-2">
              <input
              placeholder="Ej. Farmacia, Reptiles, etc."
                type="text"
                className="form-control"
                value={practicaInput}
                onChange={(e) => setPracticaInput(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={addPractica}
              >
                Agregar
              </button>
            </div>
          </div>
          <div>{/* CONJUNTO DE SERVICIOS */}
              {formData.practicas?.map((p, i) => (
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
          <div className="mb-3">{/* Profesionales Vinculados */}
            <label className="form-label">Profesionales Vinculados</label>
            <div className="input-group mb-2">
              <input
              placeholder="Ej. Dr. Estaban Quito"
                type="text"
                className="form-control"
                value={profesionalInput}
                onChange={(e) => setProfesionalInput(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={addProf}
              >
                Agregar
              </button>
            </div>
          </div>
          <div>{/* CONJUNTO DE PROFESIONALES */}
              {formData.profesionalesVinculados.map((p, i) => (
                <span key={i} className="badge bg-secondary me-2">
                  {p}{" "}
                  <button
                    type="button"
                    className="btn-close btn-close-white ms-1"
                    onClick={() => removeProf(i)}
                  ></button>
                </span>
              ))}
          </div>
          <div className="mb-3">{/* Notas */}
            <label className="form-label">Notas</label>
            <div className="input-group mb-2">
              <input
              placeholder="Ej. Dr. Estaban Quito"
                type="text"
                className="form-control"
                value={notasInput}
                onChange={(e) => setNotasInput(e.target.value)}
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
          <div className="d-flex flex-wrap">{/* CONJUNTO DE NOTAS */}
              {formData.notas.map((p, i) => (
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
          <div className="mb-3">{/* Limite de suscripcion */}
            <label className="form-label">Limite de suscripcion *</label>
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
      <details>
        <summary>Insignias</summary>
        <div>
          <div>{/* Tiene Quirofano */}
            {`${badges.includes("tienequirofano") ? "✅ Si" : "⛔ No"} `} 
            tiene Quirofano 
            <span className={`btn ${badges.includes("tienequirofano") ? "btn-danger" : "btn-primary"} p-0 m-1`} 
                  onClick={()=>toggleBadge("tienequirofano")}>
                    {badges.includes("tienequirofano") ? " ¿Quitar?" : " ¿Añadir?"}
                    </span>
          </div>
          <div>{/* Tiene Lavoratorio */}
            {`${badges.includes("tienelaboratorio") ? "✅ Si" : "⛔ No"} `} 
            Tiene Laboratorio
            <span className={`btn ${badges.includes("tienelaboratorio") ? "btn-danger" : "btn-primary"} p-0 m-1`} 
                  onClick={()=>toggleBadge("tienelaboratorio")}>
                    {badges.includes("tienelaboratorio") ? " ¿Quitar?" : " ¿Añadir?"}
                    </span>
          </div>
          <div>{/* Tiene Internacion */}
            {`${badges.includes("tieneinternacion") ? "✅ Si" : "⛔ No"} `} 
            Tiene Internacion
            <span className={`btn ${badges.includes("tieneinternacion") ? "btn-danger" : "btn-primary"} p-0 m-1`} 
                  onClick={()=>toggleBadge("tieneinternacion")}>
                    {badges.includes("tieneinternacion") ? " ¿Quitar?" : " ¿Añadir?"}
                    </span>
          </div>
          <div>{/* Tiene Hace Urgencias */}
            {`${badges.includes("haceurgencias") ? "✅ Si" : "⛔ No"} `} 
            Hace Urgencias
            <span className={`btn ${badges.includes("haceurgencias") ? "btn-danger" : "btn-primary"} p-0 m-1`} 
                  onClick={()=>toggleBadge("haceurgencias")}>
                    {badges.includes("haceurgencias") ? " ¿Quitar?" : " ¿Añadir?"}
                    </span>
          </div>
          <div>{/* Tiene Peluqueria */}
            {`${badges.includes("tienepeluqueria") ? "✅ Si" : "⛔ No"} `} 
            Tiene Peluqueria
            <span className={`btn ${badges.includes("tienepeluqueria") ? "btn-danger" : "btn-primary"} p-0 m-1`} 
                  onClick={()=>toggleBadge("tienepeluqueria")}>
                    {badges.includes("tienepeluqueria") ? " ¿Quitar?" : " ¿Añadir?"}
                    </span>
          </div>
          <div>{/* Tiene Petshop */}
            {`${badges.includes("tienepetshop") ? "✅ Si" : "⛔ No"} `} 
            Tiene Petshop 
            <span className={`btn ${badges.includes("tienepetshop") ? "btn-danger" : "btn-primary"} p-0 m-1`} 
                  onClick={()=>toggleBadge("tienepetshop")}>
                    {badges.includes("tienepetshop") ? " ¿Quitar?" : " ¿Añadir?"}
                    </span>
          </div>
        </div>
      </details>

      <button type="submit" className="btn btn-success">
        Guardar Establecimiento
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


















export const VetesModal = (props: ModalProps) => {
    return (
    <Modal show={props.show} onHide={() => props.hide(false)}>
          <Modal.Body>
                {props.tipo === "put-form" && <VeteEditForm props={props.obj} reload={props.reload}/>}
                {props.tipo === "view" && <VeteInfoView props={props.obj} />}
                 
          </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={()=> {props.hide(true)}}>Salir</button>
        </Modal.Footer>
      </Modal>
  )
}