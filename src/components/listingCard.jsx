"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { getUserWishlists } from "@/lib/host";
import { usePathname, useRouter } from "next/navigation";
import {
  deleteListingAPI,
  addToWishList,
  removeFromWishList
 } from "@/lib/host";

import { useAppStore } from "@/store/store";
import { IoMdHeart } from "react-icons/io";

export default function ListingCard({
  data,
  isMyListing = false,
  isWishList = false,
}) {
  const {
    removeUserListing,
    userInfo,
    wishLists,
    wishListsPage,
    setWishListsPage,
    setWishLists,
  } = useAppStore();

  const pathname = usePathname();

  const router = useRouter();

  // fetch the wishlist if the user logged in.
  useEffect(() => {
    const getData = async () => {
      const wishlists = await getUserWishlists();
      setWishListsPage(wishlists);
      // set wishlists ids in wishLists
      // Extract IDs from the wishlists and set them in wishLists
      const wishlistIds = wishlists.map((wishlist) => wishlist.id);
      setWishLists(wishlistIds);
    };
    getData();
  }, []);


  const deleteListing = async () => {
    await deleteListingAPI(data?.id);
    removeUserListing(data.id);
  };

  const addWishList = async () => {
    await addToWishList(data.id);

    // Add to wishListsPage
    const updatedWishListPage = wishListsPage;
    updatedWishListPage.push(data)
    setWishListsPage(updatedWishListPage);

    // Add to wishLists array
    const updatedWishlist = wishLists;
    updatedWishlist.push(data.id);
    setWishLists(updatedWishlist);
    console.log(wishLists);
  };

  const deleteWishList = async () => {
    await removeFromWishList(data.id);
    // Remove from wishListsPage
    const updatedWishListsPage = wishListsPage.filter((list) => list.id !== data.id);

    // Remove from wishlist (wishLists contains only IDs)
    const updatedWishlist = wishLists.filter((id) => id !== data.id);

    // Update state with new arrays
    setWishListsPage(updatedWishListsPage);
    setWishLists(updatedWishlist);
    console.log(wishLists);
  };

  return (
    <div className="flex items-center justify-center flex-col gap-1">
      <div
        className="flex items-center justify-center cursor-pointer w-full "
        onClick={() => router.push(`/homes/${data.id}`)}
      >
        <div className="flex flex-col gap-2">
          <div className="relative w-64 h-56">
            <Image
              src={data?.photos[0]}
              fill
              alt="My Host photos"
              className="rounded-lg object-cover shadow-md shadow-blue-400"
            />
            {pathname === "/" && userInfo && (
              <div className="absolute z-20 right-2 top-2">
                <IoMdHeart
                  style={{ stroke: "white", strokeWidth: "40" }}
                  className={`text-3xl ${
                    wishLists?.includes(data.id)
                      ? "text-[#ff272799]"
                      : "text-[#00000099]"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (wishLists?.includes(data.id)) {
                      deleteWishList();
                    } else addWishList();
                  }}
                />
              </div>
            )}
          </div>
          <div>
            <h3>{data.title}</h3>
            <span>${data.price} night</span>
          </div>
        </div>
      </div>
      {isMyListing && (
        <button
          className="focus:outline-none bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300  py-3 mt-5  px-5 text-white text-base font-medium rounded-md cursor-pointer w-64"
          onClick={deleteListing}
        >
          Delete
        </button>
      )}
      {isWishList && (
        <button
          className="focus:outline-none bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300  py-3 mt-5  px-5 text-white text-base font-medium rounded-md cursor-pointer w-64"
          onClick={deleteWishList}
        >
          Delete
        </button>
      )}
    </div>
  );
}