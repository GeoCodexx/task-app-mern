import { useMemo } from "react";

export default function useRows() {
  const rows = useMemo(
    () => [
      {
        title: "Audi",
        description: "A3",
        date: "Sedan, Convertible",
        createdAt: "2015"
      },
      {
        title: "Audi",
        description: "A3",
        date: "Wagon",
        createdAt: "2013"
      },
      {
        title: "Audi",
        description: "A3 Sportback e-tron",
        date: "Wagon",
        createdAt: "2016"
      },
      {
        title: "Audi",
        description: "A4",
        date: "Sedan, Convertible",
        createdAt: "2006"
      },
      {
        title: "Audi",
        description: "A4",
        date: "Sedan, Wagon",
        createdAt: "2001"
      },
      {
        title: "Audi",
        description: "A4 allroad",
        date: "Wagon",
        createdAt: "2019"
      },
      {
        title: "Audi",
        description: "A5",
        date: "Coupe",
        createdAt: "2008"
      },
      {
        title: "Audi",
        description: "A5 Sport",
        date: "Convertible, Coupe",
        createdAt: "2017"
      },
      {
        title: "Audi",
        description: "Q3",
        date: "SUV",
        createdAt: "2020"
      },
      {
        title: "Audi",
        description: "R8",
        date: "Coupe",
        createdAt: "2008"
      },
      {
        title: "Audi",
        description: "TT",
        date: "Coupe",
        createdAt: "2019"
      },
      {
        title: "Audi",
        description: "Q7",
        date: "SUV",
        createdAt: "2015"
      },
      {
        title: "Audi",
        description: "Q8",
        date: "SUV",
        createdAt: "2019"
      },
      {
        title: "Audi",
        description: "Cabriolet",
        date: "Convertible, Coupe",
        createdAt: "1996"
      },
      {
        title: "Audi",
        description: "S3",
        date: "Coupe",
        createdAt: "2004"
      }
    ],
    []
  );

  return rows;
}
