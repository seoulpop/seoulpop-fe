interface Atlas {
  historyId: number;
  historyCategory: string;
  historyName: string;
  heritageImgUrl: string;
  visited: boolean;
}

export type AtlasesData = Atlas[];
