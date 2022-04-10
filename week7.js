// 1. 完全平方数， 链接：https://leetcode-cn.com/problems/perfect-squares/

/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
	let f = new Array(n + 1);
	f.fill(1e9);
	f[0] = 0;

	for (let i = 1; i <= n; i++) {
		for (let j = 1; j * j <= i; j++) {
			// j*j是完全平方数，如果j*j选，那么结果为i-j*j多加一个数
			// 如果j*j不选，那么结果为i-1的结果，但是由于优化，这个结果可以以f[i]来代表
			f[i] = Math.min(f[i], f[i - j * j] + 1);
		}
	}
	return f[n] === 1e9 ? 0 : f[n];
};

// 2. 跳跃游戏， 链接：https://leetcode-cn.com/problems/jump-game/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
	let size = nums.length;
	// 从后往前推, 加入最后能到达的index为0，那么就是true
	let lastIndex = size - 1;

	for (let i = size - 2; i >= 0; i--) {
		if (lastIndex - i <= nums[i]) {
			lastIndex = i;
		}
	}
	return lastIndex === 0;
};
