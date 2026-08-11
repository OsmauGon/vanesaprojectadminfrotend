
import { Alert, Button, Modal, Spinner} from 'react-bootstrap';
import type { Establishment } from '../types/types';
import { useState } from 'react';


type ModalProps = {
    obj: Establishment | null;
    show: boolean;
    hide: (val: boolean) => void
}
type FormProps ={
  props: Establishment| null
  state: "standby" | "success" | "error" | "loading" | "view"
  changeState: (val: "standby" | "success" | "error" | "loading")=> void
}





const EstablishmentEditForm = ({props, changeState, state}: FormProps)=> {
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
    insignias: props ? props.insignias : []
  });
  
    const [practicaInput, setPracticaInput] = useState("");
    const [profesionalInput, setProfesionalInput] = useState("");
    const [phoneInput, setPhoneInput] = useState("");
    const [especialidadInput, setEspecialidadInput] = useState("");
    const [file, setFile] = useState<File | null>(null);
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
    /* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */
    /* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */
    /* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */
  
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
    /* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */
    /* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */
    /* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */
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
          const servicios = [especialidadInput].concat(formData.servicios)
          //const domicilio = formData.hacedomicilio ? ["hacedomicilio"] : []
          
      
          formDataToSend.append("nombre", formData.nombre);
          formDataToSend.append("servicios", JSON.stringify(servicios));
          formDataToSend.append("ubicacion", formData.ubicacion);
          formDataToSend.append("telefono", JSON.stringify(formData.telefono));
          formDataToSend.append("email", formData.email);
          formDataToSend.append("redSocial", formData.redSocial ? formData.redSocial : "");
          formDataToSend.append("insignias", JSON.stringify(badges));
          formDataToSend.append("finDeSuscripcion", formData.finDeSuscripcion);
          formDataToSend.append("horario", formData.horario);
          formDataToSend.append("profesionalesVinculados", JSON.stringify(formData.profesionalesVinculados));
          formDataToSend.append("latitud", formData.latitud);
          formDataToSend.append("longitud", formData.longitud);
      
          
      
          // imagen como archivo
          if (file) {
            formDataToSend.append("imagen", file);
          }
          
          try {
            const response = await fetch("vetesPutEndpoint", {
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
          }
            
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
        <summary>Perfil del Establecimiento</summary>
        <div>
          <div className="mb-3">{/* NOMBRE */}
            <label className="form-label">Nombre *</label>
            <input
            disabled ={state === "loading"}
            placeholder="Ej. VetLove"
              type="text"
              name="nombre"
              className="form-control"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">{/* IMAGEN */}
        <label className="form-label">Foto de perfil</label>
        <input
        disabled ={state === "loading"}
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleFileChange}
        />
        <img className='w-25' src={formData.imagen} alt={formData.nombre} />
          </div>
          <div className="mb-3">{/* Horario de atencion */}
            <label className="form-label">Horario del establecimiento *</label>
            <input
            disabled ={state === "loading"}
            placeholder="Ej. De lunes a viernes de 16 a 23"
              type="text"
              name="horario"
              className="form-control"
              value={formData.horario}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">{/* UBICACION */}
            <label className="form-label">Ubicación</label>
            <input
            disabled ={state === "loading"}
            placeholder="Ej. Tejedor 1234"
              type="text"
              name="ubicacion"
              className="form-control"
              value={formData.ubicacion ? formData.ubicacion : ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">{/* latitud */}
            <label className="form-label">Latitud</label>
            <input
            disabled ={state === "loading"}
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
            disabled ={state === "loading"}
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
              disabled ={state === "loading"}
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
            disabled ={state === "loading"}
            placeholder="Ej. vetlove@gmail.com"
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
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
              value={formData.servicios[0]}
              onChange={(e) => setEspecialidadInput(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">{/* Servicios no filtrables*/}
            <label className="form-label">Servicios</label>
            <div className="input-group mb-2">
              <input
              disabled ={state === "loading"}
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
              {formData.servicios.slice(1,formData.servicios.length)?.map((p, i) => (
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
              disabled ={state === "loading"}
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
          <div className="mb-3">{/* Limite de suscripcion */}
            <label className="form-label">Limite de suscripcion *</label>
            <input
            disabled ={state === "loading"}
              type="date"
              name="finDeSuscripcion"
              className="form-control"
              value={formData.finDeSuscripcion}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </details>
      <details>
        <summary>Insignias</summary>
        <div>
          
          <div className="form-check mb-3">{/* Tiene Quirofano */}
            <input
            disabled ={state === "loading"}
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
            disabled ={state === "loading"}
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
            disabled ={state === "loading"}
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
            disabled ={state === "loading"}
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
            disabled ={state === "loading"}
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
            disabled ={state === "loading"}
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

      <button type="submit" className="btn btn-success" disabled={state === "loading"}>
        Guardar Establecimiento
      </button>
      {state === "error" && <Alert  variant={"danger"}>This is a {"danger"} Operacion Fallida</Alert>}
      {state === "success" && <Alert  variant={"success"}>This is a {"success"} Operacion Exitos</Alert>}
      {state === "loading" && <Button variant="primary" disabled>
                                        <Spinner
                                          as="span"
                                          animation="border"
                                          size="sm"
                                          role="status"
                                          aria-hidden="true"
                                        />
                                         Cargando...
                                      </Button> }
    </form>
    );
  }
const EstablishmentModal = ({props}: FormProps) => {
  console.log(props)
  return (
    props && 
    <div>
      <p><b>ID: </b>{props.id}</p>
      <p><b>Nombre: </b>{props.nombre}</p>
      <p><b>Especialidades: </b>{props.servicios ? props.servicios.join(" - ") : ""}</p>
      <p><b>Profesionales: </b>{props.profesionalesVinculados ? props.profesionalesVinculados.join(" - ") : ""}</p>
      <p><b>Insignias: </b>{props.insignias.join(" - ")}</p>
      <p><b>Ubicacion: </b>{props.ubicacion ? props.ubicacion : "No asignado"}</p>
      <p><b>latitud: </b>{props.latitud ? props.latitud : "No asignado"}</p>
      <p><b>longitud: </b>{props.longitud ? props.longitud : "No asignado"}</p>
      <p><b>Telefonos: </b>{props.telefono ? props.telefono.join(" - ") : ""}</p>
      <p><b>Email: </b>{props.email}</p>
      <p><b>Instagram: </b>{props.redSocial ? props.redSocial : "No asignado"}</p>
      <p><b>Fin de Suscripcion: </b>{props.finDeSuscripcion ? props.finDeSuscripcion : "No asigndado"}</p>
      <p><b>Horario de contacto: </b>{props.horario ? props.horario : "No asignado"}</p>
      <p><b>Fecha de creacion: </b>{props.createdAt}</p>
    </div>
  )
}















export const ModalDEestablecimiento = (props: ModalProps) => {
  const [requestState,setRequestState] = useState<"standby" | "success" | "error" | "loading" | "view">("view")
  return (
    <Modal show={props.show} onHide={() => props.hide(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{props.obj?.nombre}</Modal.Title>
        </Modal.Header>
         <Modal.Body>
                {requestState === "standby" && <EstablishmentEditForm props={props.obj} changeState={setRequestState} state={requestState}/>}
                {requestState === "view" && <EstablishmentModal props={props.obj} changeState={setRequestState} state={requestState}/>}
          </Modal.Body>
        <Modal.Footer>
            <button className="btn btn-danger" onClick={()=> {setRequestState("standby");props.hide(true)}}>{requestState === "success" ? "Hecho" : "Cancelar"}</button>
        </Modal.Footer>
      </Modal>
  )
}