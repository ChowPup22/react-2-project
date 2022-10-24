import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './Icons.module.css';

export const hidden = <FontAwesomeIcon icon={faEye} className="pass-icon" id="pass-icon"/>;
export const visible = <FontAwesomeIcon icon={faEyeSlash} className="pass-icon" id="pass-icon"/>;
export const icon = <FontAwesomeIcon icon={faFacebook} className={styles.fb_icon}/>;
export const confirm = <FontAwesomeIcon icon={faCircleCheck} className={styles.confirm_icon} />