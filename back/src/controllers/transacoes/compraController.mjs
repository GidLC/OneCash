import compraModel from "../../models/transacoes/compraModel.mjs";

const buscaNF = (req, res) => {
    const { url } = req.body
    //console.log(url)

    compraModel.buscaNF(url, (err, resultado) => {
        if (err) {
            console.error('Erro ao encontrar Nota Fiscal:', err);
            return res.status(500).json({ error: 'Erro ao encontrar Nota Fiscal' });
        }
        res.status(200).json({ message: 'Nota Fiscal encontrada', resultado });
    })
}

export default { buscaNF }