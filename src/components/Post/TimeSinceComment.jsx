import { useState, useEffect } from 'react';
import { Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export default function TimeSinceComment({ timestamp }) {
  const [timeSinceComment, setTimeSinceComment] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = now - timestamp.toDate();
      const diffInMinutes = Math.round(diff / 1000 / 60);

      if (diffInMinutes < 60) {
        setTimeSinceComment(`${diffInMinutes}m`);
      } else {
        const diffInHours = Math.round(diffInMinutes / 60);
        if (diffInHours < 24) {
          setTimeSinceComment(`${diffInHours}h`);
        } else {
          const diffInDays = Math.round(diffInHours / 24);
          setTimeSinceComment(`${diffInDays}d`);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return <Text fontSize="xs">▪ {timeSinceComment}</Text>;
}

TimeSinceComment.propTypes = {
  timestamp: PropTypes.object.isRequired,
};
