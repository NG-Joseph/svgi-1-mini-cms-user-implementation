import { CreateBaseAbstractDto } from "src/global/create-base-abstract.dto"
export class UpdateCustomProfileDto extends CreateBaseAbstractDto{
    readonly id: number;
    readonly name: string
    readonly description: string
    readonly properties: string
    //readonly tenant: CreateTenantDto
}