import BaseTool from '../BaseTool';

const TOOL_LINE = 'line';
class LineTool extends BaseTool {
  constructor(context, options = {}) {
    super(context, { ...options, tool: TOOL_LINE });
  }

  drawShape({ mouseX, mouseY }) {
    const { context, item: line } = this;

    context.moveTo(line.start.x, line.start.y);
    context.lineTo(mouseX, mouseY);
  }
}

LineTool.TOOL = TOOL_LINE;
export default LineTool;
