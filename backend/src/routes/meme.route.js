import { Router } from "express";

const router = Router();

router.get("/meme", async (req, res) => {
  try {
    let data, imageUrl;

    // Keep requesting until we get a real image
    while (true) {
      const response = await fetch("https://meme-api.com/gimme");
      data = await response.json();
      imageUrl = data.url;

      if (
        imageUrl.endsWith(".jpg") ||
        imageUrl.endsWith(".png") ||
        imageUrl.endsWith(".jpeg")
      ) {
        break;
      }
    }

    res.json({
      title: data.title,
      image: imageUrl
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch meme" });
  }
});

export default router;
