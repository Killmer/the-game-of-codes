import IceMageAttack from "./ice-mage-attack";
import ArcherAttack from "./archer-attack";

import { ICE_MAGE_ATTACK, ARCHER_ATTACK } from '../../constants/mass-attack-types'

export default {
    [ICE_MAGE_ATTACK]: IceMageAttack,
    [ARCHER_ATTACK]: ArcherAttack,

}