import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { SQLiteDBConnection } from 'react-sqlite-hook';
import useSQLiteDB from '../services/sqlite/useSQLiteDB';

const AuthContext = createContext<AutenticaProps | undefined>(undefined);

interface UsuarioProps {
    id: number,
    nome: string,
    cod_casal: string
}

interface AutenticaProps {
    login: ({ }: UsuarioProps) => any;
    logout: () => void;
    getAuth: () => any
}

interface AutenticacaoProviderProps {
    children: ReactNode;
}

export const AutenticacaoProvider: React.FC<AutenticacaoProviderProps> = ({ children }) => {
    const { performSQLAction, initialized } = useSQLiteDB();
    const navegador = useHistory();

    useEffect(() => {
        if (initialized) {
            getAuth();
        }
    }, [initialized]);

    const getAuth = async () => {
        try {
            const queryResult = await new Promise<any[]>((resolve, reject) => {
                performSQLAction(async (db: SQLiteDBConnection | undefined) => {
                    try {
                        const respSelect = await db?.query(`SELECT * FROM autenticacao`);
                        console.log('Dados retornados:', respSelect?.values);
                        resolve(respSelect?.values || []);
                    } catch (error) {
                        reject(error);
                    }
                });
            });

            console.log('Resultados da consulta:', queryResult); // Verifica os dados retornados do SQLite
            return queryResult;
        } catch (error) {
            alert((error as Error).message);
            return [];
        }
    };

    const login = async (userData: UsuarioProps) => {
        try {
            await new Promise<void>((resolve, reject) => {
                performSQLAction(async (db: SQLiteDBConnection | undefined) => {
                    try {
                        await db?.query(`INSERT INTO autenticacao (id_usuario, nome_usuario,
                        cod_casal, autenticacao) VALUES(?,?,?,?);`, [userData.id, userData.nome, userData.cod_casal, 1])
                        console.log('Dados inseridos com sucesso!');
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                });
            });
            navegador.push("/home")
        } catch (error) {
            alert((error as Error).message);
        }

        /*try {
            performSQLAction(
              async (db: SQLiteDBConnection | undefined) => {
                await db?.query(`INSERT INTO autenticacao (id_usuario, nome_usuario, cod_casal, autenticacao) values (?,?,?,?);`, [
                    userData.id, 
                    userData.nome, 
                    userData.cod_casal, 
                    1
                ]);
                console.log(`Dados inseridos com sucesso`)
              }
            );
          } catch (error) {
            alert((error as Error).message);
          }*/
        //navegador.push("/home")
        return 1
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

    return (
        <AuthContext.Provider
            value={{
                login,
                logout,
                getAuth
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
