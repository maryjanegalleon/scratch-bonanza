// Copyright (c) 2023 Michael Kolesidis <michael.kolesidis@gmail.com>
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import "./style.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGame from "../../stores/useGame";
import Modal from "../../components/modal/Modal";
import MainButton from "../../components/mainButton/MainButton";
import HelpButton from "../../components/helpButton/HelpButton";

export const Home = () => {
  const navigate = useNavigate();
  const { modal, resetRevealed, setPhase } = useGame();

  useEffect(() => {
    setPhase("ready");
    resetRevealed();
  }, []);

  const handlePlay = () => {
    navigate("/play");
  };

  return (
    <div className="home-page">
      <div className="home-page-logo" />
      <MainButton handleClick={handlePlay} text="PLAY" />
      <HelpButton />
      <div className="copyright">© 2024 Echozoneph.online
      Players need to virtually ‘scratch-off’ the designated areas to uncover the rewards.
If you are on your phone, touch one of the areas and simply move your finger to scratch.
If you are on your computer, click on one of the areas and move your mouse around.
Scratch your way to great prizes!
      </div>
      {modal && <Modal />}
    </div>
  );
};

 
