import { BaseAbstractEntity } from "src/global/base-abstract.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToOne } from "typeorm";
import { User } from "../../../models/user.entity";
import { Role } from "../../role/models/role.entity";


@Entity()
export class Profile extends BaseAbstractEntity{

    @Column({nullable: true})
    homeAdress: string

    @Column({nullable: true})
    Nationality: string
    
    @Column({nullable: true})
    stateOfOrigin: string

    @Column({nullable: true})
    photo: string   //photo ID or url

    @Column("simple-json", {nullable: true})
    bulmaProperties: {primaryColor: string, primaryBackground: string}

    @OneToOne(type => User, user => user.profile)
    user: User
    
    @JoinTable()
    @ManyToMany(type => Role)
    role: Role
}