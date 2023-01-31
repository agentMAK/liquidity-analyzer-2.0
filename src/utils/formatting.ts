export function trimAddress(address: string, length = 12) {
    if (length >= address.length) {
      return address;
    }
    const baseLength = length - 5;
    const startNo = Math.round(baseLength / 2);
    const endNo = Math.floor(baseLength / 2);
  
    const prefix = address.substring(0, 2);
    const start = address.substring(2, startNo + 2);
    const end = address.substring(address.length, address.length - endNo);
  
    return prefix + start + '...' + end;
  }