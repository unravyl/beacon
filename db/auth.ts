import app from '@/db/firebase';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { UserInterface } from '@/interface/authInterface';
import { Dispatch, SetStateAction } from 'react';
import { getSingleUser, postInitialUserData, refreshUserData } from './store';
import { NodeInterface } from '@/interface/graphInterface';

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

interface UserDataInterface {
  name: string;
  email: string;
  nodes: NodeInterface[];
}

export const handleSignIn = async (
  currentUser: UserInterface,
  setUser: Dispatch<SetStateAction<UserInterface>>,
  setHasAccount: Dispatch<SetStateAction<boolean>>,
  setHasAccounData: Dispatch<SetStateAction<boolean>>
) => {
  let userData = {} as UserDataInterface;
  await signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      if (user.displayName && user.email) {
        userData = {
          name: user.displayName,
          email: user.email,
          nodes: [
            {
              id: 'Node 1',
              label: 'You',
              details: {
                description: 'Root',
              },
              group: 1,
            },
          ],
        };
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    });

  if (userData) {
    const existingUser = await getSingleUser(userData.email);
    if (existingUser.email) {
      if (existingUser.links?.length) {
        refreshUserData(userData, setUser);
        setHasAccounData(true);
        return;
      }
    } else {
      postInitialUserData(userData);
    }
    setUser(userData);
    setHasAccount(true);
  }
};

export const handleSignOut = () => {
  signOut(auth)
    .then(() => {
      // Redirect to login page
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    });
};

export default auth;
