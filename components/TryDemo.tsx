"use client";
import React, { useState } from "react";

export default function TryDemo() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("Enter Url");
  const [data, setData] = useState<{
    name: string;
    price: string;
  }>();
  const [showResult, setShowResult] = useState(false);
  const [validate, setValidate] = useState(false);

  //   validate url
  const isValidUrl = (url: string) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    const result = !!pattern.test(url);
    if (result) {
      setValidate(true);
      setShowError(false);
    } else {
      setValidate(false);
      setShowError(true);
      setError("Invalid URL");
    }
    return result;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validate) {
      if (url.length > 0) {
        setShowError(true);
        setError("Invalid URL");
        return;
      } else {
        setShowError(true);
        setError("Enter Url");
        return;
      }
    }

    setLoading(true);
    setShowResult(false);

    const res = await fetch("/api/price", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (res.ok) {
      const data = await res.json();
      setData(data.data);
      setShowResult(true);
    } else {
      setError(await res.text());
    }

    setLoading(false);
  };

  return (
    <section className="max-w-3xl mx-auto py-6">
      <h2 className="text-2xl font-extrabold tracking-tight text-emerald-100 sm:text-3xl">
        Try Demo
      </h2>
      <div className="mt-4 text-base text-gray-400">
        <p>
          You can try the demo version of Price Maven by entering the URL of a
          product page from Amazon, Walmart, Best Buy, or Target.
        </p>
        <form
          className="mt-4 flex flex-col items-center justify-center "
          onSubmit={handleSubmit}
        >
          <section className="mt-4 flex w-full">
            <label htmlFor="url" className="sr-only">
              URL
            </label>
            <div className="relative flex items-stretch flex-grow focus-within:z-10">
              <input
                type="text"
                name="url"
                id="url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  isValidUrl(e.target.value);
                }}
                className="flex-1 appearance-none border border-transparent w-full py-2 px-4 bg-gray-800 text-gray-400 placeholder-gray-500 sm:text-sm rounded-md"
                placeholder="https://www.amazon.com/..."
              />
              <button
                onClick={() => {
                  navigator.clipboard
                    .readText()
                    .then((text) => {
                      setShowError(false);
                      setUrl(text);
                      setValidate(isValidUrl(text));
                    })
                    .catch((err) => {
                      setShowError(true);
                      setError("Failed to read clipboard contents");
                    });
                }}
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm font-medium text-gray-300 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-gray-400"
                >
                  <path
                    fill="currentColor"
                    d="M12 5q.425 0 .713-.288T13 4q0-.425-.288-.713T12 3q-.425 0-.713.288T11 4q0 .425.288.713T12 5ZM5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h4.175q.275-.875 1.075-1.438T12 1q1 0 1.788.563T14.85 3H19q.825 0 1.413.588T21 5v14q0 .825-.588 1.413T19 21H5Zm0-2h14V5h-2v1q0 .825-.588 1.413T15 8H9q-.825 0-1.413-.588T7 6V5H5v14Z"
                  />
                </svg>
              </button>
            </div>
            {validate ? (
              <div className="ml-3 flex items-center text-sm font-medium text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-emerald-600"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m10.5 13.4l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7l-5.6 5.6q-.3.3-.7.3t-.7-.3l-2.6-2.6q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l1.9 1.9Z"
                  />
                </svg>
              </div>
            ) : (
              <div className="ml-3 flex items-center text-sm font-medium text-gray-300">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-emerald-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1Z"
                  ></path>
                </svg>
              </div>
            )}
          </section>
          {showError && (
            <div className="mt-2 flex items-center text-xs font-medium text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-red-600"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                />
              </svg>
              <p className="ml-2">{error}</p>
            </div>
          )}
          <button
            type="submit"
            onClick={(e: any) => {
              if (!validate) {
                setError("Please enter a valid URL");
              }
              handleSubmit(e);
            }}
            className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            {loading ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1Z"
                ></path>
              </svg>
            ) : (
              "Check Price"
            )}
          </button>
        </form>

        {/* preview  */}
        {showResult && (
          <section className="mt-4">
            <div className="bg-gray-900 shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-100">
                  Preview
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-400">
                  This is a preview of the product you are about to add to the
                  database.
                </p>
              </div>
              <div className="border-t border-gray-800">
                <dl className="bg-gradient-to-tl from-gray-700 via-gray-900 to-black">
                  <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Product Name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
                      {data?.name}
                    </dd>
                  </div>
                  <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Product Price
                    </dt>
                    <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
                      {data?.price}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>
        )}
      </div>
    </section>
  );
}
