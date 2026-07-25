import React from "react";
import type { Blog } from "../types/types";

type UserRowProps = {
  prof: Blog;
  setShowModal: (val: boolean)=>void
  setSelectedBlog: (val: Blog)=>void
};

const BlogRow: React.FC<UserRowProps> = ({ prof, setSelectedBlog, setShowModal }) => {
  
  return (
    <tr key={prof.id}>
      <td><b>{prof.id}</b></td>
      <td><b>{prof.idOwner}</b></td>
      <td><b>{prof.title}</b></td>
      <td className="buttons-container">
        {/* <button className="btn btn-primary" onClick={()=> {setSelectedProf(prof); setShowModal(true)}}>Ver</button> */}
        <button className="btn btn-success" onClick={()=> {setSelectedBlog(prof); setShowModal(true)}}>Editar</button>
        {/* <button className="btn btn-danger">Eliminar</button> */}
      </td>
      <td><button className="btn btn-danger">Eliminar</button></td>
    </tr>
  );
};

export default BlogRow;