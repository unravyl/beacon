import { getFirestore, setDoc, doc, collection, query, getDocs, getDoc, updateDoc, where } from "firebase/firestore";
import app from '@/db/firebase';
import { UserInterface } from '@/interface/authInterface';
import { CareerInterface } from '@/interface/careerInterface';
import { LinkInterface, NodeInterface } from '@/interface/graphInterface';
import { Dispatch, SetStateAction } from 'react';

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

export const refreshUserData = async (user: UserInterface, setUser: Dispatch<SetStateAction<UserInterface>>) => {
    const authID = await filterUserID(user.email);
    const userRef = doc(db, "users", authID);
    const userSnap = await getDoc(userRef);
    const updatedUserData = userSnap.data();
    console.log('LOGG', updatedUserData?.nodes);
    setUser({...user, nodes: updatedUserData?.nodes, links: updatedUserData?.links});
}

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
        email: user.email,
        nodes: user.nodes
    })
}

export const postInitialCareerData = async (user: UserInterface, careers: CareerInterface) => {
    const authID = await filterUserID(user.email);
    const userRef = doc(db, "users", authID);
    await updateDoc(userRef, {
        careers: careers
      });
}

export const postUserInfo = async (user: UserInterface, userInfo: any) => {
    const authID = await filterUserID(user.email);
    const userRef = doc(db, "users", authID);
    const {interest, history, strength, weakness, education} = userInfo;
    await updateDoc(userRef, {
        interest: interest,
        history: history,
        strength: strength,
        weakness: weakness,
        education: education
    });
}

export const updateUserNodes = async (user: UserInterface, setUser: Dispatch<SetStateAction<UserInterface>>,newNodes: NodeInterface[]) => {
  const authID = await filterUserID(user.email);
  const userRef = doc(db, "users", authID);
  const userSnap = await getDoc(userRef);
  const userNodes = userSnap.data()?.nodes;

  const updatedNodes = [...userNodes, ...newNodes];
  await updateDoc(userRef, {
    nodes: updatedNodes
  })
  await refreshUserData(user,setUser)
}

export const updateUserLinks = async (user: UserInterface, setUser: Dispatch<SetStateAction<UserInterface>>,newLinks: LinkInterface[]) => {
  const authID = await filterUserID(user.email);
  const userRef = doc(db, "users", authID);
  const userSnap = await getDoc(userRef);
  const userLinks = userSnap.data()?.links;

  const updatedLinks = [...userLinks, ...newLinks];
  await updateDoc(userRef, {
    links: updatedLinks
  })
  await refreshUserData(user,setUser)
}

export const postInitialLinks = async (user: UserInterface, links: LinkInterface[]) => {
  const authID = await filterUserID(user.email);
  const userRef = doc(db, "users", authID);
  await updateDoc(userRef, {
    links: links
  })
}
