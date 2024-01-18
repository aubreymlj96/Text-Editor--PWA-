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
export const putDb = async (content) => {
  console.log('Post to Database');
  const jateDB = await openDB('jate', 1);
  const jx = jateDB.transaction('jate', 'readwrite');
  const store = jx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request
  console.error('Data Successfully Added to Database', result)
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Get Content from Database');
  const jateDb = await openDB('jate', 1);
  const jx = jateDb.transaction('jate', 'readonly');
  const store = jx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  if (!result){
    console.error('result.value', result);
  } else {
    console.log(result);
  }
  return result?.value
};

initdb();