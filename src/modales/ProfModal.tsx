import { Alert, Button, Modal, Spinner } from "react-bootstrap"
import type { Profesional } from "../types/types";
import { useState } from "react";




type FormProps ={
  props: Profesional | null
}
type ModalProps = {
    obj: Profesional | null;
    show: boolean;
    hide: (val: boolean) => void
    tipo: "view" | "put-form" | "hide"
}
const ProfEditForm = ({props}: FormProps) => {
    
      console.log(props?.servicios)
    const [state,setState] = useState<"standby" | "loading" | "success"  | "error">("standby")
    const [formData, setFormData] = useState<Profesional>({
        id: (props && props.id) ? props?.id : 0,
        nombre: (props && props.id) ? props?.nombre : "",
        especialidad: (props && props.servicios) ? props.servicios[0] : "",
        practicas: (props && props.servicios) ? props.servicios.splice(1,props.servicios.length) : [],
        ubicacion: props ? props.ubicacion : "",
        telefono: props ? props.telefono : "",
        email: props ? props.email : "",
        redSocial: props ? props.redSocial : "",
        finDeSuscripcion: props ? props.finDeSuscripcion : "",
        horario: props ? props.horario : "",
        insignias: props ? props.insignias : [],
        notas: props ? props.notas : []
      });
      const [practicaInput, setPracticaInput] = useState("");
        const [notasInput, setNotaInput] = useState("");
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
            const formDataToSend = new FormData();
            const servicios = [formData.especialidad].concat(formData.practicas)
            
            // practicas como array
            formData.practicas.forEach((p, i) => {
            formDataToSend.append(`practicas[${i}]`, p);
            });

            const dataToSend = {
                    nombre: formData.nombre,
                    ubicacion: formData.ubicacion,
                    telefono: formData.telefono,
                    email: formData.email,
                    redSocial: formData.redSocial,
                    finDeSuscripcion: formData.finDeSuscripcion,
                    horario: formData.horario,
                    insignias: JSON.stringify(badges),
                    servicios: JSON.stringify(servicios),
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
            
            for (const [key, value] of formDataToSend.entries()) {
                console.log(key, value);
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

          <div className="mb-3">{/* TELEFONO */}
            <label className="form-label">Teléfono</label>
            <input
              type="text"
              name="telefono"
              className="form-control"
              value={formData.telefono}
              onChange={handleChange}
                        />
          </div>

          <div className="mb-3">{/* EMAIL */}
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
                        />
          </div>
          
          <div className="mb-3">{/* redsocial */}
            <label className="form-label">Instagram</label>
            <input
              type="redsocial"
              name="redsocial"
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
          <div className="mb-3">{/* Horario de atencion */}
            <label className="form-label">Horario de contacto *</label>
            <input
              type="text"
              name="horarioDEcontacto"
              className="form-control"
              value={formData.horario}
              onChange={handleChange}
                        />
          </div>
          <div className="mb-3">{/* ESPECIALIDAD */}
            <label className="form-label">Especialidad</label>
            <input
              type="text"
              name="especialidad"
              className="form-control"
              value={formData.especialidad}
              onChange={handleChange}
                        />
          </div>
          <div className="mb-3">{/* Practicas */}
            <label className="form-label">Prácticas</label>
            <div className="input-group mb-2">
              <input
              placeholder="Practicas"
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
          <div>{/* CONJUNTO DE PRACTICAS */}
              {formData.practicas.map((p, i) => (
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
              name="finDEsuscripcion"
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

      {/* <button type="submit" className="btn btn-success" disabled={state === "loading"}> */}
      <button type="submit" className="btn btn-success" >
        Guardar Profesional
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

const ProfInfoView = ({props}: FormProps) => {
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
      <p><b>Notas: </b>{props.notas}</p>
      <img className='w-25' src={props.imagen} alt="" />
    </div>
  )
}
    

export const ProfModal = (props: ModalProps) => {
    const editarImagen = ()=>{
        alert("en construccion")
    }
    return (
    <Modal show={props.show} onHide={() => props.hide(false)}>
          <Modal.Body>
                {props.tipo === "put-form" && <ProfEditForm props={props.obj}/>}
                {props.tipo === "view" && <ProfInfoView props={props.obj} />}
                
          </Modal.Body>
        <Modal.Footer>
          {/* <button className="btn btn-success">Enviar</button> */}
          <button className="btn btn-danger" onClick={()=> {props.hide(true)}}>Salir</button>
          {props.tipo === "put-form" && <button className="btn btn-warning" onClick={editarImagen}>Editar Imagen</button>}
        </Modal.Footer>
      </Modal>
  )
}