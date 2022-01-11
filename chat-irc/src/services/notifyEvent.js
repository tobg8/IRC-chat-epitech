import { toast } from 'react-toastify';

const notify = message => {
  toast(message, {
    position: 'bottom-right'
  });
};

export default notify;
