import React, { useContext } from 'react';
import TriviaContext from '../context/TriviaContext';

const Header = () => {
  const {score} = useContext(TriviaContext); 

  return (
    <div>
      <h1>Responda se puder!</h1>
      <div>
        <p>
          {
            score === 0
            ? 'Você ainda não acertou nenhuma pergunta :/'
            : `Você já acertou ${score} ${score === 1 ? 'pergunta' : 'perguntas'}!`
          }
        </p>
      </div>
    </div>
  )
}

export default Header;
