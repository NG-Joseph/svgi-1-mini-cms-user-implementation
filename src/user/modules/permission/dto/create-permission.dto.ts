import { CreateBaseAbstractDto } from "src/global/create-base-abstract.dto"
import { Role } from "../../role/models/role.entity";


export class CreatePermissionDto extends CreateBaseAbstractDto{
    readonly name: string;
    readonly description: string;  
    readonly role: Role
}