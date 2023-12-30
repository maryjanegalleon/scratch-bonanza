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

 <!doctype html>
<html lang="en"> 
 <head> 
  <meta name="viewport" content="width=device-width">

  <title>ECHOZONE </title> 
  <link rel="stylesheet" href="./style.css"> 
 <style type="text/css" id="dcoder_stylesheet">@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: 1px;
  max-height: 200vh;
}
.page {
  max-width: 1220px;
  padding: 10px;
  margin: 0 auto;
}
.page p {
  margin-bottom: 15px;
}
.title {
  font-size: 32px;
  text-align: center;
  margin-bottom: 15px;
}
.title__h3 {
  margin-bottom: 15px;
}
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  pointer-events: none;
  opacity: 0;
  transition: all 0.7s ease;
}
.popup.active {
  opacity: 1;
  pointer-events: auto;
}
.popup__box {
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: #eee;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: #fefefe;
  transform: translate(-50%, calc(-50% + 50px));
  padding: 30px;
  box-shadow: 0 6px 55px -10px rgba(0, 0, 0, 0.7);
  opacity: 0;
}
.popup.active .popup__box {
  opacity: 1;
}
.popup__skip-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 14px;
  font-weight: 700;
  background-color: #000;
  border-radius: 4px;
  padding: 10px;
  cursor: not-allowed;
}
.popup__skip-btn.cursor {
  cursor: pointer;
}
.popup__logo {
  margin-bottom: 20px;
}
.popup__title {
  text-align: center;
  font-size: 32px;
  margin-bottom: 30px;
}
.popup__text {
  margin-bottom: 60px;
  line-height: 1.8;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
}
.popup__link {
  display: inline-block;
  color: #000;
  background-color: #eee;
  padding: 10px 30px;
  text-decoration: none;
  border-radius: 4px;
  margin-bottom: 10px;
}
.popup__link:hover {
  text-decoration: underline;
}</style></head> 
 <body> <!-- partial:index.partial.html --> <!-- Created based on Youtube [Live Blogger](https://www.youtube.com/@LiveBlogger) --> <!-- Random text--> 
  <div class="page"> 
   <h1 class="title">most frequently asked questions </h1> 
   <h3 class="title__h3"></h3> 
    <p> How much money can I make watching youtube videos?
</p>
<p>A lot! The more you watch the more money you make. There is no limit to how many videos you can watch. Even if you want to spend all day every day watching its up to you. Each video has its own earnings. All video views don’t pay the same money. Some views will earn you more money than others. However we have tried to standardize our services so that there is no minimum amount of money you can make for every video view. but For every YouTube video total views you can make a potential money of ₱0.05. This is the least amount of money you can make for any video view.
</p>
<p>The amount of money that you can make on any video has no maximum limit. Some videos pay as much as ₱1 up to ₱10 per view. It all depends on how much the YouTube advertiser is willing to pay you to watch their video. The more they are willing to pay the more you can earn. Thus on a good day you can make a lot of money watching YouTube videos.
</p>
<p>THIS IS FOR REAL. THIS IS NOT ONE OF THOSE ONLINE SCAMS THAT WASTE YOUR TIME. PEOPLE ACTUALLY MAKE MONEY ON ECHOZONE RENT TO EARN WEBSITE AND GET PAID. 
</p>
<p>Come and join us now! </p> 
  </div> <!--Popup--> 
  <div class="popup"> 
   <div class="popup__box" style="
          background-image: url(https://catherineasquithgallery.com/uploads/posts/2021-02/1613224247_68-p-fon-sinii-kosmos-95.jpg);
        "> 
    <div class="popup__content"> 
     <div class="popup__skip-btn">
       Skip in 23s 
     </div> 
  <!---lagay kung free👇--->
        <p class="popup__logo">view & earn</p> 
     <h3 class="popup__title">FREE RENTAL VERSION</h3> 
     <p class="popup__text">
        <iframe id="the_iframe" width="100%" height="210px" frameBorder="0" style="border: 0;"></iframe>

 
<!---palit ng ads👇--->

  <script type="text/javascript" id="dcoder_script">var urls = [
'https://zeekaihu.net/4/6790247', 
 'https://random-gif-generator-seven.vercel.app/', 
       'https://invol.co/clkh2t4', 
  'https://greewepi.net/4/6660096',
 'https://random-gif-generator-seven.vercel.app/', 
  'https://greewepi.net/4/6660096',
];
var seconds = 5;

function openNext(){

    document.getElementById('the_iframe').src = urls.shift();

    if(urls.length)setTimeout('openNext()',seconds*1000);

}

openNext();</script>
<!---palit ng counter👇--->
      
      <a href="https://hits.seeyoufarm.com"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fww-mary-jane-galleon.vercel.app&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false"/></a>
      </div>    

          </p></div> 
   </div> 
  </div> <!-- partial --> 
  <script src="./script.js"></script> 
 
<script type="text/javascript" id="dcoder_script">const popup = document.querySelector('.popup');
const skipBtn = document.querySelector('.popup__skip-btn');
const visitBtn = document.querySelector('.popup__link');

let remainingTime = 23;
let allowedToSkip = false;
let popupTimer;

const createPopupCookie = () => {
  let expiresDays = 0;
  let date = new Date();
  date.setTime(date.getTime() + expiresDays * 0 * 0 * 0* 1000);
  let expires = 'expires=' + date.toUTCString();
  document.cookie = `popupCookie=true; ${expires}; path=/;`;
};

const showAd = () => {
  popup.classList.add('active');
  popupTimer = setInterval(() => {
    skipBtn.innerHTML = `views counted after ${remainingTime}s`;
    remainingTime--;

    if (remainingTime < 0) {
      allowedToSkip = true;
      skipBtn.innerHTML = 'Skip';
      skipBtn.classList.add('cursor');
      clearInterval(popupTimer);
    }
  }, 1000);
};

const skipAd = () => {
  popup.classList.remove('active');
  createPopupCookie();
};

skipBtn.addEventListener('click', () => {
  if (allowedToSkip) {
    skipAd();
  }
});

const startTimer = () => {
  if (window.scrollY > 0) {
    showAd();
    window.removeEventListener('scroll', startTimer);
  }
};

if (!document.cookie.match(/^(.*;)?\s*popupCookie\s*=\s*[^;]+(.*)?$/)) {
  window.addEventListener('scroll', startTimer);
}</script></body></html>
 

          
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

 
