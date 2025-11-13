import{Module} from'@nestjs/common'
import {  TaskMaterialController } from './TaskMaterial.Controller'
import { TaskMaterialService } from './TaskMaterial.service'
import { DatabaseService } from 'src/database/database.service'
import { StorageManagement } from 'src/StorageManagement/Storage.service'
import { AzureStorageModule } from 'src/AzureStorageModule/azureStorage.module'
import { AzureStorageService } from 'src/AzureStorageModule/azureStorage.service'
@Module({
    controllers:[ TaskMaterialController],
    providers:[TaskMaterialService,DatabaseService,StorageManagement,AzureStorageService]
})
export class TaskMaterialModule{}