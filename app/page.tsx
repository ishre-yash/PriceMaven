import Products from "@/components/Products";
import TryDemo from "@/components/TryDemo";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`${inter.className} bg-gradient-to-tl from-gray-700 via-gray-900 to-black`}
    >
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-emerald-100 sm:text-5xl">
          Price Maven
        </h1>
        <p className="mt-4 text-base text-gray-400">
          Price Maven is a powerful price comparison tool that helps users find
          the best deals on products from different retailers and marketplaces
          in one place. It&apos;s easy-to-use and provides all relevant
          information to make informed purchasing decisions.
        </p>
        <TryDemo />
        <Products />
      </section>
    </main>
  );
}
