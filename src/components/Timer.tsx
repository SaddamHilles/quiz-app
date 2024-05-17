import { useTimer } from 'react-timer-hook';
import { Actions } from '../App';

const timerStyle = {
  fontSize: '2rem',
  backgroundColor: '#495057',
  borderRadius: '8px',
  padding: '0.5rem 2rem',
  width: '8.5rem',
};

interface Props {
  expiryTimestamp: Date;
  dispatch: React.Dispatch<Actions>;
}
const Timer = ({ expiryTimestamp, dispatch }: Props) => {
  const { seconds, minutes } = useTimer({
    expiryTimestamp,
    onExpire: () => dispatch({ type: 'FINISH' }),
    autoStart: true,
  });

  function setPadStart(val: number | string) {
    return String(val).padStart(2, '0');
  }
  return (
    <div
      style={{
        ...timerStyle,
        color: expiryTimestamp.getSeconds() > 20 ? 'black' : 'red',
      }}
    >
      <span>{setPadStart(minutes)}</span>:<span>{setPadStart(seconds)}</span>
    </div>
  );
};

export default Timer;
