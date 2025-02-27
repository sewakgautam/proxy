import https from "https";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { url, ...queryParams } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing 'url' parameter" });
  }

  try {
    // Decode URL (single decode to avoid double-encoding issues)
    const decodedUrl = decodeURIComponent(url);
    
    // Append query parameters correctly
    const urlObj = new URL(decodedUrl);
    Object.entries(queryParams).forEach(([key, value]) => {
      urlObj.searchParams.append(key, value);
    });

    const finalUrl = urlObj.toString();
    console.log("Fetching URL:", finalUrl);

    const response = await fetch(finalUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
      },
      redirect: "follow", // Follow redirects
      agent: new https.Agent({ rejectUnauthorized: false }), // Allow HTTPS
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.text();

    try {
      res.status(200).json(JSON.parse(data));
    } catch {
      res.status(200).send(data); // Send raw text if JSON fails
    }

  } catch (error) {
    console.error("Proxy Error:", error.message);
    res.status(500).json({ error: "Failed to fetch the requested URL", details: error.message });
  }
}
