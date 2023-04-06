import './styles/global.css'

export function App() {
  return (
    <main className="h-screen bg-zinc-50">
      <form action="">
        <label htmlFor="">E-mail</label>
        <input type="email" name="email" />

        <label htmlFor="">Senha</label>
        <input type="password" name="password" />

        <button type="submit">Salvar</button>
      </form>
    </main>
  )
}
