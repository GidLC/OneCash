import React, { useEffect, useState } from 'react';
import './addCategoria.css'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonTabButton, IonIcon, IonGrid, IonRow, IonToggle, IonItem, IonSelect, IonSelectOption } from '@ionic/react';
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import useSQLiteDB from '../../composables/useSQLiteDB';
import { arrowBackCircleOutline } from 'ionicons/icons';

type SQLItemCor = {
  id_cor: number;
  nome_cor: string;
  codigo_cor: string
}


const Categoria: React.FC = () => {
  const [addNomeCategoria, setAddNomeCategoriaReceita] = useState('');
  const [addCorCategoria, setAddCorCategoria] = useState('');
  const [tipoCategoria, setTipoCategoria] = useState('');
  const [coresBD, setCoresBD] = useState<Array<SQLItemCor>>();
  const [coresCadastradas, setcoresCadastradas] = useState<boolean>();
  const [cor, setCor] = useState<Number>();

  // Hook para o BD
  const { performSQLAction, initialized } = useSQLiteDB();

  useEffect(() => {
    loadCorCategoria()
  }, [initialized]);

  const loadCorCategoria = async () => {
    try {
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const respSelect = await db?.query(`SELECT * FROM cor`);
        setCoresBD(respSelect?.values);
        console.log(respSelect?.values);
      });
    } catch (error) {
      alert((error as Error).message);
      setCoresBD([]);
    }

    if (!initialized) {
      return;
    }
  }

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

      <IonToggle onIonChange={defineCategoria} justify="start">{tipoCategoria || "DESPESA"}</IonToggle>

      <IonContent>
        <IonInput type="text" placeholder="Nome da categoria" value={addNomeCategoria} onIonChange={e => setAddNomeCategoriaReceita(e.detail.value!)}></IonInput>

        <IonItem>
          <IonSelect aria-label="usuario" placeholder="Cor" onIonChange={(e) => setCor(e.detail.value!)}>
            {coresBD?.map((item, index) => (
              <IonSelectOption value={item.id_cor} key={index}>{item.nome_cor}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <IonButton expand="block" type="button" color={tipoCategoria === "RECEITAS" ? "success" : "danger"} onClick={addCategoria}>ADICIONAR</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Categoria;
