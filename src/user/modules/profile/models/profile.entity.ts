import { BaseAbstractEntity } from "src/global/base-abstract.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToOne } from "typeorm";
import { User } from "../../../models/user.entity";
import { Role } from "../../role/models/role.entity"

@Entity()
export class Profile extends BaseAbstractEntity{

    @Column()
    homeAdress: string

    @Column()
    Nationality: string
    
    @Column()
    stateOfOrigin: string

    @Column()
    photo: string   //photo ID or url

    @OneToOne(type => User, user => user.profile)
    user: User
    
    @JoinTable()
    @ManyToMany(type => Role)
    role: Role
}