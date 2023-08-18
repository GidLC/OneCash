import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { arrowDownOutline, homeOutline, arrowUpOutline, peopleCircleOutline } from 'ionicons/icons';
import Home from './pages/home';
import Entrada from './pages/entrada';
import Saida from './pages/saida';
import Casal from './pages/casal';
import Conf from './pages/conf';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        {/*Página Principal */}
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

          <Route path="/conf">
            <Conf />
          </Route>

          <Route exact path="/">
            <Redirect to="/home" />
          </Route>

        </IonRouterOutlet>

        {/**Barra inferior */}
        <IonTabBar slot="bottom">

          <IonTabButton tab="home" href="/home">
            <IonIcon aria-hidden="true" icon={homeOutline} />
            <IonLabel>INICIO</IonLabel>
          </IonTabButton>

          <IonTabButton tab="entrada" href="/entrada">
            <IonIcon aria-hidden="true" icon={arrowUpOutline} />
            <IonLabel>ENTRADA</IonLabel>
          </IonTabButton>

          <IonTabButton tab="saida" href="/saida">
            <IonIcon aria-hidden="true" icon={arrowDownOutline} />
            <IonLabel>SAIDA</IonLabel>
          </IonTabButton>

          <IonTabButton tab="casal" href="/casal">
            <IonIcon aria-hidden="true" icon={peopleCircleOutline} />
            <IonLabel>CASAL</IonLabel>
          </IonTabButton>

        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
