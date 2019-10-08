import convertToObjectByPosition from '../helpers/convert-to-object-by-position';

const checkMeleeAttackConstraints = ({
    attackers,
    defenders,
    targetHero,
    activePlayer
}) => {
    let targetTeam =
          targetHero.team === "attackers" ? convertToObjectByPosition(attackers) : convertToObjectByPosition(defenders);
        let allyTeam =
          activePlayer.team === "attackers" ? convertToObjectByPosition(attackers) : convertToObjectByPosition(defenders);

        if (activePlayer.position === 1) {
          if (targetHero.position === 1) {
            return true;
          } else if (targetHero.position === 2) {
            return true;
          } else if (
            targetHero.position === 3 &&
            targetTeam[1].currentHealth <=
              0 &&
            targetTeam[2].currentHealth <= 0
          ) {
            return true;
          } else if (
            targetHero.position === 4 &&
            targetTeam[1].currentHealth <=
              0 &&
            targetTeam[2].currentHealth <=
              0 &&
            targetTeam[3].currentHealth <= 0
          ) {
            return true;
          } else if (
            targetHero.position === 5 &&
            targetTeam[1].currentHealth <=
              0 &&
            targetTeam[2].currentHealth <=
              0 &&
            targetTeam[3].currentHealth <= 0
          ) {
            return true;
          } else if (
            targetHero.position === 6 &&
            targetTeam[1].currentHealth <=
              0 &&
            targetTeam[2].currentHealth <=
              0 &&
            targetTeam[3].currentHealth <=
              0 &&
            targetTeam[4].currentHealth <=
              0 &&
            targetTeam[5].currentHealth <= 0
          ) {
            return true;
          } else {
            return false;
          }
        }

        if (activePlayer.position === 2) {
          if (targetHero.position === 1) {
            return true;
          } else if (targetHero.position === 2) {
            return true;
          } else if (targetHero.position === 3) {
            return true;
          } else if (
            targetHero.position === 4 &&
            targetTeam[1].currentHealth <=
              0 &&
            targetTeam[2].currentHealth <=
              0 &&
            targetTeam[3].currentHealth <= 0
          ) {
            return true;
          } else if (
            targetHero.position === 5 &&
            targetTeam[1].currentHealth <=
              0 &&
            targetTeam[2].currentHealth <=
              0 &&
            targetTeam[3].currentHealth <= 0
          ) {
            return true;
          } else if (
            targetHero.position === 6 &&
            targetTeam[1].currentHealth <=
              0 &&
            targetTeam[2].currentHealth <=
              0 &&
            targetTeam[3].currentHealth <= 0
          ) {
            return true;
          } else {
            return false;
          }
        }

        if (activePlayer.position === 3) {
          if (targetHero.position === 3) {
            return true;
          } else if (targetHero.position === 2) {
            return true;
          } else if (
            targetHero.position === 1 &&
            targetTeam[3].currentHealth <=
              0 &&
            targetTeam[2].currentHealth <= 0
          ) {
            return true;
          } else if (
            targetHero.position === 6 &&
            targetTeam[1].currentHealth <=
              0 &&
            targetTeam[2].currentHealth <=
              0 &&
            targetTeam[3].currentHealth <= 0
          ) {
            return true;
          } else if (
            targetHero.position === 5 &&
            targetTeam[1].currentHealth <=
              0 &&
            targetTeam[2].currentHealth <=
              0 &&
            targetTeam[3].currentHealth <= 0
          ) {
            return true;
          } else if (
            targetHero.position === 4 &&
            targetTeam[1].currentHealth <=
              0 &&
            targetTeam[2].currentHealth <=
              0 &&
            targetTeam[3].currentHealth <=
              0 &&
            targetTeam[5].currentHealth <=
              0 &&
            targetTeam[6].currentHealth <= 0
          ) {
            return true;
          } else {
            return false;
          }
        }

        if (activePlayer.position === 4) {
          if (
            targetHero.position === 1 &&
            allyTeam[1].currentHealth <= 0 &&
            allyTeam[2].currentHealth <= 0 &&
            allyTeam[3].currentHealth <= 0
          ) {
            return true;
          } else if (
            targetHero.position === 2 &&
            allyTeam[1].currentHealth <= 0 &&
            allyTeam[2].currentHealth <= 0 &&
            allyTeam[3].currentHealth <= 0
          ) {
            return true;
          } else if (
            targetHero.position === 3 &&
            targetTeam[1].currentHealth <=
              0 &&
            targetTeam[2].currentHealth <=
              0 &&
            allyTeam[1].currentHealth <= 0 &&
            allyTeam[2].currentHealth <= 0 &&
            allyTeam[3].currentHealth <= 0
          ) {
            return true;
          } else if (
            targetHero.position === 4 &&
            targetTeam[1].currentHealth <=
              0 &&
            targetTeam[2].currentHealth <=
              0 &&
            targetTeam[3].currentHealth <=
              0 &&
            allyTeam[1].currentHealth <= 0 &&
            allyTeam[2].currentHealth <= 0 &&
            allyTeam[3].currentHealth <= 0
          ) {
            return true;
          } else if (
            targetHero.position === 5 &&
            targetTeam[1].currentHealth <=
              0 &&
            targetTeam[2].currentHealth <=
              0 &&
            targetTeam[3].currentHealth <=
              0 &&
            allyTeam[1].currentHealth <= 0 &&
            allyTeam[2].currentHealth <= 0 &&
            allyTeam[3].currentHealth <= 0
          ) {
            return true;
          } else if (
            targetHero.position === 6 &&
            targetTeam[1].currentHealth <=
              0 &&
            targetTeam[2].currentHealth <=
              0 &&
            targetTeam[3].currentHealth <=
              0 &&
            targetTeam[4].currentHealth <=
              0 &&
            targetTeam[5].currentHealth <=
              0 &&
            allyTeam[1].currentHealth <= 0 &&
            allyTeam[2].currentHealth <= 0 &&
            allyTeam[3].currentHealth <= 0
          ) {
            return true;
          } else {
            return false;
          }
        }

        if (activePlayer.position === 5) {
          if (
            targetHero.position === 1 &&
            allyTeam[1].currentHealth <= 0 &&
            allyTeam[2].currentHealth <= 0 &&
            allyTeam[3].currentHealth <= 0
          ) {
            return true;
          } else if (
            targetHero.position === 2 &&
            allyTeam[1].currentHealth <= 0 &&
            allyTeam[2].currentHealth <= 0 &&
            allyTeam[3].currentHealth <= 0
          ) {
            return true;
          } else if (
            targetHero.position === 3 &&
            allyTeam[1].currentHealth <= 0 &&
            allyTeam[2].currentHealth <= 0 &&
            allyTeam[3].currentHealth <= 0
          ) {
            return true;
          } else if (
            targetHero.position === 4 &&
            targetTeam[1].currentHealth <=
              0 &&
            targetTeam[2].currentHealth <=
              0 &&
            targetTeam[3].currentHealth <=
              0 &&
            allyTeam[1].currentHealth <= 0 &&
            allyTeam[2].currentHealth <= 0 &&
            allyTeam[3].currentHealth <= 0
          ) {
            return true;
          } else if (
            targetHero.position === 5 &&
            targetTeam[1].currentHealth <=
              0 &&
            targetTeam[2].currentHealth <=
              0 &&
            targetTeam[3].currentHealth <=
              0 &&
            allyTeam[1].currentHealth <= 0 &&
            allyTeam[2].currentHealth <= 0 &&
            allyTeam[3].currentHealth <= 0
          ) {
            return true;
          } else if (
            targetHero.position === 6 &&
            targetTeam[1].currentHealth <=
              0 &&
            targetTeam[2].currentHealth <=
              0 &&
            targetTeam[3].currentHealth <=
              0 &&
            allyTeam[1].currentHealth <= 0 &&
            allyTeam[2].currentHealth <= 0 &&
            allyTeam[3].currentHealth <= 0
          ) {
            return true;
          } else {
            return false;
          }
        }

        if (activePlayer.position === 6) {
          if (
            targetHero.position === 3 &&
            allyTeam[1].currentHealth <= 0 &&
            allyTeam[2].currentHealth <= 0 &&
            allyTeam[3].currentHealth <= 0
          ) {
            return true;
          } else if (
            targetHero.position === 2 &&
            allyTeam[1].currentHealth <= 0 &&
            allyTeam[2].currentHealth <= 0 &&
            allyTeam[3].currentHealth <= 0
          ) {
            return true;
          } else if (
            targetHero.position === 1 &&
            targetTeam[3].currentHealth <=
              0 &&
            targetTeam[2].currentHealth <=
              0 &&
            allyTeam[1].currentHealth <= 0 &&
            allyTeam[2].currentHealth <= 0 &&
            allyTeam[3].currentHealth <= 0
          ) {
            return true;
          } else if (
            targetHero.position === 6 &&
            targetTeam[1].currentHealth <=
              0 &&
            targetTeam[2].currentHealth <=
              0 &&
            targetTeam[3].currentHealth <=
              0 &&
            allyTeam[1].currentHealth <= 0 &&
            allyTeam[2].currentHealth <= 0 &&
            allyTeam[3].currentHealth <= 0
          ) {
            return true;
          } else if (
            targetHero.position === 5 &&
            targetTeam[1].currentHealth <=
              0 &&
            targetTeam[2].currentHealth <=
              0 &&
            targetTeam[3].currentHealth <=
              0 &&
            allyTeam[1].currentHealth <= 0 &&
            allyTeam[2].currentHealth <= 0 &&
            allyTeam[3].currentHealth <= 0
          ) {
            return true;
          } else if (
            targetHero.position === 4 &&
            targetTeam[1].currentHealth <=
              0 &&
            targetTeam[2].currentHealth <=
              0 &&
            targetTeam[3].currentHealth <=
              0 &&
            targetTeam[5].currentHealth <=
              0 &&
            targetTeam[6].currentHealth <=
              0 &&
            allyTeam[1].currentHealth <= 0 &&
            allyTeam[2].currentHealth <= 0 &&
            allyTeam[3].currentHealth <= 0
          ) {
            return true;
          } else {
            return false;
          }
        }
}

export default checkMeleeAttackConstraints;