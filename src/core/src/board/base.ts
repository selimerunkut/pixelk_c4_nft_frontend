import { Player } from '../player'
import { getMockPlayerAction } from '../utils'

var originalWidth = 2970;
var originalHeight = 2550;
var hueco = 150;
var originalLeft = 420;
var originalUp = 900;

export enum BoardPiece {
  EMPTY,
  PLAYER_1,
  PLAYER_2,
  DRAW,
}
export class BoardBase {
  static readonly ROWS: number = 4
  static readonly COLUMNS: number = 6
  static CANVAS_HEIGHT: number
  static CANVAS_WIDTH: number
  static PIECE_RADIUS: number
  static MASK_X_BEGIN: number
  static MASK_Y_BEGIN: number
  static MESSAGE_WIDTH: number
  static MESSAGE_X_BEGIN: number
  static MESSAGE_Y_BEGIN: number
  static SCALE: number
  static COLUMN_WIDTH: number
  static COLUMN_X_RANGE: number
  static COLUMN_Y_RANGE: number

  map: Array<Array<number>>
  protected winnerBoardPiece: BoardPiece

  constructor() {
    this.map = []
    this.winnerBoardPiece = BoardPiece.EMPTY
    this.initConstants()
    this.reset()
  }

  reset() {
    this.map = []
    for (let i = 0; i < BoardBase.ROWS; i++) {
      this.map.push([])
      for (let j = 0; j < BoardBase.COLUMNS; j++) {
        this.map[i].push(BoardPiece.EMPTY)
      }
    }
    this.winnerBoardPiece = BoardPiece.EMPTY
  }

  initConstants() {
    BoardBase.CANVAS_WIDTH = BoardBase.SCALE * 700;
    BoardBase.CANVAS_HEIGHT = BoardBase.CANVAS_WIDTH * (originalHeight / originalWidth);
    BoardBase.PIECE_RADIUS = BoardBase.CANVAS_WIDTH * (hueco / originalWidth) * 0.5;
    // BoardBase.MASK_X_BEGIN = (BoardBase.CANVAS_WIDTH * (originalLeft / originalWidth)) - (BoardBase.PIECE_RADIUS * 1);//0.8
    // BoardBase.MASK_Y_BEGIN = (BoardBase.CANVAS_HEIGHT * (originalUp / originalHeight)) - (BoardBase.PIECE_RADIUS * 2);//1.73 -> sobra
    BoardBase.MESSAGE_WIDTH = BoardBase.SCALE * 400
    BoardBase.MESSAGE_X_BEGIN =
      (BoardBase.CANVAS_WIDTH - BoardBase.MESSAGE_WIDTH) / 2
    BoardBase.MESSAGE_Y_BEGIN = BoardBase.SCALE * 20

    const context = (document.querySelector('#canvasBoard') as HTMLElement);
    const contextWidth = context.clientWidth;
    const contextHeight = context.clientHeight;
    BoardBase.MASK_X_BEGIN = contextWidth / 100 * 10.6;
    // column width
    BoardBase.COLUMN_WIDTH = contextWidth / 100 * 8.415;
    // length between each column
    BoardBase.COLUMN_X_RANGE = contextWidth / 100 * 7.0;
    BoardBase.MASK_Y_BEGIN = contextWidth / 100 * 10.4;
    BoardBase.COLUMN_Y_RANGE = contextWidth / 100 * 6.1;
  }

  /**
   * @returns is the action succesfully applied
   * @param player current player
   * @param column the colum in which the player want to drop a piece
   */
  async applyPlayerAction(player: Player, column: number): Promise<boolean> {
    const {
      success: actionSuccessful,
      map: nextState,
    } = getMockPlayerAction(this.map, player.boardPiece, column)

    this.map = nextState

    return actionSuccessful
  }

  debug() {
    console.log(this.map.map((row) => row.join(' ')).join('\n'))
  }

  getWinner(): BoardPiece {
    if (this.winnerBoardPiece !== BoardPiece.EMPTY) {
      return this.winnerBoardPiece
    }
    const direction = [
      [0, -1],
      [0, 1],
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ]
    const isWinningSequence = (
      i: number,
      j: number,
      playerPiece: BoardPiece,
      dir: Array<number>,
      count: number
    ): boolean => {
      if (count >= 4) {
        return true
      }
      if (
        i < 0 ||
        j < 0 ||
        i >= BoardBase.ROWS ||
        j >= BoardBase.COLUMNS ||
        this.map[i][j] !== playerPiece
      ) {
        return false
      }
      return isWinningSequence(
        i + dir[0],
        j + dir[1],
        playerPiece,
        dir,
        count + 1
      )
    }
    let countEmpty = 0
    for (let i = 0; i < BoardBase.ROWS; i++) {
      for (let j = 0; j < BoardBase.COLUMNS; j++) {
        const playerPiece = this.map[i][j]
        if (playerPiece !== BoardPiece.EMPTY) {
          for (let k = 0; k < direction.length; k++) {
            const isWon = isWinningSequence(
              i + direction[k][0],
              j + direction[k][1],
              playerPiece,
              direction[k],
              1
            )
            if (isWon) {
              return (this.winnerBoardPiece = playerPiece)
            }
          }
        } else {
          countEmpty++
        }
      }
    }
    if (countEmpty === 0) {
      return (this.winnerBoardPiece = BoardPiece.DRAW)
    }

    return BoardPiece.EMPTY
  }

  protected getPlayer(boardPiece: BoardPiece): Number {
    switch (boardPiece) {
      case BoardPiece.PLAYER_1:
        return 1
      case BoardPiece.PLAYER_2:
        return 2
      default:
        return 0
    }
  }
}
