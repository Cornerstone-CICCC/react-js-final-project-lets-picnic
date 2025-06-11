import { Router } from "express";
import { TagService } from "../../../application/service/tag.service";
import tagRepository from "../../../infrastructure/repositories/tag.repository";
import { createTagController } from "../controllers/tag.controller";

const tagRouter = Router();

const tagService = new TagService(tagRepository);
const tagController = createTagController(tagService);

tagRouter.get("/", tagController.getAllTags);
tagRouter.get("/:tagId", tagController.getTagById);
tagRouter.post("/", tagController.createTag);
tagRouter.put("/:tagId", tagController.editTag);
tagRouter.delete("/:tagId", tagController.removeTagById);

export default tagRouter;
