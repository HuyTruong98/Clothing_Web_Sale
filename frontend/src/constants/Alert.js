import { notification } from 'antd';

// eslint-disable-next-line import/prefer-default-export
export function manageAlert(message, description) {
  const args = {
    message,
    description,
  };
  notification.success(args);
}

export function manageAlertError(message, description) {
  const args = {
    message,
    description,
  };
  notification.error(args);
}
