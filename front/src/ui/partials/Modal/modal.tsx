import React, { useState, useRef, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonList, IonItem, IonLabel, IonFab, IonFabButton, IonIcon, IonModal, IonGrid, IonRow, IonCol, IonButtons } from '@ionic/react';
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

    const [categoriaReceita, setCategoriaReceita] = useState<Array<SQLReceita>>();
    const [categoriaDespesa, setCategoriaDespesa] = useState<Array<SQLDespesa>>();
    const [addNomeCategoria, setAddNomeCategoria] = useState('');
    const [addCorCategoria, setAddCorCategoria] = useState('');



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
                <IonButton></IonButton>
            </IonPage >

        </>
    );
};

export default Categoria;
