import { IonButton, IonContent, IonDatetime, IonFooter, IonIcon, IonInput, IonItem, IonList, IonModal, IonPage, IonSelect, IonSelectOption, IonToggle } from "@ionic/react"
import React, { useEffect, useState } from "react"
import MenuLateral from "../../ui/components/MenuLateral/MenuLateral"
import Header from "../../ui/partials/HeaderHome/HeaderHome"
import { calendarOutline, checkmark } from "ionicons/icons"
import BarraInferior from "../../ui/partials/BarraInferior/BarraInferior"
import './updateReceita.css'
import { useLocation } from "react-router"

type SQLItemCategoria = {
    id_categoria_receita: number,
    nome_categoria_receita: string,
    cor_categoria_receita: string
}

type SQLItemUsuario = {
    id: number,
    nome: string,
}

type OBJData = {
    ano: Number,
    mes: Number,
    dia: Number,
    hora: Number,
    minuto: Number,
    segundo: Number
}

type SQLItemReceita = {
    id_receita: number
    descricao_receita: string
    valor_receita: string
    destino_receita: number
    usuario_receita: number
    status_receita: number
    timestamp_receita: string
    dia_receita: number
    mes_receita: number
    ano_receita: number
    categoria_receita: number
}

const UpdateReceita: React.FC = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const idReceita = searchParams.get('id')

    const hoje = Date.now()

    const [usuariosBD, setUsuariosBD] = useState<Array<SQLItemUsuario>>()
    const [receitaBD, setReceitaBD] = useState<Array<SQLItemReceita>>()
    const [categoriasBD, setCategoriasBD] = useState<Array<SQLItemCategoria>>()
    const [receitaCarregada, setReceitaCarregada] = useState<boolean>(false)
    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState('')
    const [usuario, setUsuario] = useState<Number>()
    const [data, setData] = useState<OBJData>()
    const [categoria, setCategoria] = useState<Number>()
    const [status, setStatus] = useState<Number>(0)
    const [showModal, setShowModal] = useState(false)

    //UseEffect para buscas no BD
    useEffect(() => {
        carregaCategoria()
        carregaUsuario()
        if (!receitaCarregada) {
            carregaReceitaBD();
        }
    }, /*[Estado para verificar se o banco de dados está inicializad]*/)

    useEffect(() => {
        if (receitaBD && receitaBD.length > 0 && !receitaCarregada) {
            atribuiReceita();
            setReceitaCarregada(true);
        }
    }, [receitaBD]);

    const openModal = () => {
        setShowModal(true)
    }


    const carregaUsuario = async () => {
       //Carrega usuario do banco de dados 
    }

    const carregaCategoria = async () => {
        //Carrega categorias existentes no banco de dados
    }

    const carregaReceitaBD = async () => {
        //Carrega todas as receitas do banco de dados de um determinado casal
    }

    const atribuiReceita = async () => {
        console.log(receitaBD)
        receitaBD?.map((receita, index) => (
            setDescricao(receita.descricao_receita),
            setValor(receita.valor_receita),
            setUsuario(receita.usuario_receita),
            setCategoria(receita.categoria_receita),
            setStatus(receita.status_receita)
        ))
    }

    const defineStatus = (e: any) => {
        e.preventDefault()
        const status = e
        if (status.detail.checked == true) {
            setStatus(1)
        } else {
            setStatus(0)
        }
    }

    function editReceita() {
       //Dá um UPDATE na receita selecionada
    }



    return (
        <>
            <MenuLateral />
            <IonPage id="main-content">
                <Header nome='RECEITAS' />

                <IonContent>
                    <div>
                        <IonInput label="Descrição:" labelPlacement="stacked" placeholder="****" value={descricao} onIonChange={e => setDescricao(e.detail.value!)}></IonInput>
                    </div>

                    <div>
                        <IonInput type="number" label="Valor da receita:" labelPlacement="stacked" placeholder="R$0,00"
                            value={valor} onIonChange={(e) => setValor(e.detail.value!)}></IonInput>
                    </div>

                    <div>
                        <IonItem>
                            <IonSelect aria-label="usuario" placeholder="Usuario" onIonChange={(e) => setUsuario(e.detail.value!)}>
                                {usuariosBD?.map((item, index) => (
                                    <IonSelectOption value={item.id} key={index}>{item.nome}
                                    </IonSelectOption>
                                ))}
                            </IonSelect>
                        </IonItem>
                    </div>

                    <div>
                        <IonList>
                            <IonItem>
                                <IonSelect aria-label="categoria" placeholder="Categoria" onIonChange={(e) => setCategoria(e.detail.value!)}>
                                    {categoriasBD?.map((item, index) => (

                                        <IonSelectOption value={item.id_categoria_receita} key={index}>{item.nome_categoria_receita}</IonSelectOption>

                                    ))}
                                </IonSelect>
                            </IonItem>
                        </IonList>
                    </div>

                    <div>
                        <IonToggle labelPlacement="end" onIonChange={defineStatus}>Recebido</IonToggle>
                    </div>

                    <div className='botaoData'>
                        <IonIcon icon={calendarOutline} className='calendario' size="large"></IonIcon>
                        <IonButton>HOJE</IonButton>
                        <IonButton>ONTEM</IonButton>
                        <IonButton onClick={openModal}>OUTROS</IonButton>
                    </div>

                    <IonModal isOpen={showModal}>
                        <IonDatetime
                            id="datetime"
                            presentation="date"
                            showDefaultButtons
                            doneText='OK'
                            cancelText='CANCELAR'
                            onIonChange={(e) => {
                                const dataEscolhida: any = e.detail.value!
                                const [dataPart, horaPart] = dataEscolhida.split("T")
                                const [ano, mes, dia] = dataPart.split("-")
                                const [hora, minuto, segundo] = horaPart.split(":")

                                const objData = {
                                    ano: parseInt(ano),
                                    mes: parseInt(mes),
                                    dia: parseInt(dia),
                                    hora: parseInt(hora),
                                    minuto: parseInt(minuto),
                                    segundo: parseInt(segundo)
                                }

                                setData(objData)
                                setShowModal(false)
                            }}
                        ></IonDatetime>
                    </IonModal>

                    <div>
                        <IonButton color='success' onClick={editReceita}>
                            <IonIcon icon={checkmark}></IonIcon>
                        </IonButton>
                    </div>
                </IonContent>

                <IonFooter>
                    <BarraInferior />
                </IonFooter>
            </IonPage>
        </>
    )
}

export default UpdateReceita