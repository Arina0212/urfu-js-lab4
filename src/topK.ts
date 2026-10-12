/**
 * Задачи "найти топ-k элементов массива".
 *
 * Держим кучу размера не больше k и "противоположного" типа.
 *
 * Топ-k сверху (k наибольших) — min-куча размера k:
 *   в её корне лежит наименьший из текущих кандидатов, и как только приходит
 *   элемент больше корня, корень выбрасывается. Так в куче всегда остаются
 *   k наибольших элементов из просмотренных.
 *
 * Топ-k снизу (k наименьших) — симметрично, max-куча размера k.
 *
 * Сложность по времени: O(n log k) — n элементов, каждая вставка/извлечение O(log k).
 * Сложность по памяти: O(k) — в куче не больше k элементов.
 *
 * Для сравнения: решение «отсортировать массив и взять k элементов» стоит
 * O(n log n) по времени и O(n) по памяти. При k << n вариант с кучей выигрывает,
 * а главное — не требует держать весь массив в памяти: элементы можно подавать потоком.
 */

import { MinHeap, MaxHeap } from './heap.js';

export function topKLargest(array: number[], k: number): number[] {
    if (k <= 0) return [];

    const heap = new MinHeap();

    for (const value of array) {
        if (heap.size < k) {
            heap.push(value);
            continue;
        }

        if (value > (heap.peek() as number)) {
            heap.pop();
            heap.push(value);
        }
    }

    const result: number[] = [];
    while (!heap.isEmpty()) {
        result.push(heap.pop() as number);
    }

    return result.reverse();
}

export function topKSmallest(array: number[], k: number): number[] {
    if (k <= 0) return [];

    const heap = new MaxHeap();

    for (const value of array) {
        if (heap.size < k) {
            heap.push(value);
            continue;
        }

        if (value < (heap.peek() as number)) {
            heap.pop();
            heap.push(value);
        }
    }

    const result: number[] = [];
    while (!heap.isEmpty()) {
        result.push(heap.pop() as number);
    }

    return result.reverse();
}

export function topKLargestBySort(array: number[], k: number): number[] {
    return [...array].sort((a, b) => b - a).slice(0, Math.max(k, 0));
}

export function topKSmallestBySort(array: number[], k: number): number[] {
    return [...array].sort((a, b) => a - b).slice(0, Math.max(k, 0));
}
