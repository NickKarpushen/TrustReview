import React from 'react';
import Header from '../../components/header/Header';
import styles from './MainPage.module.scss';
import { useUser } from '../../contexts/UserContext';

const MainPage = () => {

    const {user} = useUser();

    return (
        <div className={styles.conteiner}>
            <header className={styles.header}>
                <Header/>
            </header>
            <main className={styles.main}>
                <section>
                    <h1>{user && user.name} {user && user.surname}</h1>
                </section>
                <section>

                </section>
                <section>

                </section>
            </main>
            <footer>

            </footer>
        </div>
    );
}

export default MainPage;