export var MESSAGE_TYPE;
(function (MESSAGE_TYPE) {
    MESSAGE_TYPE["NEW_PLAYER_CONNECTION_REQUEST"] = "NEW_PLAYER_CONNECTION_REQUEST";
    MESSAGE_TYPE["NEW_PLAYER_CONNECTION_OK"] = "NEW_PLAYER_CONNECTION_OK";
    MESSAGE_TYPE["NEW_MATCH_REQUEST"] = "NEW_MATCH_REQUEST";
    MESSAGE_TYPE["NEW_MATCH_OK"] = "NEW_MATCH_OK";
    MESSAGE_TYPE["GAME_READY"] = "GAME_READY";
    MESSAGE_TYPE["GAME_ENDED"] = "GAME_ENDED";
    MESSAGE_TYPE["GAME_RESET"] = "GAME_RESET";
    MESSAGE_TYPE["CONNECT_MATCH_REQUEST"] = "CONNECT_MATCH_REQUEST";
    MESSAGE_TYPE["CONNECT_MATCH_OK"] = "CONNECT_MATCH_OK";
    MESSAGE_TYPE["CONNECT_MATCH_FAIL"] = "CONNECT_MATCH_FAIL";
    MESSAGE_TYPE["HUNG_UP"] = "HUNG_UP";
    MESSAGE_TYPE["OTHER_PLAYER_HUNGUP"] = "OTHER_PLAYER_HUNGUP";
    MESSAGE_TYPE["MOVE_MAIN"] = "MOVE_MAIN";
    MESSAGE_TYPE["MOVE_SHADOW"] = "MOVE_SHADOW";
})(MESSAGE_TYPE || (MESSAGE_TYPE = {}));
export function constructMessage(type, payload) {
    console.log('[ws] send: ', type, payload);
    return JSON.stringify({
        type: type,
        payload: payload || {},
    });
}
export function parseMessage(message) {
    var parsedMessage = JSON.parse(message);
    console.log('[ws] receive: ', parsedMessage);
    return parsedMessage;
}
//# sourceMappingURL=shared.js.map