import React from "react";
import google from "../assets/google.png";
import { toast } from "react-toastify";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router";
import {
  Firestore,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";

function OAuth() {
  const navigate = useNavigate();
  const onGoogleClick = async () => {
    try {
      // setting up google pop up
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      //check the user if exist
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        //add user to firestore database
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
        navigate("/profile");
      }
      else{
        navigate("/profile");
        toast.info('Connected');
      }
      
    } catch (error) {
      console.log(error);
      toast.error("Could not authorize with google!");
    }
  };

  return (
    <button
      type="button"
      onClick={onGoogleClick}
      className="flex items-center w-[87%] lg:w-full ml-auto rounded  justify-center bg-red-600 text-white p-[11px] text-[16px] font-normal transition duration-150 ease-in-out hover:bg-red-700 active:bg-red-900 shadow-lg"
    >
      {" "}
      <img src={google} className="mr-2 w-5 rounded-full" /> CONTINUE WITH
      GOOGLE
    </button>
  );
}

export default OAuth;
