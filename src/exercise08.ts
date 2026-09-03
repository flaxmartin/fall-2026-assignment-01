export type EventMap = {
  launch: string;
  shutdown: number;
};

export class SimpleEventEmitter<T extends EventMap> {
  private handlers: {
    [K in keyof T]?: Array<(data: T[K]) => void>;
  } = {};

  public on<K extends keyof T>(
    eventName: K,
    callback: (data: T[K]) => void,
  ): void {
    const eventHandlers = this.handlers[eventName];

    if (eventHandlers) {
      eventHandlers.push(callback);
    } else {
      this.handlers[eventName] = [callback];
    }
  }

  public emit<K extends keyof T>(
    eventName: K,
    data: T[K],
  ): void {
    const eventHandlers = this.handlers[eventName];

    if (eventHandlers) {
      eventHandlers.forEach((callback) => callback(data));
    }
  }
}
