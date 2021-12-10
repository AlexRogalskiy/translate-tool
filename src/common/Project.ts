export interface Project {
  title: string,
  url: string,
  token: string,
  indent: number
}

export type Dict = Record<string, object | string>

export class LoadedProject {
  constructor(
    public config: Project,
    public dicts: Record<string, Dict>
  ) {}

  get title() {
    return this.config.title
  }

  get langs() {
    return Object.keys(this.dicts)
  }

  public static prettyFormat(dict: Dict, indent: number): string {
    return JSON.stringify(dict, null, indent)
  }

  public prettyFormat(dict: Dict): string {
    return LoadedProject.prettyFormat(dict, this.config.indent)
  }
}
