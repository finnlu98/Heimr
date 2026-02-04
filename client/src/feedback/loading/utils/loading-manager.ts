type LoadingListener = () => void;

class LoadingManager {
  private globalCount = 0;
  private keyedLoading = new Map<string, number>();
  private listeners = new Set<LoadingListener>();

  start(key?: string) {
    if (key) {
      this.keyedLoading.set(key, (this.keyedLoading.get(key) || 0) + 1);
    } else {
      this.globalCount++;
    }
    this.notify();
  }

  stop(key?: string) {
    if (key) {
      const count = this.keyedLoading.get(key) || 0;
      if (count <= 1) {
        this.keyedLoading.delete(key);
      } else {
        this.keyedLoading.set(key, count - 1);
      }
    } else {
      this.globalCount = Math.max(0, this.globalCount - 1);
    }
    this.notify();
  }

  isLoading(key?: string): boolean {
    if (key) return (this.keyedLoading.get(key) || 0) > 0;
    return this.globalCount > 0;
  }

  get anyLoading(): boolean {
    return this.globalCount > 0 || this.keyedLoading.size > 0;
  }

  subscribe(listener: LoadingListener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }
}

export const loadingManager = new LoadingManager();
