import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { SQLiteDBConnection } from 'react-sqlite-hook';
import useSQLiteDB from './services/sqlite/useSQLiteDB';

const { performSQLAction, initialized } = useSQLiteDB();
const navegador = useHistory();

interface UsuarioProps {
    id: number,
    nome: string,
    cod_casal: string
}

const getAuth = async () => {
    try {
        // Consulta a base de dados
        const queryResult = await new Promise((resolve, reject) => {
            performSQLAction(async (db: SQLiteDBConnection | undefined) => {
                try {
                    const respSelect = await db?.query(`SELECT * FROM autenticacao`);
                    resolve(respSelect?.values);
                } catch (error) {
                    reject(error);
                }
            });
        });
        return queryResult
    } catch (error) {
        alert((error as Error).message);
    }
}


const login = async (userData: UsuarioProps) => {
    try {
        // Insere dados no SQLite
        performSQLAction(async (db: SQLiteDBConnection | undefined) => {
            await db?.query(`INSERT INTO autenticacao (id_usuario, nome_usuario,
                 cod_casal, autenticacao) VALUES(?,?,?,?);`, [userData.id, userData.nome, userData.cod_casal, 1]);
        });
    } catch (error) {
        alert((error as Error).message);
    }
    navegador.push("/home")
};

const logout = async () => {
    try {
        performSQLAction(async (db: SQLiteDBConnection | undefined) => {
            await db?.query(`DELETE FROM autenticacao`);
        });
    } catch (error) {
        alert((error as Error).message);
    }
    navegador.push("/");
};

export default {getAuth, login, logout}