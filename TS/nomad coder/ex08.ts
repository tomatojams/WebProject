type PlayerWithHP = {
  nickname: string;
  healthBar: number;
};

const tomatos: PlayerWithHP = {
  nickname: "kim",
  healthBar: 99,
};

type Team = "one" | "two" | "three";
type Health = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type Member = {
  nickname: string;
  team: Team;
  health: Health;
};
