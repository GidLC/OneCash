import React, { useEffect, useState } from 'react';
import './addCategoria.css'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonTabButton, IonIcon, IonGrid, IonRow, IonToggle, IonItem, IonSelect, IonSelectOption } from '@ionic/react';
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

  //Estabalecer conexão com o banco de dados

  useEffect(() => {
    loadData()
  }, /*[Estado para verificar se o banco de dados está inicializad]*/);

  const loadData = async () => {
    //Carrega as cores cadastradas no banco de dados
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
    //Insere categoria no banco de dados
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
