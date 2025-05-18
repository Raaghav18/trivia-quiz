import { motion } from 'framer-motion';

const Leaderboard = ({ scores, gamesPlayed, onReset }) => {
  const topScore = scores.length > 0 ? scores[0] : null;

  return (
    <div className="w-full mt-8 mb-12 text-center">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 text-center">
          Stats 📊
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors text-center"
        >
          Reset Stats
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-white/80 to-white/60 rounded-xl p-6 text-center"
        >
          <div className="text-lg text-gray-600 mb-2 text-center">Games Played</div>
          <div className="text-3xl font-bold text-indigo-600 text-center">{gamesPlayed}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-white/80 to-white/60 rounded-xl p-6 text-center"
        >
          <div className="text-lg text-gray-600 mb-2 text-center">Top Score</div>
          {topScore ? (
            <div className="flex items-center justify-center gap-3 text-center">
              <span className="text-3xl font-bold text-indigo-600">
                {topScore.score} pts
              </span>
              <span className="text-xl">🏆</span>
            </div>
          ) : (
            <div className="text-xl text-gray-500 italic text-center">No scores yet</div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard; 