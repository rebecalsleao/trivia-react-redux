import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';

export default class Game extends Component {
  state = {
    api: {},
    error: false,
    question: 0,
  };

  componentDidMount() {
    this.getQuestion();
  }

  getQuestion = async () => {
    const { token } = localStorage;
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(url);
    const api = await response.json();
    console.log(api);
    this.validateToken(api);
    this.setState({
      api,
    });
  };

  validateToken = (api) => {
    const ERRORCODE = 3;
    if (api.response_code === ERRORCODE) {
      localStorage.removeItem('token');
      this.setState({
        error: true,
      });
    }
  };

  multipleAnswers = () => {
    const { api } = this.state;
    const { results } = api;
    const answers = results[0].incorrect_answers;
    answers.push(results[0].correct_answer);
    const randomAnswers = [];
    const NUMFOUR = 4;
    const NUMTHREE = 3;
    for (let i = 0; i < NUMFOUR; i += 1) {
      const num = Math.floor(Math.random() * NUMTHREE);
      if (num === 0) {
        const shiftAnswer = answers.shift();
        randomAnswers.push(shiftAnswer);
      } else {
        const popAnswer = answers.pop();
        randomAnswers.push(popAnswer);
      }
    }
    const num = -1;
    let index = num;
    return randomAnswers.map((answer, i) => {
      if (answer === results[0].correct_answer) {
        return (
          <button
            key={ i }
            type="button"
            data-testid="correct-answer"
          >
            { answer }
          </button>);
      }
      index += 1;
      return (
        <button
          type="button"
          data-testid={ `wrong-answer-${index}` }
          key={ i }
        >
          { answer }
        </button>);
    });
  };

  render() {
    const { api, error, question, randomAnswers } = this.state;
    return (
      <div>
        { error && <Redirect path="/" /> }
        <Header />
        <div>
          <p data-testid="question-category">
            { api.results && api.results[0].category }
          </p>
          <p data-testid="question-text">
            { api.results && api.results[0].question }
          </p>
          <div data-testid="answer-options">
            { api.results
            && (api.results[0].type === 'multiple'
              ? this.multipleAnswers()
              : <p>Boolean</p>) }
          </div>
        </div>
      </div>
    );
  }
}
