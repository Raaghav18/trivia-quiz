import { motion } from 'framer-motion';

const getEncouragingMessage = (score, totalQuestions) => {
  const percentage = (score / (totalQuestions * 10)) * 100;
  
  if (percentage === 100) return "Perfect score! You're a trivia master! 🏆";
  if (percentage >= 80) return "Fantastic job! Nearly perfect! 🌟";
  if (percentage >= 60) return "Great effort! You know your stuff! 👏";
  if (percentage >= 40) return "Not bad! Keep learning! 📚";
  return "Hey, every expert was once a beginner! Try again! 💪";
};

const ScoreSummary = ({ score, correctAnswers, totalQuestions, onRestart, onReturnHome }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-container text-alignment"
    >
      <h2 className="main-heading mb-4">Quiz Complete!</h2>
      <p className="score-text mb-2">Great job, Player!</p>
      <p className="score-text mb-8">
        You scored {score} points with {correctAnswers} correct answers out of {totalQuestions} questions.
      </p>
      <div className="button-container space-x-4">
        <motion.button
          onClick={onRestart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="primary-button"
        >
          Try Again
        </motion.button>
        <motion.button
          onClick={onReturnHome}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="secondary-button"
        >
          Return Home
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ScoreSummary; 