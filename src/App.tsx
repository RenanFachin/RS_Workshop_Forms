import './styles/global.css'

import { useForm, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const createUserFormSchema = z.object({
  name: z
    .string()
    .nonempty('O nome é obrigatório')
    .transform((name) => {
      // Trim para remover qualquer espaço extra
      // split para dividir o nome e os sobrenomes
      // Percorrendo com o map a primeira posição de cada array e transformando para uppercase
      // Fazendo um join para unir o nome e os sobrenomes novamente
      return name
        .trim()
        .split(' ')
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1))
        })
        .join(' ')
    }),
  email: z
    .string()
    .nonempty('O e-mail é obrigatório')
    .email('Formato de e-mail inválido')
    .toLowerCase()
    .refine((email) => {
      return email.endsWith('@rocketseat.com.br')
    }, 'O e-mail precisa ser da rockeseat'),
  password: z.string().min(6, 'A senha precisa de no mínimo 6 caracteres'),
  techs: z
    .array(
      z.object({
        title: z.string().nonempty('O título é obrigatório'),
        // coerce faz mudar o tipo para number
        knowledge: z.coerce.number().min(1).max(100),
      }),
    )
    .min(2, 'Insira pelo menos 2 tecnoloas'),
})

// Tipagem
type CreateUserFormData = z.infer<typeof createUserFormSchema>

export function App() {
  const { register, handleSubmit, formState, control } =
    useForm<CreateUserFormData>({
      resolver: zodResolver(createUserFormSchema),
    })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'techs',
  })

  function createUser(data: any) {
    console.log(data)
  }

  function handleAddNewTech() {
    append({ title: '', knowledge: 0 })
  }

  return (
    <main className="h-screen bg-zinc-950 text-zinc-300 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(createUser)}
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            className="border border-zinc-800 shadow-sm rounded h-10 px-3 bg-zinc-900"
            {...register('name')}
          />

          {formState.errors.email && (
            <span className="text-red-500 text-sm">
              {formState.errors.email.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            className="border border-zinc-800 shadow-sm rounded h-10 px-3 bg-zinc-900"
            {...register('email')}
          />

          {formState.errors.email && (
            <span className="text-red-500 text-sm">
              {formState.errors.email.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            className="border border-zinc-800 shadow-sm rounded h-10 px-3 bg-zinc-900"
            {...register('password')}
          />

          {formState.errors.password && (
            <span className="text-red-500 text-sm">
              {formState.errors.password.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="" className="flex items-center justify-between">
            Tecnologias
            <button
              type="button"
              onClick={handleAddNewTech}
              className="text-emerald-500 text-xs"
            >
              Adicionar
            </button>
          </label>

          {fields.map((field, index) => {
            // O id é gerado pelo react hook form
            return (
              <div key={field.id} className="flex gap-2">
                <div className="flex-1 flex flex-col gap-1">
                  <input
                    type="text"
                    className="border border-zinc-800 shadow-sm rounded h-10 px-3 bg-zinc-900"
                    {...register(`techs.${index}.title`)}
                  />

                  {formState.errors.techs?.[index]?.title && (
                    <span className="text-red-500 text-sm">
                      {formState.errors.techs?.[index]?.title?.message}
                    </span>
                  )}
                </div>

                <div className="w-16 flex flex-col gap-1">
                  <input
                    type="number"
                    className="border border-zinc-800 shadow-sm rounded h-10 px-3 bg-zinc-900"
                    {...register(`techs.${index}.knowledge`)}
                  />
                </div>

                {formState.errors.techs?.[index]?.knowledge && (
                  <span className="text-red-500 text-sm">
                    {formState.errors.techs?.[index]?.knowledge?.message}
                  </span>
                )}
              </div>
            )
          })}

          {formState.errors.techs && (
            <span className="text-red-500 text-sm">
              {formState.errors.techs.message}
            </span>
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
