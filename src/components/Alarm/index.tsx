import { ALARM } from '@/assets/icons/Alarm';
import AlarmDetail from './AlarmDetail';

const AlarmComponent = () => {
  return (
    <>
      <div>{ALARM.ALARM}</div>
      <AlarmDetail />
    </>
  );
};

export default AlarmComponent;
