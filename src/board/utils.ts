import { BoardBase } from '../core/src/board'
import { Board } from './index'

export function drawCircle(
  context: CanvasRenderingContext2D,
  { x = 0, y = 0, r = 0, player = 0}
) {
  context.save()
  var width = r * 2;
  var height = r * 2;
  x -= width / 2;
  y -= height / 2;
  if (!player)
  {
    context.fillStyle = 'transparent'
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + width, y);
    context.lineTo(x + width, y + height);
    context.lineTo(x, y + height);
    context.lineTo(x, y);
    context.fill();
  }
  else
  {
    var img = document.getElementById('imgP' + player);
    context.drawImage(img, x, y, width, height);
  }
  context.restore();
}
/**
 * @see http://stackoverflow.com/a/11770000/917957
 * @param context Canvas 2D Context
 * @param board   current board
 */
export function drawMask(board: Board) {
  var img = document.getElementById('imgBoard');
  const context = board.context
  context.save()
  //context.fillStyle = Board.MASK_COLOR
  context.beginPath()
  const doubleRadius = 2 * Board.PIECE_RADIUS
  const tripleRadius = 3 * Board.PIECE_RADIUS
  
  context.fill()
  //context.drawImage(img, 0, 0, board.canvas.width, board.canvas.height);
  context.drawImage(img, 0, 0, BoardBase.CANVAS_WIDTH, BoardBase.CANVAS_HEIGHT);
  context.restore()
}

export function clearCanvas(board: Board) {
  //board.context.clearRect(0, 0, board.canvas.width, board.canvas.height)
  board.context.clearRect(0, 0, BoardBase.CANVAS_WIDTH, BoardBase.CANVAS_HEIGHT);
}