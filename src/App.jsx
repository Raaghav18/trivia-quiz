import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import QuizCard from './components/QuizCard'
import ScoreSummary from './components/ScoreSummary'
import Leaderboard from './components/Leaderboard'
import AnswerSummary from './components/AnswerSummary'
import { getRandomQuestions, getTotalQuestions } from './services/questionService'
import './App.css'
import './styles.css'

// Function to get scores from localStorage
const getStoredScores = () => {
  const scores = localStorage.getItem('quizScores');
  return scores ? JSON.parse(scores) : [];
};

// Function to get games played from localStorage
const getGamesPlayed = () => {
  const games = localStorage.getItem('gamesPlayed');
  return games ? parseInt(games) : 0;
};

// Function to save score to localStorage
const saveScore = (newScore) => {
  const scores = getStoredScores();
  const newScores = [...scores, newScore]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3); // Keep only top 3 scores
  localStorage.setItem('quizScores', JSON.stringify(newScores));
  return newScores;
};

function App() {
  const [gameState, setGameState] = useState('start') // 'start', 'playing', 'end'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [topScores, setTopScores] = useState([])
  const [gamesPlayed, setGamesPlayed] = useState(0)
  const [currentQuestions, setCurrentQuestions] = useState([])
  const [totalQuestionsInDB, setTotalQuestionsInDB] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])

  useEffect(() => {
    // Load scores and games played when component mounts
    setTopScores(getStoredScores());
    setGamesPlayed(getGamesPlayed());
    setTotalQuestionsInDB(getTotalQuestions());
  }, []);

  const resetGame = () => {
    const newQuestions = getRandomQuestions(10);
    setCurrentQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCorrectAnswers(0);
    setShowFeedback(false);
    setSelectedAnswer(null);
    setUserAnswers([]);
  };

  const handleStartQuiz = () => {
    resetGame();
    setGameState('playing');
  };

  const handleReturnHome = () => {
    resetGame();
    setGameState('start');
  };

  const handleResetStats = () => {
    localStorage.removeItem('quizScores');
    localStorage.setItem('gamesPlayed', '0');
    setTopScores([]);
    setGamesPlayed(0);
  };

  const handleAnswer = async (answer) => {
    setSelectedAnswer(answer)
    setShowFeedback(true)
    
    const isCorrect = answer === currentQuestions[currentQuestionIndex].correctAnswer
    if (isCorrect) {
      setScore(prev => prev + 10)
      setCorrectAnswers(prev => prev + 1)
    }

    // Update user answers array
    setUserAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = answer;
      return newAnswers;
    });

    setTimeout(async () => {
      if (currentQuestionIndex < currentQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
        setShowFeedback(false)
        setSelectedAnswer(null)
      } else {
        const finalScore = score + (isCorrect ? 10 : 0);
        const finalCorrectAnswers = correctAnswers + (isCorrect ? 1 : 0);
        
        // Update local storage
        const newTopScores = saveScore({ score: finalScore, correctAnswers: finalCorrectAnswers });
        setTopScores(newTopScores);
        
        // Increment games played
        const newGamesPlayed = gamesPlayed + 1;
        localStorage.setItem('gamesPlayed', newGamesPlayed.toString());
        setGamesPlayed(newGamesPlayed);
        
        setGameState('end')
      }
    }, 1500)
  }

  const handleTimeout = async () => {
    if (!showFeedback) {
      setShowFeedback(true)
      
      // Update user answers array with no answer
      setUserAnswers(prev => {
        const newAnswers = [...prev];
        newAnswers[currentQuestionIndex] = null;
        return newAnswers;
      });
      
      setTimeout(async () => {
        if (currentQuestionIndex < currentQuestions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1)
          setShowFeedback(false)
          setSelectedAnswer(null)
        } else {
          // Update local storage
          const newTopScores = saveScore({ score, correctAnswers });
          setTopScores(newTopScores);
          
          // Increment games played
          const newGamesPlayed = gamesPlayed + 1;
          localStorage.setItem('gamesPlayed', newGamesPlayed.toString());
          setGamesPlayed(newGamesPlayed);
          
          setGameState('end')
        }
      }, 1500)
    }
  }

  return (
    <div className="app-container">
      {/* Animated background elements */}
      <div className="animated-background">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/30 via-violet-500/30 to-fuchsia-500/30 animate-pulse"></div>
        <div className="blob-animation -top-1/2 -left-1/2 from-cyan-500/30 to-transparent"></div>
        <div className="blob-animation -bottom-1/2 -right-1/2 from-violet-500/30 to-transparent animation-delay-2000"></div>
        <div className="blob-animation top-1/2 left-1/2 from-fuchsia-500/30 to-transparent animation-delay-4000"></div>
      </div>

      <div className="flex-end-container w-full">
        <div className="content-container">
          <AnimatePresence mode="wait">
            {gameState === 'start' && (
              <motion.div
                key="start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="card-container text-alignment"
              >
                <motion.h1 
                  className="main-heading"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Trivia Time!
                </motion.h1>
                <p className="score-text mb-8">
                  Test your knowledge with 10 random questions from our pool of {totalQuestionsInDB} trivia questions! 
                  You have 15 seconds per question. Get ready to challenge yourself!
                </p>

                <div className="w-full">
                  <Leaderboard 
                    scores={topScores} 
                    gamesPlayed={gamesPlayed}
                    onReset={handleResetStats}
                  />
                </div>

                <div className="button-container mt-8">
                  <motion.button
                    onClick={handleStartQuiz}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="primary-button"
                  >
                    Start Quiz
                  </motion.button>
                </div>
              </motion.div>
            )}

            {gameState === 'playing' && currentQuestions.length > 0 && (
              <div className="w-full text-alignment">
                <h2 className="text-2xl font-bold mb-6 text-white">
                  Welcome, Player!
                </h2>
                <QuizCard
                  key={currentQuestionIndex}
                  question={currentQuestions[currentQuestionIndex].question}
                  questionNumber={currentQuestionIndex + 1}
                  totalQuestions={currentQuestions.length}
                  options={currentQuestions[currentQuestionIndex].options}
                  onAnswer={handleAnswer}
                  showFeedback={showFeedback}
                  selectedAnswer={selectedAnswer}
                  correctAnswer={currentQuestions[currentQuestionIndex].correctAnswer}
                  onTimeout={handleTimeout}
                />
              </div>
            )}

            {gameState === 'end' && (
              <div className="w-full text-alignment">
                <div className="space-y-8">
                  <ScoreSummary
                    score={score}
                    correctAnswers={correctAnswers}
                    totalQuestions={currentQuestions.length}
                    onRestart={handleStartQuiz}
                    onReturnHome={handleReturnHome}
                  />
                  <AnswerSummary
                    answers={userAnswers}
                    questions={currentQuestions}
                  />
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default App
