import { SVG_NS } from '../types';
import SVGFieldDrawHandler from './SVGFieldDrawHandler';

export default class Dot extends SVGFieldDrawHandler {
  params: { color: string };

  constructor(params: { color: string }) {
    super();
    this.params = params;
  }

  createElement() {
    const circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttribute('cx', '0');
    circle.setAttribute('cy', '0');
    circle.setAttribute('r', '0.15');
    circle.setAttribute('fill', this.params.color);

    return circle;
  }
}
