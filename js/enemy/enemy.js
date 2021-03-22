/** @file Main enemy class */
class Enemy {
  /**
   * @param {CanvasRenderingContext2D} ctx Canvas context.
   * @param {canvasSize} canvasSize Canvas width and height.
   * @param {spriteSheet} spriteSheet Enemy sprite sheet.
   * @param {position} position x and y.
   * @param {number} health Enemy health.
   * @param {number} movementSpeed Movement speed.
   * @param {number} bulletSpeed Speed of each bullet.
   * @param {number} interval Interval between each bullet fired.
   * @param {number} movementIndex To call enemy movement function.
   */
  constructor(
      ctx,
      canvasSize,
      spriteSheet,
      position,
      health,
      movementSpeed,
      bulletSpeed,
      interval,
      movementIndex
  ) {
    this.ctx = ctx;
    this.canvasSize = canvasSize;
    this.spriteSheet = spriteSheet;
    this.position = position;
    this.health = health;
    this.movementSpeed = movementSpeed;
    this.bulletSpeed = bulletSpeed;
    this.interval = interval;
    this.movementIndex = movementIndex;
    this.enemyAnimator = new Animator();
    this.enemySpriteSheet = new SpriteSheet(
        spriteSheet.image,
        spriteSheet.spriteSize
    );
    this.spriteNames = ['idle1', 'idle2', 'fire1', 'fire2'];
    this.enemySpriteSheet.addSpriteBulk(
        this.spriteNames,
        spriteSheet.rows,
        spriteSheet.columns
    );
    this.fire = false;
    this.scale = 1.5;
    this.up = true;
  }

  /** Draw method for the enemy */
  draw() {
    const STATE = this.enemyAnimator.state;
    if (Util.exitFire(this.fire, STATE)) {
      this.fire = false;
    }
    if (!this.fire) {
      this.enemyAnimator.idleAnimation();
    } else if (this.fire) {
      this.enemyAnimator.fireAnimation();
    }
    this._updatePosition();
    Util.imgDrawCall(
        this.ctx,
        this.enemySpriteSheet,
        this.spriteNames[STATE],
        this.spriteSheet.spriteSize,
        this.position.x,
        this.position.y,
        this.scale
    );
    this.enemyAnimator.incrementFrame = 1;
  }

  /** increment or decrement y */
  _setUpDownTriggers() {
    if (this.position.y == 0) {
      this.up = true;
    } else if (this.position.y == this.canvasSize.height - 50) {
      this.up = false;
    }
  }

  /** Enemy Movement. Update position fo the enemy. */
  _updatePosition() {
    switch (this.movementIndex) {
      case 0:
        this.position = EnemyMovement.default(this.position.x,
            this.position.y);
        break;
      case 1:
        this._setUpDownTriggers();
        if (this.up) {
          this.position = EnemyMovement.up(this.position.x,
              this.position.y, 10);
        } else {
          this.position = EnemyMovement.down(this.position.x,
              this.position.y, 10);
        }
        break;
    }
  }

  /** Fire method for enemy */
  pew() {
    this.enemyAnimator.resetFrameCounter();
    this.fire = true;
    this.enemyAnimator.fireAnimation();
    AudioEffects.playEnemyPewSound();
  }
}
