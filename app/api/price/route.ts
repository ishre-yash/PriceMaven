import cheerio from "cheerio";

export async function POST(request: Request) {
  const { url } = await request.json();

  const res = await fetch(url);
  const html = await res.text();

  const $ = cheerio.load(html);

  const getAmazonData = ($: any) => {
    const title = $("#productTitle").text().trim();
    const image = $("#landingImage").attr("src");
    const rating = $("#acrPopover").first().attr("title");
    const totalReviews = $("#acrCustomerReviewText").first().text().trim();
    const discount = $(".savingsPercentage").text().trim();
    const price = $(".a-offscreen").first().text().trim();

    return new Response(
      JSON.stringify({
        ok: true,
        data: {
          image,
          title,
          price,
          rating,
          totalReviews,
          discount,
        },
      })
    );
  };

  const getFlipkartData = ($: any) => {
    const title = $(".B_NuCI").text().trim();
    const price = $(".B_NuCI").text().trim();
    const image = $(".CXW8mj").attr("src");

    return new Response(
      JSON.stringify({
        ok: true,
        data: {
          image,
          title,
          price,
        },
      })
    );
  };

  if (url.indexOf("amazon") > -1) {
    return getAmazonData($);
  } else if (url.indexOf("flipkart") > -1) {
    return getFlipkartData($);
  }

  return new Response(
    JSON.stringify({
      ok: false,
      error: "Invalid URL",
    })
  );
}
