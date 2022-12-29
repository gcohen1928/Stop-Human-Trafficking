// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "firebase/app";
import {
    getAnalytics
} from "firebase/analytics";
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
} from "firebase/storage";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
    doc,
    getDoc,
    setDoc,
    orderBy,
    arrayUnion,
    deleteDoc,
    arrayRemove,
    updateDoc,
    onSnapshot,
} from "firebase/firestore";
import 'react-native-get-random-values'
import {
    v4 as uuidv4
} from 'uuid';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFjBGt0g8y2vWPssL9469CAEWm_lCGIxQ",
  authDomain: "stop-human-trafficking-5f66c.firebaseapp.com",
  projectId: "stop-human-trafficking-5f66c",
  storageBucket: "stop-human-trafficking-5f66c.appspot.com",
  messagingSenderId: "513328498342",
  appId: "1:513328498342:web:d8c6805cbc05b4ef7a1667",
  measurementId: "G-7GZDS25B72"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sendReport = async (data) => {
    try {
        console.log(data)
        if (data.image1 != "") {
            data.image1 = await uploadImage(data.image1.replace("file://", ""))
        }
        if (data.image2 != "") {
            data.image2 = await uploadImage(data.image2.replace("file://", ""))
        }
        if (data.video1 != "") {
            data.video1 = await uploadImage(data.video1.replace("file://", ""))
        }
        if (data.video2 != "") {
            data.video2 = await uploadImage(data.video2.replace("file://", ""))
        }

        await addDoc(collection(db, "reports"), data, {
            merge: true
        });
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}


const uploadImage = async (uri) => {
    try {
        const uploadUrl = await uploadImageAsync(uri);
        return uploadUrl
    } catch (e) {
        console.log(e);
        alert("Upload failed, sorry :(");
    }
};


async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });

    const fileRef = ref(getStorage(), uuidv4());
    const result = await uploadBytes(fileRef, blob);
    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(fileRef);
}

const createChat = async () => {
    try {
        const id = uuidv4();
        await setDoc(doc(db, "chats", id), {
            id: id,
            updatedAt: new Date().toISOString(),
            messages: []
        });
        return id;
    } catch (err) {
        console.error(err);
        return false;
    }
}

const uploadMessage = async (messages, chatNumber) => {
    try {
        const messagesArray = Object.values(messages);
        await setDoc(doc(db, "chats", chatNumber), {
            updatedAt: new Date().toISOString(),
            messages: arrayUnion(...messagesArray),
        }, {
            merge: true
        });
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

const listenForMessages = async (dispatch, action, chatNumber) => {
    try {
            const unsub = onSnapshot(doc(db, "chats", chatNumber), (doc) => {
                dispatch(action(doc.data().messages))
            });
        
    } catch (err) {
        console.error(err);
        return false;
    }
}

const uploadResourceData = async (countyData) => {
    try {
        console.log(countyData["geo_shape"][0])
        await setDoc(collection(db, "resources", "polygons", countyData["countyName"]),  countyData["geo_shape"][0], {
            merge: true});
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export {
    sendReport,
    uploadImage,
    listenForMessages,
    uploadMessage,
    createChat,
    uploadResourceData
}