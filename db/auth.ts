import app from '@/db/firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { UserInterface } from '@/interface/authInterface';
import { Dispatch, SetStateAction } from 'react';
import { postInitialUserData } from './store';

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export const handleSignIn = async (setUser: Dispatch<SetStateAction<UserInterface>>, setIsLoggedIn: Dispatch<SetStateAction<boolean>>) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        if(user.displayName && user.email) {
          let userData = {
            name: user.displayName,
            email: user.email,
            nodes: [{
              id: 'Node 1',
              label: 'You',
              details: {
                description: 'Root'
              },
              group: 1
            }]
          }
          postInitialUserData(userData);
          setUser(userData);
        }
        setIsLoggedIn(true);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage)
      }).finally(() => {
        
      });
   
}

export const handleSignOut = () => {
    signOut(auth).then(() => {
        // Redirect to login page
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage)
      });
}

export default auth;

