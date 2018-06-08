import BaseTool from '../BaseTool';

export const TOOL_LINE = 'line';
export default class LineTool extends BaseTool {
  constructor(context, options = {}) {
    super({ name: TOOL_LINE, context, options });
  }

  drawShape({ mouseX, mouseY }) {
    const { context, item: line } = this;

    context.moveTo(line.start.x, line.start.y);
    context.lineTo(mouseX, mouseY);
  }
}
