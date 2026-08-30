import { Alert, Button, Modal, Spinner } from "react-bootstrap"
import { useState } from "react";
import type { Establishment } from "../types/types";




type FormProps ={
  props: Establishment | null
}
type ModalProps = {
    obj: Establishment | null;
    show: boolean;
    hide: (val: boolean) => void
    tipo: "view" | "put-form" | "hide"
}

const VeteInfoView = ({props}: FormProps) => {
    console.log(props)
  return (
    props && 
    <div>
      <p><b>ID: </b>{props.id}</p>
      <p><b>Nombre: </b>{props.nombre}</p>
      <p><b>Especialidades: </b>{props.servicios ? props.servicios.join(" - ") : ""}</p>
      <p><b>Insignias: </b>{props.insignias.join(" - ")}</p>
      <p><b>Ubicacion: </b>{props.ubicacion ? props.ubicacion : "No asignado"}</p>
      <p><b>Telefono: </b>{props.telefono ? props.telefono.join(" - ") : "No asignado"}</p>
      <p><b>Email: </b>{props.email}</p>
      <p><b>Instagram: </b>{props.redSocial ? props.redSocial : "No asignado"}</p>
      <p><b>Fin de Suscripcion: </b>{props.finDeSuscripcion ? props.finDeSuscripcion : "No asigndado"}</p>
      <p><b>Horario de contacto: </b>{props.horario ? props.horario : "No asignado"}</p>
      <p><b>Fecha de creacion: </b>{props.createdAt}</p>
      <div><b>Notas: </b>
      {props.notas.length > 0 && <p>Ninguna registrada</p>} 
      <ul>
        {props.notas.map(i => (<li>{i}</li>))}
      </ul>
      </div>
      {props.imagen === null && <p>Ninguna imagen registrada</p>} 
      <img className='w-25' src={props.imagen} alt="" />
    </div>
  )
}
const VeteEditForm = ({props}: FormProps) => {
    const [state,setState] = useState<"standby" | "loading" | "success"  | "error">("standby")
    const [formData, setFormData] = useState<Establishment>({
    id: (props && props.id) ? props?.id : 0,
    nombre: (props && props.id) ? props?.nombre : "",
    servicios: props ? props.servicios : [],
    imagen: props ? props.imagen : "",
    ubicacion: props ? props.ubicacion : "",
    telefono: props ? props.telefono : [],
    email: props ? props.email : "",

    finDeSuscripcion: props ? props.finDeSuscripcion : "",
    horario: props ? props.horario : "",
    
    profesionalesVinculados: props ? props.profesionalesVinculados : [],
    latitud: (props && props.latitud) ? props?.latitud : "",
    longitud: (props && props.longitud) ? props?.longitud : "",
    redSocial: props ? props.redSocial : "",
    insignias: props ? props.insignias : [],
    notas: props ? props.notas : []
  });

    const [practicaInput, setPracticaInput] = useState("");
  const [notasInput, setNotasInput] = useState("");
  const [profesionalInput, setProfesionalInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [especialidadInput, setEspecialidadInput] = useState("");
  const [badges, setBadges] = useState<string[]>(formData.insignias)
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
        servicios: [...(prev.servicios ?? []), practicaInput.trim()],
      }));
      setPracticaInput("");
    }
  };
  const removePractica = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      practicas: prev.servicios?.filter((_, i) => i !== index),
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
      practicas: prev.telefono?.filter((_, i) => i !== index),
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
      practicas: prev.profesionalesVinculados?.filter((_, i) => i !== index),
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
                    finDeSuscripcion: formData.finDeSuscripcion,
                    horario: formData.horario,
                    insignias: JSON.stringify(badges),
                    servicios: JSON.stringify(formData.servicios),
                    notas: JSON.stringify(formData.notas)  
    }
    alert("En construccion")
    console.log(dataToSend)
    setState("error")
    return

    try {
                    const response = await fetch("profPutEndpoint", {
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
        }, 2000);//BORRAR
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
              value={especialidadInput}
              onChange={(e) => setEspecialidadInput(e.target.value)}
              
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
              {formData.servicios?.map((p, i) => (
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
          
          <div className="form-check mb-3">{/* Tiene Quirofano */}
            <input
              type="checkbox"
              className="form-check-input"
              checked={badges.includes("tienequirofano")}
               onChange={badgeCollector}
              id="tienequirofano"
            />
            <label className="form-check-label" htmlFor="tienelaboratorio">
              Tiene Quirofano
            </label>
          </div>
          <div className="form-check mb-3">{/* Tiene Laboratorio */}
            <input
              type="checkbox"
              className="form-check-input"
              checked={badges.includes("tienelaboratorio")}
              onChange={badgeCollector}
              id="tienelaboratorio"
            />
            <label className="form-check-label" htmlFor="tienelaboratorio">
              Tiene Laboratorio
            </label>
          </div>
          <div className="form-check mb-3">{/* Tiene Internacion */}
            <input
              type="checkbox"
              className="form-check-input"
              checked={badges.includes("tieneinternacion")}
              onChange={badgeCollector}
              id="tieneinternacion"
            />
            <label className="form-check-label" htmlFor="tieneinternacion">
              Tiene Internacion
            </label>
          </div>
          <div className="form-check mb-3">{/* Hace Urgencias */}
            <input
              type="checkbox"
              className="form-check-input"
              checked={badges.includes("haceurgencias")}
              onChange={badgeCollector}
              id="haceurgencias"
            />
            <label className="form-check-label" htmlFor="haceurgencias">
              Hace Urgencias
            </label>
          </div>
          <div className="form-check mb-3">{/* Tiene Peluqueria */}
            <input
              type="checkbox"
              className="form-check-input"
              checked={badges.includes("tienepeluqueria")}
              onChange={badgeCollector}
              id="tienepeluqueria"
            />
            <label className="form-check-label" htmlFor="tienepeluqueria">
              Tiene Peluqueria
            </label>
          </div>
          <div className="form-check mb-3">{/* Tiene Petshop */}
            <input
              type="checkbox"
              className="form-check-input"
              checked={badges.includes("tienepetshop")}
              onChange={badgeCollector}
              id="tienepetshop"
            />
            <label className="form-check-label" htmlFor="tienepetshop">
              Tiene Petshop
            </label>
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
    const editarImagen = ()=>{
        alert("en construccion")
    }
    return (
    <Modal show={props.show} onHide={() => props.hide(false)}>
          <Modal.Body>
                {props.tipo === "put-form" && <VeteEditForm props={props.obj}/>}
                {props.tipo === "view" && <VeteInfoView props={props.obj} />}
                
          </Modal.Body>
        <Modal.Footer>
          {/* <button className="btn btn-success">Enviar</button> */}
          <button className="btn btn-danger" onClick={()=> {props.hide(true)}}>Salir</button>
          {props.tipo === "put-form" && <button className="btn btn-warning" onClick={editarImagen}>Editar Imagen</button>}
        </Modal.Footer>
      </Modal>
  )
}