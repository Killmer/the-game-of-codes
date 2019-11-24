import nextPlayerSelector from "./next-player-selector";
import attackMiddleware from "./attack";
import supportMiddleware from "./support";
import cursorMiddleware from "./cursor";
import finishBattle from "./finish-battle";

export default [
    nextPlayerSelector,
    attackMiddleware,
    supportMiddleware,
    cursorMiddleware,
    finishBattle
]