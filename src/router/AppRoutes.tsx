import React, { useContext } from "react";
import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";
import Home from "../pages/dashboard/home";
import Entrada from "../pages/entrada";
import Saida from "../pages/saida";
import Login from "../pages/login/login";
import AddDespesa from "../pages/despesas/addDespesa";
import AddReceita from "../pages/receitas/addReceita";
import Cadastro from "../pages/cadastro_usuario/cadastro_usuario";
import TesteCadastro from "../pages/cadastro_usuario/testeCadastro";
import AuthContext, { AutenticacaoProvider } from "../contexts/autenticaLogin";
import AddCategoria from "../pages/categoria/Categoria";
import CadastroParceiro from "../pages/cadastro_usuario/cadastroParceiro";
import TesteCategoria from "../pages/categoria/testeCategoria";

const AppRoutes: React.FC = () => {

  /*const Private: React.FC<any> = ({ children }) => {
    const { autenticado } = useContext(AuthContext) ?? {};
    if (autenticado) {
      return children
    } else {
      return <Redirect to="/login" />
    }
  }*/

  return (
    <IonReactRouter>
      <AutenticacaoProvider>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/testeCadastro">
            <TesteCadastro />
          </Route>

          <Route path="/cadastro">
            <Cadastro />
          </Route>

          <Route path="/cadastroParceiro">
            <CadastroParceiro />
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

            <Route path="/addDespesa">
              <AddDespesa />
            </Route>

            <Route path="/addReceita">
              <AddReceita />
            </Route>

            <Route path="/categorias">
              <AddCategoria />
            </Route>

            <Route path="/testeCategoria">
              <TesteCategoria/>
            </Route>

          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
      </AutenticacaoProvider>
    </IonReactRouter >
  );
};

export default AppRoutes;
