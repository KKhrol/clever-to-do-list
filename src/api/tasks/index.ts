import {
  Timestamp,
  addDoc,
  and,
  collection,
  deleteDoc,
  doc,
  getDocs,
  or,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

import { db } from '@config/firebaseConfig';

import type { CreateTask, ITask, MutationResponse, UpdateTask } from './dto';

export const addUserTask = async (
  userId: string,
  task: CreateTask,
): Promise<MutationResponse> => {
  const tasksRef = collection(db, 'users', userId, 'tasks');

  const docRef = await addDoc(tasksRef, {
    ...task,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  return {
    id: docRef.id,
  };
};

export const getUserTasksByDate = async (
  userId: string,
  date: string,
): Promise<Array<ITask>> => {
  const tasksRef = collection(db, 'users', userId, 'tasks');
  const q = query(
    tasksRef,
    or(
      where('startDate', '==', date),
      where('endDate', '==', date),
      and(where('startDate', '<=', date), where('endDate', '>=', date)),
    ),
  );

  const snapshot = await getDocs(q);
  const tasks = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as ITask[];

  return tasks;
};

export const getUserTasksByPeriod = async (
  userId: string,
  startDate: string,
  endDate: string,
): Promise<Array<ITask>> => {
  const tasksRef = collection(db, 'users', userId, 'tasks');
  const q = query(
    tasksRef,
    or(
      and(
        where('startDate', '>=', startDate),
        where('startDate', '<=', endDate),
      ),
      and(where('endDate', '>=', startDate), where('endDate', '<=', endDate)),
      and(where('startDate', '<=', startDate), where('endDate', '>=', endDate)),
    ),
  );

  const snapshot = await getDocs(q);
  const tasks = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as ITask[];

  return tasks;
};

export const updateUserTask = async (
  userId: string,
  taskId: string,
  updates: UpdateTask,
): Promise<MutationResponse> => {
  const taskRef = doc(db, 'users', userId, 'tasks', taskId);
  await updateDoc(taskRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  });

  return {
    id: taskId,
  };
};

export const deleteUserTask = async (
  userId: string,
  taskId: string,
): Promise<void> => {
  const taskRef = doc(db, 'users', userId, 'tasks', taskId);
  await deleteDoc(taskRef);
};
