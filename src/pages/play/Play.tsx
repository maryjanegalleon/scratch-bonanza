// Copyright (c) 2023 Michael Kolesidis <michael.kolesidis@gmail.com>
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import "./style.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useGame from "../../stores/useGame";
import { getLocalStorage, setLocalStorage } from "../../stores/utils";
import Card from "./components/scratchCard/ScratchCard";
import Modal from "../../components/modal/Modal";
import MainButton from "../../components/mainButton/MainButton";
import HelpButton from "../../components/helpButton/HelpButton";

/**
 * Sound
 */
const magicSound = new Audio("./sounds/magic.mp3");
magicSound.volume = 0.2;

type CardRefType = {
  resetScratchCards: () => void;
};

export const Play = () => {
  const navigate = useNavigate();
  const {
    valuesUrl,
    modal,
    revealed,
    resetRevealed,
    start,
    end,
    coins,
    cards,
    addCard,
  } = useGame();
  const [scratchCard, setScratchCard] = useState<
    (0 | 0.00004 | 0.0001 | 100 | 1)[] | undefined
  >();
  const [key, setKey] = useState(0);
  const cardRef = useRef<CardRefType>(null);

  useEffect(() => {
    start();
    resetRevealed();
    fetchScratchCard();
  }, []);

  useEffect(() => {
    revealed === 4 && end();
  }, [revealed]);

  const fetchScratchCard = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(valuesUrl, requestOptions);
      if (response.ok) {
        const data = await response.json();
        setScratchCard(data);
      } else {
        console.error("Failed to fetch scratch card: ", response.status);
      }
    } catch (error) {
      console.error("Error while fetching scratch card: ", error);
    }
  };

  const resetAllScratchCards = () => {
    if (cardRef.current) {
      cardRef.current.resetScratchCards();
    }
  };

  /**
   * Storage and state initiation
   */
  useEffect(() => {
    // Coins
    const storedCoins = getLocalStorage("coins");
    if (storedCoins === null) {
      setLocalStorage("coins", "0");
    }

    // Cards
    const storedCards = getLocalStorage("cards");
    if (storedCards === null) {
      setLocalStorage("cards", "0");
    }
    addCard();
  }, []);

  /**
   * Button event handling
   */
  const handleNew = async () => {
    magicSound.currentTime = 0;
    magicSound.play();
    start();
    addCard();
    resetRevealed();
    resetAllScratchCards();
    fetchScratchCard();
    setKey((prevKey) => prevKey + 1); // Update the key to trigger component refresh
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="play-page">
      {!scratchCard ? (
        <div className="loading">LOADING...</div>
      ) : (
        <>
          <img
            src="./assets/logo.png"
            className="logo-small"
            onClick={handleBack}
          />
          <Card key={key} ref={cardRef} card={scratchCard} />

          <MainButton
            handleClick={handleNew}
            text="NEW"
            disabled={revealed !== 4}
          />
         
          <HelpButton />
          {modal && <Modal />}

          <div className="stats">
            <div>CARDS : {cards}</div>
            <div>
              {coins} <img className="stats-coin" src="./assets/coin.png" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

<p>Players need to virtually ‘scratch-off’ the designated areas to uncover the rewards.
If you are on your phone, touch one of the areas and simply move your finger to scratch.
If you are on your computer, click on one of the areas and move your mouse around.
Scratch your way to great prizes!</p>
