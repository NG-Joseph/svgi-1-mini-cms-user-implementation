import { BaseAbstractEntity } from "src/global/base-abstract.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToOne } from "typeorm";
import { User } from "../../../models/user.entity";


@Entity()
export class Role extends BaseAbstractEntity{

    @Column()
    name: string

    @Column()
    description: string
    

    @JoinTable()
    @ManyToMany(type => User)
    user: User
}