import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AzureStorageService } from "./azureStorage.service";

@Controller("azure")
export class AzureStorageController {
  constructor(private readonly azureService: AzureStorageService) {}


  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException("No file uploaded");
    }

    const filename = await this.azureService.uploadFile(file);
    const url = await this.azureService.getFileUrl(filename);
    return { filename, url };
  }

 
  @Get("list")
  async list() {
    const files = await this.azureService.listFiles();
    return { files };
  }


  @Get("view/:name")
  async getUrl(@Param("name") name: string) {
    const url = await this.azureService.getFileUrl(name);
    return { url };
  }


  @Delete(":name")
  async delete(@Param("name") name: string) {
    await this.azureService.deleteFile(name);
    return { message: `${name} deleted successfully` };
  }
}
