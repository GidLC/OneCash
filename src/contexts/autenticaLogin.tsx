import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import useSQLiteDB from '../composables/useSQLiteDB';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';

const AuthContext = createContext<AutenticaProps | undefined>(undefined);

interface SQLItem {
    id: number;
    nome: string;
    email: string;
    senha: string;
};


interface Usuarios {
    email: string;
    senha: string
}

interface AutenticaProps {
    usuario: Usuarios | null;
    login: (usuario: any, senha: any) => void;
    logout: () => void;
}

interface AutenticacaoProviderProps {
    children: ReactNode;
}

export const AutenticacaoProvider: React.FC<AutenticacaoProviderProps> = ({ children }) => {
    // Hook para o banco de dados SQLite
    const { performSQLAction, initialized } = useSQLiteDB();
    const [usuario, setUsuario] = useState<Usuarios | null>(null);

    const validaLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!initialized) {
            return;
        }

        try {
            performSQLAction(async (db: SQLiteDBConnection | undefined) => {
                const query = await db?.query(`SELECT * FROM usuario WHERE email = ? AND senha = ?`, [
                    usuario?.email,
                    usuario?.senha
                ]);

                if (query && query.values && query.values.length > 0) {
                    console.log('Usuário autenticado!');
                } else {
                    console.log('Usuário não encontrado ou senha incorreta.');
                }
            });
        } catch (error) {
            console.error((error as Error).message);
        }
    };

    const login = (userData: Usuarios) => {
        setUsuario(userData);
    };

    const logout = () => {
        setUsuario(null);
    };  

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const autenticaUser = () => {
    const contexto = useContext(AuthContext);
    if (contexto === undefined) {
        throw new Error('Autenticação mal sucedida');
    }
    return contexto;
};

export default AuthContext;