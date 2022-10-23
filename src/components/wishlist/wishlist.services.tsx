import { addDoc, collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { GiftItem } from "./WishList.interface";
import { app, db }  from '../../firebase.config';
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const analytics = getAnalytics(app);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export const addGiftToList = async (newGift: GiftItem, uid: string): Promise<GiftItem[]> => {
    // verify newGift is value
    // verify if User has wishList yet or not 
    // post newGift
    await addDoc(collection(db, "wishList"), {
        uid: uid,
        name: newGift.name,
        notes: newGift.notes,
        link: newGift.link
    });
    // return all gifts relative to the logged in user 
    db.collection('wishList').where('uid', '==', uid)
        .get()
        .then(function(querySnapshot) {
            console.log("QS:", querySnapshot)
            querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, ' => ', doc.data());
            });
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error);
    });
    return []
}

export const getGiftsByUser = async (uid: string): Promise<GiftItem[]> => {
    db.collection('wishList').where('uid', '==', uid)
    .get()
    .then(function(querySnapshot) {
        console.log("QS:", querySnapshot.docs)
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, ' => ', doc.data());
        });
    })
    .catch(function(error) {
        console.log('Error getting documents: ', error);
    });
    return []
}

export const listenToGifts = async (uid: string): Promise<any> => {

    // const q = query(collection(db, "wishList"), where("uid", "==", 'ccmvTgMhgCZgNcVLEoLRAewNX4p1"'));
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //     const gifts: any = [];
    //     querySnapshot.forEach((doc) => {
    //         gifts.push(doc.data().name);
    //     });
    //     console.log("Current gifts in wishlist: ", gifts.join(", "));
    // });
    return db.collection('wishList').where(`uid`, '==', uid).get();

    return []
}