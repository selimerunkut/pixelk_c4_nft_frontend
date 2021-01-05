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
import { BoardPiece } from '../board';
var GameBase = (function () {
    function GameBase(players, board) {
        this.isMoveAllowed = false;
        this.isGameWon = false;
        this.board = board;
        this.players = players;
        this.currentPlayerId = 0;
        this.reset();
    }
    GameBase.prototype.reset = function () {
        this.isMoveAllowed = false;
        this.isGameWon = false;
        this.board.reset();
    };
    GameBase.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var winner;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isMoveAllowed = true;
                        _a.label = 1;
                    case 1:
                        if (!!this.isGameWon) return [3, 3];
                        return [4, this.move()];
                    case 2:
                        _a.sent();
                        winner = this.board.getWinner();
                        if (winner !== BoardPiece.EMPTY) {
                            console.log('[GameBase] Game over: winner is player ', winner);
                            this.isGameWon = true;
                            this.isMoveAllowed = false;
                            this.announceWinner(winner);
                            return [3, 3];
                        }
                        return [3, 1];
                    case 3: return [2];
                }
            });
        });
    };
    GameBase.prototype.move = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentPlayer, actionSuccesful, action;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isMoveAllowed) {
                            return [2];
                        }
                        currentPlayer = this.players[this.currentPlayerId];
                        actionSuccesful = false;
                        _a.label = 1;
                    case 1:
                        if (!!actionSuccesful) return [3, 4];
                        this.waitingForMove();
                        return [4, currentPlayer.getAction(this.board)];
                    case 2:
                        action = _a.sent();
                        this.isMoveAllowed = false;
                        this.beforeMoveApplied(action);
                        return [4, this.board.applyPlayerAction(currentPlayer, action)];
                    case 3:
                        actionSuccesful = _a.sent();
                        this.isMoveAllowed = true;
                        if (!actionSuccesful) {
                            console.log('Move not allowed! Try again.');
                        }
                        else {
                            this.afterMove(action);
                        }
                        return [3, 1];
                    case 4:
                        this.currentPlayerId = this.getNextPlayer();
                        return [2];
                }
            });
        });
    };
    GameBase.prototype.announceWinner = function (winnerPiece) {
        var _a;
        var winner = (_a = {},
            _a[BoardPiece.DRAW] = 'draw',
            _a[BoardPiece.PLAYER_1] = 'Player 1',
            _a[BoardPiece.PLAYER_2] = 'Player 2',
            _a[BoardPiece.EMPTY] = 'none',
            _a)[winnerPiece];
        console.log('[GameBase] Game over: winner is ', winner, winnerPiece);
    };
    GameBase.prototype.getNextPlayer = function () {
        return this.currentPlayerId === 0 ? 1 : 0;
    };
    return GameBase;
}());
export { GameBase };
//# sourceMappingURL=game-base.js.map