import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

import './ToastNotification.css';


export type ToastProps = {
  id?: string;
  destroy: () => void;
  message: string;
}

const Toast = ({ destroy, message }: ToastProps) => {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      destroy();
    }, 6000);

    return () => clearTimeout(timer);
  }, [destroy])

  return (
    <div className="Toast" onClick={destroy}>
      <FontAwesomeIcon icon={faExclamationTriangle} />
      <p className="toastMessage">{message}</p>
    </div>
  )
}

export default Toast;
