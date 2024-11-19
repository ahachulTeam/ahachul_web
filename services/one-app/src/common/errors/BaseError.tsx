import { SITE_URL } from '../constants/env';
import { getCurrentPath } from '../utils/route';

type PathInfo = {
  pathname: string;
  params?: Record<string, string>;
  searchParams?: Record<string, string>;
};

export class BaseError extends Error {
  currentPath: PathInfo;
  previousPath: PathInfo;
  timestamp: string;
  stack?: string;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    const { currentPath, previousPath } = getCurrentPath();
    this.currentPath = this.parsePathInfo(currentPath);
    this.previousPath = this.parsePathInfo(previousPath);
    this.timestamp = new Date().toISOString();
  }

  private parsePathInfo(path: string): PathInfo {
    try {
      const url = new URL(path, SITE_URL);
      return {
        pathname: url.pathname,
        params: {},
        searchParams: Object.fromEntries(url.searchParams.entries()),
      };
    } catch {
      return { pathname: path };
    }
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      timestamp: this.timestamp,
      currentPath: this.currentPath,
      previousPath: this.previousPath,
      stack: this.stack,
    };
  }

  toString(): string {
    return JSON.stringify(this.toJSON(), null, 2);
  }
}
