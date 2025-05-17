import React from "react";
import styles from './Footer.module.scss';


const Footer = (props) => {
    return(
        <div className={styles.footer}>
            <div className={styles.conteiner}>
                <h3>© 2025 Система управління відгуками про компанії.</h3>
                <h3>Цей сайт створено в навчальних цілях у рамках курсової роботи.</h3>
                <h4>GitHub: <a href="https://github.com/NickKarpushen/TrustReview">TrustReview</a></h4>
            </div>
        </div>
    );
}

export default Footer;