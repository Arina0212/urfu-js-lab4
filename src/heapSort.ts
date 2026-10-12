/**
 * Пирамидальная сортировка (heap sort).
 *
 * Идея:
 *   1. Из массива строится max-куча за O(n) (просеивание вниз с середины массива).
 *   2. n − 1 раз: корень (максимум) меняется местами с последним элементом
 *      неотсортированной части, размер кучи уменьшается на 1, новый корень
 *      просеивается вниз за O(log n). Максимумы накапливаются в конце массива
 *      по возрастанию.
 *
 * Сложность по времени: O(n) на построение + n * O(log n) на извлечения = O(n log n).
 * Причём O(n log n) и в лучшем, и в среднем, и в худшем случае.
 *
 * Сложность по памяти: O(1) — сортировка идёт на месте, рекурсии нет
 * (копия массива создаётся только чтобы не изменять аргумент).
 *
 * Сортировка не является устойчивой: равные элементы могут поменяться местами.
 */
export function heapSort(input: number[]): number[] {
    const a = [...input];
    const n = a.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        siftDown(a, i, n);
    }

    for (let end = n - 1; end > 0; end--) {
        [a[0], a[end]] = [a[end], a[0]];
        siftDown(a, 0, end);
    }

    return a;
}

function siftDown(a: number[], index: number, size: number): void {
    let i = index;

    while (true) {
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        let largest = i;

        if (left < size && a[left] > a[largest]) largest = left;
        if (right < size && a[right] > a[largest]) largest = right;

        if (largest === i) break;

        [a[i], a[largest]] = [a[largest], a[i]];
        i = largest;
    }
}
