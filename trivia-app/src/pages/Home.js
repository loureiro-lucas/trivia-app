import React, { useContext, useEffect, useState } from 'react';
import TriviaContext from '../context/TriviaContext';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import '../Styles/Home.css';

const Home = ({ history }) => {
  const [isNumberOfQuestionsChoosen, setIsNumberOfQuestionsChoosen] = useState(false);
  const [isLastGameResultsButtonDisabled, setIsLastGameResultsButtonDisabled] = useState(true)
  const [numberOfQuestionsError, setNumberOfQuestionsError] = useState(false);

  const {
    setQuestions,
    numberOfQuestions,
    setNumberOfQuestions,
    getQuestions,
    setQuestionsAnswered,
    setScore,
  } = useContext(TriviaContext);

  useEffect(() => {
    setQuestions([]);
    setNumberOfQuestions();
    setQuestionsAnswered([]);
    setScore(0);
    checkForPreviousGame();
    setNumberOfQuestionsError(false);
  }, [])

  const handleChange = ({ target: { value } }) => setNumberOfQuestions(value);

  const validateNumberOfQuestions = () => {
    let isValid = false;
    if (numberOfQuestions) {
      setNumberOfQuestionsError(false);
      isValid = true;
    } else {
      setNumberOfQuestionsError(true);
      isValid = false;
    }
    return isValid;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateNumberOfQuestions()) {
      setIsNumberOfQuestionsChoosen(true);
    };
  }

  const startGame = () => {
    getQuestions(numberOfQuestions)
      .then(() => {
        history.push('./game');
      });
  }

  const cancelGame = () => {
    setIsNumberOfQuestionsChoosen(false);
  }

  const renderForm = () => (
    <form
      onSubmit={ handleSubmit }
      autoComplete="off"
      noValidate
      className="number-of-questions-form"
    >
      <Container fullWidth sx={{ display: "flex", mb: "15px" }}>
        <TextField
          id="number-of-questions"
          name="number-of-questions"
          label="Quantas perguntas você deseja responder?"
          variant="outlined"
          size="small"
          value={ numberOfQuestions }
          onChange={ handleChange }
          error={ numberOfQuestionsError }
          helperText={ numberOfQuestionsError && 'Campo obrigatório' }
          fullWidth
          required
          sx={{ mr: 0.5}}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ height: "40px" }}
        >
          Confirmar
        </Button>
      </Container>
    </form>
  );

  const renderConfirmation = () => (
    <Container>
      <Typography
        variant="h6"
        component="h2"
        align="center"
        sx={{ pb: "15px" }}
      >
        Iniciar jogo?
      </Typography>

      <ButtonGroup
        fullWidth
        sx={{ mb: "15px" }}
      >
        <Button
          type="button"
          onClick={ startGame }
          color="primary"
          variant="contained"
        >
          Start
        </Button>
        <Button
          type="button"
          onClick={ cancelGame }
          color="error"
          variant="contained"
        >
          Cancel
        </Button>
      </ButtonGroup>
    </Container>
  );

  const checkForPreviousGame = () => {
    const lastGameResults = JSON.parse(localStorage.getItem('lastGame'));
    if (lastGameResults) {
      setIsLastGameResultsButtonDisabled(false);
    } else {
      setIsLastGameResultsButtonDisabled(true);
    }
  }

  const renderLastGameFeedbackButton = () => (
    <Button
      type="button"
      onClick={ () => history.push('/feedback') }
      disabled={ isLastGameResultsButtonDisabled }
      sx={{ width: "275px", mx: "auto" }}
    >
      Ver resultados do jogo anterior
    </Button>
  )

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: "25vh",
        height: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        align="center"
        sx={{ pb: "30px" }}
      >
        Responda se puder!
      </Typography>

      { isNumberOfQuestionsChoosen ? renderConfirmation() : renderForm() }

      { renderLastGameFeedbackButton() }
    </Container>
  );
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Home;
