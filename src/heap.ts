/**
 * Двоичная куча (binary heap) в вариантах Max Heap и Min Heap.
 *
 * Куча — это почти полное двоичное дерево, которое хранится в обычном массиве.
 * Для узла с индексом i:
 *   родитель   = (i - 1) / 2  (целочисленно)
 *   левый сын  = 2i + 1
 *   правый сын = 2i + 2
 *
 * Свойство кучи:
 *   Max Heap — значение родителя не меньше значений детей (в корне максимум);
 *   Min Heap — значение родителя не больше значений детей (в корне минимум).
 *
 * Элементы — числа (type Number), операции > < === на них определены.
 *
 * Сложность операций:
 *   peek            O(1)
 *   push            O(log n)   — просеивание вверх, высота дерева log2(n)
 *   pop             O(log n)   — просеивание вниз
 *   построение из массива O(n) — метод heapify
 *   память          O(n) — хранится только сам массив
 */

export type HeapType = 'max' | 'min';

export class BinaryHeap {
    private readonly items: number[] = [];

    constructor(private readonly type: HeapType = 'max', initial: number[] = []) {
        if (initial.length > 0) {
            this.items.push(...initial);
            this.heapify();
        }
    }

    get size(): number {
        return this.items.length;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    peek(): number | undefined {
        return this.items[0];
    }

    push(value: number): void {
        this.items.push(value);
        this.siftUp(this.items.length - 1);
    }

    pop(): number | undefined {
        if (this.items.length === 0) return undefined;

        const root = this.items[0];
        const last = this.items.pop() as number;

        if (this.items.length > 0) {
            this.items[0] = last;
            this.siftDown(0);
        }

        return root;
    }

    toArray(): number[] {
        return [...this.items];
    }

    private heapify(): void {
        for (let i = Math.floor(this.items.length / 2) - 1; i >= 0; i--) {
            this.siftDown(i);
        }
    }

    private siftUp(index: number): void {
        let i = index;

        while (i > 0) {
            const parent = Math.floor((i - 1) / 2);
            if (!this.higher(this.items[i], this.items[parent])) break;

            this.swap(i, parent);
            i = parent;
        }
    }

    private siftDown(index: number): void {
        let i = index;
        const n = this.items.length;

        while (true) {
            const left = 2 * i + 1;
            const right = 2 * i + 2;
            let best = i;

            if (left < n && this.higher(this.items[left], this.items[best])) best = left;
            if (right < n && this.higher(this.items[right], this.items[best])) best = right;

            if (best === i) break;

            this.swap(i, best);
            i = best;
        }
    }

    private higher(a: number, b: number): boolean {
        return this.type === 'max' ? a > b : a < b;
    }

    private swap(i: number, j: number): void {
        [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
    }
}

export class MaxHeap extends BinaryHeap {
    constructor(initial: number[] = []) {
        super('max', initial);
    }
}

export class MinHeap extends BinaryHeap {
    constructor(initial: number[] = []) {
        super('min', initial);
    }
}
