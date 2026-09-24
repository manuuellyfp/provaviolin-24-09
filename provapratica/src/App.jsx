import { useEffect, useState } from 'react'
import FormularioAviso from './componentes/formulariodeavisos'
import ListaAvisos from './componentes/listadeavisos'
import './App.css'

const URL = 'https://jsonplaceholder.typicode.com/posts'

function App() {
   const [avisos, setAvisos] = useState([])
    const [titulo, setTitulo] = useState('')
  const [texto, setTexto] = useState('')
   const [editando, setEditando] = useState(null)
 const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
   const [erroAcao, setErroAcao] = useState(null)
  const [mensagem, setMensagem] = useState('')
 const [enviando, setEnviando] = useState(false)

  useEffect(() => {

const controle = new AbortController()
   const signal = controle.signal
    async function buscar() {
      try {
    setCarregando(true)
      setErro(null)
      const response = await fetch(`${URL}?_limit=15`, { signal })
        if (!response.ok) { throw new Error(`HTTP ${response.status}`)}
        const data = await response.json()
        setAvisos(data)    } catch (e) {
      if (e.name !== 'AbortError') {
      setErro('Não foi possível conectar à API. Tente novamente.')
        }
      } finally { if (!signal.aborted) { setCarregando(false) } } }
    buscar()
    return () => controle.abort() }, [])

  function limparFormulario() {
  setTitulo('')
  setTexto('')
  setEditando(null)
  setMensagem('')
  }

  function iniciarEdicao(aviso) {
     setEditando(aviso)
    setTitulo(aviso.title)
  setTexto(aviso.body)
    setMensagem('')
     setErroAcao(null)
  }

  function enviarFormulario(e) {
    e.preventDefault()
    if (!titulo.trim() || !texto.trim()) {
       setMensagem('Preencha o título e o texto antes de publicar.')
      return
    }
  setMensagem('')
    if (editando) { salvarAviso()
    } else { publicarAviso() }
  }

  async function publicarAviso() {
    try {
    setEnviando(true)
      setErroAcao(null)
      const response = await fetch(URL, {
      method: 'POST',
        headers: {  'Content-Type': 'application/json' },
       body: JSON.stringify({
        userId: 1,
      title: titulo,
      body: texto
  })
   })
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)}
      const novo = await response.json()
      setAvisos([novo, ...avisos])
      limparFormulario()
        } catch {
      setErroAcao('Não foi possível publicar o aviso.')
    } finally {
      setEnviando(false)
    }
  }
  async function salvarAviso() {
    try {
      setEnviando(true)
      setErroAcao(null)
      const response = await fetch(`${URL}/${editando.id}`, {
        method: 'PUT',
         headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({
        userId: editando.userId,
           title: titulo,
         body: texto
       })
      })
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      const atualizado = await response.json()
      setAvisos(avisos.map(a => (a.id === editando.id ? atualizado : a)))
      limparFormulario()
     } catch {
      setErroAcao('Não foi possível salvar o aviso.')
    } finally {
      setEnviando(false)
    }
  }
  async function excluirAviso(id) {
    try {
    setEnviando(true)
      setErroAcao(null)
       const response = await fetch(`${URL}/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      setAvisos(avisos.filter(a => a.id !== id))
      if (editando && editando.id === id) {
        limparFormulario()
      }
    } catch {
      setErroAcao('Não foi possível excluir o aviso.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="pagina">
      <header>
        <h1>Mural de Avisos</h1>
        <span>Projeto P2 — PTAC4 · avisos e recados da turma</span>
      </header>

      <div className="conteudo">
        <aside>
          <FormularioAviso
        titulo={editando ? '' : titulo}
         texto={editando ? '' : texto}
         editando={null}
        enviando={enviando}
        mensagem={editando ? '' : mensagem}
        onTitulo={setTitulo}
        onTexto={setTexto}
        onEnviar={enviarFormulario}
        onCancelar={limparFormulario}
          />
        </aside>

        <main>
          <h2 className="subtitulo">Avisos publicados ({avisos.length})</h2>

 <ListaAvisos
    avisos={avisos}
     editando={editando}
     titulo={titulo}
    texto={texto}
   enviando={enviando}
  mensagem={mensagem}
   onTitulo={setTitulo}
   onTexto={setTexto}
  onEnviar={enviarFormulario}
  onCancelar={limparFormulario}
  onEditar={iniciarEdicao}
    onExcluir={excluirAviso} />

{carregando && (
       <p className="carregando">
        <span className="spinner"></span>
          Carregando avisos...
 </p>
   )}
      {erro && <p className="mensagem-erro">{erro}</p>}
       {erroAcao && <p className="mensagem-erro">{erroAcao}</p>}
         {!carregando && !erro && avisos.length === 0 && (
<p className="estado"> Nenhum aviso publicado — seja a primeira pessoa a escrever no mural. </p>
)}
</main>
</div>
      <footer> Vite + React · fetch GET/POST/PUT/DELETE · jsonplaceholder.typicode.com/posts </footer>
    </div>
  )
}

export default App