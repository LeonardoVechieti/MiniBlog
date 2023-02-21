import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from "firebase/auth";

import { useEffect, useState } from "react";

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

};