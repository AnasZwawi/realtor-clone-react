import React, { useState } from "react";

function CreateListing() {
  const [formData, setFormData] = useState({
    type: "rent",
    title: "",
    bedrooms: 0,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description : "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
  });

  const { type, title, bedrooms, bathrooms, parking, furnished, address, description, offer, regularPrice, discountedPrice } = formData;

  function onChangeHandler() {}

  return (
    <main className="max-w-md px-2 mx-auto">
      <h1 className="text-3xl mt-6 font-bold text-center text-gray-800">
        Create a Listing
      </h1>
      <form action="" className="mx-1">
        <p className="text-lg mt-6 font-semibold text-gray-800">Sell / Rent</p>
        <div className="flex space-x-5">
          <button
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
            type="button"
            id="type"
            value="sale"
            className={`px-7 py-3 font-semibold text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "sell"
                ? "bg-white text-gray-700"
                : "bg-slate-600 text-white"
            }`}
          >
            rent
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold text-gray-800">Title</p>
        <input
          className="w-full rounded transition duration-150 ease-in-out text-gray-700 font-normal text-lg border-gray-300"
          id="title"
          placeholder="Title"
          value={title}
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
            <p className="text-lg mt-6 font-semibold text-gray-800">Bathrooms</p>
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
            type="button"
            id="parking"
            value={parking}
            className={`px-7 py-3 font-semibold text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !parking
                ? "bg-white text-gray-700"
                : "bg-slate-600 text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="parking"
            value={parking}
            className={`px-7 py-3 font-semibold text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              parking
                ? "bg-white text-gray-700"
                : "bg-slate-600 text-white"
            }`}
          >
            No
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold text-gray-800">Furnished</p>
        <div className="flex space-x-5">
          <button
            type="button"
            id="furnished"
            value={furnished}
            className={`px-7 py-3 font-semibold text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !furnished
                ? "bg-white text-gray-700"
                : "bg-slate-600 text-white"
            }`}
          >
            yes
          </button>
          <button
            type="button"
            id="furnished"
            value={furnished}
            className={`px-7 py-3 font-semibold text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              furnished
                ? "bg-white text-gray-700"
                : "bg-slate-600 text-white"
            }`}
          >
            No
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold text-gray-800">Address</p>
        <textarea
          className="w-full rounded transition duration-150 ease-in-out text-gray-700 font-normal text-lg border-gray-300"
          id="Address"
          placeholder="Address"
          value={address}
          onChange={onChangeHandler}
          maxLength={"32"}
          minLength={"6"}
          required
        />
        <p className="text-lg mt-6 font-semibold text-gray-800">Description</p>
        <textarea
          className="w-full rounded transition duration-150 ease-in-out text-gray-700 font-normal text-lg border-gray-300"
          id="Description"
          placeholder="Description"
          value={description}
          onChange={onChangeHandler}
          maxLength={"32"}
          minLength={"6"}
          required
        />
        <p className="text-lg mt-6 font-semibold text-gray-800">Offer</p>
        <div className="flex space-x-5">
          <button
            type="button"
            id="offer"
            value={offer}
            className={`px-7 py-3 font-semibold text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !offer
                ? "bg-white text-gray-700"
                : "bg-slate-600 text-white"
            }`}
          >
            yes
          </button>
          <button
            type="button"
            id="offer"
            value={offer}
            className={`px-7 py-3 font-semibold text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              offer
                ? "bg-white text-gray-700"
                : "bg-slate-600 text-white"
            }`}
          >
            No
          </button>

        </div>
        <div className="w-full flex space-x-5">
          <div className="w-full">
            <p className="text-lg mt-6 font-semibold text-gray-800">Regular Price<span className="text-sm mt-6 font-normal text-gray-800"> /Month</span> </p>
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
            <p className="text-lg mt-6 font-semibold text-gray-800">Discounted Price </p>
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
          <p className="text-sm font-normal text-gray-600">The first image will be the cover (max 6). </p>
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
        <button type="submit" className="w-full mt-6 mb-10 text-white bg-blue-600 p-[12px] text-[15px] font-medium rounded hover:bg-blue-700 transition duration-150 ease-in-out active:bg-blue-900 shadow-md hover:shadow-lg" >CREATE LISTING</button>
      </form>
    </main>
  );
}

export default CreateListing;
