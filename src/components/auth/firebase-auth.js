import { getFirestore, query, getDocs, getDoc, collection, where, addDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { app, db }  from '../../firebase.config';
import { getAnalytics } from "firebase/analytics";

const analytics = getAnalytics(app);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const createNewUserDocGoogle = async (newUser) => {
    // create new WishList
    let newWishList = await addDoc(collection(db, "wishLists"), {
        userId: newUser.uid,
        userName: newUser.displayName,
        gifts: []
    }); 
    await addDoc(collection(db, "users"), {
        uid: newUser.uid,
        name: newUser.displayName,
        // authProvider: "local",
        email: newUser.email,
        wishList: newWishList.id
    });
}

const signInWithGoogle = async () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        console.log(result)
        if(result._tokenResponse?.isNewUser){
            // create new user doc 
            createNewUserDocGoogle(result?.user);
        }
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
  });
};


const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return "Success"
    } catch (err) {
      console.error(err);
      return "Error"
    //   alert(err.message);
    }
};

const registerWithEmailAndPassword = async (newUser) => {
    const { name, email, password } = newUser;
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name,
          authProvider: "local",
          email,
          wishList: []
        });
        // create new WishList
        await addDoc(collection(db, "wishLists"), {
            userId: user.uid,
            userName: name,
            gifts: []
        }); 
        const userRef = db.collection('users').doc(name);
    //   const doc = await cityRef.get();
    //   if (!doc.exists) {
    //     console.log('No such document!');
    //   } else {
    //     console.log('Document data:', doc.data());
    //   }


    //   await getDoc(collection(db, "users")
    //   await db.collection('books').doc('fK3ddutEpD2qQqRMXNW5').get()
    //   return { status: "Success", user: user }
    } catch (err) {
      console.error(err);
    //   alert(err.message);
      return { status: "Error", msg: err.message }
    }
};

const getUserByUid = async () => {
    let alt = 'unJRXZU3ohaP2b2owKhEtIx0QEA2';
    let ad = 'ccmvTgMhgCZgNcVLEoLRAewNX4p1'
    db.collection('users').where('uid', '==', ad)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, ' => ', doc.data());
        });
    })
    .catch(function(error) {
        console.log('Error getting documents: ', error);
    });

}


const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    getUserByUid 
  };
  