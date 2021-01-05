var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Player } from './player';
import { BoardBase, BoardPiece } from '../board';
import { BIG_POSITIVE_NUMBER, BIG_NEGATIVE_NUMBER, getMockPlayerAction, choose, clone, } from '../utils';
var PlayerAi = (function (_super) {
    __extends(PlayerAi, _super);
    function PlayerAi(boardPiece) {
        var _this = _super.call(this, boardPiece) || this;
        _this.ownBoardPieceValue = _this.getBoardPieceValue(boardPiece);
        _this.enemyBoardPiece =
            boardPiece === BoardPiece.PLAYER_1
                ? BoardPiece.PLAYER_2
                : BoardPiece.PLAYER_1;
        return _this;
    }
    PlayerAi.prototype.getBoardPieceValue = function (boardPiece) {
        return boardPiece === BoardPiece.EMPTY
            ? 0
            : boardPiece === this.boardPiece
                ? 1
                : -1;
    };
    PlayerAi.prototype.getStateValue = function (state) {
        var winnerBoardPiece = BoardPiece.EMPTY;
        var chainValue = 0;
        for (var i = 0; i < BoardBase.ROWS; i++) {
            for (var j = 0; j < BoardBase.COLUMNS; j++) {
                var tempRight = 0, tempBottom = 0, tempBottomRight = 0, tempTopRight = 0;
                for (var k = 0; k <= 3; k++) {
                    if (j + k < BoardBase.COLUMNS) {
                        tempRight += this.getBoardPieceValue(state[i][j + k]);
                    }
                    if (i + k < BoardBase.ROWS) {
                        tempBottom += this.getBoardPieceValue(state[i + k][j]);
                    }
                    if (i + k < BoardBase.ROWS && j + k < BoardBase.COLUMNS) {
                        tempBottomRight += this.getBoardPieceValue(state[i + k][j + k]);
                    }
                    if (i - k >= 0 && j + k < 7) {
                        tempTopRight += this.getBoardPieceValue(state[i - k][j + k]);
                    }
                }
                chainValue += tempRight * tempRight * tempRight;
                chainValue += tempBottom * tempBottom * tempBottom;
                chainValue += tempBottomRight * tempBottomRight * tempBottomRight;
                chainValue += tempTopRight * tempTopRight * tempTopRight;
                if (Math.abs(tempRight) === 4) {
                    winnerBoardPiece =
                        tempRight > 0 ? this.boardPiece : this.enemyBoardPiece;
                }
                else if (Math.abs(tempBottom) === 4) {
                    winnerBoardPiece =
                        tempBottom > 0 ? this.boardPiece : this.enemyBoardPiece;
                }
                else if (Math.abs(tempBottomRight) === 4) {
                    winnerBoardPiece =
                        tempBottomRight > 0 ? this.boardPiece : this.enemyBoardPiece;
                }
                else if (Math.abs(tempTopRight) === 4) {
                    winnerBoardPiece =
                        tempTopRight > 0 ? this.boardPiece : this.enemyBoardPiece;
                }
            }
        }
        return {
            winnerBoardPiece: winnerBoardPiece,
            chain: chainValue,
        };
    };
    PlayerAi.prototype.transformValues = function (returnValue, winnerBoardPiece, depth) {
        var isWon = winnerBoardPiece === this.boardPiece;
        var isLost = winnerBoardPiece === this.enemyBoardPiece;
        if (isWon) {
            returnValue = BIG_POSITIVE_NUMBER - 100;
        }
        else if (isLost) {
            returnValue = BIG_NEGATIVE_NUMBER + 100;
        }
        returnValue -= depth * depth;
        return returnValue;
    };
    PlayerAi.prototype.getMove = function (state, depth, alpha, beta) {
        var stateValue = this.getStateValue(state);
        var isWon = stateValue.winnerBoardPiece === this.boardPiece;
        var isLost = stateValue.winnerBoardPiece === this.enemyBoardPiece;
        if (depth >= PlayerAi.MAX_DEPTH || isWon || isLost) {
            return {
                value: this.transformValues(stateValue.chain * this.ownBoardPieceValue, stateValue.winnerBoardPiece, depth),
                move: -1,
            };
        }
        return depth % 2 === 0
            ? this.minState(state, depth + 1, alpha, beta)
            : this.maxState(state, depth + 1, alpha, beta);
    };
    PlayerAi.prototype.maxState = function (state, depth, alpha, beta) {
        var value = BIG_NEGATIVE_NUMBER;
        var moveQueue = [];
        for (var column = 0; column < BoardBase.COLUMNS; column++) {
            var _a = getMockPlayerAction(state, this.boardPiece, column), actionSuccessful = _a.success, nextState = _a.map;
            if (actionSuccessful) {
                var nextValue = this.getMove(nextState, depth, alpha, beta).value;
                if (nextValue > value) {
                    value = nextValue;
                    moveQueue = [column];
                }
                else if (nextValue === value) {
                    moveQueue.push(column);
                }
                if (value > beta) {
                    return {
                        value: value,
                        move: choose(moveQueue),
                    };
                }
                alpha = Math.max(alpha, value);
            }
        }
        return {
            value: value,
            move: choose(moveQueue),
        };
    };
    PlayerAi.prototype.minState = function (state, depth, alpha, beta) {
        var value = BIG_POSITIVE_NUMBER;
        var moveQueue = [];
        for (var column = 0; column < BoardBase.COLUMNS; column++) {
            var _a = getMockPlayerAction(state, this.enemyBoardPiece, column), actionSuccessful = _a.success, nextState = _a.map;
            if (actionSuccessful) {
                var nextValue = this.getMove(nextState, depth, alpha, beta).value;
                if (nextValue < value) {
                    value = nextValue;
                    moveQueue = [column];
                }
                else if (nextValue === value) {
                    moveQueue.push(column);
                }
                if (value < alpha) {
                    return {
                        value: value,
                        move: choose(moveQueue),
                    };
                }
                beta = Math.min(beta, value);
            }
        }
        return {
            value: value,
            move: choose(moveQueue),
        };
    };
    PlayerAi.prototype.getAction = function (board) {
        return __awaiter(this, void 0, void 0, function () {
            var state, action;
            return __generator(this, function (_a) {
                state = clone(board.map);
                action = this.maxState(state, 0, BIG_NEGATIVE_NUMBER, BIG_POSITIVE_NUMBER);
                console.log("AI " + this.boardPiece + " choose column " + action.move + " with value of " + action.value);
                return [2, action.move];
            });
        });
    };
    PlayerAi.MAX_DEPTH = 4;
    return PlayerAi;
}(Player));
export { PlayerAi };
//# sourceMappingURL=player-ai.js.map