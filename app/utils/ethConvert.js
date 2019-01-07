import Units from 'ethereumjs-units';

export function weiToEth(wei) {
  return Units.convert(wei, 'wei', 'eth');
}
