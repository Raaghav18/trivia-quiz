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
      className="w-full max-w-4xl mx-auto px-4"
    >
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 text-center">
        <motion.h2 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-8"
        >
          Quiz Complete!
        </motion.h2>
        
        <div className="space-y-6 mb-12">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500"
          >
            {score} pts
          </motion.div>
          
          <div className="text-xl md:text-2xl text-gray-700">
            You got <span className="font-semibold text-indigo-600">{correctAnswers}</span> out of{" "}
            <span className="font-semibold text-purple-600">{totalQuestions}</span> questions right!
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 italic"
          >
            {getEncouragingMessage(score, totalQuestions)}
          </motion.p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            onClick={onRestart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 
              text-white font-bold text-xl py-5 px-10 rounded-2xl
              transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Play Again
          </motion.button>

          <motion.button
            onClick={onReturnHome}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 
              text-white font-bold text-xl py-5 px-10 rounded-2xl
              transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Return Home
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ScoreSummary; 