import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import socket from '../../sockets';
import { SketchPad, TOOL_PENCIL, TOOL_LINE, TOOL_RECTANGLE, TOOL_ELLIPSE } from './src';


const CanvasContainer = styled('div')`
  border: 1px solid;
  width: 450px;
  height: 450px;
`;

class Canvas extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tool: TOOL_PENCIL,
      size: 2,
      color: '#000000',
      fill: false,
      fillColor: '#444444',
      items: [],
    };
  }

  componentDidMount() {
    socket.on('addItem', (item) => {
      this.setState({ items: this.state.items.concat([item]) });
    });
  }

  render() {
    const {
      tool,
      size,
      color,
      fill,
      fillColor,
      items,
    } = this.state;
    return (
      <CanvasContainer>
        <div style={{ float: 'left', marginRight: 20 }}>
          <SketchPad
            width={500}
            height={500}
            animate
            size={size}
            color={color}
            fillColor={fill ? fillColor : ''}
            items={items}
            tool={tool}
            onCompleteItem={i => socket.emit('addItem', i)}
          />
        </div>
        <div style={{ float: 'left' }}>
          <div className="tools" style={{ marginBottom: 20 }}>
            <button
              style={tool === TOOL_PENCIL ? { fontWeight: 'bold' } : undefined}
              className={tool === TOOL_PENCIL ? 'item-active' : 'item'}
              onClick={() => this.setState({ tool: TOOL_PENCIL })}
            >Pencil
            </button>
            <button
              style={tool === TOOL_LINE ? { fontWeight: 'bold' } : undefined}
              className={tool === TOOL_LINE ? 'item-active' : 'item'}
              onClick={() => this.setState({ tool: TOOL_LINE })}
            >Line
            </button>
            <button
              style={tool === TOOL_ELLIPSE ? { fontWeight: 'bold' } : undefined}
              className={tool === TOOL_ELLIPSE ? 'item-active' : 'item'}
              onClick={() => this.setState({ tool: TOOL_ELLIPSE })}
            >Ellipse
            </button>
            <button
              style={tool === TOOL_RECTANGLE ? { fontWeight: 'bold' } : undefined}
              className={tool === TOOL_RECTANGLE ? 'item-active' : 'item'}
              onClick={() => this.setState({ tool: TOOL_RECTANGLE })}
            >Rectangle
            </button>
          </div>
          <div className="options" style={{ marginBottom: 20 }}>
            <label htmlFor="">size: </label>
            <input min="1" max="20" type="range" value={size} onChange={e => this.setState({ size: parseInt(e.target.value) })} />
          </div>
          <div className="options" style={{ marginBottom: 20 }}>
            <label htmlFor="">color: </label>
            <input type="color" value={color} onChange={e => this.setState({ color: e.target.value })} />
          </div>
          {(this.state.tool === TOOL_ELLIPSE || this.state.tool === TOOL_RECTANGLE) ?
            <div>
              <label htmlFor="">fill in:</label>
              <input
                type="checkbox"
                value={fill}
                style={{ margin: '0 8' }}
                onChange={e => this.setState({ fill: e.target.checked })}
              />
              {fill ?
                <span>
                  <label htmlFor="">with color:</label>
                  <input type="color" value={fillColor} onChange={e => this.setState({ fillColor: e.target.value })} />
                </span> : ''}
            </div> : ''}
        </div>
      </CanvasContainer>
    );
  }
}

export default Canvas;
