import { useState, useEffect } from 'react';

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isExpired: boolean;
  totalSeconds: number;
}

export const useCountdown = (targetDateString: string | undefined): TimeLeft => {
  const calculateTimeLeft = (): TimeLeft => {
    if (!targetDateString) {
      return { days: '00', hours: '00', minutes: '00', seconds: '00', isExpired: true, totalSeconds: 0 };
    }

    const difference = +new Date(targetDateString) - +new Date();

    if (difference <= 0) {
      return { days: '00', hours: '00', minutes: '00', seconds: '00', isExpired: true, totalSeconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return {
      days: days < 10 ? `0${days}` : `${days}`,
      hours: hours < 10 ? `0${hours}` : `${hours}`,
      minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
      seconds: seconds < 10 ? `0${seconds}` : `${seconds}`,
      isExpired: false,
      totalSeconds: Math.floor(difference / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateString]);

  return timeLeft;
};
