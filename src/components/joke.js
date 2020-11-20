import React, { useEffect, useState } from "react";
import md5 from "md5";

const Joke = () => {
  const [heroes, setHeroes] = useState({personajes:[]});
  const privateKey = "5fd7c99addc033f51fcb67fce85f7321abb6add4";
  const publicKey = "2d42e1ccf39658cfff61d296771872ae";
  const ts = "hero";

  const hash = md5(ts + privateKey + publicKey);
  const URL =
    "https://gateway.marvel.com:443/v1/public/characters?apikey=" +
    publicKey +
    "&hash=" +
    hash +
    "&ts=" +
    ts;
  console.log(URL);

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("heroes") === null) {
        setHeroes("Error while connecting with API. Try again later.");
      } else {
        setHeroes({personajes: [localStorage.getItem('heroes')]});
        console.log(heroes);
      } 
    } else { 
      fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          let pjs = [];
          res.data.results.map((h) => pjs.push(h)); 
          setHeroes({personajes: pjs});
          localStorage.setItem('heroes', pjs);
          console.log(pjs);
        }); 
    }  
  }, []);
  return (
    <div>
      <h1>Marvel super heroes:</h1>
      <div>
        {heroes.personajes.map((d) => {
          return (
            <div>
              <h2>{d.name}</h2>
              <p>{d.description}</p>
            </div>
          ); 
        })}
      </div>
      <p></p>
    </div>
  );
};

export default Joke;
