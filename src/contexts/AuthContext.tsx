import { createContext, useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { App } from '../services/firebase';

interface User {
  uid: string,
  displayName: string | null,
  email: string | null,
  photoURL: string,
}

interface AuthContextProps {
  user: User | undefined,
  signInWithGoogle: () => Promise<void>
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

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.');
        }
        setUser({
          uid: uid,
          displayName: displayName,
          email: email,
          photoURL: photoURL,
        })
      }
      unsubscribe();
    })


  }, []);

  async function signInWithGoogle() {

    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (result.user) {
          const { uid, displayName, email, photoURL } = result.user;
          if (!displayName || !photoURL) {
            throw new Error('Missing information from Google Account.');
          }
          setUser({
            uid: uid,
            displayName: displayName,
            email: email,
            photoURL: photoURL,
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

