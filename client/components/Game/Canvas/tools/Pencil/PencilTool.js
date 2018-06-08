import BaseTool from '../BaseTool';

export const TOOL_PENCIL = 'pencil';
export default class PencilTool extends BaseTool {
  constructor(context, options = {}) {
    super({ name: TOOL_PENCIL, context, options });

    delete this.imageDate;
    delete this.item;

    this.stroke = null;
  }

  setItem(item) {
    this.stroke = item;
  }

  create({ mouseX, mouseY }) {
    const { options } = this;

    return {
      options,
      tool: TOOL_PENCIL,
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

  drawItem(stroke) {
    const [first, ...rest] = stroke.points.slice(1);

    this.setItem({ ...stroke, points: [first] });
    this.setOptions(stroke.options);

    rest.forEach((position) => {
      this.draw(position);
      this.stroke.points.push(position);
    });
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
