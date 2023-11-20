import React from "react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";
import Home from "./pages/dashboard/home";
import Entrada from "./pages/receitas/readReceita";
import Saida from "./pages/despesas/readDespesa";
import Login from "./pages/login/login";
import AddDespesa from "./pages/despesas/addDespesa";
import AddReceita from "./pages/receitas/addReceita";
import Cadastro from "./pages/usuario/cadastroUsuario";
import AddCategoria from "./pages/categorias/addCategoria";
import CadastroParceiro from "./pages/usuario/cadastroParceiro";
import { AutenticacaoProvider } from "./data/contexts/autenticaLogin";
import CadastroBanco from "./pages/banco/cadastro_banco";
import ReadBanco from "./pages/banco/readBanco";
import UpdateReceita from "./pages/receitas/updateReceita";
import TesteCadastro from "./pages/usuario/testeCadastro";

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

        <Route path="/cadastro">
          <Cadastro />
        </Route>
        
        <Route path="/testeUsuario">
          <TesteCadastro/>
        </Route>

        <Route path="/cadastroParceiro">
          <CadastroParceiro />
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
          <UpdateReceita/>
        </Route>
        
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </AutenticacaoProvider>
    </IonReactRouter >
  );
};

export default AppRoutes;
