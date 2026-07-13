import FirecrawlApp from "@mendable/firecrawl-js";
import redis from "@/lib/redis";

let firecrawlInstance = null;

function getFirecrawl() {
  if (!firecrawlInstance) {
    const key = process.env.FIRECRAWL_API_KEY;
    firecrawlInstance = new FirecrawlApp({
      apiKey: key || "missing_key",
    });
  }
  return firecrawlInstance;
}

export async function scrapeProduct(url) {
  try {
    const cacheKey = `scrape:${url}`;
    const cachedResult = await redis.get(cacheKey);

    if (cachedResult) {
      console.log(`[Cache Hit] Serving ${url} from Redis`);
      return JSON.parse(cachedResult);
    }

    console.log(`[Cache Miss] Scraping ${url} with Firecrawl`);
    const firecrawl = getFirecrawl();
    const result = await firecrawl.scrape(url, {
      formats: [{
        type: "json",
        prompt:
          "Extract the product name as 'productName', current price as a number as 'currentPrice', currency code (USD, EUR, etc) as 'currencyCode', and product image URL as 'productImageUrl' if available",
        schema: {
          type: "object",
          properties: {
            productName: { type: "string" },
            currentPrice: { type: "number" },
            currencyCode: { type: "string" },
            productImageUrl: { type: "string" },
          },
          required: ["productName", "currentPrice"],
        },
      }],
    });

    // Firecrawl returns data in result.extract
    const extractedData = result.json;

    if (!extractedData || !extractedData.productName) {
      throw new Error("No data extracted from URL");
    }

    // Cache the result for 1 hour (3600 seconds)
    await redis.set(cacheKey, JSON.stringify(extractedData), 'EX', 3600);

    return extractedData;
  } catch (error) {
    console.error("Firecrawl scrape error:", error);
    throw new Error(`Failed to scrape product: ${error.message}`);
  }
}