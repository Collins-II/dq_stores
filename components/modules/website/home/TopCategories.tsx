"use client";
import React, { useEffect, useState } from "react";
import Container from "../../custom/Container";
import { Category } from "@/types";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Loading from "../../custom/Loading";

export default function TopCategories() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // get api
  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      await axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/api/categories")
        .then((response) => {
          setCategories(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getCategories();
  }, []);

  return (
    <section className="py-10 w-full">
      <Container>
        {loading && <Loading isLoading={loading} />}
        <div className="flex w-full gap-10 justify-center flex-wrap xl:justify-between xl:flex-nowrap">
          <div className="flex-col flex items-center gap-4 xl:items-start ">
            <h1 className="text-2xl leading-8 text-center font-bold lg:text-left">
              Top Categories in Sales and Trending
            </h1>
            <h2 className="text-sm max-w-screen-md mt-4 text-center">
              Last mont up to 1500+ Products Sales From this category. You can
              choose a Product from from here and save money
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 ">
            {categories &&
              categories.slice(0, 4).map((item: Category, idx: number) => (
                <Link
                key={idx}
                href={`/categories/${item.link}/products`}
                className="relative flex flex-col items-center justify-between rounded-md border border-gray-200 px-4 pt-6 cursor-pointer hover:border-primary-500 transition-all duration-300"
              >
                <Image
                  src={item.image}
                  alt={`${item.name} category image`}
                  width="120"
                  height="120"
                  className="object-cover"
                />
                <h3 className="absolute top-4 right-4 bg-neutral-200 rounded-2xl py-1 px-2 text-slate-900 capitalize text-sm text-center">
                  {item.name.length > 10 ? `${item.name.slice(0, 10)}...` : item.name}
                </h3>
              </Link>
              ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
