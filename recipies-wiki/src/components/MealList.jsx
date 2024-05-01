import React from 'react';
import Card from './Card';

function MealList({ data }) {
  if (!data) {
    return null; // or return loading indicator, error message, or empty state
  }

  return (
    <div>
      {data.map((meal) => (
        <Card key={meal.idMeal} meal={meal} />
      ))}
    </div>
  );
}

export default MealList;