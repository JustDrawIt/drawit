import pencil from './Pencil/PencilTool';
import line from './Line/LineTool';
import rectangle from './Rectangle/RectangleTool';
import ellipse from './Ellipse/EllipseTool';

export default {
  [pencil.TOOL]: pencil,
  [line.TOOL]: line,
  [rectangle.TOOL]: rectangle,
  [ellipse.TOOL]: ellipse,
};
