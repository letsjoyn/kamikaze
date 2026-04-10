export class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(item, priority) {
        const entry = { item, priority };
        const index = this.items.findIndex((existing) => priority > existing.priority);

        if (index === -1) {
            this.items.push(entry);
        } else {
            this.items.splice(index, 0, entry);
        }
    }

    dequeue() {
        return this.items.shift()?.item || null;
    }

    peek() {
        return this.items[0]?.item || null;
    }

    size() {
        return this.items.length;
    }

    toArray() {
        return this.items.map((entry) => entry.item);
    }
}

export function estimateQueueEtaHours(position) {
    return Math.max(1, position * 2);
}
