import{Module} from'@nestjs/common'
import { DatabaseService } from 'src/database/database.service'
import { StorageManagement } from './Storage.service'
@Module({
    providers:[DatabaseService,StorageManagement]


})
export class StorageModule{}