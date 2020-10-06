import React from 'react';
import { IUser } from '../app.interfaces';
import User from './User';
import UserListHeader from './UserListHeader';


//declare type for Props passed to this 
type Props = {
    users: IUser[],
}

const UserList: React.FC<Props> = (props) => {

    //prepare Users for display in a table
    let UserListRows = null;
    UserListRows = props.users.map((user) => {
        return <User user={user} />
    })

    return (
        <div className="table is-striped is-narrow is-hoverable" >
            <caption><h3>Available Users</h3></caption>
            <UserListHeader />
            <tbody>
                {UserListRows}
            </tbody>
        </div>
    );
}

export default UserList;
