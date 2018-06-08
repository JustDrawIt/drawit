import {
  DEFAULT_SIZE,
  DEFAULT_FILL,
  DEFAULT_STROKE_COLOR,
  DEFAULT_FILL_COLOR,
} from '../defaults';

class BaseTool {
  constructor({ context, name, options }) {
    this.context = context;
    this.name = name;
    this.imageData = null;
    this.item = null;
    this.options = {
      ...options,
      size: options.size || DEFAULT_SIZE,
      fill: options.fill || DEFAULT_FILL,
      strokeColor: options.strokeColor || DEFAULT_STROKE_COLOR,
      fillColor: options.fillColor || DEFAULT_FILL_COLOR,
    };
  }

  setItem(item) {
    this.item = item;
  }

  setContext(context) {
    this.context = context;
  }

  getContext() {
    return this.context;
  }

  setOptions(options) {
    this.options = {
      ...this.options,
      ...options,
    };
  }

  create({ mouseX, mouseY }) {
    const { options, name } = this;

    return {
      options,
      tool: name,
      start: {
        x: mouseX,
        y: mouseY,
      },
      end: {
        x: null,
        y: null,
      },
    };
  }

  drawShape(position) { }
  drawItem(item) {
    this.setItem(item);
    this.setOptions(item.options);
    this.draw({
      mouseX: item.end.x,
      mouseY: item.end.y,
    });
  }

  draw(position) {
    const { context, imageData, options } = this;

    if (imageData) {
      context.putImageData(imageData, 0, 0);
    }

    context.save();
    context.beginPath();
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.globalCompositeOperation = 'source-over';
    context.lineWidth = options.size;
    context.strokeStyle = options.strokeColor;
    context.fillStyle = options.fill ? options.fillColor : 'transparent';

    this.drawShape(position);

    context.stroke();
    context.fill();
    context.closePath();
    context.restore();
  }

  onMouseDown(position) {
    const { context } = this;
    const { clientWidth, clientHeight } = context.canvas;
    const item = this.create(position);

    this.item = item;
    this.imageData = context.getImageData(0, 0, clientWidth, clientHeight);
  }

  onMouseMove(position) {
    const { item } = this;

    if (item) {
      this.draw(position);
    }
  }

  onMouseUp(position) {
    const { item } = this;

    if (item) {
      item.end.x = position.mouseX;
      item.end.y = position.mouseY;

      this.onMouseMove(position);
      this.imageData = null;
      this.item = null;

      return item;
    }

    return null;
  }
}

export default BaseTool;
