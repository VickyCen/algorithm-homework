// 1. 冗余连接， 链接：https://leetcode-cn.com/problems/redundant-connection/

/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function (edges) {
	function find(x) {
		if (x === fa[x]) return x;
		return (fa[x] = find(fa[x]));
	}
	let n = edges.length;
	// Make set
	let fa = new Array(n);
	for (let i = 0; i < n; i++) fa[i] = i;
	// 对于每条边，如果两点没被加入并查集，则加入
	// 如果两点已经在并查集，说明两点已被连接， 该边可以删掉，作为结果返回
	for (let edge of edges) {
		let [x, y] = edge;
		x = find(x);
		y = find(y);
		if (x != y) {
			fa[x] = y;
		} else {
			return edge;
		}
	}
	return [];
};

// 2. 岛屿数量， 链接：https://leetcode-cn.com/problems/number-of-islands/

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
	let m = grid.length;
	let n = grid[0].length;

	let dx = [-1, 0, 0, 1];
	let dy = [0, -1, 1, 0];

	function num(i, j) {
		return i * n + j;
	}

	function find(x) {
		if (x === fa[x]) return x;
		return (fa[x] = find(fa[x]));
	}

	function unionSet(x, y) {
		x = find(x);
		y = find(y);
		if (x != y) fa[x] = y;
	}
	// Make set
	let fa = new Array(m * n);
	for (let i = 0; i < m * n; i++) fa[i] = i;

	for (let i = 0; i < m; i++) {
		for (let j = 0; j < n; j++) {
			if (grid[i][j] === '0') fa[num(i, j)] = -1; // 如果不是陆地，则赋值为-1
			else {
				for (let k = 0; k < 4; k++) {
					nx = i + dx[k];
					ny = j + dy[k];
					if (nx < 0 || nx >= m || ny < 0 || ny >= n) continue;
					if (grid[nx][ny] === '1') {
						unionSet(num(i, j), num(nx, ny)); // 如果找到连通块，则合并
					}
				}
			}
		}
	}

	let ans = 0;
	for (let i = 0; i < m * n; i++) {
		if (find(i) === i) ans++;
	}
	return ans;
};
