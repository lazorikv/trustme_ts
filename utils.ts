export function compareAndFilterLists<T>(list1: T[], list2: T[]): T[] {
    const set1 = new Set(list1);
  
    const filteredList = list2.filter((item) => !set1.has(item));
  
    return filteredList;
  }