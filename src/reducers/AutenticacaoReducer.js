const INITIAL_STATE = {
    nome: '',
    email: '',
    senha: '',
    msgError: '',
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'alterarNome':
            return {...state, nome  : action.payload};
        case 'alterarEmail':
            return {...state, email  : action.payload};
        case 'alterarSenha':
            return {...state, senha  : action.payload};
        case 'cadastroError':
            return {...state, msgError  : action.payload, loading: false};
        case 'cadastroSucesso':
            return {...state, loading: false};
        case 'loginSucesso':
            return {...state, loading: false, msgError: action.payload};
        case 'loginError':
            return {...state, msgError: action.payload, loading: false };
        case 'alterarLoadingEsperando':
            return {...state, loading: true};
        case 'definirNome':
            return {...state, nome: action.payload };
        case 'limparDados':
            return INITIAL_STATE;
        case 'deslogar':
            return {...state, ...INITIAL_STATE};
    }
    return state;
}