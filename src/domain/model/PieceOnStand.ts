import { Piece } from "./Piece";
import { PlayerType } from "../type/Player";
import { PieceType } from "../type/PieceClasses";

export class PieceOnStand {
  constructor(
    private readonly piece: Piece,
    public readonly master: PlayerType,
  ) {}

  get pieceType(): PieceType {
    return this.piece.type;
  }
}
