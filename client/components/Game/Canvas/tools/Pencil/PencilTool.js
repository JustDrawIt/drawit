import BaseTool from '../BaseTool';

export const TOOL_PENCIL = 'pencil';
export default class PencilTool extends BaseTool {
  constructor(context, options = {}) {
    super({
      context,
      name: TOOL_PENCIL,
      options: { ...options, tool: TOOL_PENCIL },
    });

    delete this.imageDate;
    delete this.item;

    this.stroke = null;
  }

  create({ mouseX, mouseY }) {
    const { options } = this;

    return {
      ...options,
      points: [{ mouseX, mouseY }],
    };
  }

  drawShape({ mouseX, mouseY }) {
    const { context, stroke } = this;
    const { points } = stroke;
    const last = points[points.length - 1];

    context.moveTo(last.mouseX, last.mouseY);
    context.lineTo(mouseX, mouseY);
  }

  onMouseDown(position) {
    this.stroke = this.create(position);
  }

  onMouseMove(position) {
    const { stroke } = this;

    if (stroke) {
      this.draw(position);
      stroke.points.push(position);
    }
  }

  onMouseUp(position) {
    const { stroke } = this;

    if (stroke) {
      this.onMouseMove(position);
      this.stroke = null;

      return stroke;
    }

    return null;
  }
}
