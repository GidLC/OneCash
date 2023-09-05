import {
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonContent,
    IonItem,
    IonLabel,
    IonItemGroup,
    IonList,
    IonTabButton,
    IonIcon,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import useSQLiteDB from "../../composables/useSQLiteDB";
import useConfirmationAlert from "../../composables/useConfirmationAlert";
import { arrowBackCircleOutline } from "ionicons/icons";

type SQLItem = {
    descricao: number;
    valor: string;
    destino: string;
    categoria: string;
    status: string;
};

const TesteReceitas: React.FC = () => {
    const [items, setItems] = useState<Array<SQLItem>>(); // Estado para rastrear os itens da base de dados

    //////INICIALIZA O BD///////

    // Hook para o banco de dados SQLite
    const { performSQLAction, initialized } = useSQLiteDB();
    // Hook para o diálogo de confirmação
    const { showConfirmationAlert, ConfirmationAlert } = useConfirmationAlert();


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
                const respSelect = await db?.query(`SELECT * FROM receitas`);
                setItems(respSelect?.values);
            });
        } catch (error) {
            alert((error as Error).message);
            setItems([]);
        }
    };

    // Função para renderizar a página
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTabButton href="/addReceita">
                        <IonIcon aria-hidden="false" icon={arrowBackCircleOutline} size="size" />
                    </IonTabButton>
                    <IonTitle>CADASTRO DE RECEITAS</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                <h3>RECEITAS NO SQLITE</h3>

                <IonItem >
                    <IonLabel className="ion-text-wrap"></IonLabel>
                </IonItem>

                {items?.map((item) => (
                    <IonList>
                        <IonItemGroup>
                            <IonItem>
                                <IonLabel>Valor: {item.valor}</IonLabel>
                            </IonItem>

                            <IonItem>
                                <IonLabel>Destino: {item.destino}</IonLabel>
                            </IonItem>

                            <IonItem>
                                <IonLabel>Categoria: {item.categoria}</IonLabel>
                            </IonItem>
                        </IonItemGroup>
                    </IonList>


                ))}

                {ConfirmationAlert}
            </IonContent>
        </IonPage>
    );
};

export default TesteReceitas;