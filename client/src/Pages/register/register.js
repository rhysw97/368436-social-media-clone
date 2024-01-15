import React, {useState, useRef} from "react";
import { postRequest } from "../../utils/server-queries.ts";
import Password from "./password.js";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {USERNAME, LOGGEDIN} from "../../data/contexts.js";
//import UserProfile from "../../data/userProfile.js";
//check that the username hasn't been taken by sending to backend and checking against db

//check that the email is valid
//probably look into terms and conditions as can store data

export default function Register() {
    //context
    const {value, setValue} = useContext(USERNAME);
    //const {loggedIn, setLoggedIn} = useContext(LOGGEDIN);

    const usernameRef = useRef();
    const [email, setEmail] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();
    const [userPassword, setUserPassword] = useState();
    const [currentIsValid, setCurrentIsValid] = useState();
    const [ageMessage, setAgeMessage]  = useState();
    const [emailMessage, setEmailMessage] = useState()
    const [usernameUsed, setUsernameUsed] = useState()
    const [emailUsed, setEmailUsed] = useState()
    const [validAge, setValidAge] = useState();
    const [emailValid, setEmailValid] = useState();
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const navigate = useNavigate();
  


    function findAge(dob) {
        const currentDate = new Date()
        const birthDate = new Date(dob)
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        const month = currentDate.getMonth() - birthDate.getDate();
     
        if(month < 0 || (month === 0 && currentDate.getDate() < birthDate.getDate)) {
            age--
        }
        return age;
    }
    
    const validation = {
        email: false,
        dateOfBirth: false,
        passwordValid: false,
        passwordsMatch: false
    }

    const handleEmail = event => {
        setEmailValid(currentEmailValid => currentEmailValid = emailRegex.test(event.target.value))
        if(emailValid) {
            setEmail(event.target.value)
            setEmailMessage(null)
        } else {
            setEmailMessage(<p>Not a valid email</p>)
        }
    }

    const handleDateOfBirth = (event) => {
        setDateOfBirth(event.target.value)
        const userAge = findAge(event.target.value);

        if(userAge >= 18) {
            setValidAge(currentValidAge => currentValidAge = true);
            setAgeMessage(null)
        } else {
            setValidAge(currentValidAge => currentValidAge = false);
            setAgeMessage(<p>You must be 18 or over to register</p>)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(currentIsValid && validAge && emailValid) {
            const data = { 
                username: usernameRef.current.value, 
                email: email,
                dateOfBirth: dateOfBirth,
                password: userPassword
            };

            createUser(data)
        }
    };

    async function createUser(data) {
        const response = await postRequest('register', data)
        
        if(response.email) {
            setEmailUsed(<p>Email already in use</p>) 
        } else {
            setEmailUsed(null) 
        }

        if(response.username) {
            setUsernameUsed(<p>Username already in use</p>) 
        }  else {
            setUsernameUsed(null) 
        }

        if(!response.username && !response.email) {
            navigate('/edit-profile')
            setValue(usernameRef.current.value)
        }
    }

    return(
       <div>
            <header className='flex justify-center'>
                <h1 className='text-5xl heading'>Register</h1>
            </header>
            <form onSubmit={handleSubmit} className="flex ml-16 w-full gap-4 flex-col items-center">  
            <input
                placeholder="Username"
                id="username"
                type="text"
                ref={usernameRef}
                className="input-field "
            />
            {usernameUsed}
                
            <input
                placeholder="email"
                id="email"
                type="text"
                onChange={handleEmail}
                className="input-field my-3"
            />
            {emailUsed}
            {emailMessage}
              
            <div className="flex flex-col items-center w-[100%]">
                <label for="dob" className="text-center">Date Of Birth</label>
                <input
                    id="dob"
                    type="date"
                    onChange={handleDateOfBirth}
                    className="input-field mb-3"
                />
                {ageMessage}
            </div>
                <Password setPasswordState={setUserPassword} setIsPasswordValid={setCurrentIsValid}/>
                <button className="button-green" type="submit">Submit</button>
            </form>
       </div>
    )
}