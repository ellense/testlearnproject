import { utils, writeFile } from 'xlsx-js-style'
import type {
  CellObject,
  CellStyleColor,
  ColInfo,
  Range,
  BorderType,
} from 'xlsx-js-style'
export type { CellObject, ColInfo, Range }
export const excel = {
  utils,
  writeFile,
  getBorderCell: (
    border:
      | 't'
      | 'r'
      | 'b'
      | 'l'
      | 'trbl'
      | 'tb'
      | 'lr'
      | 'trb'
      | 'rbl'
      | 'blt'
      | 'ltr',
    color?: string
  ) => {
    interface StylePropBorderValues {
      style: BorderType
      color: CellStyleColor
    }
    interface StylePropBorderDiagonalValues extends StylePropBorderValues {
      diagonalUp: boolean
      diagonalDown: boolean
    }

    interface StylePropBorder {
      top?: StylePropBorderValues
      bottom?: StylePropBorderValues
      left?: StylePropBorderValues
      right?: StylePropBorderValues
      diagonal?: StylePropBorderDiagonalValues
    }
    const newBorder: StylePropBorder = {}
    for (let index = 0; index < border.length; index++) {
      const str = border as string
      const style: StylePropBorderValues = {
        style: 'thin',
        color: { rgb: color || 'd3d3d3' },
      }
      switch (str[index]) {
        case 'b':
          newBorder.bottom = style
          break
        case 't':
          newBorder.top = style
          break
        case 'l':
          newBorder.left = style
          break
        case 'r':
          newBorder.right = style
          break

        default:
          break
      }
    }

    return newBorder
  },

  getColumnById: (id: number) => {
    type ColumnAlias =
      | 'A'
      | 'B'
      | 'C'
      | 'D'
      | 'E'
      | 'F'
      | 'G'
      | 'H'
      | 'I'
      | 'J'
      | 'K'
      | 'L'
      | 'M'
      | 'N'
      | 'O'
      | 'P'
      | 'Q'
      | 'R'
      | 'S'
      | 'T'
      | 'U'
      | 'V'
      | 'W'
      | 'X'
      | 'Y'
      | 'Z'
    const columnMap = new Map<number, ColumnAlias>([
      [1, 'A'],
      [2, 'B'],
      [3, 'C'],
      [4, 'D'],
      [5, 'E'],
      [6, 'F'],
      [7, 'G'],
      [8, 'H'],
      [9, 'I'],
      [10, 'J'],
      [11, 'K'],
      [12, 'L'],
      [13, 'M'],
      [14, 'N'],
      [15, 'O'],
      [16, 'P'],
      [17, 'Q'],
      [18, 'R'],
      [19, 'S'],
      [20, 'T'],
      [21, 'U'],
      [22, 'V'],
      [23, 'W'],
      [24, 'X'],
      [25, 'Y'],
      [26, 'Z'],
    ])
    return columnMap.get(id) || ('A' as ColumnAlias)
  },
}
