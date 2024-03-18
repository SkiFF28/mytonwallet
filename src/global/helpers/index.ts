import type { ApiToken, ApiTransaction } from '../../api/types';

import { TINY_TRANSFER_MAX_COST } from '../../config';
import { toBig } from '../../util/decimals';

export function getIsTinyTransaction(transaction: ApiTransaction, token?: ApiToken) {
  if (!token) return false;
  const decimals = token.decimals;
  const cost = toBig(transaction.amount, decimals).abs().mul(token.quote.priceUsd ?? 0);
  return cost.lt(TINY_TRANSFER_MAX_COST);
}

export function getIsTxIdLocal(txId: string) {
  return txId.includes('|');
}

export function getIsSwapId(id: string) {
  return id.startsWith('swap:');
}
