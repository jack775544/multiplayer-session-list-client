export interface SessionDefault {
	Type: string;
	SpectatorPossible: boolean;
}

export interface Level {
	MapFile: string;
	MapID: string;
	GameMode: string;
}

export interface Status {
	Locked: boolean;
	Passworded: boolean;
	State: string;
}

export interface Stats {
	Kills: number;
	Score: number;
	Deaths?: number;
}

export interface SubTeam {
	ID: number;
}

export interface Team {
	SubTeam: SubTeam;
}

export interface Slot {
	ID: number;
}

export interface BZRNet {
	ID: string;
}

export interface Steam {
	Raw: string;
	ID: any;
	AvatarUrl: string;
	Nickname: string;
	ProfileUrl: string;
}

export interface PlayerIds {
	Slot: Slot;
	BZRNet?: BZRNet;
	Steam?: Steam;
}

export interface Player {
	Name: string;
	Stats?: Stats;
	Team?: Team;
	IDs: PlayerIds;
}

export interface Attributes {
	Mods: string[];
	Version: string;
	TPS: number;
	MaxPing: number;
	NAT: string;
	List: string;
	ModHash: string;
	GameTimeMinutes: number;
}

export interface Session {
	Name: string;
	PlayerCount: number;
	PlayerMax: number;
	Level: Level;
	Status: Status;
	Players: Player[];
	Attributes: Attributes;
}

export interface SessionResponse {
	SessionDefault: SessionDefault;
	Sessions: Session[];
}

