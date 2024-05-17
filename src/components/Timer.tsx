import { useTimer } from 'react-timer-hook';
import { Actions } from '../App';
import { useEffect } from 'react';

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
  secondsRemaining: number;
}
const Timer = ({ expiryTimestamp, dispatch, secondsRemaining }: Props) => {
  // const { seconds, minutes } = useTimer({
  //   expiryTimestamp,
  //   onExpire: () => dispatch({ type: 'FINISH' }),
  //   autoStart: true,
  // });

  function setPadStart(val: number | string) {
    return String(val).padStart(2, '0');
  }
  // const totalRemainingSeconds = minutes * 60 + seconds;

  useEffect(() => {
    const interval = setInterval(() => dispatch({ type: 'TICK' }), 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  return (
    <div
      style={{
        ...timerStyle,
        color: secondsRemaining > 20 ? 'black' : 'red',
      }}
    >
      {/* <span>{setPadStart(minutes)}</span>:<span>{setPadStart(seconds)}</span> */}
      <span>{setPadStart(minutes)}</span>:<span>{setPadStart(seconds)}</span>
    </div>
  );
};

export default Timer;
