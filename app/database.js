import React from 'react';
import ReactDOM from 'react-dom';

// Modify with your startup's name!
var startupName = "InSPIRE, Inc.";

// Put your mock objects here, as in Workshop 4
var initialData = {
    // "Document" for students -- James Morris
    "students": {
        "12345678": {
            "studentId": "12345678",
            "firstName": "Jason",
            "lastName": "Jackson",
            "gradYear": 2017,
            "major": "Gender Studies",
            "birthDate": "1992-03-14",
            "gender": "M",
            "mailStreetAddress": "58 Eastman Lane",
            "mailCity": "Amherst",
            "mailState": "MA",
            "mailZip": "01003",
            "permStreetAddress": "2642 Marigold Lane",
            "permCity": "Doral",
            "permState": "FL",
            "permZip": "33178",
            "phoneNumber": "305-463-5054",
            "advisor": 1,
            "email": "jjackson@umass.edu",
            "emergencyContact": {
                "firstName": "Carol",
                "lastName": "Huston",
                "phoneNumber": "205-436-0467",
                "streetAddress": "1157 Broad Street",
                "city": "Bessemer",
                "state": "AL",
                "zip": "35224"
            }
        },
        "27133668": {
            "studentId": "27133668",
            "firstName": "Christine",
            "lastName": "Thielen",
            "gradYear": 2018,
            "major": "Computer Science",
            "birthDate": "1994-12-14",
            "gender": "F",
            "mailStreetAddress": "160 Clark Hill Rd",
            "mailCity": "Amherst",
            "mailState": "MA",
            "mailZip": "01003",
            "permStreetAddress": "4987 Terry Lane",
            "permCity": "Orlando",
            "permState": "FL",
            "permZip": "32805",
            "phoneNumber": "321-230-6522",
            "advisor": 2,
            "email": "cthielen@umass.edu",
            "emergencyContact": {
                "firstName": "Thomas",
                "lastName": "Thielen",
                "phoneNumber": "207-681-0579",
                "streetAddress": "1522 Fantages Way",
                "city": "South Portland",
                "state": "ME",
                "zip": "04106"
            }
        },
        "07894436": {
            "studentId": "07894436",
            "firstName": "James",
            "lastName": "Ensor",
            "gradYear": 2016,
            "major": "Chemistry",
            "birthDate": "1993-05-25",
            "gender": "M",
            "mailStreetAddress": "230 Sunset Ave",
            "mailCity": "Amherst",
            "mailState": "MA",
            "mailZip": "01003",
            "permStreetAddress": "3109 Grove Street",
            "permCity": "Melville",
            "permState": "NY",
            "permZip": "11747",
            "phoneNumber": "631-773-2379",
            "advisor": 3,
            "email": "jensor@umass.edu",
            "emergencyContact": {
                "firstName": "Paulette",
                "lastName": "Cantara",
                "phoneNumber": "713-719-5202",
                "streetAddress": "630 Brooke Street",
                "city": "Sugar Land",
                "state": "TX",
                "zip": "77478"
            }
        }
    },
    // "Document" storing professors
    "professors": {},
    // "Document" storing courses
    "courses": {}
};

var data = JSON.parse(localStorage.getItem(startupName));
if (data === null) {
  data = JSONClone(initialData);
}

/**
 * A dumb cloning routing. Serializes a JSON object as a string, then
 * deserializes it.
 */
function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Emulates reading a "document" from a NoSQL database.
 * Doesn't do any tricky document joins, as we will cover that in the latter
 * half of the course. :)
 */
export function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  return JSONClone(data[collection][id]);
}

/**
 * Emulates writing a "document" to a NoSQL database.
 */
export function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  localStorage.setItem(startupName, JSON.stringify(data));
}

/**
 * Adds a new document to the NoSQL database.
 */
export function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}

/**
 * Reset our browser-local database.
 */
export function resetDatabase() {
  localStorage.setItem(startupName, JSON.stringify(initialData));
  data = JSONClone(initialData);
}

/**
 * Reset database button.
 */
class ResetDatabase extends React.Component {
  render() {
    return (
      <button className="btn btn-default" type="button" onClick={() => {
        resetDatabase();
        window.alert("Database reset! Refreshing the page now...");
        document.location.reload(false);
      }}>Reset Mock DB</button>
    );
  }
}

ReactDOM.render(
  <ResetDatabase />,
  document.getElementById('db-reset')
);
