import {
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonContent,
    IonItem,
    IonLabel,
    IonItemGroup,
    IonItemDivider,
    IonList,
    IonTabButton,
    IonIcon,
    IonButton,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { arrowBackCircleOutline } from "ionicons/icons";
import api from '../../data/services/api/auth/apiAuth'

type propsUsuario = {
    id_usuario: string,
    nome_usuario: string,
    email_usuario: string,
    senha_usuario: string
}

const TesteCadastro: React.FC = () => {
    const [items, setItems] = useState<Array<propsUsuario>>(); // Estado para rastrear os itens da base de dados

    useEffect(() => {
        const loadData = async () => {
            try {
                const dados = await api.getUsuario()
                setItems(dados)
            } catch (error: any) {
                console.error('Erro ao carregar os usuarios', error.message);
            }
        };

        loadData(); // Carrega os dados da base de dados quando o componente é montado ou quando o banco de dados é inicializado
    }, []);

    function exibeDados() {
        console.log(items)
    }

    useEffect(() => {
        console.log(items)
    }, [])

    // Função para renderizar a página
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTabButton href="/cadastro">
                        <IonIcon aria-hidden="false" icon={arrowBackCircleOutline} size="size" />
                    </IonTabButton>
                    <IonTitle>CADASTRO DE USUÁRIOS</IonTitle>
                    <IonButton onClick={exibeDados}>EXIBIR</IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                <h3>OS DADOS DO BD</h3>

                <IonItem >
                    <IonLabel className="ion-text-wrap"></IonLabel>
                </IonItem>

                <IonList>
                    {items && items.length >= 0 ? (
                        items.map((item) => (
                            <IonItemGroup key={item.id_usuario}>
                                <IonItemDivider>
                                    <IonLabel>{item.nome_usuario}</IonLabel>
                                </IonItemDivider>
                                <IonItem>
                                    <IonLabel>Nome: {item.nome_usuario}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Email: {item.email_usuario}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Senha: {item.senha_usuario}</IonLabel>
                                </IonItem>
                            </IonItemGroup>
                        ))
                    ) : (
                        <IonItem>
                            <IonLabel>Nenhum dado encontrado.</IonLabel>
                        </IonItem>
                    )}
                </IonList>


            </IonContent>
        </IonPage>
    );
};

export default TesteCadastro;