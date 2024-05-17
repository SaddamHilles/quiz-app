import { useTimer } from 'react-timer-hook';
import { Actions } from '../App';

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

  return (
    <div
      style={{
        fontSize: '2rem',
        border: '1px solid gray',
        borderRadius: '8px',
        padding: '0.5rem 2rem',
        width: '8rem'
      }}
    >
      <span>{minutes}</span>:<span>{seconds}</span>
    </div>
  );
};

export default Timer;
