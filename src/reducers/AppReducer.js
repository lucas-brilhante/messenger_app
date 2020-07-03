const INITIAL_STATE = {
    contatoEmail: '',
    msgAdicionarContato: '',
    contatoCadastrado: false,
    contatos: null,
    usuarioEmail: '',
    usuarioNome: '',
    conversas: null
}

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case 'modificarEmailContato':
            return {...state, contatoEmail: action.payload};
        case 'adicionarContatoSucesso':
            return {...state, contatoCadastrado: action.payload};
        case 'adicionarContatoErro':
            return {...state, msgAdicionarContato: action.payload};
        case 'limparTela':
            return {...state, msgAdicionarContato: '', contatoCadastrado: false};
        case 'carregarContatos':
            return {...state, contatos: action.payload};
        case 'modificarEmailUsuario':
            return {...state, usuarioEmail: action.payload};
        case 'modificarNomeUsuario':
            return {...state, usuarioNome: action.payload};
        case 'carregarConversas':
            return {...state, conversas: action.payload};
    }

    return state;
}