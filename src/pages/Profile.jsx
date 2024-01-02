import { getAuth, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

function Profile() {
  const auth = getAuth();

  const [changeDetail, setChangeDetail] = useState(false);

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const navigate = useNavigate();

  const onLogOut = () => {
    auth.signOut();
    navigate("/");
  };

  const onChangeHandler = (event)=>{
    setFormData((prevState)=>(
      {
        ...prevState,
        [event.target.id]: event.target.value,
      }
    ))
  }

  async function onSubmitHandler() {
    try {
      //updating user infos
      await updateProfile(auth.currentUser, {
        displayName :name,
      })
      //store new info in firestore
      await updateDoc(doc(db, 'users', auth.currentUser.uid), formData)
      toast.success("Profile Details Updated")
    } catch (error) {
      toast.error("Can't update profile")
    }
  }

  return (
    <>
      <section className="w-full flex flex-col items-center">
        <h1 className="text-3xl mt-6 font-bold text-center text-gray-800">
          My Profile
        </h1>
        <div className="w-[35%] mt-7 sm:w-[90%] md:w-[65%] lg:w-[45%]">
          <form className="">
            <input
              className="w-[100%] border-gray-400 text-gray-700 px-4 py-2 rounded transition ease-in-out"
              type="text"
              id="name"
              disabled={!changeDetail}
              onChange={onChangeHandler}
              value={name}
            />

            <input
              className="w-[100%] border-gray-400 text-gray-700 mt-4 mb-6 px-4 py-2 rounded transition ease-in-out"
              type="email"
              id="email"
              disabled
              value={email}
            />

            <div className="w-[100%] lg:w-full ml-auto flex flex-row justify-between text-[16px]">
              <p className="font-normal text-gray-700">
                <a
                  className={changeDetail ? "text-green-500 cursor-pointer":"text-red-500 cursor-pointer"}
                  onClick={()=>{
                    setChangeDetail((prevState) => !prevState);
                    changeDetail && onSubmitHandler();
                  }}
                >
                  {changeDetail ? "Apply Change" : "Edit your name"}
                </a>
              </p>
              <p
                className="text-blue-500 w-fit font-normal cursor-pointer"
                onClick={onLogOut}
              >
                Sign out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Profile;
