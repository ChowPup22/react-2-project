import React from 'react';
import './SignIn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import InputBase from '../InputBase/InputBase';
import { emailValidation, onlyTextValidation, passwordValidation, zipCodeValidation } from '../validations';

const icon = <FontAwesomeIcon icon={faFacebook} className="fb-icon"/>;
const hidden = <FontAwesomeIcon icon={faEye} className="pass-icon" id="pass-icon"/>;
const visible = <FontAwesomeIcon icon={faEyeSlash} className="pass-icon" id="pass-icon"/>;

const INIT_FORM = {
  email: '',
  pass: '',
  passConfirm: '',
  firstName: '',
  lastName: '',
  zipCode: '',
}

const INIT_PASS = {
  passVisible: false,
  passIcon: hidden,
  passType: 'password',
}

const INIT_CREATE = [
  {header: 'Your E-Mail Address *', label: '', name: 'email', type: 'text', error: 'emailError'},
  {header: 'Create Password *', label: '', name: 'pass', type: 'password', error: 'passError', id: 'password', isPass: true},
  {header: 'Confirm Password *', label: '', name: 'passConfirm', type: 'password', error: 'passConfirmError', id: 'password', isPass: true},
  {header: 'First Name *', label: '', name: 'firstName', type: 'text', error: 'firstNameError'},
  {header: 'Last Name *', label: '', name: 'lastName', type: 'text', error: 'lastNameError'},
  {header: 'Zip Code', label: '', name: 'zipCode', type: 'text', error: 'zipCodeError'},
];

const INIT_SIGN = [
  {header: 'Enter E-Mail *', label: '', name: 'email', type: 'text', error: 'emailError'},
  {header: 'Enter Password *', label: '', name: 'pass', type: 'password', error: 'passError', id: 'password', isPass: true},
];



class SignIn extends React.Component {
  constructor() {
    super();

    this.state = {
      formData: INIT_FORM,
      error: {},
      button: 'Create Account',
      inputData: INIT_CREATE,
      passData: INIT_PASS,
    }
  }

  passVisibility = () => {
    if(!this.state.passData.passVisible) {
      this.setState({
        passData: {
          passVisible: true,
          passIcon: visible,
          passType: 'text',
        }
      })
    } else if (this.state.passData.passVisible) {
      this.setState({
        passData: INIT_PASS,
      })
    }
  }

  handleSignUI = () => {
      this.setState({
        inputData: INIT_SIGN,
        formData: INIT_FORM,
        error: {},
        button: 'Sign In',
      });
  };

  handleCreateUI = () => {
    this.setState({
      inputData: INIT_CREATE,
      formData: INIT_FORM,
      error: {},
      button: 'Create Account',
    });
  }

  handleInputData = ({ target: {name, value}}) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      }
    }));
  }

  handleValidations = (type, value) => {
    const { pass, passConfirm } = this.state.formData;
    let errorText;
    switch(type) {
      case 'email':
        errorText = emailValidation(value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            emailError: errorText,
          }
        }));
        break;
      case 'pass':
        errorText = passwordValidation(value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            passError: errorText,
          }
        }));
        break;
      case 'passConfirm':
        errorText = passwordValidation(value);
        if (pass === passConfirm) {
          this.setState((prevState) => ({
            error: {
              ...prevState.error,
              passConfirmError: errorText,
            }
          }));
        } else if (pass !== passConfirm){
          this.setState((prevState) => ({
            error: {
              ...prevState.error,
              passConfirmError: 'Passwords must match to continue!',
            }
          }));
        }
        break;
        case 'firstName':
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            firstNameError: errorText,
          }
        }));
        break;
        case 'lastName':
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            lastNameError: errorText,
          }
        }));
        break;
        case 'zipCode':
        errorText = zipCodeValidation(value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            zipCodeError: errorText,
          }
        }));
        break;
      default:
        break;
    }
  }

  handleBlur = ({ target: {name, value}}) => this.handleValidations(name, value);

  checkErrorBeforeSave = () => {
    const { formData, error } = this.state;
    let errorValue = {};
    let isError = false;
    Object.keys(formData).forEach((val) => {
      if (!formData[val].length) {
        errorValue = {...errorValue, [`${val}Error`] : 'Required'};
        isError = true;
      } else if (error[`${val}Error`]) {
        errorValue = {...errorValue, [`${val}Error`] : error[`${val}Error`]};
        isError = true;
      }
    });
    this.setState({ error: errorValue });
    return isError;
  }

  handleCreateUser = (e) => {
    e.preventDefault();

    const errorCheck = this.checkErrorBeforeSave();
    if (!errorCheck) {
      this.setState({
        cardData: INIT_FORM,
      });
    }
  }

  render() {
    const {
      formData,
      error,
      inputData,
      button,
      passData,
    } = this.state;

    

    return (
      <div className='sign-wrap'>
        <div className='radial-wrap'>
          <label>
            <input onChange={this.handleSignUI} type="radio" name="radioResponse" id="signIn" />
            SIGN IN
          </label>
          <label>
            <input onChange={this.handleCreateUI} type="radio" name="radioResponse" id="createAccount" defaultChecked/>
            CREATE ACCOUNT
          </label>
        </div>

        <form onSubmit={this.handleCreateUser}>
        {inputData.length ? inputData.map((item) => (
            <InputBase
            header={item.header}
            placeHolder={item.label}
            type={item.isPass ? passData.passType : item.type}
            value={formData && formData[item.name]}
            onChange={this.handleInputData}
            autoComplete= 'off'
            name={item.name}
            onBlur={this.handleBlur}
            errorM={
              (error
              && error[item.error]
              && error[item.error].length > 1)
              ? error[item.error]
              : null
            }
          />
          )) : null}
          <span className="pass-toggle" onClick={this.passVisibility}>{passData.passIcon}</span>
          <div className="btn-wrapper">
            <InputBase type="submit" value={button} className='main'/>
            <div className="or-wrap">
              <hr className='hr-left' />
              <span>or</span>
              <hr className='hr-right' />
            </div>
            <div className="fb-wrap">
              <InputBase 
              type="submit" 
              value={` ${button} with Facebook`} 
              className="fb main" />
              <span>{icon}</span>
            </div>
          </div>
        </form>
          
      </div>
    )
  }
}

export default SignIn;