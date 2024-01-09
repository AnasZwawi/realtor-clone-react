import { formatDistanceToNow } from "date-fns";
import React from "react";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

function ListingItem({ listing, id, onDelete, onEdit }) {
  const relativeTime = formatDistanceToNow(listing.timestamp.toDate());
  return (
    <li className="bg-white relative flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-lg overflow-hidden transition-shadow duration-150 ease-in-out m-[10px]">
      <Link className="contents" to={`/category/${listing.type}/${id}`}>
        <div className="h-[170px] object-cover w-full overflow-hidden">
          <img
            src={listing.imgUrls[0]}
            alt="house image"
            loading="lazy"
            className="h-[170px] object-cover w-full hover:scale-110 transition-scale duration-200 ease-in"
          />
        </div>
        <p className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg">
          {relativeTime} ago
        </p>
        <div className="w-full p-[10px]">
          <div className="flex items-center space-x-[2px]">
            <MdLocationOn className="h-4 w-4 mb-[3px] text-green-600" />
            <p className="font-semibold text-sm mb-2px text-gray-600 mb-[2px] truncate">
              {listing.houseLocation.city} ,{listing.houseLocation.admin_name}
            </p>
          </div>
          <p className="font-semibold m-0 text-xl truncate">{listing.name}</p>
          <p className="text-md text-[#5292bb] mt-1 font-semibold">
            {listing.offer ? listing.discountedPrice : listing.regularPrice}
            TND
            {listing.type == "rent" ? (
              <span className="">
                {" "}
                {`${listing.costMonth ? " /Month" : " /Night"}`}{" "}
              </span>
            ) : (
              ""
            )}
          </p>
          <div className="flex justify-between items-center">
            <div className="mt-[10px] space-x-3">
              <span className="font-bold text-xs">
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} Bedrooms`
                  : "1 Bedroom"}
              </span>
              <span className="font-bold text-xs">
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Bathrooms`
                  : "1 Bathroom"}
              </span>
            </div>
          </div>
        </div>
      </Link>
      <div className="absolute bottom-3 right-2 flex mt-4 space-x-3">
        {onEdit && (
          <MdModeEdit
            className="cursor-pointer scale-[1.15]"
            onClick={() => onEdit(listing.id)}
          />
        )}
        {onDelete && (
          <FaTrash
            className="text-red-600 cursor-pointer"
            onClick={() => onDelete(listing.id)}
          />
        )}
      </div>
    </li>
  );
}

export default ListingItem;
