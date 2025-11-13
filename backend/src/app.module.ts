import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';

import { TaskMaterialModule } from './TaskMaterial/TaskMaterial.module';
import { VersionModule } from './Version/Version.module';
import { AzureStorageModule } from './AzureStorageModule/azureStorage.module';



@Module({
  imports: [CoreModule,TaskMaterialModule,VersionModule,AzureStorageModule],
  
  providers: [],
})
export class AppModule {}
