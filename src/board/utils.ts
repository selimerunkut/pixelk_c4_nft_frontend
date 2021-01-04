import { Board } from './index'

export function drawCircle(
  context: CanvasRenderingContext2D,
  { x = 0, y = 0, r = 0, player = 0}
) {
  context.save()
  if (!player)
  {
    context.fillStyle = 'transparent'
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI, false);
    context.fill();
  }
  else
  {
    var img = document.getElementById('imgP' + player);
    var width = r * 2;
    var height = r * 2;
    x -= width / 2;
    y -= height / 2;
    context.beginPath();
    context.moveTo(x + r, y);
    context.lineTo(x + width - r, y);
    context.quadraticCurveTo(x + width, y, x + width, y + r);
    context.lineTo(x + width, y + height - r);
    context.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    context.lineTo(x + r, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - r);
    context.lineTo(x, y + r);
    context.quadraticCurveTo(x, y, x + r, y);
    context.closePath();
    context.clip();
    //context.drawImage(img, x, y, width, height);
  }
  context.restore();
}
/**
 * @see http://stackoverflow.com/a/11770000/917957
 * @param context Canvas 2D Context
 * @param board   current board
 */
export function drawMask(board: Board) {
  const context = board.context
  context.save()
  context.fillStyle = Board.MASK_COLOR
  context.beginPath()
  const doubleRadius = 2 * Board.PIECE_RADIUS
  const tripleRadius = 3 * Board.PIECE_RADIUS
  for (let y = 0; y < Board.ROWS; y++) {
    for (let x = 0; x < Board.COLUMNS; x++) {
      context.arc(
        tripleRadius * x + Board.MASK_X_BEGIN + doubleRadius,
        tripleRadius * y + Board.MASK_Y_BEGIN + doubleRadius,
        Board.PIECE_RADIUS,
        0,
        2 * Math.PI
      )
      context.rect(
        tripleRadius * x + Board.MASK_X_BEGIN + 2 * doubleRadius,
        tripleRadius * y + Board.MASK_Y_BEGIN,
        -2 * doubleRadius,
        2 * doubleRadius
      )
    }
  }
  context.fill()
  context.restore()
}

export function clearCanvas(board: Board) {
  board.context.clearRect(0, 0, board.canvas.width, board.canvas.height)
}
