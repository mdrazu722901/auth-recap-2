import logo from './logo.svg';
import './App.css';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
import { getAuth, signInWithPopup, FacebookAuthProvider, GithubAuthProvider } from "firebase/auth";
import { useState } from 'react';
const app = initializeApp(firebaseConfig);
function App() {
  const [user, setUser] = useState({})
  console.log(user);
  const fbProvider = new FacebookAuthProvider();
  const gitHubProvider = new GithubAuthProvider();
  const fdAuthantication = () => {
    const auth = getAuth();
    signInWithPopup(auth, fbProvider)
      .then((result) => {
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log(result);
        setUser(result._tokenResponse);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };
  const GithubAuthentication = () => {
    console.log("github authentication check, confrom")
    const auth = getAuth();
    signInWithPopup(auth, gitHubProvider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        console.log(credential);
        // ...
      });
  }
  return (
    <div className="App">
      <h1>this is my practice project.</h1>
      <button onClick={fdAuthantication}>Facebook authantication</button>
      <br />
      <button onClick={GithubAuthentication}>GitHub Authentication</button>
      <h1>Full Name: {user.fullName}</h1>
      <h3>Email:{user.email}</h3>
      <img src={user.photoUrl} alt="" />
    </div>
  );
}

export default App;
