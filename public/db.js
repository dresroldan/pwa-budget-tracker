const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

let db;

// new db request for a "budget" database.
const request = indexedDB.open("budget", 1);

request.onupgradeneeded = ({ target }) => {
// object store called "pending" and set autoIncrement to true 
  let db = target.result;
  db.createObjectStore("pending", { autoIncrement: true });
};

request.onsuccess = ({ target }) => {
  db = target.result;

// check if app is online before reading from db 
  if (navigator.onLine) {
    checkDatabase();
  }
};


request.onerror = function (event) {
  console.log("Woops!" + event.target.errorCode);
};



function saveRecord(record) {
  const transaction = db.transaction(["pending"], "readwrite");
  const store = transaction.objectStore("pending");
  store.add(record);
}
