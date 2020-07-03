const INITIAL_STATE = {
    contatoEmail: '',
    contatoNome: '',
    usuarioEmail: '',
    usuarioNome: '',
    mensagem: '',
    mensagens: null
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'modificarMensagem':
            return {...state, mensagem: action.payload};
        case 'modificarNomeContato':
            return {...state, contatoNome: action.payload};
        case 'modificarEmailContato':
            return {...state, contatoEmail: action.payload};
        case 'modificarNomeUsuario':
            return {...state, usuarioNome: action.payload};
        case 'modificarEmailUsuario':
            return {...state, usuarioEmail: action.payload};
        case 'carregarMensagens':
            return {...state, mensagens: action.payload};
        case 'enviarMensagem':
            return {...state, mensagem: ''};
    }
    return {...state}
}