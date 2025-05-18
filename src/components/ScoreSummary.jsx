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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full"
    >
      <div className="card-container">
        <div className="text-alignment">
          <motion.h2 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="section-heading mb-8"
          >
            Quiz Complete!
          </motion.h2>
          
          <div className="space-y-6 mb-12">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="score-value"
            >
              {score} pts
            </motion.div>
            
            <div className="score-text">
              You got <span className="font-semibold text-indigo-600">{correctAnswers}</span> out of{" "}
              <span className="font-semibold text-purple-600">{totalQuestions}</span> questions right!
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="score-text italic"
            >
              {getEncouragingMessage(score, totalQuestions)}
            </motion.p>
          </div>

          <div className="button-container">
            <motion.button
              onClick={onRestart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="primary-button"
            >
              Play Again
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
        </div>
      </div>
    </motion.div>
  );
};

export default ScoreSummary; 