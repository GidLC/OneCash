import { IonCard, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList, IonPage, IonTabButton, IonTitle, IonToolbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import BarraInferior from "../../ui/partials/BarraInferior/BarraInferior";

type SQLItem = {
    id_banco: number,
    nome_banco: string,
};

const ReadBanco: React.FC = () => {
    const [items, setItems] = useState<Array<SQLItem>>(); // Estado para rastrear os itens da base de dados

    //Lógica para inicializar conexão com o banco de dados

    useEffect(() => {
        loadData(); // Carrega os dados da base de dados quando o componente é montado ou quando o banco de dados é inicializado
    }, /*[banco de dados inicilizado]*/);

    /**
     * Realiza uma consulta na base de dados para carregar os itens.
     */
    const loadData = async () => {
        //Carregar dados do banco de dados através da API
    };

    console.log(items)

    // Função para renderizar a página
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>BANCOS</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="ion-padding">
                {items?.map((item) => (
                    <IonList>
                        <IonCard>
                            <IonItemGroup>
                                <IonItemDivider>
                                    <IonLabel>{item.id_banco}</IonLabel>
                                </IonItemDivider>
    
                                <IonItem>
                                    <IonLabel>Nome: {item.nome_banco}</IonLabel>
                                </IonItem>
                            </IonItemGroup>
                        </IonCard>
                    </IonList>
                ))}
            </IonContent>
            <BarraInferior/>
        </IonPage>
    );
};

export default ReadBanco;