import "./globals.css";

export const metadata = {
  title: "Price Comparison Tool | Price Maven",
  description:
    "Price Maven is a powerful price comparison tool that helps users find the best deals on products from different retailers and marketplaces in one place. It's easy-to-use and provides all relevant information to make informed purchasing decisions.",
  openGraph: {
    title: "Price Comparison Tool | Price Maven ",
    description:
      "Price Maven is a powerful price comparison tool that helps users find the best deals on products from different retailers and marketplaces in one place. It's easy-to-use and provides all relevant information to make informed purchasing decisions.",
  },
  robots: {
    index: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
