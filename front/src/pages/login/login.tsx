import { IonContent, IonHeader, IonPage, IonToolbar, IonButton, IonImg, IonTitle, IonRow, IonFooter, IonGrid, IonCol, IonSelect, IonList, IonItem,IonSelectOption } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';

import './login.css';
import '../../ui/theme/variables.css'
import AuthContext from '../../data/contexts/autenticaLogin';
import { SQLiteDBConnection } from 'react-sqlite-hook';

type props = {
    id: string,
    nome: string,
    email: string,
    senha: string
}

const Login: React.FC = () => {

    useEffect(() => {
        buscaUsuario();
    }, /*[Estado para verificar se o banco de dados está inicializad]*/);

    const [usuarioBd, setUsuarioBd] = useState(Array<props>);
    const [UsuarioEscolhido, setUsuarioEscolhido] = useState(Array<props>)
    const [id, setId] = useState<any>();
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const Auth = useContext(AuthContext);

    const buscaUsuario = async () => {
        //Busca usuários cadastrado no banco de dados 
    }


    const validaLogin = async () => {
        try {
            Auth?.login(id, nome, email);
            console.log("login")
        } catch (error) {
            console.error((error as Error).message);
        }
    };

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
                                    <IonTitle>OneCash</IonTitle>
                                </div>
                            </IonCol>
                            <IonCol size='4'></IonCol>
                        </IonRow>
                    </IonGrid>
                </IonToolbar>
            </IonHeader>

            <IonContent className='conteudoLogin'>
                {/*<IonInput type='email' placeholder="Email" value={email} onIonChange={e => setEmail(e.detail.value!)}></IonInput>
                <IonInput type="password" placeholder="Senha" value={senha} onIonChange={e => setSenha(e.detail.value!)}></IonInput>*/}
                <IonList>
                    <IonItem>
                        <IonSelect
                            onIonChange={e => setUsuarioEscolhido(e.detail.value)}
                            placeholder="Selecione o Usuário"
                            okText='SELECIONAR'
                            cancelText='VOLTAR'>

                            {usuarioBd?.map((usuario) => (
                                <IonSelectOption key={usuario.id} value={usuario}>
                                    {usuario.nome}
                                </IonSelectOption>
                            ))}
                        </IonSelect>
                    </IonItem>
                </IonList>

                <IonButton expand="block" type="submit" color="success" onClick={validaLogin}>Entrar</IonButton>
            </IonContent>

            <IonFooter>
                <IonGrid>
                    <IonRow>
                        <IonCol size='4'></IonCol>
                        <IonCol>
                            <IonButton href='/cadastro'>Cadastrar-se no Aplicativo</IonButton>
                        </IonCol>
                        <IonCol size='4'></IonCol>
                    </IonRow>
                </IonGrid>
            </IonFooter>
        </IonPage>
    );
};

export default Login;
