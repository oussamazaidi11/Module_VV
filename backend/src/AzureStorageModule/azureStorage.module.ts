import { Module } from '@nestjs/common';
import { AzureStorageService } from './azureStorage.service';
import { AzureStorageController } from './azureStorage.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports:[MulterModule],
  providers: [AzureStorageService],
  controllers: [AzureStorageController], 
  exports: [AzureStorageService],
})
export class AzureStorageModule {}
