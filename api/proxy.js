export default async function handler(req, res) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins (or restrict to your domain)
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Get the target URL from query parameters
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing 'url' parameter" });
  }

  try {
    // Fetch data from the target API
    const response = await fetch(decodeURIComponent(url), {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    // Return JSON response
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching URL:", error.message);
    res.status(500).json({ error: "Failed to fetch the requested URL" });
  }
}
