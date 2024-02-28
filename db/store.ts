import { getFirestore, setDoc, doc, collection, query, getDocs, updateDoc, where } from "firebase/firestore";
import app from '@/db/firebase';
import { UserInterface } from '@/interface/authInterface';
import { CareerInterface } from '@/interface/CareerInterface';

const db = getFirestore(app);

const filterUserID = async (authEmail: string) => {
    const userQuery = query(collection(db, 'users'), where('email', '==', authEmail));
    const userSnapshot = await getDocs(userQuery);
    let authID = '';
  
    userSnapshot.forEach((user) => {
      const userData = user.data();
      if (userData.email == authEmail) {
        authID = user.id;
      }
    });
  
    return authID;
  };

export const postInitialUserData = async (user: UserInterface) => {
    const userQuery = query(collection(db, 'users'));
    const userSnapshot = await getDocs(userQuery);
    let userAccountAlreadyExists = 0;

    userSnapshot.forEach((u) => {
        const userData = u.data();
        if (userData.email == user.email) {
            userAccountAlreadyExists = 1;
        }
    })

    if (userAccountAlreadyExists) {
        return;
    }

    await setDoc(doc(collection(db, 'users')), {
        name: user.name,
        email: user.email
    })
}

export const postInitialCareerData = async (user: UserInterface, careers: CareerInterface) => {
    const authID = await filterUserID(user.email);
    const userRef = doc(db, "users", authID);
    await updateDoc(userRef, {
        careers: careers
      });
}
