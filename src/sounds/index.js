import swordAttack from "./sword_swipe_flash.mp3";
import iceMassive from "./ice-mage_attack.mp3";
import maleDie from "./male_scream.mp3";
import maleReceiveDamage from "./male_receive_damage.mp3";


export default {
    knight: {
        attack: swordAttack,
        receiveDamage: maleReceiveDamage,
        die: maleDie,
    },
    iceMage: {
        attack: iceMassive,
        receiveDamage: maleReceiveDamage,
        die: maleDie,
    },
}