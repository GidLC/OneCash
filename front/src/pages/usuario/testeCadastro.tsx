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
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { arrowBackCircleOutline } from "ionicons/icons";
import api from '../../data/services/api'

type SQLItem = {
    id: number;
    nome: string;
    email: string;
    senha: string;
};

const TesteCadastro: React.FC = () => {
    const [items, setItems] = useState<Array<SQLItem>>(); // Estado para rastrear os itens da base de dados

    useEffect(() => {
        const loadData = async () => {
            try {
                const dados = await api.getUsuario()
                setItems(JSON.parse(dados))
            } catch (error) {
                console.error('Erro ao carregar os usuarios');
            }
        };

        loadData(); // Carrega os dados da base de dados quando o componente é montado ou quando o banco de dados é inicializado
    }, []);

    /**
     * Realiza uma consulta na base de dados para carregar os itens.
     */




    // Função para renderizar a página
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTabButton href="/cadastro">
                        <IonIcon aria-hidden="false" icon={arrowBackCircleOutline} size="size" />
                    </IonTabButton>
                    <IonTitle>CADASTRO DE USUÁRIOS</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                <h3>OS DADOS DO BD</h3>

                <IonItem >
                    <IonLabel className="ion-text-wrap"></IonLabel>
                </IonItem>

                {items?.map((item) => (
                    <IonList>
                        <IonItemGroup>
                            <IonItemDivider>
                                <IonLabel>{item.id}</IonLabel>
                            </IonItemDivider>

                            <IonItem>
                                <IonLabel>Nome: {item.nome}</IonLabel>
                            </IonItem>

                            <IonItem>
                                <IonLabel>Email: {item.email}</IonLabel>
                            </IonItem>

                            <IonItem>
                                <IonLabel>Senha: {item.senha}</IonLabel>
                            </IonItem>
                        </IonItemGroup>
                    </IonList>


                ))}
            </IonContent>
        </IonPage>
    );
};

export default TesteCadastro;