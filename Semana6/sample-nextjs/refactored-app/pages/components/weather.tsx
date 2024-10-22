// pages/components/weather.tsx
import type { NextPage } from "next";
import React, { useState, useEffect } from "react";

const PageComponentWeather: NextPage = () => {
  const WeatherComponent: React.FC<WeatherProps> = ({ weather }) => {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
      setCount(1);
    }, []);

    return (
      <h1 onClick={() => setCount(count + 1)}>
        El clima es {weather}, y el contador muestra {count}
      </h1>
    );
  };

  return <WeatherComponent weather="sunny" />;
};

export default PageComponentWeather;
