import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  BlobSASPermissions,
  SASProtocol,
  generateBlobSASQueryParameters,
  ContainerClient,
} from "@azure/storage-blob";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AzureStorageService {
  private readonly blobServiceClient: BlobServiceClient;
  private readonly containerClient: ContainerClient;
  private readonly sharedKeyCredential: StorageSharedKeyCredential;

  constructor() {
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
    const containerName = process.env.AZURE_STORAGE_CONTAINER;

    if (!accountName || !accountKey || !containerName) {
      throw new Error("Azure Storage configuration is missing in .env");
    }

    this.sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
    this.blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net`,
      this.sharedKeyCredential
    );
    this.containerClient = this.blobServiceClient.getContainerClient(containerName);
  }

  
  async uploadFile(file: Express.Multer.File , filename?: string): Promise<string> {
    const blobName = `${Date.now()}--${file.originalname}`;
    const blobClient = this.containerClient.getBlockBlobClient(blobName);
    await blobClient.uploadData(file.buffer, {
      blobHTTPHeaders: { blobContentType: file.mimetype },
    });
    return blobName;
  }

 
  async deleteFile(filename: string): Promise<void> {
    const blobClient = this.containerClient.getBlockBlobClient(filename);
    await blobClient.deleteIfExists();
  }

  
  async listFiles(): Promise<string[]> {
    const result: string[] = [];
    for await (const blob of this.containerClient.listBlobsFlat()) {
      result.push(blob.name);
    }
    return result;
  }
//gen tkn valid per 1year

  async getFileUrl(filename: string): Promise<string> {
    const blobClient = this.containerClient.getBlobClient(filename);
    const sasOptions = {
      containerName: this.containerClient.containerName,
      blobName: filename,
      permissions: BlobSASPermissions.parse("r"), // read-only
      startsOn: new Date(),
       expiresOn: new Date("2026-12-31"),// 1 year
      protocol: SASProtocol.Https,
    };

    const sasToken = generateBlobSASQueryParameters(
      sasOptions,
      this.sharedKeyCredential
    ).toString();

    return `${blobClient.url}?${sasToken}`;
  }
}
