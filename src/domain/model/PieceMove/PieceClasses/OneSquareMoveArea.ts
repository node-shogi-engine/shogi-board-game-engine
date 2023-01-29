import { Piece } from "../../Piece";
import {
  King, Gold, Silver, Pawn,
} from "../../../const/PieceClassMoves";

import { Player } from "../../../value/Player";
import { SquarePosition } from "../../../value/SquarePosition";
import { Diagram } from "../../Diagram";
import { FileRank } from "../../FileRank";
import { PieceMoveOnDiagram } from "../PieceMoveOnDiagram";
import { IPieceMoveArea } from "../PieceMoveAsPlain";
// types
import { FileRankNumber } from "../../../type/FileRankNumber";
import { PieceType, OneSquareArea } from "../../../type/PieceClasses";
import { PlayerType } from "../../../type/Player";

export class OneSquareMoveArea implements IPieceMoveArea {
  static readonly OneSquareMoveArea: { [key: string]: OneSquareArea[] } = {
    King,
    Gold,
    Silver,
    Pawn,
  };

  static getFileRankFromNumber(number: OneSquareArea): number[] {
    const number_file_rank_map = {
      9: [-1, -1],
      6: [-1, 0],
      3: [-1, 1],
      8: [0, -1],
      2: [0, 1],
      // 5: [],
      7: [1, -1],
      4: [1, 0],
      1: [1, 1],
    };
    return number_file_rank_map[number];
  }

  constructor(private _piece_type: PieceType) {}

  public get_square_positions_as_plain(
    currnetPosition: SquarePosition,
    piece_master: PlayerType,
  ): SquarePosition[] {
    // specific piece props
    const specific_piece_can_move_area = piece_master == Player.Sente
      ? OneSquareMoveArea.OneSquareMoveArea[this._piece_type]
      : OneSquareMoveArea.OneSquareMoveArea[this._piece_type].map(
        (area) => (10 - area) as OneSquareArea, // 後手番の時、移動可能範囲を上下左右逆にする
      );
    const current_file = currnetPosition.file;
    const current_rank = currnetPosition.rank;

    // functions
    const piece_move_area_as_number = (number: OneSquareArea): number[] => {
      const [file_destination, rank_destination] = OneSquareMoveArea.getFileRankFromNumber(number);
      const file_as_number: number = current_file + file_destination;
      const rank_as_number: number = current_rank + rank_destination;
      // square_position_list.push(square_position);
      return [file_as_number, rank_as_number];
    };
    const remove_square_out_of_shogi_board = (
      file_rank_as_number: number[],
    ) => {
      const file_as_number: number = file_rank_as_number[0];
      const rank_as_number: number = file_rank_as_number[1];
      return FileRank.is_in_file_rank_number(file_as_number, rank_as_number);
    };
    const generate_square_position_from_number = (
      file_rank_as_number: number[],
    ) => {
      const file: FileRankNumber = FileRank.castNumberToFileRank(
        file_rank_as_number[0],
      );
      const rank: FileRankNumber = FileRank.castNumberToFileRank(
        file_rank_as_number[1],
      );
      return new SquarePosition(file, rank);
    };

    // result
    const square_position_list: SquarePosition[] = specific_piece_can_move_area
      .map(piece_move_area_as_number)
      .filter(remove_square_out_of_shogi_board)
      .map(generate_square_position_from_number);
    return square_position_list;
  }

  public get_square_positions_as_on_diagram(
    currnetPosition: SquarePosition,
    diagram: Diagram,
  ): SquarePosition[] {
    const { file, rank } = currnetPosition;
    const { master } = diagram.shogi_board[file][rank].piece;
    const square_position_list = this.get_square_positions_as_plain(
      currnetPosition,
      master,
    );
    return PieceMoveOnDiagram.filter_in_in_where_can_move_on_diagram_for_one_square_piece(
      square_position_list,
      diagram,
    );
  }
}
