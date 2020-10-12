/** This component is for displaying each user in the record, passed to it from UserList */
import React, { useState } from 'react';
import { IAction, IUser } from '../app.interfaces';

//create the type for the anticipated props to be passed from parent component
type Props = {
    user: IUser,
    handleUpdateUser: Function,
    dispatch: React.Dispatch<IAction>
}

const EditUser: React.FC<Props> = (props) => {

    const initialUserState: IUser = {
        id: props.user.id,
        firstName: props.user.firstName,
        middleName: props.user.middleName,
        lastName: props.user.lastName,
        commonName: props.user.commonName,
        gender: props.user.gender,
        dateOfBirth: props.user.dateOfBirth,
        primaryEmailAddress: props.user.primaryEmailAddress,
        isPrimaryEmailAddressVerified: props.user.isPrimaryEmailAddressVerified,
        passwordSalt: props.user.passwordSalt,
        passwordHash: props.user.passwordHash,
        isPasswordChangeRequired: props.user.isPasswordChangeRequired,
        resetPasswordToken: props.user.resetPasswordToken,
        otpSecret:props.user.otpSecret,
        primaryEmailVerificationToken:props.user.primaryEmailVerificationToken,
        otpEnabled:props.user.otpEnabled
        /*
        customTheme: {
            name: props.user.customTheme!.name,
            description: props.user.customTheme!.description,
            properties: props.user.customTheme!.properties,
            bulmaProperties: {
                primaryColor: props.user.customTheme!.bulmaProperties!.primaryColor,
                primaryBackground: props.user.customTheme!.bulmaProperties!.primaryBackground
            }
        }
        */
    }

    //declare the state variable for user to be added from form. Notice that we are using an object containing the individual elements
    //We need to interact with them individually as state variable that will change in response to input onChange 
    const [user, setUser] = useState<IUser>({ ...initialUserState });

    //create a general onChange event handler for form inputs that fire onChange event
    //See https://reactjs.org/docs/events.html? for all kinds of events that can be handled in react
    const onChange = (event: React.FormEvent) => {
        const userState = user;//check out user in state as is
        //modify element in the state which has the same name as the input that fired this event. Pass the new value
        const target: HTMLInputElement | HTMLSelectElement = event.target as HTMLInputElement | HTMLSelectElement; //as is used here to cast
        userState[target.name] = target.value;
        setUser({ ...userState });//checkin the modified state
    }

    //function to handle form onSubmit event
    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();//do not do the default form submit to the server
        props.handleUpdateUser(user, props.dispatch);//call the handleAddUser function passed via props.
    }

    //function to handle form onCancel
    const onCancel = () => {
        //props.handleCancelUpdate(props.dispatch);//call the function handleCancelAdd passed via props
        //simply set state to make displayUpdate disappear
        props.dispatch({ type: 'HandleCancelUpdate' });
    }

    //Note where the above functions are used below within the return statement
    return (
        <div className="columns is-mobile">
        <div className="column is-two-thirds">
            <div className="box">
                <form onSubmit={onSubmit}>
                    <legend>Add User:</legend>
                    <div className="field">
                        <label className="label">First Name</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Name" name="firstName" value={user.firstName} onChange={onChange} required/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Last Name</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Last name" name="lastName" value={user.lastName} onChange={onChange} required/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Gender</label>
                        <div className="control">
                            <select className="input" placeholder="Gender" name="gender" value={user.gender} onChange={onChange} required>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                               
                        
                            </select>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input className="input" type="email" placeholder="Email Address" name="primaryEmailAddress" value={user.primaryEmailAddress} onChange={onChange} required/>
                        </div>
                        <p className="help is-info">Enter a valid email here</p>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                        <input className="input" type="password" name="passwordSalt"  value={user.passwordSalt} onChange={onChange}/>
                        </div>
                    </div>
                 
                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-link">Submit</button>
                        </div>
                        <div className="control">
                            <button className="button is-link is-light" onClick={onCancel}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

);
}

export default EditUser;
