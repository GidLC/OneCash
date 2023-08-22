import { IonContent, IonHeader, IonPage, IonToolbar, IonInput, IonButton, IonImg, IonTitle, IonRow, IonCol, IonFooter, IonAlert } from '@ionic/react';
import React, { useState } from 'react';
import './login.css';
import '../../theme/variables.css'

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const validaLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (email == "gideonilacerda@gmail.com") {
            const novoLogin = {
                email: email,
                senha: senha
            }
            console.log("Dados enviados:", { novoLogin });
            setEmail('');
            setSenha('');
        } else {
            <IonAlert
                trigger="ALERTA!!!"
                header="Email inválido"
                message="Esse email não está cadastrado!"
                buttons={['OK']}
            ></IonAlert>
        }
    };

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
                <form onSubmit={validaLogin}>
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
