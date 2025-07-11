export interface ColorStop {
  id: string;
  color: string;
  position: number;
  opacity: number;
}

export interface GradientConfig {
  id: string;
  name: string;
  direction: string;
  colorStops: ColorStop[];
  createdAt: Date;
}

export interface GradientPreset {
  name: string;
  direction: string;
  colorStops: Omit<ColorStop, 'id'>[];
}