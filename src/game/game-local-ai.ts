import { BoardPiece } from '../core/src/board'
import { PlayerAi } from '../core/src/player'
import { GameLocal, initGameLocal } from './game-local'

class GameLocalAi extends GameLocal {}
export function initGameLocalAi() {
  initGameLocal(GameLocalAi, new PlayerAi(BoardPiece.PLAYER_2))
}
