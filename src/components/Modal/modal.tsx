import React, { useState, useRef, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonList, IonItem, IonLabel, IonFab, IonFabButton, IonIcon, IonModal, IonGrid, IonRow, IonCol, IonButtons } from '@ionic/react';
import useSQLiteDB from '../../composables/useSQLiteDB';
import { SQLiteDBConnection } from 'react-sqlite-hook';

type SQLReceita = {
    id_categoria_receita: Number,
    nome_categoria_receita: String,
    descricao_categoria_receita: String,
    cor_categoria_receita: String
}

type SQLDespesa = {
    id_categoria_despesa: Number,
    nome_categoria_despesa: String,
    descricao_categoria_despesa: String,
    cor_categoria_despesa: String
}

const Categoria: React.FC = () => {
    const { performSQLAction, initialized } = useSQLiteDB();

    const [categoriaReceita, setCategoriaReceita] = useState<Array<SQLReceita>>();
    const [categoriaDespesa, setCategoriaDespesa] = useState<Array<SQLDespesa>>();
    const [addNomeCategoria, setAddNomeCategoria] = useState('');
    const [addCorCategoria, setAddCorCategoria] = useState('');

    useEffect(() => {
        loadCategoriaReceita();
        loadCategoriaDespesa();
    }, [initialized]);

    const addCategoria = async () => {
        try {
            performSQLAction(
                async (db: SQLiteDBConnection | undefined) => {
                    await db?.query(`INSERT INTO categoria_receita (nome_categoria_receita, cor_categoria_receita)
              values (?,?);`, [
                        addNomeCategoria,
                        addCorCategoria
                    ])
                }
            )
        } catch (error) {
            alert((error as Error).message)
        }

        setAddNomeCategoria("");
        setAddCorCategoria("");
        alert(`Categoria: ${addNomeCategoria} cadastrada com sucesso`)

    }

    return (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Cadastro de Categorias</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    {categoriaReceita?.map((item) => (
                        <IonList>
                            <IonItem>
                                <IonLabel>{item.descricao_categoria_receita}</IonLabel>
                            </IonItem>
                        </IonList>))}

                    <IonItem>
                        <IonInput label="Nome:" placeholder='Nome da categoria' value={addNomeCategoria} onIonChange={(e) => { setAddNomeCategoria(e.detail.value!); console.log(e.detail.value) }}></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonInput label="Cor:" placeholder='Cor da categoria' value={addCorCategoria} onIonChange={(e) => { setAddCorCategoria(e.detail.value!); console.log(e.detail.value) }}></IonInput>
                    </IonItem>
                </IonContent >
                <IonButton onClick={addCategoria}></IonButton>
            </IonPage >

        </>
    );
};

export default Categoria;
