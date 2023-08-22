import { IonContent, IonHeader, IonPage, IonToolbar, IonInput, IonButton, IonImg, IonTitle, IonRow, IonCol, IonFooter } from '@ionic/react';
import React, { useState } from 'react';
import './login.css';
import '../../theme/variables.css'

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const realizaLogin = () => {

    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonRow className='cabecalhoLogin'>
                        <IonImg src="public/icon.png" alt='Logo OneCash' className='logoLogin' />
                        <IonTitle>OneCash</IonTitle>
                    </IonRow>
                </IonToolbar>
            </IonHeader>

            <IonContent className='conteudoLogin'>
                    <IonInput type='email' placeholder="Email" value={email} onIonChange={e => setEmail(e.detail.value!)}></IonInput>
                    <IonInput type="password" placeholder="Senha" value={password} onIonChange={e => setPassword(e.detail.value!)}></IonInput>
                    <IonButton expand="full" onClick={realizaLogin} color="success">Entrar</IonButton>
            </IonContent>

            <IonFooter>
                <IonRow>
                    <IonButton href='/cadastro'>Não tenho conta <br></br> Cadastrar-se</IonButton>
                    <IonButton>Esqueci a senha</IonButton>
                </IonRow>
            </IonFooter>
        </IonPage>
    );
};

export default Login;
