import { motion } from 'framer-motion';
import TimerBar from './TimerBar';

const QuizCard = ({ 
  question,
  questionNumber,
  totalQuestions, 
  options, 
  onAnswer, 
  showFeedback, 
  selectedAnswer,
  correctAnswer,
  onTimeout 
}) => {
  const getOptionClass = (option) => {
    if (!showFeedback) return 'bg-gradient-to-r from-white/80 to-white/60 hover:from-white/90 hover:to-white/70 border-transparent';
    if (option === correctAnswer) return 'bg-gradient-to-r from-green-100 to-emerald-100 border-emerald-500 text-emerald-800';
    if (option === selectedAnswer) return 'bg-gradient-to-r from-red-100 to-rose-100 border-red-500 text-red-800';
    return 'bg-white/30 border-gray-200/50 opacity-50';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 text-center">
        <TimerBar onTimeout={onTimeout} />
        
        <div className="flex justify-center mb-4">
          <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-800 font-semibold">
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mt-8 mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          {question}
        </h2>

        <div className="space-y-4">
          {options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => !showFeedback && onAnswer(option)}
              disabled={showFeedback}
              whileHover={!showFeedback ? { scale: 1.02, x: 10 } : {}}
              whileTap={!showFeedback ? { scale: 0.98 } : {}}
              className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-200
                ${getOptionClass(option)}
                ${!showFeedback ? 'hover:shadow-xl cursor-pointer' : ''}
                disabled:cursor-not-allowed text-lg md:text-xl font-medium`}
            >
              <div className="flex items-center">
                <span className="text-2xl font-semibold mr-4 text-indigo-600">
                  {String.fromCharCode(65 + index)}) 
                </span>
                {option}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default QuizCard; 