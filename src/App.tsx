import './styles/global.css'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const createUserFormSchema = z.object({
  email: z
    .string()
    .nonempty('O e-mail é obrigatório')
    .email('Formato de e-mail inválido'),
  password: z.string().min(6, 'A senha precisa de no mínimo 6 caracteres'),
})

// Tipagem
type CreateUserFormData = z.infer<typeof createUserFormSchema>

export function App() {
  const { register, handleSubmit, formState } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  })

  function createUser(data: any) {
    console.log(data)
  }

  return (
    <main className="h-screen bg-zinc-950 text-zinc-300 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(createUser)}
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="">E-mail</label>
          <input
            type="email"
            className="border border-zinc-800 shadow-sm rounded h-10 px-3 bg-zinc-900"
            {...register('email')}
          />

          {formState.errors.email && (
            <span>{formState.errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="">Senha</label>
          <input
            type="password"
            className="border border-zinc-800 shadow-sm rounded h-10 px-3 bg-zinc-900"
            {...register('password')}
          />

          {formState.errors.password && (
            <span>{formState.errors.password.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600"
        >
          Salvar
        </button>
      </form>
    </main>
  )
}
