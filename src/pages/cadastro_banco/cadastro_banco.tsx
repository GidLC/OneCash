import React, {useState } from 'react';
import { useHistory } from 'react-router';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonTabButton, IonIcon, IonGrid, IonRow } from '@ionic/react';
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import useSQLiteDB from '../../composables/useSQLiteDB';
import { arrowBackCircleOutline } from 'ionicons/icons';


const CadastroBanco: React.FC = () => {
  const [addNomeBanco, setAddNomeBanco] = useState('');

  const navegador = useHistory();

  // Hook para o BD
  const { performSQLAction, initialized } = useSQLiteDB();

  const addCategoria = async () => {
    try {
        performSQLAction(
            async (db: SQLiteDBConnection | undefined) => {
                await db?.query(`INSERT INTO banco (nome_banco)
          values (?);`, [
                    addNomeBanco
                ])
            }
        )
    } catch (error) {
        alert((error as Error).message)
    }

    setAddNomeBanco("");
    alert(`Banco: ${addNomeBanco} cadastrado com sucesso`)
}


  return (
    <IonPage>
      <IonHeader color='primary'>
        <IonToolbar>
          <IonGrid>   
            <IonRow>
              <IonTabButton href="/home">
                <IonIcon aria-hidden="false" icon={arrowBackCircleOutline} size="size" />
              </IonTabButton>
              <IonTitle>CADASTRO DE BANCOS</IonTitle>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>

      <IonContent>
          <IonInput type="text" placeholder="Nome do banco" value={addNomeBanco} onIonChange={e => setAddNomeBanco(e.detail.value!)}></IonInput>
          <IonButton expand="block" type="button" color="success" onClick={addCategoria}>ADICIONAR</IonButton>
        <IonButton href='/testeBanco'>TESTE BD</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CadastroBanco;
