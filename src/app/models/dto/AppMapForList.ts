export class AppMapForList {
  name: string;
  progress: number; // [0;1]

  constructor(
    name: string,
    progress: number
  ) {
    this.name = name;
    this.progress = progress;
  }
}
