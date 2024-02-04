import React, { useState } from "react";

export default function Password(props) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordRequirements, setPasswordRequirements] = useState([]);
  const [passwordMatchMessage, setPasswordMatchMessage] = useState('');
  const [isValid, setIsValid] = useState({
    eightOrMore: false,
    oneCap: false,
    oneLower: false,
    oneSpecial: false,
    oneNumber: false
  });

  const regexs = {
    eightOrMore: /.{8,}/,
    oneCap: /[A-Z]/,
    oneLower: /[a-z]/,
    oneSpecial: /[ `!@#$%^&*()_+\-={};':"\\|,.<>\/?~\[\]]/,
    oneNumber: /\d+/,
  };

  const passwordMessages = {
    eightOrMore: "eight or more characters",
    oneCap: "One or more capital",
    oneLower: "One or more lowercase",
    oneSpecial: "One or more special character",
    oneNumber: "One or more number"
  };

  const checkRequirementsMet = (requirements, currentPassword, currentConfirmPassword) => {
    if (currentPassword === currentConfirmPassword) {
      setPasswordMatchMessage('');
      const validPassword = Object.values(requirements).every(value => value);
      if (validPassword) {
        props.setIsPasswordValid(true);
        props.setPasswordState(password);
      }
    } else {
      setPasswordMatchMessage(<p className="text-white bg-black rounded-full p-2">Passwords must match</p>);
    }
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
    setIsValid(prevIsValid => {
      const updatedIsValid = Object.keys(regexs).reduce((result, key) => {
        result[key] = regexs[key].test(event.target.value);
        return result;
      }, {});
      return { ...prevIsValid, ...updatedIsValid };
    });

    updatePasswordRequirements();
    checkRequirementsMet(isValid, event.target.value, confirmPassword);
  };

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
    checkRequirementsMet(isValid, password, event.target.value);
  };

  const updatePasswordRequirements = () => {
    Object.keys(isValid).forEach(key => {
      if (!isValid[key]) {
        if (!passwordRequirements.includes(passwordMessages[key])) {
          setPasswordRequirements(requirements => [...requirements, passwordMessages[key]]);
        }
      } else {
        setPasswordRequirements(requirements => requirements.filter(message => message !== passwordMessages[key]));
      }
    });
  };

  return (
    <div className="flex flex-col w-full items-center gap-6">
      <div className="flex flex-col items-center w-[100%]">
        <input
          placeholder="password"
          id="password"
          type="password"
          value={password}
          onChange={handlePassword}
          className="input-field"
        />
        <div className="text-white">
          {passwordRequirements.map((requirement, index) => (
            <p className="bg-black rounded-full p-2 text-center mb-2" key={index}>
              {requirement}
            </p>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center w-[100%]">
        <input
          placeholder="confirm password"
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPassword}
          className="input-field "
        />
        {passwordMatchMessage}
      </div>
    </div>
  );
}