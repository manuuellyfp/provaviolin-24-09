import CartaoAviso from './cartaoaviso'
import FormularioAviso from './formulariodeavisos'

function ListaAvisos({
  avisos,
  editando,
  titulo,
  texto,
  enviando,
  mensagem,
  onTitulo,
  onTexto,
  onEnviar,
  onCancelar,
  onEditar,
  onExcluir
}) {
  return (
    <div className="lista">
      {avisos.map(aviso => {
        if (editando && editando.id === aviso.id) {
          return (
            <div className="cartao editando" key={aviso.id}>
     <FormularioAviso
       titulo={titulo}
        texto={texto}
        editando={editando}
        enviando={enviando}
        mensagem={mensagem}
        onTitulo={onTitulo}
        onTexto={onTexto}
        onEnviar={onEnviar}
        onCancelar={onCancelar}/>
</div>
          )
        }

        return (
          <CartaoAviso
            key={aviso.id}
            aviso={aviso}
            onEditar={onEditar}
            onExcluir={onExcluir}
          />
        )
      })}
    </div>
  )
}

export default ListaAvisos