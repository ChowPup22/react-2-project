import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash, faCircleCheck, faCircleXmark, faCartShopping, faTruck, faCreditCard,  } from '@fortawesome/free-solid-svg-icons';
import styles from './Icons.module.css';

export const hidden = <FontAwesomeIcon icon={faEye} className="pass-icon" id="pass-icon"/>;
export const visible = <FontAwesomeIcon icon={faEyeSlash} className="pass-icon" id="pass-icon"/>;
export const icon = <FontAwesomeIcon icon={faFacebook} className={styles.fb_icon}/>;
export const confirm = <FontAwesomeIcon icon={faCircleCheck} className={styles.confirm_icon} />
export const remove = <FontAwesomeIcon icon={faCircleXmark} className={styles.remove_icon} />
export const cart = <FontAwesomeIcon icon={faCartShopping} className={styles.cart_icon} />
export const truck = <FontAwesomeIcon icon={faTruck} className={styles.truck_icon} />
export const card = <FontAwesomeIcon icon={faCreditCard} className={styles.card_icon} />
export const check = <FontAwesomeIcon icon={faCircleCheck} className={styles.check_icon} />