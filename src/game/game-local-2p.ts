//import { BoardPiece } from '@kenrick95/c4/src/board'
import { BoardPiece } from '../core/src/board'
//import { PlayerHuman } from '@kenrick95/c4/src/player'
import { PlayerHuman } from '../core/src/player'
import { GameLocal, initGameLocal } from './game-local'

class GameLocal2p extends GameLocal {}
export function initGameLocal2p() {
  initGameLocal(GameLocal2p, new PlayerHuman(BoardPiece.PLAYER_2))
}
