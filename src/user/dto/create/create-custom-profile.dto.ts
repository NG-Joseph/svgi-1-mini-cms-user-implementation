import { CreateBaseAbstractDto } from "src/global/create-base-abstract.dto"
export class CreateCustomProfileDto extends CreateBaseAbstractDto{
    readonly name: string
    readonly description: string
    readonly properties: string
    //readonly tenant: CreateTenantDto
}