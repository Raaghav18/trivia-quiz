import { motion } from 'framer-motion';

const AnswerSummary = ({ answers, questions }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg p-6 md:p-8"
      >
        <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          Quiz Summary 📝
        </h3>
        
        <div className="space-y-6">
          {questions.map((question, index) => (
            <motion.div
              key={question.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-gray-600">
                    #{index + 1}
                  </span>
                  <h4 className="font-medium text-gray-800">
                    {question.question}
                  </h4>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
                <div className="space-y-3">
                  {question.options.map((option, optionIndex) => {
                    const isCorrectAnswer = option === question.correctAnswer;
                    const isSelectedAnswer = option === answers[index];
                    const bgColor = isCorrectAnswer 
                      ? 'bg-green-100 border-green-500 text-green-800'
                      : isSelectedAnswer && !isCorrectAnswer
                        ? 'bg-red-100 border-red-500 text-red-800'
                        : 'bg-white border-gray-200 text-gray-700';

                    return (
                      <div
                        key={optionIndex}
                        className={`p-3 rounded-lg border ${bgColor} flex items-center gap-2`}
                      >
                        <span className="font-medium">
                          {String.fromCharCode(65 + optionIndex)})
                        </span>
                        <span>{option}</span>
                        {isCorrectAnswer && (
                          <span className="ml-auto text-green-600">✓</span>
                        )}
                        {isSelectedAnswer && !isCorrectAnswer && (
                          <span className="ml-auto text-red-600">✗</span>
                        )}
                      </div>
                    );
                  })}
                  <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
                    <span className="font-medium text-indigo-800">Fun Fact: </span>
                    <span className="text-gray-700">{question.funFact}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AnswerSummary; 