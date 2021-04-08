import { BoardBase } from '../core/src/board'
import { Board } from './index'

export function drawCircle(
  context: CanvasRenderingContext2D,
  { x = 0, y = 0, r = 0, player = 0}
) {
  context.save()
  var width = r * 2;
  var height = r * 2;
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
    let radius = BoardBase.COLUMN_WIDTH / 100 * 60;
    x += 5;
    y -= 5;
    context.save();
    roundedImage(context, x, y, BoardBase.COLUMN_WIDTH, BoardBase.COLUMN_WIDTH, radius);
    context.clip();

    context.drawImage(img, x, y, BoardBase.COLUMN_WIDTH, BoardBase.COLUMN_WIDTH);

  }
  context.restore();
}

function roundedImage(context: Context, x: number, y: number, width: number, height:number, radius:number){
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
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
  
  let width = (document.querySelector('.section') as HTMLElement).clientWidth;
  let height = width * 79 / 100;
  width = width > 855 ? 855 : width;
  height = height > 679 ? 679 : height;

  context.drawImage(img, 0, 0, width, height);
  context.restore()
}

export function clearCanvas(board: Board) {
  //board.context.clearRect(0, 0, board.canvas.width, board.canvas.height)
  board.context.clearRect(0, 0, BoardBase.CANVAS_WIDTH, BoardBase.CANVAS_HEIGHT);
}