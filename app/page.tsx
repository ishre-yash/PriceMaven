import TryDemo from "@/components/TryDemo";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const feachers = [
    "Compare prices from different retailers and marketplaces",
    "Find the best deals on products",
    "Get all relevant information to make informed purchasing decisions",
  ];
  return (
    <main
      className={`${inter.className} bg-gradient-to-tl from-gray-700 via-gray-900 to-black`}
    >
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <section className="max-w-3xl mx-auto py-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-emerald-100 sm:text-5xl">
            Price Maven
          </h1>
          <p className="mt-4 text-base text-gray-400">
            Price Maven is a powerful price comparison tool that helps users
            find the best deals on products from different retailers and
            marketplaces in one place. It&apos;s easy-to-use and provides all
            relevant information to make informed purchasing decisions.
          </p>
        </section>
        <TryDemo />
        <section className="max-w-3xl mx-auto py-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-emerald-100 sm:text-3xl">
            Features
          </h2>
          <ul className="mt-4 space-y-4">
            {feachers.map((feacher, i) => (
              <li className="flex" key={i}>
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-emerald-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-base text-gray-400">{feacher}</p>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}
