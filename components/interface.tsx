export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
}

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  };
}
