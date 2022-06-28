function getRandomNumber(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
    };
  },

  computed: {
    monsterHealthStyle() {
      return { width: this.monsterHealth + "%" };
    },
    playerHealthStyle() {
      return { width: this.playerHealth + "%" };
    },
    canSpecialAttackMonster() {
      return this.currentRound % 3 !== 0;
    },
  },

  methods: {
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
  },
});

app.mount("#game");
