import { useState, useEffect } from 'react';
import Card from './components/Card'
import Header from './components/Header'
import React from 'react';
import shuffle from './utilities/shuffle'
import useAppBadge from './hooks/useAppBadge'



function App() {
  const [cards, setCards] = useState(shuffle);//cards array initialization
  const [pickOne, setOne] = useState(null);
  const [pickTwo, setTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);//disable handler
  const [wins, setWins] = useState(0);//win streak
  const [setBadge, clearBadge] = useAppBadge();

  //handle card selection
  const handleClick = (card) => {
    if (!disabled)
      pickOne ? setTwo(card) : setOne(card);
  }

  //handle turn
  const turnHandler = () => {
    setOne(null);
    setTwo(null);
    setDisabled(false);
  }

  const handleNewGame = () => {
    clearBadge();
    setWins(0);
    turnHandler();
    setCards(shuffle);
  }

  //determine matching
  useEffect(() => {
    let pickTimer;
    //happens only when two cards are selected
    if (pickOne && pickTwo) {
      if (pickOne.image === pickTwo.image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === pickOne.image) {
              //update card property
              return { ...card, matched: true };
            }
            else {
              return card;
            }
          })
        });
        turnHandler();
      }
      else {
        //if not the same disable
        setDisabled(true);
        //delay between selections
        pickTimer = setTimeout(() => { turnHandler(); }, 1000);
      }
    }

    //ensure no conflicting
    return () => {
      clearTimeout(pickTimer);
    }
  }, [cards, pickOne, pickTwo]);

  useEffect(() => {
    const checkWin = cards.filter((card) => !card.matched)

    if (cards.length && checkWin.length < 1) {
      console.log('You win!');
      setWins(wins + 1);
      turnHandler();
      setBadge();
      setCards(shuffle);
    }

  }, [cards, wins, setBadge]);

  return (
    <>
      <Header handleNewGame={handleNewGame} wins={wins} />
      <div className="grid" >
        {cards.map((card) => {
          const { image, id, matched } = card;//destruct
          return (<Card key={id} image={image} selected={
            card === pickOne || card === pickTwo || matched
          } onClick={() => handleClick(card)} />);
        })}
      </div >
    </>

  );
}

export default App;
