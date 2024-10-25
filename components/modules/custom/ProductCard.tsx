import { Skeleton } from "@/components/ui/skeleton";
import {
  getBestPriceWithDiscountFromProduct,
  getBestPriceWithoutDiscountFromProduct,
  getDiscountRate,
} from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
//import { Rating } from "@mui/material";
import CurrencyFormat from "./CurrencyFormat";
import Rating from "./Rating";
import Toast from "../custom/Toast";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { CartItem, Product } from "@/types";
import { IRootState } from "@/store";
import { addToCart, updateCart } from "@/store/cartSlice";
import useCartModal from "@/hooks/useCartModal";

export default function ProductCard({
  item,
  loading,
}: {
  item: Product;
  loading: boolean;
}) {
  const active = 0;
  const product = item?.subProducts[active];
  const options = product?.options[active];
  const images = options?.images;

  const bestPiceWithDiscount = getBestPriceWithDiscountFromProduct(item);
  const bestPiceWithoutDiscount = getBestPriceWithoutDiscountFromProduct(item);

  const discountRate = getDiscountRate(
    bestPiceWithoutDiscount,
    bestPiceWithDiscount
  );

  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const { cart } = useSelector((state: IRootState) => ({ ...state }));
  const cartModal = useCartModal();

  const [isLoading, setLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

   // Function to check if the product is already in the cart
   const isProductInCart = (): boolean => {
    const _uid: string = `${item._id}_${active}_${0}`;
    return cart.cartItems.some((cartItem: CartItem) => cartItem._uid === _uid);
  };

  useEffect(() => {
    setIsAdded(isProductInCart());
  }, [cart, item]);

  const addTocartHandler = async () => {
    setLoading(true);
    setIsAdded(true)
    await axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/api/cart", {
        params: {
          id: item._id,
          style: active,
          option: 0,
        },
      })
      .then((response) => {
        const data = response.data;
        if (qty > response.data.stock) {
          toast.custom(
            <Toast
              message="the stock is limited reduce quantity"
              status="error"
            />
          );
          setLoading(false);
          return;
        }

        // add to cart
        const _uid: string = `${data._id}_${data.styleBefore}_${data.optionBefore}`;

        const exist: CartItem | undefined = cart.cartItems.find(
          (p: CartItem) => p._uid === _uid
        );

        if (exist) {
          //the product option exist in cart so updated it
          const newCart = cart.cartItems.map((p: CartItem) => {
            // update for a single option
            if (p === exist) {
              return { ...p, qty: qty }; // get everything and change the qty
            }
            setLoading(false);
            return p;
          });

          dispatch(updateCart(newCart));
          toast.custom(<Toast message="Product updated" status="success" />);
        } else {
          //option not in the cart so added as new
          dispatch(
            addToCart({
              ...data,
              qty,
              option: data.option,
              _uid,
            })
          );
          toast.custom(
            <Toast message="Product added to cart" status="success" />
          );
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleBuyNow = () => {
    // Redirect to checkout or cart page for "Buy Now"
    addTocartHandler();
    cartModal.onOpen();
  };


  return (
    <div className="flex flex-col items-center gap-2 bg-transparent rounded-md pb-4 group">
      <Link
        href={`/products/${item.slug}`}
        className="flex relative p-1 justify-center items-center"
      >
        {loading ? (
          <Skeleton className="h-[30vh]" />
        ) : (
          <div
            style={{
              height: "30vh",
              width: "160px",
              position: "relative",
              backgroundImage: `url(${images[0]})`,
              backgroundPosition: "center center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        )}

        {options.discount > 0 && (
          <div className="absolute top-20 left-0">
            <span className="text-white text-base bg-yellow-600 px-2 py-1 rounded-r-md font-bold">
              -{options.discount}%
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-col gap-2 px-4 items-start">
        {/* Rating */}
        <div className="inline-flex text-slate-300 items-center">
        <Rating value={4.5} max={5} size={18} readOnly={true} />

          {/*<Rating
            name="rating"
            value={parseFloat("4")}
            precision={0.5}
            readOnly
            className="mb-2"
          />*/}
          <span className="ms-4 font-bold text-xs text-gray-600">
            ({item.reviews.length})
          </span>
        </div>

        <Link href={`/products/${item.slug}`} className="flex relative ">
          <h1 className="h-14 text-xs text-clip text-justify text-pretty capitalize my-4 lg:text-sm">
            {item.name.substring(0, 60)}...
          </h1>
        </Link>
      </div>

      {/* Price Section */}
      <div className="flex relative justify-between mb-2 px-4 w-full">
        {discountRate > 0 ? (
          <div className="flex flex-col gap-1">
            <CurrencyFormat
              value={bestPiceWithDiscount}
              className="font-bold text-primary-900 text-lg"
            />
            <CurrencyFormat
              value={bestPiceWithoutDiscount}
              className="line-through text-sm text-gray-500"
            />
          </div>
        ) : (
          <CurrencyFormat
            value={bestPiceWithDiscount}
            className="font-bold text-primary-900 text-lg"
          />
        )}
      </div>

      {/* Add to Cart and Buy Now Buttons */}
      <div className="flex flex-row gap-1 w-full px-1">
        <button
          onClick={addTocartHandler}
          className={`w-full py-2 px-1 rounded-full  font-light text-xs ${
            isAdded ? "bg-slate-900 text-white" : "bg-white hover:bg-slate-500 hover:text-white"
          } transition-all duration-300`}
        >
          {isAdded ? "Added" : "Add to Cart"}
        </button>

        <button
          onClick={handleBuyNow}
          className="w-full py-2 px-1 rounded-full bg-yellow-500 text-white font-light text-xs hover:bg-yellow-600 transition-all duration-300"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
