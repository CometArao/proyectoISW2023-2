import { useForm } from "react-hook-form"
import { createAgreement } from "../services/agreement.service"

export default function AgreementForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()


  const onSubmit = (data) => console.log(data)

  const mostrarPorConsola = async (data) => {
    const res = await createAgreement(data);
    console.log(res);
  }

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label htmlFor="name">Nombre </label>
            <input autoComplete="off" {...register("name", { required: true } )} placeholder="Local de Comida" />
        </div>
        <div>
            <label htmlFor="description">Descripción </label>
            <input autoComplete="off" {...register("description", { required: true })} placeholder="Comida Rápida a domicilio, ubicados en ..." />
        </div>
        <div>
            <label htmlFor="image">Imagen/Logotipo </label>
            <input autoComplete="off" {...register("image")} />
        </div>
        <div>
            <label htmlFor="benefit">Beneficio </label>
            <input autoComplete="off" {...register("benefit", { required: true })} />
        </div>
        <div>
            <label htmlFor="region">Región </label>
            <input autoComplete="off" {...register("region", { required: true })} />
        </div>
        <div>
            <label htmlFor="commune">Comuna </label>
            <input autoComplete="off" {...register("commune", { required: true })} />
        </div>
        <div>
            <label htmlFor="exclusiveSeniors">Adulto Mayor </label>
            <input autoComplete="off" {...register("exclusiveSeniors")} />
        </div>
        <div>
            <label htmlFor="exclusivePregnant">Embarazada </label>
            <input autoComplete="off" {...register("exclusivePregnant")} />
        </div>
        <div>
            <label htmlFor="exclusiveDisability">Discapacidad </label>
            <input autoComplete="off" {...register("exclusiveDisability")} />
        </div>
        {errors.exampleRequired && <span>Este campo es obligatorio</span>}

      <input type="submit" />
    </form>
  )
}