import { IonContent, IonHeader, IonPage, IonToolbar, IonInput, IonButton, IonImg, IonTitle, IonRow, IonFooter } from '@ionic/react';
import React, { useContext, useState } from 'react';

import './login.css';
import '../../theme/variables.css'
import AuthContext from '../../contexts/autenticaLogin';
import { SQLiteDBConnection } from 'react-sqlite-hook';
import useSQLiteDB from '../../composables/useSQLiteDB';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const Auth = useContext(AuthContext);

    const { performSQLAction, initialized } = useSQLiteDB();

    const validaLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            performSQLAction(async (db: SQLiteDBConnection | undefined) => {
                const query = await db?.query(`SELECT * FROM usuario WHERE email = ? AND senha = ?`, [
                    email,
                    senha
                ]);

                if (query && query.values && query.values.length > 0) {
                    console.log('Usuário autenticado!');
                    Auth?.login(email, senha);
                    console.log("Email:" + email + " senha:" + senha);
                } else {
                    console.log('Usuário não encontrado ou senha incorreta.');
                    alert('Usuário não encontrado ou senha incorreta.');
                }
            });
        } catch (error) {
            console.error((error as Error).message);
        }

        if (!initialized) {
            return;
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
function useNavigate() {
    throw new Error('Function not implemented.');
}

