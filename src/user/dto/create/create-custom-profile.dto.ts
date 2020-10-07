import { CreateBaseAbstractDto } from "src/global/create-base-abstract.dto"
export class CreateProfileDto extends CreateBaseAbstractDto{
    readonly name: string
    readonly description: string
    readonly properties: string
    //readonly user: CreateUserDto
}