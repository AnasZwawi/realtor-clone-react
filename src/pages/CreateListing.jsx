import React, { useState } from "react";

function CreateListing() {
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 0,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: '',
    description: '',
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
  });

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    description,
    offer,
    regularPrice,
    discountedPrice,
  } = formData;

  function onChangeHandler(event) {
    console.log(event.target.value);
    let boolean = null;
    if (event.target.value === "true") {
      boolean = true;
    }
    if (event.target.value === "false") {
      boolean = false;
    }
    if (event.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: event.target.files,
      }));
    }
    if (!event.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [event.target.id]: boolean ?? event.target.value,
      }));
    }
  }

  return (
    <main className="max-w-md px-2 mx-auto">
      <h1 className="text-3xl mt-6 font-bold text-center text-gray-800">
        Create a Listing
      </h1>
      <form action="" className="mx-1">
        <p className="text-lg mt-6 font-semibold text-gray-800">Sell / Rent</p>
        <div className="flex space-x-5">
          <button
            onClick={onChangeHandler}
            type="button"
            id="type"
            value="sale"
            className={`px-7 py-3 font-semibold text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "rent"
                ? "bg-white text-gray-700"
                : "bg-slate-600 text-white"
            }`}
          >
            sell
          </button>
          <button
            onClick={onChangeHandler}
            type="button"
            id="type"
            value="rent"
            className={`px-7 py-3 font-semibold text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "sale"
                ? "bg-white text-gray-700"
                : "bg-slate-600 text-white"
            }`}
          >
            rent
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold text-gray-800">Title</p>
        <input
          type="text"
          className="w-full rounded transition duration-150 ease-in-out text-gray-700 font-normal text-lg border-gray-300"
          id="name"
          placeholder="Title"
          value={name}
          onChange={onChangeHandler}
          maxLength={"32"}
          minLength={"6"}
          required
        />
        <div className="w-full flex space-x-5">
          <div className="w-full">
            <p className="text-lg mt-6 font-semibold text-gray-800">Bedrooms</p>
            <input
              className="w-full rounded transition duration-150 ease-in-out text-gray-700 font-normal text-lg border-gray-300"
              id="bedrooms"
              type="number"
              min="0"
              max="50"
              value={bedrooms}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="w-full">
            <p className="text-lg mt-6 font-semibold text-gray-800">
              Bathrooms
            </p>
            <input
              className="w-full rounded transition duration-150 ease-in-out text-gray-700 font-normal text-lg border-gray-300"
              id="bathrooms"
              type="number"
              min="1"
              max="50"
              value={bathrooms}
              onChange={onChangeHandler}
              required
            />
          </div>
        </div>
        <p className="text-lg mt-6 font-semibold text-gray-800">Parking Spot</p>
        <div className="flex space-x-5">
          <button
            onClick={onChangeHandler}
            type="button"
            id="parking"
            value={true}
            className={`px-7 py-3 font-semibold text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !parking ? "bg-white text-gray-700" : "bg-slate-600 text-white"
            }`}
          >
            Yes
          </button>
          <button
            onClick={onChangeHandler}
            type="button"
            id="parking"
            value={false}
            className={`px-7 py-3 font-semibold text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              parking ? "bg-white text-gray-700" : "bg-slate-600 text-white"
            }`}
          >
            No
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold text-gray-800">Furnished</p>
        <div className="flex space-x-5">
          <button
            onClick={onChangeHandler}
            type="button"
            id="furnished"
            value={true}
            className={`px-7 py-3 font-semibold text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !furnished ? "bg-white text-gray-700" : "bg-slate-600 text-white"
            }`}
          >
            yes
          </button>
          <button
            onClick={onChangeHandler}
            type="button"
            id="furnished"
            value={false}
            className={`px-7 py-3 font-semibold text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              furnished ? "bg-white text-gray-700" : "bg-slate-600 text-white"
            }`}
          >
            No
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold text-gray-800">Address</p>
        <textarea
          type="text"
          className="w-full rounded transition duration-150 ease-in-out text-gray-700 font-normal text-lg border-gray-300"
          id="address"
          placeholder="Address"
          value={address}
          onChange={onChangeHandler}
          required
        />
        <p className="text-lg mt-6 font-semibold text-gray-800">Description</p>
        <textarea
          type="text"
          className="w-full rounded transition duration-150 ease-in-out text-gray-700 font-normal text-lg border-gray-300"
          id="description"
          placeholder="Description"
          value={description}
          onChange={onChangeHandler}
          required
        />
        <p className="text-lg mt-6 font-semibold text-gray-800">Offer</p>
        <div className="flex space-x-5">
          <button
            onClick={onChangeHandler}
            type="button"
            id="offer"
            value={true}
            className={`px-7 py-3 font-semibold text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !offer ? "bg-white text-gray-700" : "bg-slate-600 text-white"
            }`}
          >
            yes
          </button>
          <button
            onClick={onChangeHandler}
            type="button"
            id="offer"
            value={false}
            className={`px-7 py-3 font-semibold text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              offer ? "bg-white text-gray-700" : "bg-slate-600 text-white"
            }`}
          >
            No
          </button>
        </div>
        <div className="w-full flex space-x-5">
          <div className="w-full">
            <p className="text-lg mt-6 font-semibold text-gray-800">
              Regular Price
              <span className="text-sm mt-6 font-normal text-gray-800">
                {" "}
                /Month
              </span>{" "}
            </p>
            <input
              className="w-full rounded transition duration-150 ease-in-out text-gray-700 font-normal text-lg border-gray-300"
              id="regularPrice"
              type="number"
              min="0"
              value={regularPrice}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="w-full">
            <p className="text-lg mt-6 font-semibold text-gray-800">
              Discounted Price{" "}
            </p>
            <input
              className="w-full rounded transition duration-150 ease-in-out text-gray-700 font-normal text-lg border-gray-300"
              id="discountedPrice"
              type="number"
              min="1"
              value={discountedPrice}
              onChange={onChangeHandler}
              required
            />
          </div>
        </div>
        <div>
          <p className="text-lg mt-6 font-semibold text-gray-800">Images </p>
          <p className="text-sm font-normal text-gray-600">
            The first image will be the cover (max 6).{" "}
          </p>
          <input
            className="w-full rounded transition duration-150 ease-in-out bg-white p-2 text-gray-700 font-normal text-lg border border-gray-300 focus:bg-white focus:border-slate-600"
            id="images"
            type="file"
            onChange={onChangeHandler}
            required
            multiple
            accept=".jpg, .jpeg, .png, .webp"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-6 mb-10 text-white bg-blue-600 p-[12px] text-[15px] font-medium rounded hover:bg-blue-700 transition duration-150 ease-in-out active:bg-blue-900 shadow-md hover:shadow-lg"
        >
          CREATE LISTING
        </button>
      </form>
    </main>
  );
}

export default CreateListing;
