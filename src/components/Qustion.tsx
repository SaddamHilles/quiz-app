import { Actions, Nullable } from '../App';
import { Questions } from '../utils/interfaces';
import Options from './Options';

interface Props {
  question: Questions;
  dispatch: React.Dispatch<Actions>;
  answer: Nullable<number>;
}
const Qustion = (props: Props) => {
  const {
    question: { question, options, correctOption },
    dispatch,
    answer,
  } = props;

  return (
    <div>
      <h4>{question}</h4>
      <Options
        options={options}
        correctOption={correctOption}
        dispatch={dispatch}
        answer={answer}
      />
    </div>
  );
};

export default Qustion;
