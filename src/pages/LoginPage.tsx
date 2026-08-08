import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { authEndpoint } from "../endpoints";

type Props = {
  setAuth: (val: boolean)=> void
}
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage({setAuth}: Props) {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

 /*  const onSubmit = (data: FormData) => {
    // Aquí llamarías a tu API backend
    if (data.email === "admin@portal.com" && data.password === "123456") {
      setAuth(true)
      navigate("/inicio"); // ✅ redirección limpia
    } else {
      alert("Credenciales inválidas");
    }
  }; */

  const onSubmit = async (data: FormData) => {
  try {
    const response = await fetch(authEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    if (!response.ok) {
      // Si el servidor devuelve 401 o error similar
      throw new Error("Credenciales inválidas");
    }

    const result = await response.json();

    // Aquí asumo que tu API devuelve algo como { token: "...", user: {...} }
    if (result.message) {
      alert(result.message)
      setAuth(result.data === "SUCCESS"); // Cambias el estado de autenticación
      // Podrías guardar el token en localStorage si lo necesitas
      //localStorage.setItem("token", result.token);
      navigate("/inicio");
    } else {
      alert("Respuesta inesperada del servidor");
    }
  } catch (err: unknown) {
    console.log(err)
    if (err instanceof Error) {
      alert(err.message);
    } else {
      alert(String(err));
    }
  }
};



  return (
    <div className="container mt-5">
      <h2>Login Administrador</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label>Email</label>
          <input {...register("email")} className="form-control" />
          {errors.email && <small className="text-danger">{errors.email.message}</small>}
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" {...register("password")} className="form-control" />
          {errors.password && <small className="text-danger">{errors.password.message}</small>}
        </div>
        <button type="submit" className="btn btn-primary w-100">Ingresar</button>
      </form>
    </div>
  );
}
