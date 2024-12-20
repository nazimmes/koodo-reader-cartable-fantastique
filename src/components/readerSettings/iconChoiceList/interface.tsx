export interface IconChoiceListProps {
  t: (title: string) => string;
  renderBookFunc: () => void;
}
export interface IconChoiceListState {
  currentFontFamily: string;
  cuurentTaillePolice: number;
  // currentLineHeightIndex: number;
  // currentTextAlignIndex: number;
  // chineseConversionIndex: number;
}

export interface IconChoiseStyle {
  value: string,
  src: string,
  alt: string,
}
