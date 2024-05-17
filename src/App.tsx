import { useEffect, useReducer } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import { Questions } from './utils/interfaces';
import axios, { AxiosError } from 'axios';
import ErrorComp from './components/Error';
import Loader from './components/Loader';
import HeroStart from './components/HeroStart';
import Qustion from './components/Qustion';
import NextButton from './components/NextButton';
import Container from './components/Container';
import Progress from './components/Progress';
import RestartQuiz from './components/RestartQuiz';
import FinishScreen from './components/FinishScreen';
import Timer from './components/Timer';
import FlexContainer from './components/FlexContainer';

export type Nullable<T> = T | null | undefined;

export type Actions = {
  type: ActionTypes;
  payload?: Partial<State>;
};

type ActionTypes =
  | 'DATA_RECEIVED'
  | 'DATA_FAILED'
  | 'START'
  | 'NEW_ANSWER'
  | 'NEXT_QUESTION'
  | 'RESTART'
  | 'FINISH'
  | 'TICK';

type STATUS_TYPES = 'loading' | 'error' | 'ready' | 'active' | 'finished';

type State = {
  questions: Questions[];
  status: STATUS_TYPES;
  indexQuestion: number;
  answer: Nullable<number>;
  studentPoints: number;
  secondsRemaining: number;
};
const initialState: State = {
  questions: [],
  status: 'loading',
  indexQuestion: 0,
  answer: null,
  studentPoints: 0,
  secondsRemaining: 416,
};

const reduce = (state: State, action: Actions) => {
  const { type, payload } = action;

  switch (type) {
    case 'DATA_RECEIVED':
      return {
        ...state,
        questions: payload?.questions || [],
        status: payload?.status || 'ready',
      };
    case 'DATA_FAILED':
      return { ...state, status: payload?.status || 'error' };
    case 'START':
      return { ...state, status: payload?.status || 'active' };
    case 'NEW_ANSWER': {
      const ques = state.questions[state.indexQuestion];

      return {
        ...state,
        answer: payload?.answer,
        studentPoints:
          ques.correctOption === payload?.answer
            ? state.studentPoints + ques.points
            : state.studentPoints,
      };
    }
    case 'NEXT_QUESTION':
      return { ...state, indexQuestion: state.indexQuestion + 1, answer: null };
    case 'FINISH':
      return { ...state, status: payload?.status || 'finished' };
    case 'RESTART':
      return {
        ...initialState,
        questions: state.questions,
        status: payload?.status || 'ready',
      };
      case 'TICK':
      return {
        ...state, secondsRemaining: state.secondsRemaining -1,
        status: state.secondsRemaining ? state.status : 'finished'
      };
    default:
      throw new Error('Action unknown');
  }
};

function App() {
  
  const [
    { questions, status, indexQuestion, answer, studentPoints, secondsRemaining },
    dispatch,
  ] = useReducer(reduce, initialState);

  const questionsLengh = questions.length;
  const maxPossiblePoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  useEffect(() => {
    (async function () {
      try {
        const { data, ...rest } = await axios.get<Questions[]>(
          `http://localhost:8000/questions`
        );

        if (rest.statusText !== 'OK') {
          throw new Error('Something went wrong!');
        }
        dispatch({
          type: 'DATA_RECEIVED',
          payload: { questions: data },
        });
      } catch (err) {
        if (err instanceof AxiosError) {
          dispatch({
            type: 'DATA_FAILED',
          });
        }
      }
    })();
  }, []);

  const time = new Date();
  time.setSeconds(time.getSeconds() + 419);

  return (
    <Container>
      <Header />
      <Main>
        <>
          {status === 'loading' && <Loader />}
          {status === 'error' && <ErrorComp />}
          {status === 'ready' && (
            <HeroStart dispatch={dispatch} questionsLengh={questionsLengh} />
          )}
          {status === 'active' && (
            <>
              <Progress
                indexQuestion={indexQuestion}
                maxPossiblePoints={maxPossiblePoints}
                questionsLengh={questionsLengh}
                studentPoints={studentPoints}
                answer={answer}
              />
              <Qustion
                question={questions[indexQuestion]}
                dispatch={dispatch}
                answer={answer}
              />
              <FlexContainer>
                <Timer expiryTimestamp={time} dispatch={dispatch} secondsRemaining={secondsRemaining} />
                <NextButton
                  dispatch={dispatch}
                  answer={answer}
                  indexQuestion={indexQuestion}
                  questionsLengh={questionsLengh}
                />
              </FlexContainer>
            </>
          )}
          {status === 'finished' && (
            <>
              <FinishScreen
                maxPossiblePoints={maxPossiblePoints}
                studentPoints={studentPoints}
              />
              <RestartQuiz dispatch={dispatch} />
            </>
          )}
        </>
      </Main>
    </Container>
  );
}

export default App;
