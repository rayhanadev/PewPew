/** @file Manages enemies and gameplay. */
class Level {
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {canvasSize} canvasSize
   * @param {HTMLImageElement[]} images
   */
  constructor(ctx, canvasSize, images) {
    this.ctx = ctx;
    this.canvasSize = canvasSize;
    this.images = images;
    this.stages = [
      /* Stage 0 */
      [{x: 700, y: 100}, {x: 600, y: 200}, {x: 550, y: 300}, {x: 600, y: 400},
        {x: 700, y: 500}],
      /* Stage 1 */
      [{x: 300, y: 50}, {x: 350, y: canvasSize.height - 50}, {x: 400, y: 50},
        {x: 450, y: canvasSize.height - 50}, {x: 500, y: 50},
        {x: 550, y: canvasSize.height - 50}],
    ];
    this.enemies = [];
    this.enemyBullets = [];
    this.bulletManager = new BulletManager();
    this.stage = this.stages.length - 1;
    this.level = 0;
    this.maxFrames = 60;
    this.frame = 1;
  }

  /**
   * Draw Level
   * @param {Enemy[]} enemies
   * @param {Bullet[]} enemyBullets
   */
  draw(enemies, enemyBullets) {
    this.enemies = enemies;
    this.enemyBullets = enemyBullets;
    for (let i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i].interval === this.frame) {
        this.enemyBullets[enemyBullets.length] = (new Bullet(
            {
              x: this.enemies[i].position.x - 15,
              y: this.enemies[i].position.y + 10,
            },
            this.images[1],
            this.enemies[i].bulletSpeed,
            this.ctx,
            this.canvasSize)
        );
        this.enemies[i].pew();
      }
      this.enemies[i].draw();
    }
    /* Draw bullets */
    this.bulletManager.draw(enemyBullets);
    this.frame = this.frame <= this.maxFrames ? ++this.frame : 1;
    /* Load next stage if all enemies are dead */
    if (this.enemies.length === 0) {
      const N = ++this.stage % this.stages.length;
      this.stage = N;
      this.level = N === 0 ? ++this.level : this.level;
      this.loadStage(this.stage);
    }
  }

  /** Destroy level objects */
  destroy() {
    for (const ENEMY of this.enemies) {
      ENEMY.position = null;
    }
    for (const BULLET of this.enemyBullets) {
      BULLET.position = null;
    }
    this.enemies = null;
    this.enemyBullets = null;
  }

  /**
   * Load Stage.
   * @param {number} n Index for stage to load from.
   */
  loadStage(n) {
    const STAGE = this.stages[n];
    for (let i = 0; i < STAGE.length; i++) {
      this.enemies[i] = new Enemy(
          this.ctx,
          this.canvasSize,
          {
            image: this.images[0],
            spriteSize: 32,
            rows: 2,
            columns: 2,
          },
          {
            x: STAGE[i].x,
            y: STAGE[i].y,
          },
          this.level,
          3,
          10,
          60,
          this.stage);
    }
  }
}
