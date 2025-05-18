import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const AnswerSummary = ({ answers, questions }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  
  // Filter only wrong answers
  const wrongAnswers = questions.map((question, index) => ({
    question,
    answer: answers[index],
    index
  })).filter(item => item.answer !== item.question.correctAnswer);

  const handleCardClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg p-6 md:p-8"
      >
        <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          Areas for Improvement 📚
        </h3>
        
        {wrongAnswers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <div className="text-4xl mb-4">🎉</div>
            <p className="text-xl text-gray-600">Perfect score! You got everything right!</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {wrongAnswers.map(({ question, answer, index }) => (
              <motion.div
                key={question.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
                onClick={() => handleCardClick(index)}
              >
                <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-600">
                        #{index + 1}
                      </span>
                      <h4 className="font-medium text-gray-800">
                        {question.question}
                      </h4>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                      className="text-gray-500"
                    >
                      ▼
                    </motion.div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-red-100"
                    >
                      <div className="p-4 bg-gradient-to-r from-red-50/50 to-rose-50/50">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-700">Your answer:</span>
                            <span className="text-red-600">
                              {answer || 'No answer'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-700">Correct answer:</span>
                            <span className="text-green-600">{question.correctAnswer}</span>
                          </div>
                          <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
                            <span className="font-medium text-indigo-800">Fun Fact: </span>
                            <span className="text-gray-700">{question.funFact}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AnswerSummary; 