// @ts-nocheck
import React, { useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import Location from "../components/Location";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth } from 'firebase/auth';
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router";
import Resizer from 'react-image-file-resizer';
import {ImageCompressor} from "image-compressor";

function CreateListing() {
  const navigate = useNavigate()
  const auth = getAuth();
  const [geolocationEnabled, setGeolocationEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [local, setLocal] = useState({});
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 0,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: false,
    costMonth: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    location: {},
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
    costMonth,
    images,
    location,
  } = formData;
  const [selectedImages, setSelectedImages] = useState([]);

  /*const handleImageChange = async (event) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      // @ts-ignore
      const compressedImages = await Promise.all(
        Array.from(files).map(async (image, index) => {
          const compressedImage = await compressAndResizeImage(image);
          return {
            0: dataURLtoFile(compressedImage, image.name),
            length: index + 1,
          };
        })
      );

      // Now, you can upload the compressed images to Firebase Storage
      setSelectedImages(compressedImages);
      console.log(files)
      const fineData = []
      compressedImages.forEach((tempp)=>{
        fineData.push(tempp[0])
      })

      console.log(fineData)
      if (event.target.files) {
        setFormData((prevState) => ({
          ...prevState,
          images: fineData,
        }));
      }
    }
  };

  const compressAndResizeImage = async (imageFile) => {
    return new Promise((resolve, reject) => {
      Resizer.imageFileResizer(
        imageFile,
        1000, // Max width
        1000, // Max height
        'JPEG', // Output type
        90, // Output quality
        0, // Rotation (0 for no rotation)
        async (uri) => {
          try {
            // @ts-ignore
            const compressedImage = await new ImageCompressor(dataURLtoFile(uri, imageFile.name), {
              quality: 0.8, // Compression quality (0 to 1)
            });
            resolve(compressedImage);
          } catch (error) {
            console.error('Error compressing image:', error.message);
            reject(error);
          }
        },
        'base64'
      );
    });
  };*/

  const handleImageChange = async (event) => {
    const files = event.target.files;
  
    if (files && files.length > 0) {
      const resizedImages = await Promise.all(
        Array.from(files).map(async (image) => {
          return await resizeImage(image);
        })
      );
  
      setSelectedImages(resizedImages);
      if (event.target.files) {
        setFormData((prevState) => ({
          ...prevState,
          images: resizedImages,
        }));
      }
    }
  };
  
  const resizeImage = async (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
  
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
  
          // Resize the image to a max width and max height
          const maxWidth = 1000;
          const maxHeight = 1000;
          const compressionQuality = 0.8; // Set your desired compression quality (0 to 1)
  
          let width = img.width;
          let height = img.height;
  
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }
  
          canvas.width = width;
          canvas.height = height;
  
          // Draw the image on the canvas after resizing
          ctx.drawImage(img, 0, 0, width, height);
  
          // Convert the canvas content to a Blob with compression
          canvas.toBlob(
            (blob) => {
              const resizedImage = new File([blob], imageFile.name, {
                type: imageFile.type,
              });
              resolve(resizedImage);
            },
            imageFile.type, // Maintain the original image type
            compressionQuality // Set the compression quality
          );
        };
      };
  
      reader.onerror = (error) => {
        console.error("Error reading image:", error);
        reject(error);
      };
  
      // Read the image file as a data URL
      reader.readAsDataURL(imageFile);
    });
  };
 
  
  function onChangeHandler(event) {
    let boolean = null;
    if (event.target.value === "true") {
      boolean = true;
    }
    if (event.target.value === "false") {
      boolean = false;
    }
    if (event.target.files) {
        /* setFormData((prevState) => ({
          ...prevState,
          images: event.target.files,
        })); */
    }
    if (!event.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [event.target.id]: boolean ?? event.target.value,
      }));
    }
    if(event.target.type === "number"){
      setFormData((prevState) => ({
        ...prevState,
        [event.target.id]: event.target.valueAsNumber,
      }));
    }
    if (local) {
      console.log(local[0])
      setFormData((prevState) => ({
        ...prevState,
        location: local,
      }));
    }
  }

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    setLoading(true);
    if (discountedPrice >= regularPrice) {
      setLoading(false);
      toast.warning("Discounted price must be less than the regular price!");
      return;
    }
    if (images.length > 6) {
      setLoading(false);
      toast.warning("Maximum 6 images are allowed");
      return;
    }

    /* async function storeImage(image) {
      try {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}`;
        const storageRef = ref(storage, filename);
        
        const uploadTask = uploadBytesResumable(storageRef, image);
    
        const downloadURL = await new Promise((resolve, reject) => {
          uploadTask.on('state_changed',
            (snapshot) => {/* ... *//* },
            (error) => {
              console.error('Error uploading image:', error);
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((url) => resolve(url))
                .catch((error) => reject(error));
            }
          );
        });
    
        return downloadURL || ''; // Return a default value if downloadURL is undefined
      } catch (error) {
        console.error('Error storing image:', error);
        throw error; // Re-throw the error for further handling
      }
    } */

    async function storeImage(image){
      return new Promise((resolve, reject)=>{
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`
        const storageRef = ref(storage, filename);
        
        const uploadTask = uploadBytesResumable(storageRef, image);
        
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', 
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress.toFixed(0) + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
            // Handle unsuccessful uploads
            reject(error)
          }, 
          () => {
            // Handle successful uploads on complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      })
      
    }
    
    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))).catch((error) => {
      setLoading(false);
      toast.error("Can't updload images!");
      return;
    })
 
    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp(),
      houseLocation : location[0],
      userRef: auth.currentUser.uid,
    }
    delete formDataCopy.images
    delete formDataCopy.location
    !formDataCopy.offer && delete formDataCopy.discountedPrice
    const docRef = await addDoc(collection(db, 'listings'), formDataCopy);
    setLoading(false)
    toast.success('Listing Added Successfully')
    navigate(`/category/${formDataCopy.type}/${docRef.id}`)
  };

  if (loading) {
    return <Spinner />;
  }

  function returnLocation(loc) {
    const lila = loc;
    setLocal(lila);
  }

  return (
    <main className="max-w-md px-2 mx-auto">
      <h1 className="text-3xl mt-6 font-bold text-center text-gray-800">
        Create a Listing
      </h1>
      <form onSubmit={onSubmitHandler} className="mx-1">
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
              type="number"
              className="w-full rounded transition duration-150 ease-in-out text-gray-700 font-normal text-lg border-gray-300"
              id="bathrooms"
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

        <Location returnLocation={returnLocation} />
        <p className="text-lg mt-6 font-semibold text-gray-800">
          More Address Details{" "}
          <span className="text-sm text-gray-500">(optional)</span>{" "}
        </p>
        <textarea
          type="text"
          className="w-full rounded transition duration-150 ease-in-out text-gray-700 font-normal text-lg border-gray-300"
          id="address"
          placeholder="Address"
          value={address}
          onChange={onChangeHandler}
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
        {type === "rent" && (
          <>
            <p className="text-lg mt-6 font-semibold text-gray-800">Cost for</p>
            <div className="flex space-x-5">
              <button
                onClick={onChangeHandler}
                type="button"
                id="costMonth"
                value={true}
                className={`px-7 py-3 font-semibold text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                  !costMonth ? "bg-white text-gray-700" : "bg-slate-600 text-white"
                }`}
              >
                Month
              </button>
              <button
                onClick={onChangeHandler}
                type="button"
                id="costMonth"
                value={false}
                className={`px-7 py-3 font-semibold text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                  costMonth ? "bg-white text-gray-700" : "bg-slate-600 text-white"
                }`}
              >
                Night
              </button>
            </div>
          </>
        )}

        <div className="w-full flex space-x-5">
          <div className="w-full">
            <p className="text-lg mt-6 font-semibold text-gray-800">
              {offer ? "Regular" : ""} Price{" "}
              {type === "rent" && (
                <span className="text-sm mt-6 font-normal text-gray-800">
                  {costMonth ? " /Month" : " /Night"}
                </span>
              )}
            </p>
            <div className="relative">
              <p className="absolute z-50 top-3 right-8">TND</p>
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
          </div>
          {offer && (
            <div className="w-full">
              <p className="text-lg mt-6 font-semibold text-gray-800">
                Discounted Price
                {type === "rent" && (
                <span className="text-sm mt-6 font-normal text-gray-800">
                  {costMonth ? " /Month" : " /Night"}
                </span>
              )}
              </p>
              <div className="relative">
                <p className="absolute z-50 top-3 right-8">TND</p>
                <input
                  className="w-full rounded transition duration-150 ease-in-out text-gray-700 font-normal text-lg border-gray-300"
                  id="discountedPrice"
                  type="number"
                  min="1"
                  value={discountedPrice}
                  onChange={onChangeHandler}
                />
              </div>
            </div>
          )}
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
            onChange={handleImageChange}
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
