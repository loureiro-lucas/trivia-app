const fetchQuestions = (numberOfQuestions) => {
  return fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}`)
    .then((response) => response.json())
    .then((json) => json.results)
    .catch((error) => console.log(error));
}

export default fetchQuestions;
