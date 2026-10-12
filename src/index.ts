import { MaxHeap, MinHeap } from './heap.js';
import { heapSort } from './heapSort.js';
import { topKLargest, topKSmallest } from './topK.js';
import { PriorityQueue } from './priorityQueue.js';

const data = [5, 3, 9, 1, 7, 3, -2, 0, 8];

console.log('Куча:');
console.log('исходный массив:', data.join(' '));

const maxHeap = new MaxHeap(data);
console.log('max-куча (массив):', maxHeap.toArray().join(' '));
console.log('корень max-кучи: ', maxHeap.peek());

const minHeap = new MinHeap(data);
console.log('min-куча (массив):', minHeap.toArray().join(' '));
console.log('корень min-кучи: ', minHeap.peek());

const order: number[] = [];
const h = new MinHeap(data);
while (!h.isEmpty()) order.push(h.pop() as number);
console.log('последовательное извлечение из min-кучи:', order.join(' '));

console.log('\nПирамидальная сортировка:');
console.log('до:   ', data.join(' '));
console.log('после:', heapSort(data).join(' '));

console.log('\nТоп-k:');
console.log('массив:        ', data.join(' '));
console.log('топ-3 сверху:  ', topKLargest(data, 3).join(' '));
console.log('топ-3 снизу:   ', topKSmallest(data, 3).join(' '));

console.log('\nОчередь с приоритетом:');
const queue = new PriorityQueue<string>('max');
queue.enqueue('помыть посуду', 1);
queue.enqueue('сдать лабораторную', 10);
queue.enqueue('погулять с собакой', 6);
queue.enqueue('полить цветы', 1);
console.log('следующая задача:', queue.peek(), '(приоритет', queue.peekPriority() + ')');
console.log('порядок обслуживания:', queue.drain().join(' -> '));
