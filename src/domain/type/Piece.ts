import { PiecesInStand } from "./PiecesInStand";
// import { Square } from "./Square";
import { FileRankPair } from "./FileRankNumber";
import { PieceTypeList } from "../const/PieceType";

export type PieceMoveFrom = FileRankPair | PiecesInStand;

export type PieceType = (typeof PieceTypeList)[number];

const OneSquarePieceTypeList = ["King", "Gold", "Silver", "Pawn"] as const;
export type OneSquarePiecetype = (typeof OneSquarePieceTypeList)[number];

const LongRangePieceTypeList = ["Rook", "Bishop", "Lance"] as const;
export type LongRangePieceType = (typeof LongRangePieceTypeList)[number];

/* eslint-disable */
export type kNightPieceType = "kNight";

export type OneSquareArea = 1 | 2 | 3 | 4 | 6 | 7 | 8 | 9;
