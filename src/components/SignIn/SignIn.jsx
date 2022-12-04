import React from 'react';
import styles from './SignIn.module.css';
import InputBase from '../InputBase/InputBase';
import {  validations } from '../../Constants/Validations';
import { INIT_PASS, INIT_CREATE, INIT_SIGN, } from '../../Constants/States';
import { visible, icon } from '../../Constants/Icons/Icons';

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
    const { pass } = this.state.userData.formData;

    const validationSign = {
      ...validations,
      passConfirm: (value) => (pass === value) ? null : 'Passwords do not match',
    }

    const errorText = validationSign[type](value);
    this.setState((prevState) => ({
      error: {
        ...prevState.error,
        [`${type}Error`]: errorText,
      }
    }));
  };

  handleBlur = ({ target: {name, value}}) => this.handleValidations(name, value);

  checkErrorBeforeSave = (method) => {
    const { users } = this.props;
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
      } else if(method === 'create') {
        users.forEach(user => {
          if(user.email === userData.formData.email) {
            errorValue = {...errorValue, emailError: 'Email already exists, sign in or use another email'}
            isError = true;
          }
        })
      }
    });
    this.setState({ error: errorValue });
    return isError;
  };

  handleCreateUser = (e) => {
    const { formData } = this.state.userData;
    e.preventDefault();

    const errorCheck = this.checkErrorBeforeSave('create');
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
    const errorCheck = this.checkErrorBeforeSave('sign');
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
      <div className={styles.sign_wrap}>
        <div className={styles.radial_wrap}>
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
            key={item.name}
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
          <span className={styles.pass_toggle} onClick={this.passVisibility}>{passData.passIcon}</span>
          <div className={styles.btn_wrapper}>
            <InputBase type="submit" value={button} className={styles.main}/>
            <div>
              <hr />
              <span>or</span>
              <hr />
            </div>
            <div className={styles.fb_wrap}>
              <InputBase 
              type="submit" 
              value={` ${button} with Facebook`} 
              className={`${styles.fb} ${styles.main}`} />
              <span>{icon}</span>
            </div>
          </div>
        </form>  
      </div>
    )
  }
};

export default SignIn;