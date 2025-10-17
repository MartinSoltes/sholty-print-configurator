export interface ImageItem {
  id: string;
  src: string;
  name: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  file?: File;
}

export interface TextItem {
  id: string;
  content: string;
  x?: number;
  y?: number;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
}

export interface DesignImage {
  id: string;
  src: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DesignText {
  id: string;
  content: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
}

export interface DesignViews<T> {
  front: T[];
  back: T[];
}