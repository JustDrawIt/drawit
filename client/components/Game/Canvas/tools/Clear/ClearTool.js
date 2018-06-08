
export const TOOL_CLEAR = 'clear';
export default {
  clear(context) {
    const { width, height } = context.canvas;
    context.clearRect(0, 0, width, height);
  },
};
