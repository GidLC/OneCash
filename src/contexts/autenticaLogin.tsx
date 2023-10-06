import React, { ReactNode, createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router';

const AuthContext = createContext<AutenticaProps | undefined>(undefined);

interface UsuarioProps {
    id: number,
    email: string,
    nome: string,
}

interface AutenticaProps {
    usuario: UsuarioProps | null;
    login: (id: any, nome: any, senha: any) => void;
    logout: () => void;
}

interface AutenticacaoProviderProps {
    children: ReactNode;
}

export const AutenticacaoProvider: React.FC<AutenticacaoProviderProps> = ({ children }) => {
    const [usuario, setUsuario] = useState<UsuarioProps | null>(null);
    const navegador = useHistory();

    const login = (userData: UsuarioProps) => {
        setUsuario(userData);
        navegador.push("/home")
    };

    const logout = () => {
        setUsuario(null);
        navegador.push("/login");
    };  

    return (
        <AuthContext.Provider 
        value={{
                usuario,
                login,
                logout }}>
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