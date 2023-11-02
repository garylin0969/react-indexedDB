import { openDB } from 'idb';
import { useEffect, useState } from 'react';

const DB_NAME = 'myDatabase';
const STORE_NAME = 'myStore';

function useIndexedDB() {
    const [db, setDb] = useState<any>(null);

    useEffect(() => {
        async function initializeDB() {
            const database = await openDB(DB_NAME, 1, {
                upgrade(db) {
                    if (!db.objectStoreNames.contains(STORE_NAME)) {
                        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
                    }
                },
            });
            setDb(database);
        }

        initializeDB();

        return () => {
            if (db) {
                db.close();
            }
        };
    }, []);

    async function addItem(item: any) {
        if (db) {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            await store.add(item);
        }
    }

    async function getAllItems() {
        if (db) {
            const tx = db.transaction(STORE_NAME, 'readonly');
            const store = tx.objectStore(STORE_NAME);
            return await store.getAll();
        }
        return [];
    }

    return {
        db,
        addItem,
        getAllItems,
    };
}

export default useIndexedDB;
