import { Request, Response } from "express";
import { TagService } from "../../../application/service/tag.service";
import { Tag } from "../../../domain/entities/tag.entity";

export function createTagController (tagService: TagService) {
  return {
    getAllTags: async (req: Request, res: Response) => {
      try {
        const tags = await tagService.getAllTags();
        res.status(200).json(tags.map(tag => tag.toPlainObject()));
      } catch (err) {
        console.error("Error fetching tags:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    },

    getTagById: async (req: Request, res: Response) => {
      const id = parseInt(req.params.tagId, 10);
      try {
        const tag = await tagService.getTagById(id);
        if (!tag) {
          res.status(404).json({ error: "Tag not found" });
          return;
        }
        res.status(200).json(tag.toPlainObject());
      } catch (err) {
        console.error("Error fetching tag by ID:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    },

    createTag: async (req: Request, res: Response) => {
      const { tagName } = req.body;
      if (!tagName) {
        res.status(400).json({ error: "Missing tagName in request body" });
        return;
      }

      try {
        const newTag = await tagService.createTag({tagName});
        res.status(201).json(newTag?.toPlainObject());
      } catch (err) {
        console.error("Error creating tag:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    },

    editTag: async (req: Request<{ tagId: string }, {}, { tagName: string }>, res: Response) => {
      const id = parseInt(req.params.tagId, 10);
      try {
        const tag = await tagService.editTag(id, req.body);
        if (!tag) {
          res.status(404).json({ error: "Tag not found" });
          return;
        }
        res.status(200).json(tag.toPlainObject());
      } catch (err) {
        console.error("Error updating tag:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    },

    removeTagById: async (req: Request<{ tagId: string}>, res: Response) => {
      const id = Number(req.params.tagId);
      try {
        const success = await tagService.removeTagById(id);
        if (!success) {
          res.status(404).json({ error: "Tag not found" });
          return;
        }
        res.status(204).send(); // No content
      } catch (err) {
        console.error("Error deleting tag:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
};
