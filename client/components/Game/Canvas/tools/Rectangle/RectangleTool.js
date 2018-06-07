import BaseTool from '../BaseTool';

const TOOL_RECTANGLE = 'rectangle';
class RectangleTool extends BaseTool {
  constructor(context, options = {}) {
    super(context, { ...options, tool: TOOL_RECTANGLE });
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

RectangleTool.TOOL = TOOL_RECTANGLE;
export default RectangleTool;
