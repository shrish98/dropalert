import FirecrawlApp from '@mendable/firecrawl-js';

const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });

export async function scrapeProduct(url) {
  try {
    const extractResult = await app.extract([url], {
      prompt: "Extract the core product information from this product page.",
      schema: {
        type: "object",
        properties: {
          productName: { type: "string", description: "The full name or title of the product" },
          currentPrice: { type: "number", description: "The current numerical price of the product without currency symbols" },
          currencyCode: { type: "string", description: "The 3-letter currency code, e.g. USD, EUR, GBP" },
          productImageUrl: { type: "string", description: "The URL to the main product image" },
        },
        required: ["productName", "currentPrice", "currencyCode"]
      }
    });
    
    if (extractResult.success && extractResult.data && extractResult.data.length > 0) {
      return extractResult.data[0];
    } else if (extractResult.data && !Array.isArray(extractResult.data)) {
      // Sometimes returns a single object instead of array
      return extractResult.data;
    }
    
    return {};
  } catch (err) {
    console.error("Firecrawl extraction error:", err);
    return {};
  }
}
