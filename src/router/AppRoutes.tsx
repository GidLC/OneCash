import React from "react";
import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";
import Home from "../pages/dashboard/home";
import Entrada from "../pages/entrada";
import Saida from "../pages/saida";
import Casal from "../pages/casal";
import Login from "../pages/login/login";
import AddDespesa from "../pages/despesas/addDespesa";
import AddReceita from "../pages/receitas/addReceita";
import Cadastro from "../pages/cadastro/cadastro";
import TesteCadastro from "../pages/cadastro/testeCadastro";
import { AutenticacaoProvider } from "../contexts/autenticaLogin";

const AppRoutes: React.FC = () => {
  return (<>
    <IonReactRouter>
      <AutenticacaoProvider>
        <IonRouterOutlet>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/testeCadastro">
            <TesteCadastro />
          </Route>

          <Route path="/cadastro">
            <Cadastro />
          </Route>

          <Route exact path="/home">
            <Home />
          </Route>

          <Route exact path="/entrada">
            <Entrada />
          </Route>

          <Route path="/saida">
            <Saida />
          </Route>

          <Route path="/casal">
            <Casal />
          </Route>

          <Route path="/addDespesa">
            <AddDespesa />
          </Route>

          <Route path="/addReceita">
            <AddReceita />
          </Route>

          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </IonRouterOutlet>
      </AutenticacaoProvider>
    </IonReactRouter >
  </>
  );
};

export default AppRoutes;
