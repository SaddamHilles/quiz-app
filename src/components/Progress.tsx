import { Nullable } from "../App";

interface Props {
  questionsLengh: number;
  indexQuestion: number;
  maxPossiblePoints: number;
  studentPoints: number;
  answer: Nullable<number>;
}
const Progress = (props: Props) => {
  const { indexQuestion, maxPossiblePoints, studentPoints, questionsLengh, answer } = props;

  return (
    <header className="progress">
      <progress id="file" value={indexQuestion + Number(answer !== null)} max={questionsLengh}>
        {indexQuestion}
      </progress>
      <p>
        Question <strong>{indexQuestion + 1}</strong> / {questionsLengh}
      </p>
      <p>
        <strong>{studentPoints}</strong> / {maxPossiblePoints} Points
      </p>
    </header>
  );
};

export default Progress;
