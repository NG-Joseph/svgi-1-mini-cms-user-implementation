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

    @Column()
    commonName: string

    @Column()
    gender: string

    @Column()
    dateOfBirth: Date

    @Column({default: false})
    isActive: boolean

    @Column()
    primaryEmailAddress: string

    @Column()
    isPrimaryEmailAddressVerified: boolean

    @Column()
    passwordSalt: string

    @Column()
    passwordHash: string;

    @Column({default:false})
    isPasswordChangeRequired: boolean

    @Column({unique:true})
    resetPasswordToken: string

    @Column()
    resetPasswordExpiration: Date

    @Column()
    primaryEmailVerificationToken: string

    @Column({default:false})
    otpEnabled: boolean

    @Column()   
    otpSecret: string

    @JoinColumn()
    @OneToOne(type => Profile, profile => profile.user, {cascade: true})
    profile: Profile

    @ManyToMany(type => Role)
    role: Role

    
   
}