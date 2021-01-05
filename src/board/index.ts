import { BoardBase, BoardPiece } from '../core/src/board'
import { Player } from '../core/src/player'
import { onresize, animationFrame } from '../core/src/utils'
import { drawMask, drawCircle, clearCanvas } from './utils'

var originalWidth = 2970;
var originalHeight = 2370;
var huecoAhueco = 330;
var huecoAhuecoAbajo = 225;
var originalDown = 660;
var y = 0;



export class Board extends BoardBase {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D

  constructor(canvas: HTMLCanvasElement) {
    super()
    this.canvas = canvas
    this.context = <CanvasRenderingContext2D>canvas.getContext('2d')
    this.getBoardScale()
    this.initConstants()
    this.reset()
    this.onresize()
  }

  getBoardScale() {
    return (BoardBase.SCALE = (window.innerWidth / 720));
  }

  onresize() {
    let prevBoardScale = BoardBase.SCALE
    onresize().add(() => {
      this.getBoardScale()
      if (prevBoardScale !== BoardBase.SCALE) {
        prevBoardScale = BoardBase.SCALE
        this.initConstants()
        clearCanvas(this)
        this.render()
      }
    })
  }

  reset() {
    super.reset()
    if (this.canvas) {
      clearCanvas(this)
      this.render()
    }
  }

  initConstants() {
    super.initConstants()
    if (this.canvas) {
      /**
       * Scale the canvas to make it look sharper on hi-dpi devices
       * https://www.html5rocks.com/en/tutorials/canvas/hidpi/
       */
      const dpr = self.devicePixelRatio || 1
      this.canvas.width = Board.CANVAS_WIDTH * dpr
      this.canvas.height = Board.CANVAS_HEIGHT * dpr
      this.context.scale(dpr, dpr)
      this.canvas.style.width = Board.CANVAS_WIDTH + 'px'
      this.canvas.style.height = Board.CANVAS_HEIGHT + 'px'
    }
  }
  private async animateAction(
    newRow: number,
    column: number,
    boardPiece: BoardPiece
  ): Promise<void> {
    const player = this.getPlayer(boardPiece);
    let currentY = 0;
    const doAnimation = async () => {
      clearCanvas(this)
      var x = BoardBase.MASK_X_BEGIN + (BoardBase.PIECE_RADIUS * 2) + ((BoardBase.CANVAS_WIDTH * (huecoAhueco / originalWidth)) * column);
      y = BoardBase.MASK_Y_BEGIN + (BoardBase.PIECE_RADIUS * 2) + ((BoardBase.CANVAS_HEIGHT * (huecoAhuecoAbajo / originalHeight)) + currentY);
      drawCircle(this.context, {
        "x" : x, 
        "y" : y, 
        "r": BoardBase.PIECE_RADIUS,
        "player": player,
      })
      this.render()
      currentY += BoardBase.PIECE_RADIUS
    }
    
    var y2 = BoardBase.MASK_Y_BEGIN + (BoardBase.PIECE_RADIUS * 2) + ((BoardBase.CANVAS_HEIGHT * ((huecoAhuecoAbajo * 0.92) / originalHeight)) * newRow);
    while ((y + (BoardBase.PIECE_RADIUS * 2)) < y2)
    {
      await animationFrame()
      doAnimation()
    }
    if ((y + (BoardBase.PIECE_RADIUS * 2)) >= y2)
    {
      await animationFrame()
      doAnimation()
    }
    y = 0;
  }
  render() {
    for (let y = 0; y < BoardBase.ROWS; y++) {
      for (let x = 0; x < BoardBase.COLUMNS; x++) {
        var x2 = BoardBase.MASK_X_BEGIN + (BoardBase.PIECE_RADIUS * 2) + ((BoardBase.CANVAS_WIDTH * (huecoAhueco / originalWidth)) * x);
        var y2 = BoardBase.MASK_Y_BEGIN + (BoardBase.PIECE_RADIUS * 2) + ((BoardBase.CANVAS_HEIGHT * ((huecoAhuecoAbajo * 0.92) / originalHeight)) * y);
        drawCircle(this.context, {
          "x": x2, 
          "y" : y2, 
          "r": BoardBase.PIECE_RADIUS,
          "player": this.getPlayer(this.map[y][x]),
        })
      }
    }
    drawMask(this)
  }

  async applyPlayerAction(player: Player, column: number): Promise<boolean> {
    if (
      this.map[0][column] !== BoardPiece.EMPTY ||
      column < 0 ||
      column >= BoardBase.COLUMNS
    ) {
      return false
    }

    let isColumnEverFilled = false
    let row = 0
    for (let i = 0; i < BoardBase.ROWS - 1; i++) {
      if (this.map[i + 1][column] !== BoardPiece.EMPTY) {
        isColumnEverFilled = true
        row = i
        break
      }
    }
    if (!isColumnEverFilled) {
      row = BoardBase.ROWS - 1
    }

    await this.animateAction(row, column, player.boardPiece)

    // reflect player's action to the map
    this.map[row][column] = player.boardPiece
    this.debug()

    await animationFrame()
    this.render()
    return true
  }
}
