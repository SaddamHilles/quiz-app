import { Actions, Nullable } from '../App';

interface Props {
  dispatch: React.Dispatch<Actions>;
  answer: Nullable<number>;
}

const NextButton = ({ dispatch, answer }: Props) => {
  if (answer === null) return null;
  return (
    <div className="btn btn-ui" onClick={() => dispatch({ type: 'NEXT_QUESTION' })}>
      Next
    </div>
  );
};

export default NextButton;
