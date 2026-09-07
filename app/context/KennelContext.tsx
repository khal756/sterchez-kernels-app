'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Dog {
  id: string;
  name: string;
  breed: string;
  category: 'For Sale' | 'Adoption';
  price: string;
  imageUrl: string;
}

export interface Memory {
  id: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  caption: string;
}

export interface Staff {
  id: string;
  name: string;
  position: string;
  imageUrl: string;
}

interface KennelContextType {
  dogs: Dog[];
  addDog: (dog: Omit<Dog, 'id'>) => void;
  deleteDog: (id: string) => void;
  memories: Memory[];
  addMemory: (memory: Omit<Memory, 'id'>) => void;
  deleteMemory: (id: string) => void;
  staffList: Staff[];
  addStaff: (staff: Omit<Staff, 'id'>) => void;
  updateStaff: (id: string, staff: Omit<Staff, 'id'>) => void;
  deleteStaff: (id: string) => void;
}

const KennelContext = createContext<KennelContextType | undefined>(undefined);

export function KennelProvider({ children }: { children: ReactNode }) {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [staffList, setStaffList] = useState<Staff[]>([]);

  useEffect(() => {
    const savedDogs = localStorage.getItem('sterchez_dogs');
    const savedMemories = localStorage.getItem('sterchez_memories');
    const savedStaff = localStorage.getItem('sterchez_staff');

    if (savedDogs) setDogs(JSON.parse(savedDogs));
    else {
      const defaults: Dog[] = [
        { id: '1', name: 'Rex', breed: 'German Shepherd', category: 'For Sale', price: '1200', imageUrl: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95' },
        { id: '2', name: 'Bella', breed: 'Golden Retriever', category: 'Adoption', price: '0', imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d' }
      ];
      setDogs(defaults);
      localStorage.setItem('sterchez_dogs', JSON.stringify(defaults));
    }

    if (savedMemories) setMemories(JSON.parse(savedMemories));
    if (savedStaff) setStaffList(JSON.parse(savedStaff));
  }, []);

  const saveToStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const addDog = (dogData: Omit<Dog, 'id'>) => {
    const newDog = { ...dogData, id: Date.now().toString() };
    const updated = [newDog, ...dogs];
    setDogs(updated);
    saveToStorage('sterchez_dogs', updated);
  };

  const deleteDog = (id: string) => {
    const updated = dogs.filter(d => d.id !== id);
    setDogs(updated);
    saveToStorage('sterchez_dogs', updated);
  };

  const addMemory = (memData: Omit<Memory, 'id'>) => {
    const newMem = { ...memData, id: Date.now().toString() };
    const updated = [newMem, ...memories];
    setMemories(updated);
    saveToStorage('sterchez_memories', updated);
  };

  const deleteMemory = (id: string) => {
    const updated = memories.filter(m => m.id !== id);
    setMemories(updated);
    saveToStorage('sterchez_memories', updated);
  };

  const addStaff = (staffData: Omit<Staff, 'id'>) => {
    const newStaff = { ...staffData, id: Date.now().toString() };
    const updated = [...staffList, newStaff];
    setStaffList(updated);
    saveToStorage('sterchez_staff', updated);
  };

  const updateStaff = (id: string, staffData: Omit<Staff, 'id'>) => {
    const updated = staffList.map(s => s.id === id ? { ...s, ...staffData } : s);
    setStaffList(updated);
    saveToStorage('sterchez_staff', updated);
  };

  const deleteStaff = (id: string) => {
    const updated = staffList.filter(s => s.id !== id);
    setStaffList(updated);
    saveToStorage('sterchez_staff', updated);
  };

  return (
    <KennelContext.Provider value={{ dogs, addDog, deleteDog, memories, addMemory, deleteMemory, staffList, addStaff, updateStaff, deleteStaff }}>
      {children}
    </KennelContext.Provider>
  );
}

export function useKennel() {
  const context = useContext(KennelContext);
  if (!context) throw new Error('useKennel must be used within a KennelProvider');
  return context;
}
