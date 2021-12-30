import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import TriviaContext from '../context/TriviaContext';
import PropTypes from 'prop-types';
import { Button, Container, Typography } from '@mui/material';

const Game = ({ history }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestionAnswers, setCurrentQuestionAnswers] = useState([]);
  const [isNextAndFinishButtonsDisabled, setIsNextAndFinishButtonsDisabled] = useState(true);
  const [isAnswersDisabled, setIsAnswersDisabled] = useState(false);

  const {
    questions,
    numberOfQuestions,
    questionsAnswered,
    setQuestionsAnswered,
    score,
    setScore,
  } = useContext(TriviaContext);

  useEffect(() => {
    randomizeCurrentQuestionAnswers();
  }, [currentQuestionIndex]);

  const randomizeCurrentQuestionAnswers = () => {
    const { correct_answer, incorrect_answers } = questions[currentQuestionIndex];
    const answers = [correct_answer, ...incorrect_answers];
    const CONTROL_PROBABILITY = 0.5;
    // Código da linha abaixo baseado no link: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array resposta do usuário yuval.bl
    const answersRandomized = answers
      .sort(() => (Math.random() > CONTROL_PROBABILITY ? 1 : -1));

    setCurrentQuestionAnswers(answersRandomized);
  }

  const handleNextButton = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setIsAnswersDisabled(false);
    setIsNextAndFinishButtonsDisabled(true);
  }

  const renderNextButton = () => (
    <Button
      variant="contained"
      color="success"
      type="button"
      onClick={ handleNextButton }
      disabled={ isNextAndFinishButtonsDisabled }
      sx={{
        mt: 3,
      }}
    >
      Próxima pergunta
    </Button>
  );

  const saveGameToStorage = () => {
    const game = JSON.stringify({
      numberOfQuestions,
      score,
      questionsAnswered
    });
    localStorage.setItem('lastGame', game);
  }

  const handleFinishButton = () => {
    setIsAnswersDisabled(false);
    setIsNextAndFinishButtonsDisabled(true);
    saveGameToStorage();
    history.push('/feedback');
  }

  const renderFinishButton = () => (
    <Button
      variant="contained"
      color="success"
      type="button"
      onClick={ handleFinishButton }
      disabled={ isNextAndFinishButtonsDisabled }
      sx={{
        mt: 3,
      }}
    >
      Ver resultado
    </Button>
  );

  const renderAnswers = () => (
    currentQuestionAnswers.map((answer, index) => (
      <Button
        key={ index }
        type="button"
        name={ answer }
        onClick={ handleClickAnswer }
        disabled={ isAnswersDisabled }
        variant="contained"
        sx={{ my: 0.25 }}
      >
        { answer }
      </Button>
    ))
  );

  const handleScore = (chosen, correct) => {
    chosen === correct && setScore(score + 1);
  }

  const answerQuestion = (answerChosen) => {
    const { correct_answer, question: questionText } = questions[currentQuestionIndex];

    handleScore(answerChosen, correct_answer);

    setQuestionsAnswered([
      ...questionsAnswered,
      { questionText, answerChosen, correct_answer },
    ]);
  }

  const handleClickAnswer = ({ target }) => {
    const answerChosen = target.name;

    answerQuestion(answerChosen);
    setIsAnswersDisabled(true);
    setIsNextAndFinishButtonsDisabled(false);
  }

  return (
    <>
      <Header />
      <Container
        sx={{
          mt: "15vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {questions.length > 0
        && (
          <Container align="center">
            <Typography
              variant="h5"
              component="p"
              align="center"
              sx={{
                mb: 2,
              }}
            >
              { questions[currentQuestionIndex].question }
            </Typography>
            <Container sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              { renderAnswers() }
            </Container>
          </Container>
        )}
        { currentQuestionIndex < numberOfQuestions -1 ? renderNextButton() : renderFinishButton() }
      </Container>
    </>
  )
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Game;
