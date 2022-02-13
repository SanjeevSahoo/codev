import IAlertSeverityValue from "./AlertSeverityValue";

interface IAlertPropsValue {
  status: boolean;
  severity: IAlertSeverityValue;
  message: string;
}

export default IAlertPropsValue;
