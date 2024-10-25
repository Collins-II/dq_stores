import ProductsPage from "@/components/modules/website/products/ProductsPage";
import { mergeOpenGraph } from "@/lib/mergeOpenGraph";
import { Metadata } from "next";
import React from "react";

export default function page() {
  return <ProductsPage />;
}

export const metadata: Metadata = {
  title: "DQ Stores",
  description: "Your home online shop!",
  icons: {
    icon: "/assets/images/logo.svg",
  },

  openGraph: mergeOpenGraph({
    title: "Products - DQ Stores",
    url: "/",
  }),
};
