"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const products = localStorage.getItem("products");
    if (products) {
      setProducts(JSON.parse(products));
    }
  }, []);
  return (
    <section className="max-w-7xl mx-auto py-6">
      <h2 className="text-2xl font-extrabold tracking-tight text-emerald-100 sm:text-3xl">
        View Products ({products.length} )
      </h2>
      <p className="mt-4 text-base text-gray-400">
        Price Maven allows users to track products from different retailers and
        marketplaces. Users can view the price history of their tracked products
        and receive price alerts when the price drops.
      </p>
      <section className="mt-6 flex flex-wrap gap-4">
        {/* filter buttons  */}
        <button
          onClick={() =>
            setProducts(JSON.parse(localStorage.getItem("products") || "[]"))
          }
          className="bg-gray-800 text-gray-400 rounded-lg px-4 py-2"
        >
          All
        </button>
      </section>
      <section className="py-6 grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
        {products.length === 0 && (
          <>
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  className="animate-pulse bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                  key={i}
                >
                  <div className="h-56 w-full bg-gray-400"></div>
                  <section className="p-4 flex gap-4 flex-col">
                    <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-400 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-400 rounded w-1/2"></div>
                  </section>
                </div>
              ))}
          </>
        )}
        {products.map((product: any, i: any) => (
          <ProductCard
            key={i}
            image={product.image}
            title={product.title}
            price={product.price}
            discount={product.discount}
            date={product.date}
            href={product.href}
            setProducts={setProducts}
          />
        ))}
      </section>
    </section>
  );
}

const ProductCard = ({
  image,
  title,
  price,
  discount,
  date,
  href,
  setProducts,
}: {
  image?: string;
  title: string;
  price: string;
  rating?: number;
  totalReviews?: number;
  discount?: string;
  date?: string;
  href: string;
  setProducts: any;
}) => {
  const [remove, setRemove] = useState(false);
  return (
    <section className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <Link href={href}>
        <div>
          <img className="h-full w-full object-cover" src={image} alt={title} />
        </div>
      </Link>

      <section className="p-4">
        <Link href={href} className="text-lg font-medium text-gray-100">
          {title}
        </Link>
        <p className="mt-1 text-sm text-gray-400">
          View price history and receive price alerts
        </p>

        <section className="mt-4 flex flex-wrap items-center">
          <span className="text-sm font-medium text-gray-100">{price}</span>

          <span className="ml-3 text-sm font-medium text-green-400">
            {discount && `${discount} off`}
          </span>

          <span className="ml-auto text-sm font-medium text-gray-400">
            {date && date}
          </span>

          <button
            className="ml-3 text-sm font-medium text-gray-400"
            onClick={() => setRemove(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
              />
            </svg>
          </button>
          {remove && (
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 transition-opacity"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <div
                  className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                >
                  <div className="bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gray-800 sm:mx-0 sm:h-10 sm:w-10">
                        <svg
                          className="h-6 w-6 text-red-600"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                          className="text-lg leading-6 font-medium text-gray-200"
                          id="modal-headline"
                        >
                          Remove Product
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to remove this product? You
                            can&apos;t undo this action afterwards.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      onClick={() => {
                        setProducts((products: any) =>
                          products.filter(
                            (product: any) => product.title !== title
                          )
                        );
                        // remove from local storage
                        const products = JSON.parse(
                          localStorage.getItem("products") || "[]"
                        ).filter((product: any) => product.title !== title);
                        localStorage.setItem(
                          "products",
                          JSON.stringify(products)
                        );
                        setRemove(false);
                      }}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Remove
                    </button>

                    <button
                      type="button"
                      onClick={() => setRemove(false)}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-700 shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-gray-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </section>
    </section>
  );
};
