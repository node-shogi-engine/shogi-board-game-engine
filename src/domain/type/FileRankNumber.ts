import { FILE_RANK_NUMBER_LIST } from "../const/FileRankNumber";

export type FileRankNumber = (typeof FILE_RANK_NUMBER_LIST)[number];
export type FileRankPair = [FileRankNumber, FileRankNumber];
