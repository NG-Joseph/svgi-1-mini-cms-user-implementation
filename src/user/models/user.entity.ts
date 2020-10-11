import { string } from "@hapi/joi";
import { BaseAbstractEntity } from "src/global/base-abstract.entity";
import { Column, Entity, Generated, JoinColumn, ManyToMany, OneToMany, OneToOne } from "typeorm";
//import { Billing } from "../modules/billings/models/billing.entity";
import { Profile } from "../modules/profile/models/profile.entity";
import { Role } from "../modules/role/models/role.entity";

//import { Theme } from "../modules/themes/models/theme.entity";


@Entity()
export class User extends BaseAbstractEntity{
    
    @Generated("uuid")
    uuid: string
    
    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({nullable:true})
    commonName: string

    @Column()
    gender: string

    @Column({default:"2018-09-10 18:41:02.36"})
    dateOfBirth: Date

    @Column({default: false, nullable:true})
    isActive: boolean

    @Column()
    primaryEmailAddress: string

    @Column({nullable:true})
    isPrimaryEmailAddressVerified: boolean

    @Column()
    passwordSalt: string

    @Column({nullable:true})
    passwordHash: string;

    @Column({default:false, nullable:true})
    isPasswordChangeRequired: boolean

    @Column({unique:true, nullable:true})
    resetPasswordToken: string

    @Column({nullable:true})
    resetPasswordExpiration: Date

    @Column({nullable:true})
    primaryEmailVerificationToken: string

    @Column({default:false, nullable:true})
    otpEnabled: boolean

    @Column({nullable:true})   
    otpSecret: string

    @JoinColumn()
    @OneToOne(type => Profile, profile => profile.user, {cascade: true})
    profile: Profile

    @ManyToMany(type => Role)
    role: Role

    
   
}