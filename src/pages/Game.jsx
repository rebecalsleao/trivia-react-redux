import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import '../style/Game.css';
import { saveScore } from '../Redux/actions';

let timerID = null;

class Game extends Component {
  state = {
    api: {},
    error: false,
    question: 0,
    correctAnswer: '',
    answers: [],
    timer: 30,
    showResults: false,
    isDisabled: false,
    score: 0,
    assertions: 0,
  };

  componentDidMount() {
    this.getQuestion();
    this.counter();
  }

  getQuestion = async () => {
    const { token } = localStorage;
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(url);
    const api = await response.json();
    this.validateToken(api);
  };

  validateToken = (api) => {
    const ERROR_CODE = 3;
    console.log(api.response_code);
    if (api.response_code === ERROR_CODE) {
      console.log('erro');
      localStorage.removeItem('token');
      this.setState({
        error: true,
      });
    } else {
      this.setState({ api }, () => {
        this.createAnswers();
      });
    }
  };

  createAnswers = () => {
    const { api: { results }, question } = this.state;
    this.setState({ showResults: false });
    if (results[question].type === 'multiple') {
      this.multipleAnswers();
    } else {
      this.boolAnswers();
    }
  };

  boolAnswers = () => {
    const { api: { results }, question } = this.state;
    const { correct_answer: correctAnswer } = results[question];
    const answers = ['True', 'False'];
    this.setState({ correctAnswer }, this.randomArray(answers));
  };

  multipleAnswers = () => {
    const { api: { results }, question } = this.state;
    const { correct_answer: correctAnswer } = results[question];
    const answers = results[question].incorrect_answers;
    answers.push(correctAnswer);
    this.setState({ correctAnswer }, this.randomArray(answers));
  };

  randomArray = (answers) => {
    const REPEAT = answers.length;
    const THREE = 3;
    const randomAnswers = [];
    for (let i = 0; i < REPEAT; i += 1) {
      const num = Math.floor(Math.random() * THREE);
      if (num === 0) {
        const shiftAnswer = answers.shift();
        randomAnswers.push(shiftAnswer);
      } else {
        const popAnswer = answers.pop();
        randomAnswers.push(popAnswer);
      }
    }
    this.setState({ answers: randomAnswers });
  };

  renderAnswers = (answers) => {
    const { correctAnswer, showResults, isDisabled } = this.state;
    const num = 0;
    let index = num;

    return answers.map((answer, i) => {
      if (answer === correctAnswer) {
        return (
          <button
            key={ i }
            type="button"
            className={ showResults ? 'correct-answer' : '' }
            onClick={ this.nextQuestion }
            id="correct-answer"
            data-testid="correct-answer"
            disabled={ isDisabled }
          >
            { answer }
          </button>);
      }
      index = +1;
      return (
        <button
          type="button"
          onClick={ this.nextQuestion }
          className={ showResults ? 'wrong' : '' }
          id="incorrect-answer"
          name="incorrect-answer"
          data-testid={ `wrong-answer-${index}` }
          key={ i }
          disabled={ isDisabled }
        >
          { answer }
        </button>);
    });
  };

  calculateScore = () => {
    const { api, question, timer, score } = this.state;
    const { difficulty } = api.results[question];
    let result = score;
    const EASY = 1;
    const MEDIUM = 2;
    const HARD = 3;
    const correctAnswerScore = 10;

    this.setState((prevState) => ({
      assertions: prevState.assertions + 1,
    }));

    switch (difficulty) {
    case 'easy':
      result = correctAnswerScore + (EASY * timer);
      this.setState({
        score: result,
      });
      break;

    case 'medium':
      result = correctAnswerScore + (MEDIUM * timer);
      this.setState({
        score: result,
      });
      break;

    case 'hard':
      result = correctAnswerScore + (HARD * timer);
      this.setState({
        score: result,
      });
      break;

    default:
      break;
    }
    this.dispatcher();
  };

  dispatcher = () => {
    const { score, assertions } = this.state;
    const { dispatch } = this.props;

    dispatch(saveScore(score, assertions));
  };

  nextQuestion = async ({ target }) => {
    this.setState({ showResults: true });
    window.clearInterval(timerID);
    if (target.id === 'correct-answer') {
      this.calculateScore();
    }

    setTimeout(() => {
      this.setState((prevState) => { prevState.question += 1; }, () => {
        this.createAnswers();
      });
    }, '2000');
  };

  timeOut = () => {
    this.setState({ isDisabled: true });
  };

  counter = () => {
    const { showResults } = this.state;
    const ONE = 1000;
    const DURATION = 30;
    let timer = DURATION;
    console.log(showResults);
    timerID = setInterval(() => {
      timer -= 1;
      if (timer < 1) {
        timer = 0;
        this.timeOut();
      }
      this.setState({ timer });
    }, ONE);
  };

  render() {
    const { api, error, answers, question, timer } = this.state;
    return (
      <div>
        <p>{timer}</p>
        { error
          ? <Redirect to="/" />
          : (
            <div>
              <Header />
              <p data-testid="question-category">
                { api.results && api.results[question].category }
              </p>
              <p data-testid="question-text">
                { api.results && api.results[question].question }
              </p>
              <div data-testid="answer-options">
                {this.renderAnswers(answers)}
              </div>
            </div>
          )}
      </div>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Game);
