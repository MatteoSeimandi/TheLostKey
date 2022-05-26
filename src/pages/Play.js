/*
	Pagina di Gioco
	Forse il componente più importante di tutti
*/

import { useContext, useEffect } from 'react';
import { GameEngine } from 'react-game-engine';		// Motore di Gioco

import { SettingsUI, DialogUI, SettingCtx, RunCtx, EnigmaUI, GameCloseUI } from '../components/components';
import { useEventListener } from '../utils/utils';
import useEntities from '../entities/useEntities';		// Entita di Gioco
import system from '../system/system';		// Funzioni di Logica del Gioco

import '../style/Play.css';
import '../style/Font.css';

const Play = () => {
	const { setSetting } = useContext(SettingCtx);		// aprire le impostazioni
	const { run, setRun } = useContext(RunCtx);			// mettere in pausa il Gioco
	const entities = useEntities();

	useEffect( () => setRun(true), []);		// se il run era false diventa true

	const togglePause = ev => {
		if (ev.key === "e"){		// vado in pausa
			setSetting(true);
			setRun(false);
		}
	};

	// questo probabilmento lo toglierò
	const click = ({x,y}) => {		// stampo x e y di dove tocco
		console.log('click x: ' + x + ' click y: ' + y);
	}

	useEventListener('keydown', togglePause);
	useEventListener('click', click);

	return (
		<GameEngine
			running={run}				// imposto l'esecuzione del gioco con un Boolean Globale
			systems={system}			// Array di funzioni che vengono eseguite in loop
			entities={entities}	// Entita di gioco
			className='Stage'
		>
			<SettingsUI	exit={true} />
			<DialogUI /* Per i Dialoghi */ />
			<EnigmaUI /* UI degli enigmi */ />
			<GameCloseUI />
		</GameEngine>
	)
}

export default Play;