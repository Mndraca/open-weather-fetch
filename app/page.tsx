"use client";

import { ResultData } from "@/components/data";
import { WeatherForm } from "@/components/wheather";

export default function Home() {
  return (
    <div>
      <ResultData />
      <WeatherForm />
    </div>
  );
}
