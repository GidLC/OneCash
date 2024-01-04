import {
  IonHeader,
  IonPage,
  IonTitle,
  IonContent,
  IonList,
  IonIcon,
  IonFooter,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonItem,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { analyticsOutline} from "ionicons/icons";
import MenuLateral from "../../../ui/components/MenuLateral/MenuLateral";
import Header from "../../../ui/partials/HeaderHome/HeaderHome";
import BotaoMais from "../../../ui/components/botoes/BotaoMais/BotaoMais";
import BarraInferior from "../../../ui/partials/BarraInferior/BarraInferior";
import './readReceita.css'
import { useHistory } from "react-router";
import { Capacitor } from "@capacitor/core";
import AuthContext from "../../../data/contexts/autenticaLogin";

type SQLItemReceitas = {
  id_receita: number;
  descricao_receita: string;
  valor_receita: string;
  destino_receita: number;
  usuario_receita: number;
  status_receita: number;
  timestamp_receita: string;
  dia_receita: number;
  mes_receita: number;
  ano_receita: number;
  categoria_receita: number;
};

type SQLItemPendentes = {
  receitasPendentes: number;
  receitasRecebidas: number;
}

const Entrada: React.FC = () => {
  const dataAtual = new Date()
  const anoAtual = dataAtual.getFullYear()
  const mesAtual = dataAtual.getMonth()
  const platform = Capacitor.getPlatform()
  const history = useHistory();

  const [receitasGeral, setReceitasGeral] = useState<Array<SQLItemReceitas>>()
  const [itemsReceitasPendentes, setReceitasPendentes] = useState<Array<SQLItemPendentes>>()
  const [itemsReceitasRecebidas, setReceitasRecebidas] = useState<Array<SQLItemPendentes>>()
  const receitasPendentes: any = itemsReceitasPendentes?.[0]?.['receitasPendentes'];
  const receitasRecebidas: any = itemsReceitasRecebidas?.[0]?.['receitasRecebidas'];

  useEffect(() => {
    loadData();
  }, /*[Estado para verificar se o banco de dados está inicializad]*/);

  const loadData = async () => {
    //Carrega receitas cadastradas no banco de dados

    //Busca a soma das receitas pendentes cadastradas no banco de dados

    //Busca a soma das receitas recebidas cadastradas no banco de dados
  };

  const confirmDelete = (itemId: number) => {
    if (platform == "web") {
      let confirmacao = confirm(`Deseja realmente excluir essa receita?`)
      console.log(`Executando confirm Delete`)

      if (confirmacao == true) {
        deleteReceita(itemId)
        alert(`Receita excluida`)
      }
    } else {
      showConfirmationAlert("Deseja realmente excluir essa receita?", () => {
        deleteReceita(itemId);
      });
    }
  };

  const deleteReceita = async (itemId: number) => {
    //Deleta receita cadastrada no banco de dados
  };

  return (
    <>
      <MenuLateral />
      <IonPage id="main-content">
        <IonHeader>
          <Header nome='ENTRADA' />
        </IonHeader>

        <IonHeader>
          <IonCard>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonList>
                    <IonItem>
                      <IonSelect aria-label="ano" interface="popover" placeholder="MES">
                        <IonSelectOption value="01">JANEIRO</IonSelectOption>
                        <IonSelectOption value="02">FEVEREIRO</IonSelectOption>
                        <IonSelectOption value="03">MARÇO</IonSelectOption>
                        <IonSelectOption value="04">ABRIL</IonSelectOption>
                        <IonSelectOption value="05">MAIO</IonSelectOption>
                        <IonSelectOption value="06">JUNHO</IonSelectOption>
                        <IonSelectOption value="07">JULHO</IonSelectOption>
                        <IonSelectOption value="08">AGOSTO</IonSelectOption>
                        <IonSelectOption value="09">SETEMBRO</IonSelectOption>
                        <IonSelectOption value="10">OUTUBRO</IonSelectOption>
                        <IonSelectOption value="11">NOVEMBRO</IonSelectOption>
                        <IonSelectOption value="12">DEZEMBRO</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                  </IonList>
                </IonCol>

                <IonCol>
                  <IonList>
                    <IonItem>
                      <IonSelect aria-label="mes" interface="popover" placeholder="ANO">
                        <IonSelectOption className="IonSelectOption" value={anoAtual}>{anoAtual}</IonSelectOption>
                        <IonSelectOption className="IonSelectOption" value={anoAtual + 1}>{anoAtual + 1}</IonSelectOption>
                        <IonSelectOption className="IonSelectOption" value={anoAtual + 2}>{anoAtual + 2}</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                  </IonList>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>
        </IonHeader>

        <IonContent>
          <IonCard>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonCard color="success">
                    <IonCardHeader >
                      Recebidos:
                      {`R$ ${receitasRecebidas || 0.00}`}
                    </IonCardHeader>
                  </IonCard>
                </IonCol>

                <IonCol>
                  <IonCard>
                    <IonCardHeader color="warning">
                      Pendentes:
                      {`R$ ${receitasPendentes || 0.00}`}
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>
          {receitasGeral?.map((item) => (
            <IonList>
              <IonCard>
                <IonGrid>
                  <IonRow>
                    <IonCol size="1">
                      <IonIcon icon={analyticsOutline} size="large"></IonIcon>
                    </IonCol>

                    <a onClick={() => history.push(`/updateReceita?id=${item.id_receita}`)}>
                      <IonCol size="11">
                        <IonCardHeader>
                          <IonCardTitle>{item.descricao_receita}</IonCardTitle>
                        </IonCardHeader>
                      </IonCol>
                      <IonCardSubtitle>
                        <IonText>Categoria: {item.categoria_receita}</IonText>
                        <IonText> | </IonText>
                        <IonText>Banco: {item.destino_receita}</IonText>
                        <IonText> | </IonText>
                        <IonText>Usuário: {item.usuario_receita}</IonText>
                        <IonText> | </IonText>
                        <IonText>Dia Receita: {item.dia_receita}</IonText>
                        <IonText> | </IonText>
                        <IonText>Dia Receita: {item.dia_receita}</IonText>
                        <IonTitle>R${item.valor_receita}</IonTitle>
                      </IonCardSubtitle>
                    </a>
                    <IonCol size="1">
                      <IonButton color="danger" onClick={() => confirmDelete(item.id_receita)}>EXCLUIR
                        {/*<IonIcon icon={ellipsisVerticalOutline} size="large"></IonIcon>*/}
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCard>
            </IonList>
          ))}
          <BotaoMais lado="center" />
        </IonContent>

        <IonFooter>
          <BarraInferior />
        </IonFooter>
      </IonPage>
    </>
  );
};

export default Entrada;
function showConfirmationAlert(arg0: string, arg1: () => void) {
  throw new Error("Function not implemented.");
}
