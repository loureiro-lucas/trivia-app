import React, { useContext } from 'react';
import TriviaContext from '../context/TriviaContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header = () => {
  const {score} = useContext(TriviaContext); 

  return (
    <AppBar
      position="static"
    >
      <Toolbar
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
        >
          Responda se puder!
        </Typography>
        <Typography>
          {
            score === 0
            ? 'Você ainda não acertou nenhuma pergunta :/'
            : `Você já acertou ${score} ${score === 1 ? 'pergunta' : 'perguntas'}!`
          }
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header;
