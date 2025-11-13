import { Module } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { VersionController } from "./Version.Controller";
import { VersionService } from "./Version.service";
 import { StorageManagement } from 'src/StorageManagement/Storage.service'
 import { AzureStorageService } from 'src/AzureStorageModule/azureStorage.service'
 @Module({
    controllers:[VersionController],
    providers:[VersionService,StorageManagement,DatabaseService,AzureStorageService]

 })
 export class VersionModule{}
