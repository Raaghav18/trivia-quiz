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
      className="w-full text-alignment"
    >
      <div className="card-container">
        <TimerBar onTimeout={onTimeout} />
        
        <div className="text-alignment mb-4">
          <span className="question-counter">
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>
        
        <h2 className="question-text">
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
              className={`option-button ${getOptionClass(option)}
                ${!showFeedback ? 'hover:shadow-xl cursor-pointer' : ''}
                disabled:cursor-not-allowed text-lg md:text-xl font-medium`}
            >
              <div className="flex-end-container">
                <span className="text-2xl font-semibold mr-4 text-indigo-600 text-alignment">
                  {String.fromCharCode(65 + index)}) 
                </span>
                <span className="text-alignment">{option}</span>
                {showFeedback && option === correctAnswer && (
                  <span className="text-green-600 ml-4">✓</span>
                )}
                {showFeedback && option === selectedAnswer && option !== correctAnswer && (
                  <span className="text-red-600 ml-4">✗</span>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default QuizCard; 