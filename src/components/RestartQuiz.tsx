import { Actions } from '../App';

interface Props {
  dispatch: React.Dispatch<Actions>;
}
const RestartQuiz = ({ dispatch }: Props) => {
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: 'RESTART' })}
    >
      RestartQuiz
    </button>
  );
};

export default RestartQuiz;
