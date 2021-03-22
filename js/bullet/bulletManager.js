/** @file Bullet Manager Class. */
class BulletManager {
  /** Bullet Manager constructor. */
  constructor() {
    this.bullets = [];
  }

  /**
   * Draws all bullets.
   * @param {Bullet[]} bullets
  */
  draw(bullets) {
    this.bullets = bullets;
    for (let i = 0; i < this.bullets.length; i++) {
      if (!this.bullets[i].destroy) {
        this.bullets[i].draw();
      } else {
        this._removeBullet(i);
      }
    }
  }

  /**
   * Add bullet to array.
   * @param {Bullet} bullet Bullet class instance.
   */
  addBullet(bullet) {
    this.bullets[this.bullets.length] = bullet;
  }

  /**
   * Remove a bullet from array.
   * @param {number} index Index of the bullet.
   */
  _removeBullet(index) {
    this.bullets.splice(index, 1);
  }
}
