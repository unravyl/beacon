import {
  getFirestore,
  setDoc,
  doc,
  collection,
  query,
  getDocs,
  getDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import app from '@/db/firebase';
import { ProfileInterface, UserInterface } from '@/interface/authInterface';
import { LinkInterface, NodeInterface } from '@/interface/graphInterface';
import { Dispatch, SetStateAction } from 'react';

const db = getFirestore(app);

export const filterUserID = async (authEmail: string) => {
  const userQuery = query(
    collection(db, 'users'),
    where('email', '==', authEmail)
  );
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

export const getSingleUser = async (authEmail: string) => {
  const userQuery = query(
    collection(db, 'users'),
    where('email', '==', authEmail)
  );
  const userSnapshot = await getDocs(userQuery);
  let user = {} as UserInterface;
  userSnapshot.forEach((u) => {
    const userData = u.data();
    if (userData.email == authEmail) {
      user.name = userData.name;
      user.email = userData.email;
      user.links = userData.links;
    }
  });

  return user;
};

export const refreshUserData = async (
  user: UserInterface,
  setUser: Dispatch<SetStateAction<UserInterface>>
) => {
  const authID = await filterUserID(user.email);

  if (!authID) {
    return;
  }

  const userRef = doc(db, 'users', authID);
  const userSnap = await getDoc(userRef);
  const updatedUserData = userSnap.data();
  const newUserData = {
    ...user,
    profile: updatedUserData?.profile,
    nodes: updatedUserData?.nodes,
    links: updatedUserData?.links,
    nodeNumber: updatedUserData?.nodeNumber,
  };
  setUser(newUserData);
  console.log('LOG: Refresh User Data', newUserData);
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
  });

  if (userAccountAlreadyExists) {
    return;
  }

  await setDoc(doc(collection(db, 'users')), {
    name: user.name,
    email: user.email,
    nodes: user.nodes,
    links: user.links,
    nodeNumber: user.nodeNumber,
  });
};

export const postUserInfo = async (
  user: UserInterface,
  userInfo: ProfileInterface
) => {
  const authID = await filterUserID(user.email);
  const userRef = doc(db, 'users', authID);
  await updateDoc(userRef, {
    profile: userInfo,
  });
};

export const updateUserNodes = async (
  user: UserInterface,
  setUser: Dispatch<SetStateAction<UserInterface>>,
  newNodes: NodeInterface[]
) => {
  const authID = await filterUserID(user.email);
  const userRef = doc(db, 'users', authID);
  const userSnap = await getDoc(userRef);
  const userNodes = userSnap.data()?.nodes;

  const updatedNodes = [...userNodes, ...newNodes];
  await updateDoc(userRef, {
    nodes: updatedNodes,
    nodeNumber: updatedNodes.length + 1,
  });
  await refreshUserData(user, setUser);
};

export const updateUserProfile = async (
  user: UserInterface,
  setUser: Dispatch<SetStateAction<UserInterface>>,
  profile: ProfileInterface
) => {
  const authID = await filterUserID(user.email);
  const userRef = doc(db, 'users', authID);

  const updatedProfile = { ...profile };
  await updateDoc(userRef, {
    profile: updatedProfile,
  });
  await refreshUserData(user, setUser);
};

export const updateUserLinks = async (
  user: UserInterface,
  setUser: Dispatch<SetStateAction<UserInterface>>,
  newLinks: LinkInterface[]
) => {
  const authID = await filterUserID(user.email);
  const userRef = doc(db, 'users', authID);
  const userSnap = await getDoc(userRef);
  const userLinks = userSnap.data()?.links;

  const cleanedNewLinks = newLinks.map((link: LinkInterface) => {
    return {
      ...link,
      source: link.source.id,
      target: link.target.id,
    };
  });

  const updatedLinks = [...userLinks, ...cleanedNewLinks];
  await updateDoc(userRef, {
    links: updatedLinks,
  });
  await refreshUserData(user, setUser);
};

export const deleteLink = async (
  user: UserInterface,
  setUser: Dispatch<SetStateAction<UserInterface>>,
  link: any
) => {
  const authID = await filterUserID(user.email);
  const userRef = doc(db, 'users', authID);
  const userSnap = await getDoc(userRef);
  const userLinks = userSnap.data()?.links;
  const updatedLinks = userLinks.filter((userLink: LinkInterface) => {
    return (
      userLink.source != link.source.id && userLink.target != link.target.id
    );
  });
  await updateDoc(userRef, {
    links: updatedLinks,
  });
};

