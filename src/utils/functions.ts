export function notNull<T>(value: T | null): value is T {
  return value !== null;
}

export function updateArray<T extends { id?: number }>(startingArray: T[], newObjects: T[]) {
  // Create a map for quick lookup of existing IDs in the starting array
  const startingMap = new Map(startingArray.map((obj) => [obj.id, obj]));

  // Process the new objects
  newObjects.forEach((newObj) => {
    if (startingMap.has(newObj.id)) {
      // If the ID exists, override the existing object
      Object.assign(startingMap.get(newObj.id)!, newObj);
    } else {
      // If the ID doesn't exist, append the new object
      startingArray.push(newObj);
    }
  });

  return startingArray;
}

export function downloadFile(content: string, name: string, type: string = "text/plain") {
  const element = document.createElement("a");
  const file = new Blob([content], { type });
  element.href = URL.createObjectURL(file);
  element.download = name;
  document.body.appendChild(element);
  element.click();
}
