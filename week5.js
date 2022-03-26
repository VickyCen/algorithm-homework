// 1. 在 D 天内送达包裹的能力， 链接：https://leetcode-cn.com/problems/capacity-to-ship-packages-within-d-days

/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
 var shipWithinDays = function(weights, days) {
    let left = 0;
    let right = 0; 
    for (let weight of weights) {
        // left is the maximum weight in the array - 左边为weights数组里面最大值，以确保结果至少能一次承载一个包裹
        // 右边为所有包裹的总和
        left = Math.max(left, weight);
        right += weight;
    }
    while (left < right) {
        let mid = parseInt((left + right) / 2);
        if (validate(weights, days, mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return right;
};

function validate(weights, days, load) {
    // if weights of days can be loaded onto boat, that means it can be successfully transfered
    // 如果最少承载量load能成功用少于days的天数运载完所有包裹，则返回true
    let curLoad = 0;   // current load on the boat - 当前运载量
    let requiredDays = 1;   // days that can load all the weights but not overloaded - 运载完所有包裹需要的天数
    for (let weight of weights) {
        if (curLoad + weight <= load) {
            curLoad += weight;   
        } else {
            requiredDays++;  // 如果超过了当天承载量，只能等下一天
            if (weight > load) return false;
            curLoad = weight;
        }
    }
    return requiredDays <= days;
}


// 2. 在线选举， 链接：https://leetcode-cn.com/problems/online-election/
/**
 * @param {number[]} persons
 * @param {number[]} times
 */
 var TopVotedCandidate = function(persons, times) {
    this.persons = persons;
    this.times = times;

    let ans = [];      // record winner at time t(t as index) - 用于记录i时刻，当选者是谁
    let n = times.length;
    let winner = -1; 
    let count = new Array(n);   // 用于记录候选人i的得票情况
    count.fill(0);
    for (let i = 0; i < n; i++) {
        count[persons[i]]++;
        if (winner === -1 || count[persons[i]] >= count[winner]) {
            // if current person's votes >= last winner's vote, current person becomes winner
            // 如果当前候选人比上一时刻的当选人票数高，那么当前时刻，当选者为当前候选人
            winner = persons[i]; 
        }
        ans.push(winner);
    }
    this.ans = ans;
};

/** 
 * @param {number} t
 * @return {number}
 */
TopVotedCandidate.prototype.q = function(t) {
    // Find out the winner at time <= t
    // 利用二分法求出，t时刻之前的最近时刻的当选者，即为t时刻的答案
    let left = 0;
    let right = this.times.length;
    while (left < right) {
        let mid = parseInt((left + right) / 2);
        if (this.times[mid] > t) {
            right = mid
        } else {
            left = mid + 1;
        }
    }
    return this.ans[left - 1];
};

/**
 * Your TopVotedCandidate object will be instantiated and called as such:
 * var obj = new TopVotedCandidate(persons, times)
 * var param_1 = obj.q(t)
 */