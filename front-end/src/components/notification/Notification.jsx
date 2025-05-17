import React from 'react';
import styles from './Notification.module.scss';
import { useNotification } from '../../contexts/NotificationContext';

const Notification = () => {
  const { notification } = useNotification();

  if (!notification) return null;

  const { message, type } = notification;

  return (
    <div className={styles.conteiner}>
      <h1>{type}</h1><p>: {message}</p>
    </div>
  );
};

export default Notification;