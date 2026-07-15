export class Vector {
  public x: number = 0;
  public y: number = 0;
  public z: number = 0;
  constructor(props?: { x?: number; y?: number; z?: number }) {
    const { x, y, z } = props ?? { x: 0, y: 0, z: 0 };

    this.x = x ?? 0;
    this.y = y ?? 0;
    this.z = z ?? 0;
  }
}
