// 1. 爬楼梯， 链接：https://leetcode-cn.com/problems/climbing-stairs/description/

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
	// Assume that f(n) represents all the methods for climbing n steps
	// f(n) = f(n-1) + f(n-2).  // f(n-1) plus 1 step can reach n, or f(n-2) plus 2 steps can reach n
	if (n === 1) return 1;
	if (n === 2) return 2;
	let f = new Array(n + 1);
	// 假设f(n)代表爬上n阶的方法数，那么f(n) = f(n-1) + f(n-2)，其中f(n-1)代表一步以前的方法，加一步到n；f(n-2)代表一=两步以前的方法，加两步到n
	f[0] = 0;
	f[1] = 1;
	f[2] = 2;
	for (let i = 3; i <= n; i++) {
		f[i] = f[i - 1] + f[i - 2];
	}
	return f[n];
};

// 2. 三角形最小路径和， 链接：https://leetcode-cn.com/problems/triangle/description/

/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
	// from bottom to top - 自底向上
	let size = triangle.length; // The last layer has triganle.length elements - 最后一层的元素个数刚好等于triangle数组的长度
	let fmin = new Array(size + 1); //
	fmin.fill(0);
	for (let i = size - 1; i >= 0; i--) {
		for (let j = 0; j <= i; j++) {
			// 当前元素triangle[i][j]参与的最小路径和为，下一层第i个元素或者第i+1（当前元素下一行的相邻接点）的最小路径和中的最小值
			fmin[j] = triangle[i][j] + Math.min(fmin[j], fmin[j + 1]); // min sum of current element = current element + the minimum sum between next layer's left edge and right edge
		}
	}
	return fmin[0]; // 到顶层，只有唯一元素，下标为0，所以fmin[0]即为结果
};
