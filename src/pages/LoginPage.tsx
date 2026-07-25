import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

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

  const onSubmit = (data: FormData) => {
    // Aquí llamarías a tu API backend
    if (data.email === "admin@portal.com" && data.password === "123456") {
      setAuth(true)
      navigate("/inicio"); // ✅ redirección limpia
    } else {
      alert("Credenciales inválidas");
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
      <p>email === "admin@portal.com" && data.password === "123456"</p>
    </div>
  );
}
