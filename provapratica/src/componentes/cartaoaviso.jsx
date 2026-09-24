function CartaoAviso({ aviso, onEditar, onExcluir }) {
  return (
    <article className="cartao">
      <h3>{aviso.title}</h3>
      <p className="texto">{aviso.body}</p>
      <small>
        post id {aviso.id} · publicado pelo usuário {aviso.userId}
      </small>
      <div className="acoes">
        <button className="botao claro" onClick={() => onEditar(aviso)}>
          Editar
        </button>
        <button className="botao claro" onClick={() => onExcluir(aviso.id)}>
          Excluir
        </button>
      </div>
    </article>
  )
}

export default CartaoAviso