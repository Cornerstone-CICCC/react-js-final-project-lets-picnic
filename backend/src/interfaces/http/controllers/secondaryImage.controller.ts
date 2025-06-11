import { Request, Response } from "express";
import { SecondaryImageService } from "../../../application/service/secondaryImage.service";

export function createSecondaryImageController(secondaryImageService: SecondaryImageService) {
  return {
    getAllSecondaryImages: async (_req: Request, res: Response) => {
      try {
        const images = await secondaryImageService.getAllSecondaryImages();
        res.status(200).json(images.map(img => img.toPlainObject()));
      } catch (err) {
        res.status(500).json({ error: "Failed to fetch secondary images" });
      }
    },

    getSecondaryImageById: async (req: Request, res: Response) => {
      const id = Number(req.params.id);
      try {
        const image = await secondaryImageService.getSecondaryImageById(id);
        if (!image) {
          res.status(404).json({ error: "Secondary image not found" });
          return;
        }
        res.status(200).json(image.toPlainObject());
      } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
      }
    },

    createSecondaryImage: async (req: Request, res: Response) => {
      const { image } = req.body;
      if (!image) {
        res.status(400).json({ error: "Missing 'image' field" });
        return;
      }

      try {
        const newImage = await secondaryImageService.createSecondaryImage({ image });
        if (!newImage) {
          res.status(409).json({ error: "Secondary image creation failed" });
          return;
        }
        res.status(201).json(newImage.toPlainObject());
      } catch (err) {
        res.status(500).json({ error: "Failed to create secondary image" });
      }
    },

    removeSecondaryImageById: async (req: Request, res: Response) => {
      const id = Number(req.params.id);
      try {
        const deleted = await secondaryImageService.removeSecondaryImageById(id);
        if (!deleted) {
          res.status(404).json({ message: "Secondary image not found" });
          return;
        }
        res.status(200).json({ message: "Secondary image deleted" });
      } catch (err) {
        res.status(500).json({ message: "Failed to delete secondary image" });
      }
    },
  };
}
