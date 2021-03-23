/** @file Absorb animation logic for player. */
class PlayerAnimator extends Animator {
  /** Inherited values from Animator class */
  constructor() {
    super();
  }

  /**
   * Absorb animation logic
   * States - 4 and 5
   */
  absorbAnimation() {
    if (this.animState === 0) {
      this.animState = 4;
      this._resetAndIncrement();
    } else if (this.animState === 1) {
      this.animState = 5;
      this._resetAndIncrement();
    } else if (this.frameCounter <= 15) {
      this.animState = 4;
    } else if (this.frameCounter >= 16 && this.frameCounter <= 30) {
      this.animState = 5;
    }
    if (this.frameCounter === 30) {
      this.resetFrameCounter();
    }
  }

  /** Reset frame counter and set it to 1. */
  _resetAndIncrement() {
    this.resetFrameCounter();
    this.incrementFrame = 1;
  }
}
