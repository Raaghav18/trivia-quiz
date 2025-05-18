import questionsDB from '../data/questionsDB.json';

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Get random questions from the database
export const getRandomQuestions = (count = 10) => {
  const allQuestions = [...questionsDB.questions];
  const shuffledQuestions = shuffleArray(allQuestions);
  return shuffledQuestions.slice(0, count);
};

// Get all available categories
export const getCategories = () => {
  const categories = new Set(questionsDB.questions.map(q => q.category));
  return Array.from(categories);
};

// Get total number of questions in the database
export const getTotalQuestions = () => {
  return questionsDB.questions.length;
};

// Get questions by category
export const getQuestionsByCategory = (category, count = 10) => {
  const categoryQuestions = questionsDB.questions.filter(q => q.category === category);
  const shuffledQuestions = shuffleArray([...categoryQuestions]);
  return shuffledQuestions.slice(0, count);
}; 