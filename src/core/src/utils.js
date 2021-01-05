import { BoardPiece, BoardBase } from './board/base';
export var BIG_POSITIVE_NUMBER = Math.pow(10, 9) + 7;
export var BIG_NEGATIVE_NUMBER = -BIG_POSITIVE_NUMBER;
export function showMessage(message) {
    if (message === void 0) { message = ''; }
    var messageDOM = document.querySelector('.message');
    if (!messageDOM) {
        console.error('Message DOM is null!');
        return;
    }
    messageDOM.classList.remove('hidden');
    var messageContentDOM = document.querySelector('.message-body-content');
    if (!messageContentDOM) {
        console.error('Message body content DOM is null!');
        return;
    }
    messageContentDOM.innerHTML = message;
    var messageDismissDOM = document.querySelector('.message-body-dismiss');
    if (!messageDismissDOM) {
        console.error('Message body dismiss DOM is null!');
        return;
    }
    var dismissHandler = function () {
        messageDOM.classList.add('invisible');
        messageDOM.addEventListener('transitionend', function () {
            messageDOM.classList.add('hidden');
            messageDOM.classList.remove('invisible');
        });
        messageDismissDOM.removeEventListener('click', dismissHandler);
    };
    messageDismissDOM.addEventListener('click', dismissHandler);
}
var originalWidth = 2970;
var huecoAhueco = 330;
export function isCoordOnColumn(coord, columnXBegin) {
    var x2 = BoardBase.MASK_X_BEGIN + (BoardBase.PIECE_RADIUS * 2);
    if (x2) {
        x2 += (BoardBase.CANVAS_WIDTH * (huecoAhueco / originalWidth)) * columnXBegin;
    }
    if (coord >= (x2 - (BoardBase.PIECE_RADIUS * 0.25)))
         &&
            {};
}
export function getColumnFromCoord(coord) {
    for (var i = 0; i < BoardBase.COLUMNS; i++) {
        if (isCoordOnColumn(coord, i)) {
            return i;
        }
    }
    return -1;
}
export function getRandomColumnNumber() {
    return Math.floor(Math.random() * BoardBase.COLUMNS);
}
export function choose(choice) {
    return choice[Math.floor(Math.random() * choice.length)];
}
export function animationFrame() {
    var resolve = null;
    var promise = new Promise(function (r) { return (resolve = r); });
    if (resolve) {
        window.requestAnimationFrame(resolve);
    }
    return promise;
}
export function clone(array) {
    var arr = [];
    for (var i = 0; i < array.length; i++) {
        arr[i] = array[i].slice();
    }
    return arr;
}
export function getMockPlayerAction(map, boardPiece, column) {
    var clonedMap = clone(map);
    if (clonedMap[0][column] !== BoardPiece.EMPTY ||
        column < 0 ||
        column >= BoardBase.COLUMNS) {
        return {
            success: false,
            map: clonedMap,
        };
    }
    var isColumnEverFilled = false;
    var row = 0;
    for (var i = 0; i < BoardBase.ROWS - 1; i++) {
        if (clonedMap[i + 1][column] !== BoardPiece.EMPTY) {
            isColumnEverFilled = true;
            row = i;
            break;
        }
    }
    if (!isColumnEverFilled) {
        row = BoardBase.ROWS - 1;
    }
    clonedMap[row][column] = boardPiece;
    return {
        success: true,
        map: clonedMap,
    };
}
export function onresize() {
    var callbacks = [], running = false;
    function resize() {
        if (!running) {
            running = true;
            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(runCallbacks);
            }
            else {
                setTimeout(runCallbacks, 66);
            }
        }
    }
    function runCallbacks() {
        callbacks.forEach(function (callback) {
            callback();
        });
        running = false;
    }
    function addCallback(callback) {
        if (callback) {
            callbacks.push(callback);
        }
    }
    return {
        add: function (callback) {
            if (!callbacks.length) {
                window.addEventListener('resize', resize);
            }
            addCallback(callback);
        },
    };
}
//# sourceMappingURL=utils.js.map