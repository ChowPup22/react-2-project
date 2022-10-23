import React from 'react';
import './SignIn.css';
import InputBase from '../InputBase/InputBase';
import { emailValidation, onlyTextValidation, passwordValidation, zipCodeValidation } from '../validations';
import { INIT_PASS, INIT_CREATE, INIT_SIGN, visible, icon } from '../constants';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: props.userData,
      error: {},
      button: 'Create Account',
      inputData: INIT_CREATE,
      passData: INIT_PASS,
      users: props.users,
    }
  }

  handleState = (name, value) => {
    this.props.handleState(name, value);
  };

  passVisibility = () => {
    if(!this.state.passData.passVisible) {
      this.setState({
        passData: {
          passVisible: true,
          passIcon: visible,
          passType: 'text',
        }
      });
    } else if (this.state.passData.passVisible) {
      this.setState({
        passData: INIT_PASS,
      });
    }
  };

  handleSignUI = () => {
      this.setState(prev => ({
        inputData: INIT_SIGN,
        userData: {
          ...prev.userData,
          formData: {
            email: '',
            pass: '',
          }
        },
        error: {},
        button: 'Sign In',
      }));
  };

  handleCreateUI = () => {
    this.setState({
      inputData: INIT_CREATE,
      userData: this.props.userData,
      error: {},
      button: 'Create Account',
    });
  };

  handleInputData = ({ target: {name, value}}) => {
    this.setState((prevState) => ({
      userData: {
        ...prevState.userData,
        formData: {
          ...prevState.userData.formData,
          [name]: value,
        }
      }
    }));
  };

  handleValidations = (type, value) => {
    const { pass, passConfirm } = this.state.userData.formData;
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
  };

  handleBlur = ({ target: {name, value}}) => this.handleValidations(name, value);

  checkErrorBeforeSave = () => {
    const { userData, error } = this.state;
    let errorValue = {};
    let isError = false;
    Object.keys(userData.formData).forEach((val) => {
      if (!userData.formData[val].length) {
        errorValue = {...errorValue, [`${val}Error`] : 'Required'};
        isError = true;
      } else if (error[`${val}Error`]) {
        errorValue = {...errorValue, [`${val}Error`] : error[`${val}Error`]};
        isError = true;
      }
    });
    this.setState({ error: errorValue });
    return isError;
  };

  handleCreateUser = (e) => {
    const { formData } = this.state.userData;
    e.preventDefault();

    const errorCheck = this.checkErrorBeforeSave();
    if (!errorCheck) {
      this.setState(prev => ({
        users: {
          ...prev.users,
          formData,
        }
      }), this.handleState('users', this.state.users))
     
      this.handleState('currentUser', formData.email);
      // file deepcode ignore ReactNextState: <required for project>
      this.setState({
        userData: this.props.userData,
      }, this.handleState('userSignedIn', true));
    }
  };

  handleSignIn = (e) => {
    const { formData } = this.state.userData;
    const { users } = this.props;
    e.preventDefault();
    const errorCheck = this.checkErrorBeforeSave();
    if (!errorCheck) {
      let y = 0;
      users.forEach(user => {
        if( user.email === formData.email && user.pass === formData.pass) {
          this.handleState('currentUser', user.email);
          this.handleState('userSignedIn', true);
        } else if (user.email === formData.email && user.pass !== formData.pass) {
          this.setState((prevState) => ({
            error: {
              ...prevState.error,
              passError: 'Incorrect password, please try again.',
            }
          }));
        } else if(user.email !== formData.email) {
          y+=1;
        }
      });
      if (y === users.length) {
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            emailError: 'Email not found. Try again or Create an Account.',
          }
        }));
      }
    }
  };

  render() {
    const {
      userData,
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
        <form onSubmit={button === 'Create Account' ? this.handleCreateUser : this.handleSignIn}>
        {inputData.length ? inputData.map((item) => (
            // file deepcode ignore ReactMissingArrayKeys: <n/a>
            <InputBase
            header={item.header}
            placeholder={item.label}
            type={item.isPass ? passData.passType : item.type}
            value={userData.formData && userData.formData[item.name]}
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
};

export default SignIn;