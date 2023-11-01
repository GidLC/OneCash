import { IonCard, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList, IonPage, IonTabButton, IonTitle, IonToolbar } from "@ionic/react";
import { arrowBackCircleOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import useSQLiteDB from "../../../composables/useSQLiteDB";
import { SQLiteDBConnection } from "react-sqlite-hook";
import BarraInferior from "../../../components/BarraInferior/BarraInferior";

type SQLItem = {
    id_banco: number,
    nome_banco: string,
};

const ReadBanco: React.FC = () => {
    const [items, setItems] = useState<Array<SQLItem>>(); // Estado para rastrear os itens da base de dados

    //////INICIALIZA O BD///////

    // Hook para o banco de dados SQLite
    const { performSQLAction, initialized } = useSQLiteDB();


    //////CARREGA OS DADOS///////

    useEffect(() => {
        loadData(); // Carrega os dados da base de dados quando o componente é montado ou quando o banco de dados é inicializado
    }, [initialized]);

    /**
     * Realiza uma consulta na base de dados para carregar os itens.
     */
    const loadData = async () => {
        try {
            // Consulta a base de dados
            performSQLAction(async (db: SQLiteDBConnection | undefined) => {
                const respSelect = await db?.query(`SELECT * FROM banco`);
                setItems(respSelect?.values);
            });
            
        } catch (error) {
            alert((error as Error).message);
            setItems([]);
        }
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