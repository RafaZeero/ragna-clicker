import { Player } from '@shared/models';

export const meleeAtk = (
  baseLevel: Player['level']['base'],
  { strength, dexterity, luck }: Pick<Player['attributes'], 'strength' | 'dexterity' | 'luck'>,
) => Math.ceil(baseLevel / 4 + strength + dexterity / 5 + luck / 3);

/******************************************************/

// Refactor below

// Move to utils
export const calculateTotalDamage = (player: Player, weaponDamage: number) => {
  // Add weaponType & weaponRefine to calc
  // const damage = player.attributes.strength * 2 + weaponDamage;
  // return damage;
};

// TODO: Move to equip service
export const setWeaponDamage = (weaponDamage: number) => {
  // const player = this.player;
  // // Remove any damage from previous weapon
  // this.unequipPreviousWeapon();
  // // Calculate new weapon damage
  // const newWeaponDamage = this.calculateTotalDamage(player, weaponDamage);
  // const previousPlayerDamages = player.stats.damage;
  // // Update player damage
  // this.player = {
  //   ...player,
  //   stats: { damage: { ...previousPlayerDamages, weapon: newWeaponDamage } },
  // };
  // return newWeaponDamage;
};

// TODO: Move to equip service
export const unequipPreviousWeapon = () => {
  // TODO: Remove any other bonus that the weapon may provide
  // this.player.stats.damage.weapon = 0;
};
