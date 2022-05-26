/*
	UHD del gioco
	Qui ci sono le informazioni a chermo quali conto alla rovescia e punteggio
*/

import { useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";

import { RunCtx, ScoreCtx, CloseCtx, GameOverCtx } from "../components/components";

const UHD = ({ min, sec, gameOver, gameWin }) => {
	const { run, setRun } = useContext(RunCtx);		// flag esecuzione gioco
	const { score, setScore } = useContext(ScoreCtx);	// Punteggio del gioco
	const { setClose } = useContext(CloseCtx); // Game Over
	const { setGameOver } = useContext(GameOverCtx);

	// Se gameOver diventa vero allora il giocatore ha perso
	useEffect( () => {
		if (gameOver) {
			setRun(false);		// Stoppo il gioco
			setClose(true);
			setGameOver(true)	// attivo il game Over
		}
	}, [gameOver]);

	useEffect( () => {
		if (gameWin) {
			setRun(false);
			setClose(true);
			setScore( prev => prev + 500 + sec + min * 60);
		}
	}, [gameWin]);

	return(
		<Row className="position-absolute top-0 start-50 translate-middle-x w-50">
			<Col xxl={4} className="w-30 p-0 mt-3">
				<p className="fs-2 text-white text-center txt-pixel">
					Score: {score}		{/* Molto probabilmento il punteggio lo sostituirò con le chiavette */}
				</p>
			</Col>
			<Col xxl={2} className="text-center w-25">
			{
				run ?		// Indico se il gioco è in esecuzione o meno con delle incone
					<BsPauseFill size={65} className="text-white ms-4 mt-1" />
				:
					<BsPlayFill size={65} className="text-white ms-4 mt-1" />
			}
			</Col>
			<Col xxl={6} className="w-25">
				<p className="text-white fs-1 text-center me-5 mt-2 txt-pixel">
					{min}:{sec}
				</p>
			</Col>
		</Row>
	)
}

export default UHD;