import React, {useState } from 'react';
import './addCategoria.css'
import { useHistory } from 'react-router';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonTabButton, IonIcon, IonGrid, IonRow, IonToggle } from '@ionic/react';
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import useSQLiteDB from '../../composables/useSQLiteDB';
import { arrowBackCircleOutline } from 'ionicons/icons';


const Categoria: React.FC = () => {
  const [addNomeCategoria, setAddNomeCategoriaReceita] = useState('');
  const [addCorCategoria, setAddCorCategoria] = useState('');
  const [tipoCategoria, setTipoCategoria] = useState('');

  const navegador = useHistory();

  // Hook para o BD
  const { performSQLAction, initialized } = useSQLiteDB();

  function defineCategoria(e: any) {
    const status = e;
    //1 -> receita; 0 -> Despesa
    if (status.detail.checked == true) {
      setTipoCategoria("RECEITAS");
      console.log(status.detail.checked)
    } else {
      setTipoCategoria("DESPESAS");
      console.log(status.detail.checked)
    }
  }

  const addCategoria = async () => {
    try {
        performSQLAction(
            async (db: SQLiteDBConnection | undefined) => {
                await db?.query(`INSERT INTO categoria_receita (nome_categoria_receita, cor_categoria_receita)
          values (?,?);`, [
                    addNomeCategoria,
                    addCorCategoria
                ])
            }
        )
    } catch (error) {
        alert((error as Error).message)
    }

    setAddNomeCategoriaReceita("");
    setAddCorCategoria("");
    alert(`Categoria: ${addNomeCategoria} cadastrada com sucesso`)
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
              <IonTitle>CADASTRO DE CATEGORIA</IonTitle>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>

      <IonToggle onIonChange={defineCategoria} justify="start">{tipoCategoria}</IonToggle>
      
      <IonContent>
          <IonInput type="text" placeholder="Nome da categoria" value={addNomeCategoria} onIonChange={e => setAddNomeCategoriaReceita(e.detail.value!)}></IonInput>
          <IonInput type="text" placeholder="Cor da categoria" value={addCorCategoria} onIonChange={e => setAddCorCategoria(e.detail.value!)}></IonInput>
          <IonButton expand="block" type="button" color={tipoCategoria === "RECEITAS" ? "success" : "danger"} onClick={addCategoria}>ADICIONAR</IonButton>
        <IonButton href='/testeCategoria' >TESTE BD</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Categoria;
