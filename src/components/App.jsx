import React, { useState } from 'react';
import Statistics from './Feedback/Statistics';
import Section from './Feedback/Section';
import FeedbackOptions from './Feedback/FeedbackOptions';
import Notification from './Feedback/Notification';
function App() {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleFeedback = label => {
    setFeedback(state => {
      const newState = { ...state };
      newState[label] = state[label] + 1;
      return newState;
    });
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedback;
    const total = good + neutral + bad;
    return total;
  };

  const countPositiveFeedbackPercentage = () => {
    const totalFeedback = countTotalFeedback();
    const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100);
    if (!positiveFeedback) {
      return 0;
    }
    return positiveFeedback;
  };
  const options = Object.keys(feedback);
  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={handleFeedback} />
      </Section>

      <Section title="Statistics">
        {countTotalFeedback() ? (
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message={'There is no feedback'} />
        )}
      </Section>
    </div>
  );
}

export default App;
