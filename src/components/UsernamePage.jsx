import { useState } from 'react';
import { motion } from 'framer-motion';

const UsernamePage = ({ onStart }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim().length < 2) {
      setError('Please enter a valid username (at least 2 characters)');
      return;
    }
    onStart(username);
  };

  return (
    <motion.div
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
        Enter Your Name
      </motion.h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 mt-8">
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError('');
            }}
            className="w-full px-4 py-3 rounded-lg border-2 border-indigo-500/30 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
            placeholder="Enter your name"
          />
          {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
          )}
        </div>
        
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="primary-button w-full"
        >
          Start Quiz
        </motion.button>
      </form>
    </motion.div>
  );
};

export default UsernamePage; 