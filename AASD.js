function dijkstra(graph, start) {
    const distances = {};
    const visited = new Set();
    const priorityQueue = new PriorityQueue();

    // Initialize distances to infinity, except for the start vertex
    for (let vertex in graph) {
        distances[vertex] = Infinity;
    }
    distances[start] = 0;

    // Add the start vertex to the priority queue
    priorityQueue.enqueue(start, 0);

    while (!priorityQueue.isEmpty()) {
        const { vertex: currentVertex, priority: currentDistance } = priorityQueue.dequeue();
        
        if (visited.has(currentVertex)) continue;

        visited.add(currentVertex);

        for (let neighbor in graph[currentVertex]) {
            const weight = graph[currentVertex][neighbor];
            const totalDistance = currentDistance + weight;

            if (totalDistance < distances[neighbor]) {
                distances[neighbor] = totalDistance;
                priorityQueue.enqueue(neighbor, totalDistance);
            }
        }
    }

    return distances;
}

// Priority Queue implementation using a Min Heap
class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(vertex, priority) {
        this.values.push({ vertex, priority });
        this.bubbleUp();
    }

    dequeue() {
        const min = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this.sinkDown();
        }
        return min;
    }

    bubbleUp() {
        let idx = this.values.length - 1;
        const element = this.values[idx];
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            let parent = this.values[parentIdx];
            if (element.priority >= parent.priority) break;
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    }

    sinkDown() {
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIdx < length) {
                leftChild = this.values[leftChildIdx];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIdx;
                }
            }

            if (rightChildIdx < length) {
                rightChild = this.values[rightChildIdx];
                if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightChildIdx;
                }
            }

            if (swap === null) break;
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }

    isEmpty() {
        return this.values.length === 0;
    }
}

// usage:
const graph = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'C': 5, 'D': 10 },
    'C': { 'A': 2, 'B': 5, 'D': 3 },
    'D': { 'B': 10, 'C': 3 }
};

console.log(dijkstra(graph, 'A')); // { A: 0, B: 4, C: 2, D: 5 }
