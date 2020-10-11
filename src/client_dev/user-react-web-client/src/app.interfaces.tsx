

export interface IBaseAbstract {
    id?: number;
    dateCreated?: Date;
    createdBy?: string;
    dateLastModified?: Date;
    lastModifiedBy?: string;
    lastChangeInfo?: string;
    deletedBy?: string;
}

export interface IProfile extends IBaseAbstract{
    name?: string;
    description?: string;
    properties?: string;
    bulmaProperties?: {primaryColor: string, primaryBackground: string};
}

export interface IRole extends IBaseAbstract{
    name: string;
    description: string;  
    
}


export interface IUser extends IBaseAbstract{
     firstName?: string;
     middleName?: string;
     lastName?: string;
     commonName?: string;
     gender?: string;
     dateOfBirth?: Date ;
     isActive?: boolean;
     primaryEmailAddress?: string;
     isPrimaryEmailAddressVerified?: boolean;
     passwordSalt?: string;
     passwordHash?: string;
     isPasswordChangeRequired?: boolean;
     resetPasswordToken?: string;
     resetPasswordExpiration?: Date;
     primaryEmailVerificationToken: string;
     otpEnabled: boolean;
     otpSecret?: string;
    // profile?: Profile;
    // role?: Role;
     profile?: IProfile;
     [key: string]: any
    

}

export interface IState {
    users?: IUser[];
    user?: IUser | null; //This can be use for User to edit or User to view, depending on the function being carried out
    onAddUser: boolean;
    onViewUser: boolean;
    onEditUser: boolean;
    alert: {
        show: boolean,
        message: string,
        type: any //problem making string compatible with type '"info" | "success" | "link" |
    }
}

export interface IAction {
    //Indicate possible reducer action types here as you identify them in your codes
    type: 'FetchDataSuccess' | 'FetchDataFailure' | 'HandleOnAddUser' 
    | 'HandleCancelCreate' | 'BeforeCreateUser' | 'CreateUserSuccess' 
    | 'CreateUserFailure' | 'BeforeDeleteUser' | 'DeleteUserSuccess' 
    | 'DeleteUserFailure'| 'HandleEditUser' | 'HandleCancelUpdate' 
    | 'BeforeUpdateUser' | 'UpdateUserSuccess' | 'UpdateUserFailure' 
    | 'HandleCloseAlert' | 'HandleViewUser' | 'HandleCloseViewUser';
    payload?: {users?: IUser[], usersCount?: number, user?: IUser, error?: Error, 
        id?: number | string}

}

export interface IFindOptions {
    select?: string[];
    relations?: string[];
    skip?: number;
    take?: number;
    cache?: boolean;
    where?: {}[] | {};
    order?: {};

}