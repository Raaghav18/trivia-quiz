import { motion } from 'framer-motion';

const Leaderboard = ({ scores, gamesPlayed, onReset }) => {
  const topScore = scores.length > 0 ? scores[0] : null;

  return (
    <div className="w-full mt-8 mb-12 text-alignment">
      <div className="flex-end-container mb-6">
        <div className="w-full text-alignment">
          <h2 className="section-heading">
            Stats 📊
          </h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="reset-button"
        >
          Reset Stats
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="stats-card"
        >
          <div className="stats-text">Games Played</div>
          <div className="stats-value">{gamesPlayed}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="stats-card"
        >
          <div className="stats-text">Top Score</div>
          {topScore ? (
            <div className="flex-end-container gap-3">
              <span className="stats-value">
                {topScore.score} pts
              </span>
              <span className="text-xl text-alignment">🏆</span>
            </div>
          ) : (
            <div className="text-xl text-gray-500 italic text-alignment">No scores yet</div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard; 