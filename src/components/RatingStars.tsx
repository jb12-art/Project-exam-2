// src/components/RatingStars.tsx

import { useState } from 'react';
import { updateVenue } from '../api/venues';
import styles from './RatingStars.module.css';

type RatingStarsProps = {
  venueId: string;
  currentRating: number;
};

export default function RatingStars({
  venueId,
  currentRating,
}: RatingStarsProps) {
  const [rating, setRating] = useState(currentRating);
  const [message, setMessage] = useState('');

  async function handleRating(selectedRating: number) {
    try {
      await updateVenue(venueId, {
        rating: selectedRating,
      });

      setRating(selectedRating);
    } catch (error) {
      console.error(error);
      setMessage('Failed to set rating.');
    }
  }

  return (
    <div className={styles.rating}>
      <p className={styles.rateVenue}>Rate this venue</p>

      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={styles.star}
            onClick={() => handleRating(star)}
            aria-label={`Rate ${star} out of 5`}
          >
            {star <= rating ? '★' : '☆'}
          </button>
        ))}
      </div>

      {message && <p>{message}</p>}
    </div>
  );
}
