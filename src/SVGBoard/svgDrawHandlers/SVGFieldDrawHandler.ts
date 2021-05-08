
import { SVGDrawHandler, SVGBoardConfig, BoardObjectSVGElements, SVG_OBJECTS } from '../types';
import { FieldBoardObject } from '../../BoardBase';

export default abstract class SVGFieldDrawHandler implements SVGDrawHandler {
  // tslint:disable-next-line:max-line-length
  abstract createElement(config: SVGBoardConfig, addDef: (def: SVGElement) => void): SVGElement | BoardObjectSVGElements;

  updateElement(elem: BoardObjectSVGElements, boardObject: FieldBoardObject, config: SVGBoardConfig) {
    const transform = `translate(${boardObject.x}, ${boardObject.y})`;
    const scale = `scale(${boardObject.scaleX}, ${boardObject.scaleY})`;
    const rotate = `rotate(${boardObject.rotate})`;

    Object.keys(elem).forEach((ctx) => {
      elem[ctx].setAttribute('transform', `${transform} ${scale} ${rotate}`);
      elem[ctx].setAttribute('opacity', boardObject.opacity as any);
    });
  }
}
