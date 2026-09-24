function FormularioAviso({
  titulo,
  texto,
  editando,
  enviando,
  mensagem,
  onTitulo,
  onTexto,
  onEnviar,
  onCancelar
}) {
  return (
    <form className="formulario" onSubmit={onEnviar}>
      {!editando && <h2>Novo aviso</h2>}

      <label>Título</label>
      <input
        value={titulo}
        onChange={e => onTitulo(e.target.value)}
        placeholder="Título do aviso"
      />

      <label>Texto do aviso</label>
      <textarea
        rows="4"
        value={texto}
        onChange={e => onTexto(e.target.value)}
        placeholder="Texto do aviso"
      />

      {mensagem && <p className="mensagem-erro">{mensagem}</p>}

      {editando ? (
        <div className="acoes">
          <button className="botao" disabled={enviando}>
            Salvar
          </button>
          <button
            type="button"
            className="botao claro"
            onClick={onCancelar}
          >
            Cancelar
          </button>
        </div>
      ) : (
        <button className="botao largo" disabled={enviando}>
          Publicar aviso
        </button>
      )}
    </form>
  )
}

export default FormularioAviso