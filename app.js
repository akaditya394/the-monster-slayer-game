function getRandomNumber(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
    };
  },

  computed: {
    monsterHealthStyle() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerHealthStyle() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    canSpecialAttackMonster() {
      return this.currentRound % 3 !== 0;
    },
  },

  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        return (this.winner = "draw");
      } else if (value <= 0) {
        return (this.winner = "monster");
      }
    },

    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        return (this.winner = "draw");
      } else if (value <= 0) {
        return (this.winner = "player");
      }
    },
  },

  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
    },
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomNumber(12, 5);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },

    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomNumber(20, 10);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },

    healPlayer() {
      this.currentRound++;
      const healValue = getRandomNumber(15, 10);
      if (this.playerHealth + healValue > 100) {
        return (this.playerHealth = 100);
      } else {
        this.playerHealth += healValue;
      }
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomNumber(15, 8);
      this.playerHealth -= attackValue;
    },

    surrender() {
      return (this.winner = "monster");
    },
  },
});

app.mount("#game");
