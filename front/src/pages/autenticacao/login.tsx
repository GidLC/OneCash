import { IonContent, IonHeader, IonPage, IonToolbar, IonButton, IonImg, IonTitle, IonRow, IonFooter, IonGrid, IonCol } from '@ionic/react';
import React, { useContext, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import './login.css';
import '../../ui/theme/variables.css'
import InputTexto from '../../ui/components/inputs/InputTexto/InputTexto';
import api from '../../data/services/api/auth/apiAuth';
import AuthContext from '../../data/contexts/autenticaLogin';

//implementar o useContext

const platform = Capacitor.getPlatform();

const Login: React.FC = () => {

    const [usuario, setUsuario] = useState({});
    const Auth = useContext(AuthContext)

    const eventoChange = (chave: string, valor: string) => {
        setUsuario({
            ...usuario,
            [chave]: valor,
        })
    }

    const eventoSubmit = async (e: any) => {
        e.preventDefault();
        const usuarioLogin = await api.autenticaLogin(usuario)
        if (usuarioLogin) {
            try {
                Auth?.login({"id": usuarioLogin.resultado.id_usuario,
                            "nome": usuarioLogin.resultado.nome_usuario,
                            "cod_casal": usuarioLogin.resultado.cod_casal});
                console.log("login")
            } catch (error) {
                console.error((error as Error).message);
            }
        }
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonGrid>
                        <IonRow className='cabecalhoLogin'>
                            <IonCol size='4'></IonCol>
                            <IonCol className='icones' size='12'>
                                <div className='div-icones'>
                                    <IonImg src="icon96x96.png" alt='Logo OneCash' className='logoLogin' />
                                    <IonTitle>{platform == "web" ? "" : "OneCash"}</IonTitle>
                                </div>
                            </IonCol>
                            <IonCol size='4'></IonCol>
                        </IonRow>
                    </IonGrid>
                </IonToolbar>
            </IonHeader>

            <IonContent className='conteudoLogin'>
                <InputTexto tipo="email" texto="E-mail" change={(e: { detail: { value: string; }; }) => eventoChange("email", e.detail.value!)} />
                <InputTexto tipo="password" texto="Senha" change={(e: { detail: { value: string; }; }) => eventoChange("senha", e.detail.value!)} />

                <IonButton expand="block" type="submit" color="success" onClick={eventoSubmit}>Entrar</IonButton>
            </IonContent>

            <IonFooter>
                <IonGrid>
                    <IonRow>
                        <IonCol size='6'>
                            <IonButton>Esqueci a Senha</IonButton>
                        </IonCol>
                        <IonCol size='6'>
                            <IonButton href='/cadastro'>Cadastrar-se</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonFooter>
        </IonPage>
    );
};

export default Login;

