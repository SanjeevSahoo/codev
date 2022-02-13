import { useAppDispacth } from "src/store/hooks";
import {
  showNotification,
  hideNotification,
} from "src/store/notificationSlice";
import IAlertSeverityValue from "src/types/AlertSeverityValue";

const useNotification = () => {
  const dispatch = useAppDispacth();
  return {
    show: (severity: IAlertSeverityValue, message: string) => {
      dispatch(showNotification({ severity, message }));
    },
    hide: () => {
      dispatch(hideNotification());
    },
  };
};

export default useNotification;
