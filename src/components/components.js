// File di Export dei componenti React del Gioco

import Audio from './Audio';
import { BtnPlay, BtnOptions, BtnRank, BtnMusic } from "./Buttons";
import DialogUI from './DialogUI';
import GlobalContext, { RunCtx, MusicCtx, SfxCtx, SettingCtx, PgCtx, NamePlayerCtx } from './GlobalContext';
import GameContext, { DialogCtx, EnigmaCtx, RoomNameCtx, ScoreCtx, DoneCtx, GameOverCtx, CloseCtx } from './GameContext';
import SettingsUI from "./SettingsUI";
import SplashScreen from "./SplashScreen";
import EnigmaUI from './EnigmaUI';
import GameCloseUI from './GameCloseUI';

export {
	Audio,
	BtnPlay,
	BtnOptions,
	BtnRank,
	BtnMusic,
	DialogUI,
	GlobalContext,
	GameContext,
	RunCtx,
	MusicCtx,
	SfxCtx,
	SettingCtx,
	DialogCtx,
	EnigmaCtx,
	RoomNameCtx,
	ScoreCtx,
	DoneCtx,
	GameOverCtx,
	SettingsUI,
	SplashScreen,
	EnigmaUI,
	GameCloseUI,
	PgCtx,
	CloseCtx,
	NamePlayerCtx
};