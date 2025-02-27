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
    // Decode once to ensure proper URL reconstruction
    const decodedUrl = decodeURIComponent(url);

    // Reconstruct full target URL with additional query parameters
    const queryString = new URLSearchParams(queryParams).toString();
    const finalUrl = queryString ? `${decodedUrl}?${queryString}` : decodedUrl;

    console.log("Fetching:", finalUrl); // Debugging: Ensure full URL is correct

    const response = await fetch(finalUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    // Stream response properly (prevent truncation)
    const data = await response.text(); 
    try {
      const jsonData = JSON.parse(data);
      res.status(200).json(jsonData);
    } catch (jsonError) {
      console.error("JSON Parse Error:", jsonError);
      res.status(200).send(data); // Send raw text if JSON parsing fails
    }

  } catch (error) {
    console.error("Error fetching URL:", error.message);
    res.status(500).json({ error: "Failed to fetch the requested URL" });
  }
}
