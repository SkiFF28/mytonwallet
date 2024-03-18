import type { Storage, StorageKey } from './types';

import { bigintReviver } from '../../util/bigint';
import { callWindow } from '../../util/capacitorStorageProxy/connector';

const storage: Storage = {
  async getItem(key: StorageKey) {
    const result = await callWindow('getItem', key);
    return result ? JSON.parse(result, bigintReviver) : undefined;
  },

  async setItem(key: StorageKey, value: any) {
    await callWindow('setItem', key, JSON.stringify(value));
  },

  async removeItem(key: StorageKey) {
    await callWindow('removeItem', key);
  },

  async clear() {
    await callWindow('clear');
  },
};

export default storage;
