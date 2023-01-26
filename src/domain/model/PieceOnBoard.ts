import { Piece } from "../value/Piece";
import { PlayerType } from "../type/Player";
import { PieceType } from "../type/Piece";

export class PieceOnBoard {
  constructor(
    private readonly piece: Piece,
    public readonly master: PlayerType,
  ) {}

  get pieceType(): PieceType {
    return this.piece.type;
  }

  get initial(): string {
    return this.piece.typeInitial;
  }

  get isPromotable(): boolean {
    return this.piece.isPromotable;
  }

  get isPromoted(): boolean {
    return this.piece.isPromoted;
  }

  public promotion(): void {
    this.piece.promotion();
  }

  public beToken(): void {
    this.piece.beTaken();
  }
}
