import Banner from "@/components/Banner/index";
import Header from "@/components/Header/index";
import ProductFeed from "@/components/ProductFeed/index";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {

  const [products, setProducts] = useState();

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      <Header />

      <main className="max-w-screen-2xl mx-auto">

        <Banner />

        <ProductFeed product = {products} />
      </main>
    </div>
  );
}
