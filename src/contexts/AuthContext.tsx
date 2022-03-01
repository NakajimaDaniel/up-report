import { createContext, useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { App } from '../services/firebase';

interface User {
  uid: string,
  displayName: string | null,
  email: string | null,
}

interface AuthContextProps {
  user: User,
  signInWithGoogle: () => void
}

interface AuthContextProviderProps {
  children: React.ReactNode
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider(props: AuthContextProviderProps) {

  const [user, setUser] = useState<User>();

  useEffect(() => {
    App
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email } = user;
      }
      setUser({
        uid: uid,
        displayName: displayName,
        email: email,
      })
    })
  }, []);

  async function signInWithGoogle() {

    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        if (result.user) {
          const { uid, displayName, email } = result.user;
          setUser({
            uid: uid,
            displayName: displayName,
            email: email,
          })
        }
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  )

}

