import BaseTool from '../BaseTool';

export const TOOL_ELLIPSE = 'ellipse';
export default class EllipseTool extends BaseTool {
  constructor(context, options = {}) {
    super({ name: TOOL_ELLIPSE, context, options });
  }

  drawShapePolyfill({ centerX, centerY, radiusX, radiusY }) {
    const { context } = this;
    for (let i = 0; i < 2 * Math.PI; i += 0.01) {
      const xPos = centerX - (radiusY * Math.sin(i)) * Math.sin(0) + (radiusX * Math.cos(i)) * Math.cos(0);
      const yPos = centerY + (radiusX * Math.cos(i)) * Math.sin(0) + (radiusY * Math.sin(i)) * Math.cos(0);

      if (i === 0) {
        context.moveTo(xPos, yPos);
      } else {
        context.lineTo(xPos, yPos);
      }
    }
  }

  drawShape({ mouseX, mouseY }) {
    const { context, item: ellipse } = this;

    const startX = mouseX < ellipse.start.x ? mouseX : ellipse.start.x;
    const startY = mouseY < ellipse.start.y ? mouseY : ellipse.start.y;
    const endX = mouseX >= ellipse.start.x ? mouseX : ellipse.start.x;
    const endY = mouseY >= ellipse.start.y ? mouseY : ellipse.start.y;
    const radiusX = (endX - startX) * 0.5;
    const radiusY = (endY - startY) * 0.5;
    const centerX = startX + radiusX;
    const centerY = startY + radiusY;

    typeof context.ellipse === 'function'
      ? context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI)
      : this.drawShapePolyfill({ centerX, centerY, radiusX, radiusY });
  }
}
