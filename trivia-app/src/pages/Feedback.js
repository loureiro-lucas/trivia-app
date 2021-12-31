import React, { useContext, useEffect, useState } from 'react';
import TriviaContext from '../context/TriviaContext';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';

const Feedback = ({ history }) => {
  const [gameResults, setGameResults] = useState({ numberOfQuestions: 0, questionsAnswered: [], score: 0 })
  const { numberOfQuestions, questionsAnswered, score } = gameResults;

  const { setNumberOfQuestions } = useContext(TriviaContext);

  useEffect(() => {
    getGameResultsFromStorage();
  }, []);

  const getGameResultsFromStorage = () => {
    const lastGameResults = JSON.parse(localStorage.getItem('lastGame'));
    setGameResults(lastGameResults);
  }

  const renderScore = () => (
    <Container
      align="center"
      sx={{
        width: "300px",
        border: "2px solid #a629cc",
        borderRadius: "10px",
        py: 1,
        my: 5,
        backgroundColor: "#fff",
      }}>
      <Typography variant="h6" component="p" color="secondary">
        {
          `${numberOfQuestions} ${numberOfQuestions === 1
            ? 'pergunta respondida'
            : 'perguntas respondidas'}...`
        }
      </Typography>
      <Typography variant="h6" component="p" color="#1B9a02">
        {
          `${score} ${score === 1
            ? 'acerto.'
            : 'acertos.'}`
        }
      </Typography>
      <Typography variant="h6" component="p" color="error">
        {
          `${numberOfQuestions - score} ${numberOfQuestions - score === 1
            ? 'erro.'
            : 'erros.'}`
        }
      </Typography>
    </Container>
  );

  const renderQuestionFeedback = ({ questionText, answerChosen, correct_answer }, index) => (
    <Container
      className="feedback-question-container"
      key={ index }
      align="center"
      sx={{
        border: "2px solid #1565C0",
        borderRadius: "10px",
        my: 1,
        py: 1,
        backgroundColor: "#fff"
      }}
    >
      <Typography
        variant="h6"
        component="p"
        color="primary"
      >
        { questionText }
      </Typography>
      <Typography
        variant="subtitle1"
        component="p"
        color={ answerChosen === correct_answer ? "#1B9a02" : "error" }
      >
        Sua resposta:{ ` ${answerChosen}` }
      </Typography>
      <Typography
        variant="subtitle1"
        component="p"
        color={ answerChosen === correct_answer ? "#1B9a02" : "error" }
      >
        Resposta correta:{ ` ${correct_answer}` }
      </Typography>
    </Container>
  );
  
  const handlePlayAgainButton = () => {
    setNumberOfQuestions(0);
    history.push('/');
  }

  return (
    <Container align="center">
      <Typography variant="h4" component="h1" color="secondary" sx={{ my: 7}}>
        Resultados do último jogo
      </Typography>
      { renderScore() }
      {
        questionsAnswered.map((questionAnswered, index) => {
          return renderQuestionFeedback(questionAnswered, index);
        })
      }
      <Button
        type="button"
        variant="contained"
        color="secondary"
        onClick={ handlePlayAgainButton }
        endIcon={ <ReplayRoundedIcon />}
        sx={{
          mt: 4,
        }}
      >
        Jogar novamente!
      </Button>
    </Container>
  )
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Feedback;
