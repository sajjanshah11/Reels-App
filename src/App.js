import Login from './Login'
import Home from './Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import AuthProvider from './AuthProvider'

import { firestore } from './firebase';

import { useEffect } from 'react';

let App = () => {

  // useEffect(() => {

  //adding the data in firebase
  // firestore.collection("user-data").add({body:"this is val-2"})

  //how to get data from the snapshot

  // async function f() {

  //   let querySnapshot = await firestore.collection("user").get();

  //   // console.log(querySnapshot)

  //   for(let i = 0; i < querySnapshot.docs.length; i++){

  //     console.log(querySnapshot.docs[i].data());

  //   }
  // }

  // f();


  //to get single data from firestore

  // async function f() {

  //   let docRef = firestore.collection("user").doc("28BIlap6iIZCBKZVhVihasd");

  //   let documentSnapshot = await docRef.get()

  //   console.log(documentSnapshot.exists)
  // }

  // f();



  // }, [])
  return (
    <>
      {/* <h1>Learning the fundamentals of firestore </h1> */}

      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>

          </Switch>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
