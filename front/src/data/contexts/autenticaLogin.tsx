import React, { ReactNode, createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router';

const AuthContext = createContext<AutenticaProps | undefined>(undefined);

interface UsuarioProps {
    id: number,
    nome: string,
    cod_casal: string
}

interface AutenticaProps {
    usuario: {};
    login: ({}: UsuarioProps) => void;
    logout: () => void;
    autenticado: any;
}

interface AutenticacaoProviderProps {
    children: ReactNode;
}

export const AutenticacaoProvider: React.FC<AutenticacaoProviderProps> = ({ children }) => {
    const [usuario, setUsuario] = useState({});
    const [autenticado, setAutenticado] = useState();
    const navegador = useHistory();

    const login = (userData: UsuarioProps) => {
        setUsuario({
            "id": userData.id,
            "nome": userData.nome,
            "cod_casal": userData.cod_casal
        });
        setAutenticado(1)
        navegador.push("/home")
    };

    const logout = () => {
        setUsuario({});
        navegador.push("/login");
    };  

    return (
        <AuthContext.Provider 
        value={{
                usuario,
                login,
                logout,
                autenticado }}>
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