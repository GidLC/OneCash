import { IonContent, IonHeader, IonPage, IonToolbar, IonInput, IonButton, IonImg, IonTitle, IonRow, IonFooter } from '@ionic/react';
import React, {useContext, useState } from 'react';

import './login.css';
import '../../theme/variables.css'
import AuthContext from '../../contexts/autenticaLogin';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const Auth = useContext(AuthContext);

    const novoLogin = (e: any) => {
        e.preventDefault();
        Auth?.login(email, senha)
        console.log("Email" + email + "senha:" + senha)
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonRow className='cabecalhoLogin'>
                        <IonImg src="src\img\icon96x96.png" alt='Logo OneCash' className='logoLogin' />
                        <IonTitle>OneCash</IonTitle>
                    </IonRow>
                </IonToolbar>
            </IonHeader>

            <IonContent className='conteudoLogin'>
                <form onSubmit={novoLogin}>
                    <IonInput type='email' placeholder="Email" value={email} onIonChange={e => setEmail(e.detail.value!)}></IonInput>
                    <IonInput type="password" placeholder="Senha" value={senha} onIonChange={e => setSenha(e.detail.value!)}></IonInput>
                    <IonButton expand="block" type="submit" color="success">Entrar</IonButton>
                </form>
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
