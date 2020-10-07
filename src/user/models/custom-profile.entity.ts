import { BaseAbstractEntity } from "src/global/base-abstract.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class customProfile extends BaseAbstractEntity{

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    properties: string

    @Column("simple-json", {nullable: true})
    bulmaProperties: {primaryColor: string, primaryBackground: string}
    
    @JoinColumn()
    @OneToOne(type => User, user => user.profile, {onDelete: 'CASCADE'})
    user: User

}