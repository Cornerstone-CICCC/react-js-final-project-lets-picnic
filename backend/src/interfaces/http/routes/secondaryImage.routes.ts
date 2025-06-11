import { Router } from "express";
import { SecondaryImageService } from "../../../application/service/secondaryImage.service";
import { createSecondaryImageController } from "../controllers/secondaryImage.controller";
import secondaryImageRepository from "../../../infrastructure/repositories/secondary.repository";




const secondaryImageRouter = Router()
const secondaryImageService = new SecondaryImageService(secondaryImageRepository);
const secondaryImageController = createSecondaryImageController(secondaryImageService)

secondaryImageRouter.get("/", secondaryImageController.getAllSecondaryImages);
secondaryImageRouter.get("/:id", secondaryImageController.getSecondaryImageById);
secondaryImageRouter.post("/", secondaryImageController.createSecondaryImage);
secondaryImageRouter.delete("/:id", secondaryImageController.removeSecondaryImageById);

export default secondaryImageRouter
