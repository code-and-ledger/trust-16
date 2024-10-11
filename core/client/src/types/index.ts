export interface Player {
    address: string;
    ip: string;
  }
  
  export interface Match {
    player1: Player;
    player2: Player;
    createdAt: Date;
  }
  
  export interface MatchmakingState {
    playersQueue: Player[];
    ongoingMatches: Match[];
    isSearching: boolean;
  }
  