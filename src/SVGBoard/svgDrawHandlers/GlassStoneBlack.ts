import { SVGBoardConfig, SVG_NS, SVG_OBJECTS, SVG_SHADOWS } from '../types';
import SVGStoneDrawHandler from './SVGStoneDrawHandler';
import generateId from '../generateId';

export default class GlassStoneBlack extends SVGStoneDrawHandler {
  filterElement: SVGFilterElement;

  createElement(config: SVGBoardConfig, addDef: (def: SVGElement) => void) {
    super.createElement(config, addDef);

    if (!this.filterElement) {
      const filter = document.createElementNS(SVG_NS, 'filter');

      filter.setAttribute('id', generateId('filter'));
      filter.setAttribute('x', '-300%');
      filter.setAttribute('y', '-300%');
      filter.setAttribute('width', '600%');
      filter.setAttribute('height', '600%');

      const blur = document.createElementNS(SVG_NS, 'feGaussianBlur');

      blur.setAttribute('in', 'SourceGraphic');
      blur.setAttribute('stdDeviation', 0.3 * config.theme.stoneSize as any);
      filter.appendChild(blur);

      this.filterElement = filter;
      addDef(filter);
    }

    const stoneGroup = document.createElementNS(SVG_NS, 'g');

    const stone = document.createElementNS(SVG_NS, 'circle');
    stone.setAttribute('cx', '0');
    stone.setAttribute('cy', '0');
    stone.setAttribute('fill', '#000');
    stone.setAttribute('r', config.theme.stoneSize as any);
    stoneGroup.appendChild(stone);

    const glow1 = document.createElementNS(SVG_NS, 'circle');
    glow1.setAttribute('cx', -0.4 * config.theme.stoneSize as any);
    glow1.setAttribute('cy', -0.4 * config.theme.stoneSize as any);
    glow1.setAttribute('r', 0.25 * config.theme.stoneSize as any);
    glow1.setAttribute('fill', '#fff');
    glow1.setAttribute('filter', `url(#${this.filterElement.id})`);
    stoneGroup.appendChild(glow1);

    const glow2 = document.createElementNS(SVG_NS, 'circle');
    glow2.setAttribute('cx', 0.4 * config.theme.stoneSize as any);
    glow2.setAttribute('cy', 0.4 * config.theme.stoneSize as any);
    glow2.setAttribute('r', 0.15 * config.theme.stoneSize as any);
    glow2.setAttribute('fill', '#fff');
    glow2.setAttribute('filter', `url(#${this.filterElement.id})`);
    stoneGroup.appendChild(glow2);

    return {
      [SVG_OBJECTS]: stoneGroup,
      [SVG_SHADOWS]: this.createShadow(config, addDef),
    };
  }
}
