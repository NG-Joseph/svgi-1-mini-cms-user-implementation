/**
 * Abstract base type for entities
 */
export interface IBaseAbstract {
    id?: number;
    dateCreated?: Date;
    createdBy?: string;
    dateLastModified?: Date;
    lastModifiedBy?: string;
    lastChangeInfo?: string;
    deletedBy?: string;
}
/**
 * CustomTheme type
 */
export interface ICustomTheme extends IBaseAbstract{
    name?: string;
    description?: string;
    properties?: string;
    bulmaProperties?: {primaryColor: string, primaryBackground: string};
}

/**
 * Tenant type
 */
export interface ITenant extends IBaseAbstract{
    uuid?: string;
    code?: string;
    name?: string;
    contactFirstName?: string;
    contactLastName?: string;
    contactTitle?: string;
    address?: string;
    email?: string;
    defaultURLSlug?: string
    customURLSlug?: string
    dateOfRegistration?: Date
    active?: boolean;
    customTheme?: ICustomTheme;
    [key: string]: any
}

/**
 * State variable type
 */
export interface IState {
    tenants?: ITenant[];
    tenant?: ITenant | null; //This can be use for tenant to edit or tenant to view, depending on the function being carried out
    onAddTenant: boolean;
    onViewTenant: boolean;
    onEditTenant: boolean;
    alert: {
        show: boolean,
        message: string,
        type: any //problem making string compatible with type '"info" | "success" | "link" |
    }
}

/**
 * Action type for Reducer
 */
export interface IAction {
    //Indicate possible reducer action types here as you identify them in your codes
    type: 'FetchDataSuccess' | 'FetchDataFailure' | 'HandleOnAddTenant' 
    | 'HandleCancelCreate' | 'BeforeCreateTenant' | 'CreateTenantSuccess' 
    | 'CreateTenantFailure' | 'BeforeDeleteTenant' | 'DeleteTenantSuccess' 
    | 'DeleteTenantFailure'| 'HandleEditTenant' | 'HandleCancelUpdate' 
    | 'BeforeUpdateTenant' | 'UpdateTenantSuccess' | 'UpdateTenantFailure' 
    | 'HandleCloseAlert' | 'HandleViewTenant' | 'HandleCloseViewTenant';
    payload?: {tenants?: ITenant[], tenantsCount?: number, tenant?: ITenant, error?: Error, 
        id?: number | string}

}

/*
The idea below is to provide room for specifying read
https://github.com/typeorm/typeorm/blob/master/docs/find-options.md
*/
export interface IFindOptions {
    select?: string[];
    relations?: string[];
    skip?: number;
    take?: number;
    cache?: boolean;
    where?: {}[] | {};
    order?: {};

}
