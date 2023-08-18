import React from "react";
import { IonRouterOutlet, IonTabs } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";
import Home from "../pages/dashboard/home";
import Entrada from "../pages/entrada";
import Saida from "../pages/saida";
import Casal from "../pages/casal";
import AddDespesa from "../pages/addDespesa";
import AddReceita from "../pages/addReceita";

const AppRoutes: React.FC = () => (
  <IonReactRouter>
    <IonRouterOutlet>
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
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
  </IonReactRouter>
);

export default AppRoutes;
