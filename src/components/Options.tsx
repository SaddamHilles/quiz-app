import { Actions, Nullable } from '../App';

interface Props {
  options: string[];
  correctOption: number;
  dispatch: React.Dispatch<Actions>;
  answer: Nullable<number>;
}
const Options = ({ options, correctOption, dispatch, answer }: Props) => {
  const isAnswered = answer !== null;
  return (
    <div className="options">
      {options.map((option, i) => (
        <button
          className={`btn btn-option ${answer === i ? 'answer' : ''} ${
            isAnswered && (i === correctOption ? 'correct' : 'wrong')
          }`}
          key={option}
          disabled={!!answer}
          onClick={() =>
            dispatch({ type: 'NEW_ANSWER', payload: { answer: i } })
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
