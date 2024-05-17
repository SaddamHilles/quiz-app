import { Actions, Nullable } from '../App';

interface Props {
  dispatch: React.Dispatch<Actions>;
  answer: Nullable<number>;
  questionsLengh: number;
  indexQuestion: number;
}

const NextButton = (props: Props) => {
  const { dispatch, answer, indexQuestion, questionsLengh } = props;
  const isFinished = indexQuestion === questionsLengh - 1;
  if (answer === null) return null;

  function handleClick() {
    if (isFinished) dispatch({ type: 'FINISH' });
    else dispatch({ type: 'NEXT_QUESTION' });
  }
  
  return (
    <div className="btn btn-ui" onClick={handleClick}>
      {isFinished ? 'Finish' : 'Next'}
    </div>
  );
};

export default NextButton;
