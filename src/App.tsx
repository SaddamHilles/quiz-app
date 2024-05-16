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
  | 'NEXT_QUESTION';
type STATUS_TYPES = 'loading' | 'error' | 'ready' | 'active' | 'finished';

type State = {
  questions: Questions[];
  status: STATUS_TYPES;
  indexQuestion: number;
  answer: Nullable<number>;
  points: number;
};
const initialState: State = {
  questions: [],
  status: 'loading',
  indexQuestion: 0,
  answer: null,
  points: 0,
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
        points:
          ques.correctOption === payload?.answer
            ? state.points + ques.points
            : state.points,
      };
    }
    case 'NEXT_QUESTION':
      return { ...state, indexQuestion: state.indexQuestion + 1, answer: null };
    default:
      throw new Error('Action unknown');
  }
};
function App() {
  const [{ questions, status, indexQuestion, answer }, dispatch] = useReducer(
    reduce,
    initialState
  );
  const questionsLengh = questions.length;

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
  return (
    <div className="app">
      <Header />

      <Main>
        <div>
          {status === 'loading' && <Loader />}
          {status === 'error' && <ErrorComp />}
          {status === 'ready' && (
            <HeroStart dispatch={dispatch} questionsLengh={questionsLengh} />
          )}
          {status === 'active' && (
            <>
              <Qustion
                question={questions[indexQuestion]}
                dispatch={dispatch}
                answer={answer}
              />
              <NextButton dispatch={dispatch} answer={answer} />
            </>
          )}
          {/* {state.questions.map((question, i) => (
            <ul key={i}>
              <li>
                {' '}
                <p>{question.question}</p>{' '}
              </li>
              <ol>
                {question.options.map((option, i) => (
                  <li key={i}>
                    <input
                      type="radio"
                      value={option}
                      name={question.question}
                      id={option}
                    />
                    <label htmlFor={option}>{option}</label>
                  </li>
                ))}
              </ol>
            </ul>
          ))} */}
        </div>
      </Main>
    </div>
  );
}

export default App;
