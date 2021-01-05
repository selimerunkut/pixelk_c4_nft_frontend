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
import { GameBase } from '../game';
var TestGame = (function (_super) {
    __extends(TestGame, _super);
    function TestGame(players, board) {
        var _this = _super.call(this, players, board) || this;
        _this.afterMoveResolve = null;
        _this.afterMovePromise = null;
        _this.renewAfterMovePromise();
        return _this;
    }
    TestGame.prototype.waitingForMove = function () {
    };
    TestGame.prototype.beforeMoveApplied = function () {
    };
    TestGame.prototype.afterMove = function () {
        if (this.afterMoveResolve) {
            this.afterMoveResolve();
        }
        this.renewAfterMovePromise();
    };
    TestGame.prototype.renewAfterMovePromise = function () {
        var _this = this;
        this.afterMovePromise = new Promise(function (resolve) { return (_this.afterMoveResolve = resolve); });
    };
    return TestGame;
}(GameBase));
export { TestGame };
//# sourceMappingURL=test-game.js.map