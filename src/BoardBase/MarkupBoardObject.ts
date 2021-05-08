import { Color } from '../types';
import FieldBoardObject from './FieldBoardObject';

/**
 * Board markup object is special type of field object, which can have 3 variations - for empty field
 * and for black and white stone.
 */
export default class MarkupBoardObject extends FieldBoardObject {
  variation: Color;

  constructor(type: string, x = 0, y = 0, variation: Color = Color.E) {
    super(type, x, y);
    this.variation = variation;
  }
}
