import BaseTool from '../BaseTool';

export const TOOL_RECTANGLE = 'rectangle';
export default class RectangleTool extends BaseTool {
  constructor(context, options = {}) {
    super({ name: TOOL_RECTANGLE, context, options });
  }

  drawShape({ mouseX, mouseY }) {
    const { context, item: rectangle } = this;

    const startX = mouseX < rectangle.start.x ? mouseX : rectangle.start.x;
    const startY = mouseY < rectangle.start.y ? mouseY : rectangle.start.y;
    const widthX = Math.abs(rectangle.start.x - mouseX);
    const widthY = Math.abs(rectangle.start.y - mouseY);

    context.rect(startX, startY, widthX, widthY);
  }
}
