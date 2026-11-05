import { contentService } from "./content.service.js";

export class ContentController {
  async getContent(req, res, next) {
    try {
      const content = await contentService.getContent();
      res.status(200).json({
        data: content,
        message: "Site content fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async updateContent(req, res, next) {
    try {
      const updated = await contentService.updateContent(req.body);
      res.status(200).json({
        data: updated,
        message: "Site content updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export const contentController = new ContentController();
