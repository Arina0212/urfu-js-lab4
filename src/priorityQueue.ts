/**
 * Очередь с приоритетом (Priority Queue) на основе двоичной кучи.
 *
 * Обычная очередь отдаёт элементы в порядке поступления, очередь с приоритетом —
 * в порядке важности: первым извлекается элемент с наибольшим приоритетом
 * (или с наименьшим, если очередь создана как 'min').
 *
 * Хранится массив пар { value, priority }. Приоритет — число, поэтому операции
 * сравнения на нём определены. Чтобы очередь была устойчивой (элементы с
 * одинаковым приоритетом выходили в порядке поступления, FIFO), у каждого
 * элемента есть порядковый номер order, который используется при равенстве
 * приоритетов.
 *
 * Сложность:
 *   peek            O(1)
 *   enqueue         O(log n)
 *   dequeue         O(log n)
 *   память          O(n)
 */

export type QueueType = 'max' | 'min';

interface Entry<T> {
    value: T;
    priority: number;
    order: number;
}

export class PriorityQueue<T> {
    private readonly heap: Entry<T>[] = [];
    private counter = 0;

    constructor(private readonly type: QueueType = 'max') {}

    get size(): number {
        return this.heap.length;
    }

    isEmpty(): boolean {
        return this.heap.length === 0;
    }

    enqueue(value: T, priority: number): void {
        this.heap.push({ value, priority, order: this.counter++ });
        this.siftUp(this.heap.length - 1);
    }

    peek(): T | undefined {
        return this.heap[0]?.value;
    }

    peekPriority(): number | undefined {
        return this.heap[0]?.priority;
    }

    dequeue(): T | undefined {
        if (this.heap.length === 0) return undefined;

        const top = this.heap[0];
        const last = this.heap.pop() as Entry<T>;

        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.siftDown(0);
        }

        return top.value;
    }

    drain(): T[] {
        const result: T[] = [];
        while (!this.isEmpty()) {
            result.push(this.dequeue() as T);
        }
        return result;
    }

    private siftUp(index: number): void {
        let i = index;

        while (i > 0) {
            const parent = Math.floor((i - 1) / 2);
            if (!this.higher(this.heap[i], this.heap[parent])) break;

            this.swap(i, parent);
            i = parent;
        }
    }

    private siftDown(index: number): void {
        let i = index;
        const n = this.heap.length;

        while (true) {
            const left = 2 * i + 1;
            const right = 2 * i + 2;
            let best = i;

            if (left < n && this.higher(this.heap[left], this.heap[best])) best = left;
            if (right < n && this.higher(this.heap[right], this.heap[best])) best = right;

            if (best === i) break;

            this.swap(i, best);
            i = best;
        }
    }

    private higher(a: Entry<T>, b: Entry<T>): boolean {
        if (a.priority !== b.priority) {
            return this.type === 'max' ? a.priority > b.priority : a.priority < b.priority;
        }
        return a.order < b.order;
    }

    private swap(i: number, j: number): void {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
}
