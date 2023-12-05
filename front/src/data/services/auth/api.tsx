const API_URL = 'http://192.168.1.100:3000/api';

//TESTE
const getUsuario = async () => {

    const resposta = await fetch(`${API_URL}/usuario/listar-usuario`)
    if (!resposta.ok) {
        alert(`Erro ao listar usuários`)
        throw new Error('Erro ao carregar os usuarios na API');
    }
    return resposta.json();
};
//TESTE

const addUsuario = async (dados: object) => {
    const resposta = await fetch(`${API_URL}/auth/cadastro`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    });
    if (!resposta.ok) {
        alert('Erro ao gravar o Usuário');
        throw new Error('Erro ao gravar o Usuário');
    }
};

const buscaCadastro = async (codigo: string) => {
    console.log(`código: ${codigo}`)
    const resposta = await fetch(`${API_URL}/auth/buscaCadastro/${codigo}`)
    if (!resposta.ok) {
        alert(`Erro ao encontrar usuário`)
        throw new Error('Erro ao encontrar o usuario na API');
    }
    return resposta.json();
}

const vinculaCadastro = async (dados: object) => {
    const resposta = await fetch(`${API_URL}/auth/vincCadastro`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    });
    if (!resposta.ok) {
        alert('Erro ao gravar o Usuário');
        throw new Error('Erro ao gravar o Usuário');
    }
}

const autenticaLogin = async (dados: object) => {
    const resposta = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados)
    });

    if (!resposta.ok) {
        throw new Error('Erro ao autenticar usuário')
    }

    const dadosUsuario = await resposta.json()
    return dadosUsuario
};

export default { getUsuario, addUsuario, autenticaLogin, buscaCadastro, vinculaCadastro}