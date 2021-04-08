import { Board } from '../board'
import { BoardBase, BoardPiece } from '../core/src/board'
import { GameBase } from '../core/src/game'
import { Player, PlayerHuman, PlayerAi } from '../core/src/player'
import {
  showMessage,
  animationFrame,
  getColumnFromCoord,
} from '../core/src/utils'

const statusbox = document.querySelector('.statusbox')
const statusboxBodyGame = document.querySelector('.statusbox-body-game')
const statusboxBodyConnection = document.querySelector(
  '.statusbox-body-connection'
)
const statusboxBodyPlayer = document.querySelector('.statusbox-body-player')

export class GameLocal extends GameBase {
  public score = {
    p1: 0,
    p2: 0
  }
  constructor(players: Array<Player>, board: BoardBase) {
    super(players, board)
  }
  beforeMoveApplied() {
    if (statusboxBodyGame) {
      statusboxBodyGame.textContent = `Dropping ${
        this.currentPlayerId === 0 ? 'Player 1' : 'Player 2'
      } disc`
    }
  }
  waitingForMove() {
    if (!this.isMoveAllowed || this.isGameWon) {
      return
    }

    if (statusboxBodyGame) {
      statusboxBodyGame.textContent = 'Waiting for move'
      if (
        (document.getElementById('imgP1').src == undefined) || (document.getElementById('imgP1').src == '') || 
        (document.getElementById('imgP2').src == undefined) || (document.getElementById('imgP2').src == '')
      )
      {
        statusboxBodyGame.textContent = 'Waiting for image'
      }
    }

    if (statusboxBodyPlayer) {
      // `currentPlayerId` is not updated yet
      statusboxBodyPlayer.textContent =
        this.currentPlayerId === 0 ? `Player 1` : `Player 2`
      if (
        (document.getElementById('imgP1').src == undefined) || (document.getElementById('imgP1').src == '') || 
        (document.getElementById('imgP2').src == undefined) || (document.getElementById('imgP2').src == '')
      )
      {
        statusboxBodyPlayer.textContent = ``;
      }
    }
  }
  afterMove() {
    // no-op
  }

  announceWinner(winnerBoardPiece: BoardPiece) {
    super.announceWinner(winnerBoardPiece)

    if (winnerBoardPiece === BoardPiece.EMPTY) {
      return
    }
    let message = '<h1>Thank you for playing.</h1>'
    if (winnerBoardPiece === BoardPiece.DRAW) {
      message += `It's a draw`
    } else {
      message += `Player ${winnerBoardPiece} wins`
      
      if(winnerBoardPiece === 1) {
        this.score.p1 += 1;
        (document.querySelector('.score-1') as HTMLElement).innerHTML = this.score.p1.toString();
      } else {
        this.score.p2 += 1;
        (document.querySelector('.score-2') as HTMLElement).innerHTML = this.score.p2.toString();
      }
      
    }
    message +=
      '.<br />After dismissing this message, click the board to reset game.'
    showMessage(message)

    if (statusboxBodyGame) {
      statusboxBodyGame.textContent = 'Game over'
    }
    if (statusboxBodyPlayer) {
      statusboxBodyPlayer.textContent =
        winnerBoardPiece === BoardPiece.DRAW
          ? `It's a draw`
          : `Player ${
              winnerBoardPiece === BoardPiece.PLAYER_1 ? '1' : '2'
            } wins`
    }
  }
}

function inputImage(game, player)
{
  var supportedImages = ["image/jpeg", "image/png", "image/gif", "image/jpg", "image/ico"];
  if (supportedImages.indexOf(document.getElementById('inputP' + player).files[0].type) != -1)
  {
    (document.querySelector(`label[for="inputP${player}"]`) as HTMLElement).style.display = 'none';
    (document.querySelector(`#imgP${player}`) as HTMLElement).style.display = 'block';
    document.getElementById('imgP' + player).src = window.URL.createObjectURL(document.getElementById('inputP' + player).files[0]);
    if (
      (document.getElementById('imgP1').src != undefined) && (document.getElementById('imgP1').src != '') &&
      (document.getElementById('imgP2').src != undefined) && (document.getElementById('imgP2').src != '')
    )
    {
      var statusboxBodyGame = document.querySelector('.statusbox-body-game');
        statusboxBodyGame.textContent = 'Waiting for move';
        
        var statusboxBodyPlayer = document.querySelector('.statusbox-body-player')
        statusboxBodyPlayer.textContent = 'Player ' + (game.currentPlayerId + 1);
    }
  }
}

export function initGameLocal(
  GameLocalCosntructor: typeof GameLocal,
  secondPlayer: PlayerHuman | PlayerAi
) {
  const canvas = document.getElementById('canvasBoard')
  if (!canvas) {
    console.error('Canvas DOM is null')
    return
  }
  const board = new Board(canvas)
  const firstPlayer = new PlayerHuman(BoardPiece.PLAYER_1)
  const game = new GameLocalCosntructor([firstPlayer, secondPlayer], board)
  statusbox?.classList.remove('hidden')
  statusboxBodyConnection?.classList.add('hidden')

  game.start()
  if (statusboxBodyGame) {
    statusboxBodyGame.textContent = 'Waiting for move';
    if (
      (document.getElementById('imgP1').src == undefined) || (document.getElementById('imgP1').src == '') || 
      (document.getElementById('imgP2').src == undefined) || (document.getElementById('imgP2').src == '')
    )
    {
      statusboxBodyGame.textContent = 'Waiting for image';
    }
  }

  if (statusboxBodyPlayer) {
    statusboxBodyPlayer.textContent = `Player 1`;
    if (
      (document.getElementById('imgP1').src == undefined) || (document.getElementById('imgP1').src == '') || 
      (document.getElementById('imgP2').src == undefined) || (document.getElementById('imgP2').src == '')
    )
    {
      statusboxBodyPlayer.textContent = ``;
    }
  }

  document.getElementById('inputP1').addEventListener('change', () => {
    inputImage(game, 1);
  })
  document.getElementById('inputP2').addEventListener('change', () => {
    inputImage(game, 2);
  })

  canvas.addEventListener('click', async (event: MouseEvent) => {
    if (
      (document.getElementById('imgP1').src != undefined) && (document.getElementById('imgP1').src != '') &&
      (document.getElementById('imgP2').src != undefined) && (document.getElementById('imgP2').src != '')
    )
    {
      if (game.isGameWon) {
        game.reset()
        await animationFrame()
        game.start()
      } else {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        const column = getColumnFromCoord({ x: x, y: y })
        if (game.currentPlayerId === 0) {
          firstPlayer.doAction(column)
        } else if (
          game.currentPlayerId === 1 &&
          secondPlayer instanceof PlayerHuman
        ) {
          secondPlayer.doAction(column)
        }
      }
    }
  })
}
