import {db} from '../firebase/config'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from "firebase/auth";

import { useEffect, useState } from "react";

//register
export const useAuthentication = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    //clean up
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }

    const createUser = async (data) => {
        checkIfIsCancelled()
        setLoading(true);
        setError(null);
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            await updateProfile(user, { displayName: data.displayName });
            setLoading(false);
        } catch (error) {
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessages
            if(error.message.includes('email-already-in-use')){systemErrorMessages = 'Email já cadastrado'}
            if(error.message.includes('invalid-email')){systemErrorMessages = 'Email inválido'}
            if(error.message.includes('weak-password')){systemErrorMessages = 'Senha fraca'}
            if(error.message.includes('operation-not-allowed')){systemErrorMessages = 'Operação não permitida'}
            if(error.message.includes('too-many-requests')){systemErrorMessages = 'Muitas requisições, tente novamente mais tarde'}
            if(error.message.includes('user-disabled')){systemErrorMessages = 'Usuário desabilitado'}
            if(error.message.includes('user-not-found')){systemErrorMessages = 'Usuário não encontrado'}
            if(error.message.includes('wrong-password')){systemErrorMessages = 'Senha incorreta'}
            


            setError(systemErrorMessages);
            console.log(systemErrorMessages);
            setLoading(false);
        }
    };
    //fim do register

    //logout
    const logout = async () => {
        checkIfIsCancelled()
        setLoading(true);
        setError(null);
        try {
            await signOut(auth);
            setLoading(false);
        } catch (error) {
            let systemErrorMessages
            systemErrorMessages = 'Erro ao sair'
            setError(systemErrorMessages);
            setLoading(false);
        }
    };
    //fim do logout

    //login
    const login = async (data) => {
        checkIfIsCancelled()
        setLoading(true);
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
        } catch (error) {
            let systemErrorMessages
            if(error.message.includes('invalid-email')){systemErrorMessages = 'Email inválido'}
            if(error.message.includes('weak-password')){systemErrorMessages = 'Senha fraca'}
            if(error.message.includes('operation-not-allowed')){systemErrorMessages = 'Operação não permitida'}
            if(error.message.includes('too-many-requests')){systemErrorMessages = 'Muitas requisições, tente novamente mais tarde'}
            if(error.message.includes('user-disabled')){systemErrorMessages = 'Usuário desabilitado'}
            if(error.message.includes('user-not-found')){systemErrorMessages = 'Usuário não encontrado'}
            if(error.message.includes('wrong-password')){systemErrorMessages = 'Senha incorreta'}


            setError(systemErrorMessages);
            setLoading(false);
        }
    };
    //fim do login


    useEffect(() => {
        return () => { setCancelled(true) }
    }, [])


    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login,
    }
};