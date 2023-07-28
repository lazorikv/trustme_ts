export function compareAndFilterLists<T>(list1: T[], list2: T[]): T[] {
    // Используем Set для быстрого поиска элементов
    const set1 = new Set(list1);
  
    // Фильтруем элементы второго списка, которых нет в первом списке
    const filteredList = list2.filter((item) => !set1.has(item));
  
    return filteredList;
  }