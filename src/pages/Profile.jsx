import { getAuth, updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FcHome } from "react-icons/fc";
import ListingItem from "../components/ListingItem";

function Profile() {
  const auth = getAuth();
  const [listings, setListings] = useState([]);
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

  const onChangeHandler = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  async function onSubmitHandler() {
    try {
      //updating user infos
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      //store new info in firestore
      await updateDoc(doc(db, "users", auth.currentUser.uid), formData);
      toast.success("Profile Details Updated");
    } catch (error) {
      toast.error("Can't update profile");
    }
  }

  useEffect(() => {
    async function fetchUserListings() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) =>
        listings.push({
          id: doc.id,
          data: doc.data(),
        })
      );
      setListings(listings);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);

  function onEdit(listingID){
    navigate(`/edit-listing/${listingID}`)
  }
  async function onDelete(listingID){
    if(window.confirm("Are you sure you want to delete this post")){
      await deleteDoc(doc(db, 'listings', listingID));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingID
      )
      setListings(updatedListings);
      toast.success("Listing deleted")
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
                  className={
                    changeDetail
                      ? "text-green-500 cursor-pointer"
                      : "text-red-500 cursor-pointer"
                  }
                  onClick={() => {
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
          <button
            onClick={() => {
              navigate("/create-listing");
            }}
            className="flex items-center justify-center w-full text-white bg-blue-600 p-[12px] mt-6 text-[15px] font-normal rounded hover:bg-blue-700 transition duration-150 ease-in-out active:bg-blue-900 shadow-lg"
          >
            {" "}
            <FcHome className="mr-2 text-[27px] bg-red-200 rounded-full border-2 p-[3px]" />{" "}
            <p>SELL OR RENT YOUR HOUSE</p>
          </button>
        </div>
      </section>
      <div className="max-w-6xl px-3 mx-auto">
        {listings.length >0 && (
          <>
            <h1
              className="mt-[4rem] mb-8 text-3xl font-bold text-center text-gray-800"
            >
              My Listings
            </h1> 
            <ul className="2xl:grid 2xl:grid-cols-4 lg:grid lg:grid-cols-3 md:grid md:grid-cols-2 xl:grid-cols-3 xs:grid xs:grid-cols-1 sm:grid-cols-2 mb-12 w-full">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                  onEdit={()=>onEdit(listing.id)}
                  onDelete={()=>onDelete(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}

export default Profile;
