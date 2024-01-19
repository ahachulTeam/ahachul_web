import { AtomEffect, DefaultValue, WrappedValue } from "recoil";

interface StorageEffectProps<T> {
  setSelf: (
    param:
      | T
      | DefaultValue
      | Promise<T | DefaultValue>
      | WrappedValue<T>
      | ((param: T | DefaultValue) => T | DefaultValue | WrappedValue<T>),
  ) => void;
  onSet: (
    param: (newValue: T, oldValue: T | DefaultValue, isReset: boolean) => void,
  ) => void;
}

export const localStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }: StorageEffectProps<T>) => {
    const savedValue = localStorage.getItem(key);

    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };
