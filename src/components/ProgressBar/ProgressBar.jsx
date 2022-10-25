import React from "react";
import { card, cart, check, truck } from "../../Constants/Icons/Icons";
import styles from './ProgressBar.module.css';

class ProgressBar extends React.Component {

  render() {
    const {
      cartIsDone,
      shipIsDone,
      payIsDone,
      payIsConfirm,
    } = this.props;

    const cartClass = cartIsDone ? styles.active : styles.disabled;
    const shipClass = shipIsDone ? styles.active : styles.disabled;
    const payClass = payIsDone ? styles.active : styles.disabled;
    const confirmClass = payIsConfirm ? styles.active : styles.disabled;
    const shipDivClass = shipIsDone ? styles.active_div : styles.disabled_div;
    const payDivClass = payIsDone ? styles.active_div : styles.disabled_div;
    const confirmDivClass = payIsConfirm ? styles.active_div : styles.disabled_div;

    return (
      <div>
        {cartIsDone ? 
        <section className={styles.progress_wrap}>
          <span className={cartClass}>{cart}</span>
          <div className={`${shipDivClass} ${styles.div_bar}`}></div>
          <span className={shipClass}>{truck}</span>
          <div className={`${payDivClass} ${styles.div_bar}`}></div>
          <span className={payClass}>{card}</span>
          <div className={`${confirmDivClass} ${styles.div_bar}`}></div>
          <span className={confirmClass}>{check}</span>
        </section>
        : null}
      </div>
    )
  }
}

export default ProgressBar;