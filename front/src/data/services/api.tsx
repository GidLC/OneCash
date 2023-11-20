const API_URL = 'http://localhost:3000/api';

const api = {
    async getUsuario() {
        const resposta = await fetch(`${API_URL}/usuario/listar-usuario`)
        if (!resposta.ok) {
            throw new Error('Erro ao carregar os usuarios na API');
        }
        console.log(resposta.body)
        return resposta.json();
    },
}

export default api