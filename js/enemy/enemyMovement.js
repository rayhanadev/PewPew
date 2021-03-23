/** @file Calculate movement for enemy. */
class EnemyMovement {
  /**
   * Enemy default. Does not move.
   * @param {number} x
   * @param {number} y
   * @return {position}
   */
  static default(x, y) {
    return {
      x: x,
      y: y,
    };
  }

  /**
   * Move UP.
   * @param {number} x
   * @param {number} y
   * @param {number} v Increment value
   * @return {position}
   */
  static up(x, y, v) {
    return {
      x: x,
      y: y + v,
    };
  }

  /**
   * Move DOWN.
   * @param {number} x
   * @param {number} y
   * @param {number} v Increment value
   * @return {position}
   */
  static down(x, y, v) {
    return {
      x: x,
      y: y - v,
    };
  }
}
