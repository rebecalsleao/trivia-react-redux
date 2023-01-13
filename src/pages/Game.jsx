import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';

export default class Game extends Component {
  state = {
    api: {},
    error: false,
    question: 0,
    correctAnswer: '',
    answers: [],
  };

  componentDidMount() {
    this.getQuestion();
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
    console.log(results[question]);
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
    const { correctAnswer } = this.state;
    const num = -1;
    let index = num;

    return answers.map((answer, i) => {
      if (answer === correctAnswer) {
        return (
          <button
            className="wrong"
            key={ i }
            type="button"
            onClick={ this.nextQuestion }
            id="correct-answer"
            data-testid="correct-answer"
          >
            { answer }
          </button>);
      }
      index += 1;
      return (
        <button
          className="correct-answer"
          type="button"
          onClick={ this.nextQuestion }
          id="incorrect-answer"
          data-testid={ `wrong-answer-${index}` }
          key={ i }
        >
          { answer }
        </button>);
    });
  };

  nextQuestion = ({ target }) => {
    if (target.id === 'correct-answer') {
      console.log('correto');
    }
    this.setState((prevState) => { prevState.question += 1; }, () => {
      this.createAnswers();
    });
  };

  render() {
    const { api, error, answers, question } = this.state;
    return (
      <div>
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
