import React from 'react';
import Pencil from './Pencil/Pencil';
import Line from './Line/Line';
import Rectangle from './Rectangle/Rectangle';
import Ellipse from './Ellipse/Ellipse';
import Clear from './Clear/Clear';

const Tools = () => (
  <div>
    <Pencil />
    <Line />
    <Rectangle />
    <Ellipse />
    <Clear />
  </div>
);

export default Tools;
