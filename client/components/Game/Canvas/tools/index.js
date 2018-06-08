import PencilTool, { TOOL_PENCIL } from './Pencil/PencilTool';
import LineTool, { TOOL_LINE } from './Line/LineTool';
import RectangleTool, { TOOL_RECTANGLE } from './Rectangle/RectangleTool';
import EllipseTool, { TOOL_ELLIPSE } from './Ellipse/EllipseTool';
import ClearTool, { TOOL_CLEAR } from './Clear/ClearTool';

export default {
  [TOOL_PENCIL]: PencilTool,
  [TOOL_LINE]: LineTool,
  [TOOL_RECTANGLE]: RectangleTool,
  [TOOL_ELLIPSE]: EllipseTool,
  [TOOL_CLEAR]: ClearTool,
};
