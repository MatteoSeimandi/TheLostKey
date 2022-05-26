// Pannello delle Impostazioni

import { useContext, useState, useEffect } from "react";
import { Col, Button, Modal, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsKeyboard } from "react-icons/bs";

import { useFullScreen, useAudio } from "../utils/utils";
import { Audio, MusicCtx, SfxCtx, SettingCtx, RunCtx } from './components';
import { menuSound, backSound } from "../assets/sounds/sounds";

const SettingsUI = ({exit}) => {
	const { fullScreen, toggle } = useFullScreen();		// Hook che mi permette di attivare/disattivare il FullScreen
	const { setting, setSetting } = useContext(SettingCtx);		// Flag delle Opzioni
	const { run, setRun } = useContext(RunCtx);				// Pausa/Riprendi del Gioco
	const { music, setMusic } = useContext(MusicCtx);		// Livello Musica
	const { sfx, setSfx } = useContext(SfxCtx);				// Livello Effetti Sonori

	const [play, toggleAudio] = useAudio(menuSound, false);
	const [sound, toggleBack] = useAudio(backSound, false);
	const [com, setCom] = useState(false);		// stato per il Pannello Comandi
	const navigate = useNavigate();			// Per navigare fra gli EndPoint

	const openCommands = () => setCom(true);		// Attivo Il Pannello delle Instruzioni
	const closeCommands = () => setCom(false);

	useEffect(() => {
		if(setting)
			toggleAudio()
	}, [setting]);

	// Torno al Menu
	const backToMenu = () => {
		navigate('../menu', {replace: true});
		setSetting(false);
	};

	// Chiudo questo Pannello
	const handleClose = () => {
		toggleBack();
		setSetting(false);
		if ( !run ) setRun(true);
	};

	return(
		<Modal
			show={setting}
			onHide={handleClose}
			backdrop="static"		// IL pannello si chiuderà solo quando l'utente clicca la X
			size="lg"
			centered
			onEscapeKeyDown={e => e.preventDefault()}
		>
			<Modal.Header
				closeButton
				className="bg-secondary"
			>
				<Modal.Title className="w-100">
					<p className="txt-pixel text-center fs-2 m-0">
						Settings
					</p>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="bg-secondary">
				<Container fluid>
					<Audio		// Richiamo i controller per i livelli Audio
						title='Musica'
						volume={music}
						changer={setMusic}
					/>
					<Audio
						title='Effetti Sonori'
						volume={sfx}
						changer={setSfx}
					/>
					<hr/>
					<BtnCommads callback={openCommands} />
					<hr/>
					<Row className="text-center">
						<Col>
							<Button
								className="txt-pixel p-3 my-3"
								onClick={toggle}
								variant="dark"
							>
								{ fullScreen ? ' FullScreen Off' : 'FullScreen On' }
							</Button>
						</Col>
						{
							exit		// se exit è vero viene mostrato questo Button
							&&
							<Col className="">
								<Button className="txt-pixel p-3 my-3" onClick={backToMenu} variant='danger'>
									Exit The Game
								</Button>
							</Col>
						}
					</Row>
				</Container>
			</Modal.Body>
			<Commands show={com} handleClose={closeCommands} />
		</Modal>
	)
}

const BtnCommads = ({callback}) => (
	<Row className="text-center">
		<Col>
			<Button className="txt-pixel fs-5 p-2 px-3 my-2" onClick={callback}>
				<BsKeyboard size={45}/> Comandi
			</Button>
		</Col>
	</Row>
);

const Commands = ({show, handleClose}) => (
	<Modal
		show={show}			// flag per l'attivazione del modal
		onHide={handleClose}		// callback richiamata alla chiusura della modal
		centered					// centrato a schermo
		size="lg"
	>
		<Modal.Header className="bg-info" closeButton>
			<Modal.Title className="w-100">
				<p className="txt-pixel text-center m-0">
					Instruzioni
				</p>
			</Modal.Title>
		</Modal.Header>
		<Modal.Body className="bg-info">
			{/*Qui giro il vettore ListaComandi e ritorno una riga per ogni comando*/}
			{LoadCommands()}
		</Modal.Body>
	</Modal>
);

const LoadCommands = () => (
	listaComandi.map( (value, index) => (<>
		<Row>
			<Col xxl={3}>
				<p className="txt-pixel fs-3 text-center">
					{value.key}
				</p>
			</Col>
			<Col xxl={9}>
				<p className="txt-pixel fs-5">
					{value.funzione}
				</p>
			</Col>
		</Row>
		<hr className="my-2" key={index}/>
	</>))
);

// Tutti i comandi del Gioco
const listaComandi = [
	{
		key: 'W',
		funzione: "Muovi il Giocatore verso l'alto"
	},
	{
		key: 'A',
		funzione: "Muovi il Giocatore verso destra"
	},
	{
		key: 'S',
		funzione: "Muovi il Giocatore verso il basso"
	},
	{
		key: 'D',
		funzione: "Muovi il Giocatore verso sinistra"
	},
	{
		key: 'E',
		funzione: "Metti in Pausa il Gioco e apri le Opzioni"
	},
	{
		key: 'Q',
		funzione: "Interagisci in giro per la mappa"
	},
	{
		key: 'Enter',
		funzione: "Continua i dialoghi"
	}
];

export default SettingsUI;