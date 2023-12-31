import React, { useContext, useEffect, useState } from "react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";
import Home from "./pages/dashboard/home";
import Entrada from "./pages/transacoes/receitas/readReceita";
import Saida from "./pages/transacoes/despesas/readDespesa";
import Login from "./pages/autenticacao/login";
import AddDespesa from "./pages/transacoes/despesas/addDespesa";
import AddReceita from "./pages/transacoes/receitas/addReceita";
import Cadastro from "./pages/autenticacao/cadastroUsuario";
import AddCategoria from "./pages/categorias/addCategoria";
import AuthContext, { AutenticacaoProvider } from "./data/contexts/autenticaLogin";
import CadastroBanco from "./pages/banco/cadastro_banco";
import ReadBanco from "./pages/banco/readBanco";
import UpdateReceita from "./pages/transacoes/receitas/updateReceita";
import Teste from "./pages/teste";


const AppRoutes: React.FC = () => {

  /*const Private: React.FC<any> = ({ children }) => {
    if (Auth?.user && Auth.user.autenticacao == 1) {
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

        <Route path="/cadastro">
          <Cadastro />
        </Route>

        <Route path="/cadastroBanco">
          <CadastroBanco />
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

        <Route path="/readBanco">
          <ReadBanco />
        </Route>

        <Route path="/updateReceita">
          <UpdateReceita />
        </Route>

        <Route path="/teste">
          <Teste />
        </Route>

        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </AutenticacaoProvider>
    </IonReactRouter >
  );
};

export default AppRoutes;
