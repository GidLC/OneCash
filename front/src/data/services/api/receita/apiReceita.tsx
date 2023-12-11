import API_URL from "../apiConfig";

const AddReceita = async (dados: object) => {
    console.log(dados)
    /*const resposta = await fetch(`${API_URL}/receita/cadastro`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    });
    if (!resposta.ok) {
        alert('Erro ao registrar receita');
        throw new Error('Erro ao registrar receita');
    }*/
}

export default {AddReceita}