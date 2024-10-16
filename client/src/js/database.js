import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
//This function is designed to store or update a record with ID 1 in an IndexedDB object store called jate. The content passed to the function is stored in the object store, and the process is logged to the console once the operation is complete.

// This defines an asynchronous function called putDb that accepts a parameter content. This function is intended to add or update a record in an IndexedDB database.
export const putDb = async (content) => {
  console.error('putDb not implemented');
  // This line opens a connection to the IndexedDB database named jate, using version 1. The openDB function is likely from a utility library like idb, which simplifies working with IndexedDB. If the database doesn't exist, it will be created with the specified version.
  const jateDb = await openDB('jate', 1);
  // This creates a transaction on the jate object store (a collection of records inside the database), allowing both read and write operations ('readwrite' mode).
  const tx = jateDb.transaction('jate', 'readwrite');
  // This gets a reference to the object store named jate within the transaction. The object store is where data will be read from or written to.
  const store = tx.objectStore('jate');
  // This line adds or updates a record in the object store. The put method is used to store the data. The record has an id of 1 (indicating that this might be overwriting a record with this ID if it exists). The value stored is the content passed to the putDb function.
  const request = store.put({ id: 1, value: content});
  // This waits for the completion of the request to put the data into the object store.
 // Once the request is complete, the result is stored in the result variable.
  const result = await request;
  console.log('Data saved to database', result);
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('getDb not implemented');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  console.log('result.value', result);
  // The function returns the value stored in the database for the record with an id of 1.
  return result;
};

initdb();
