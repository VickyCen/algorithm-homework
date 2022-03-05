// 1. 子域名访问计数， 链接：https://leetcode-cn.com/problems/subdomain-visit-count/

/**
 * @param {string[]} cpdomains
 * @return {string[]}
 */
 var subdomainVisits = function(cpdomains) {
    // Use hash to store the sub-domains and count, 用哈希表存储子域名和count
    let subdomainVisits = new Map();
    let result = [];

    for (let cpdomain of cpdomains) {
        let cpArray = cpdomain.split(" ");
        // parse domain to get all sub-domains，解析每个cpdomain， 得到子域名和相应的count
        // cpArray[0] - count, cpArray[1] - subdomain
        let substrArray = cpArray[1].split(".");
        if (substrArray.length > 0) {
            let curSubdomain = substrArray.pop();
            addToMap(curSubdomain, Number(cpArray[0]), subdomainVisits);
            while (substrArray.length) {
                curSubdomain = substrArray.pop() + "." + curSubdomain;
                addToMap(curSubdomain, Number(cpArray[0]), subdomainVisits);
            }
        }
    }
    for (let [subdomain, count] of subdomainVisits.entries()) {
        result.push(`${count} ${subdomain}`);
    }
    return result;
};

function addToMap(key, value, map) {
    if (map.has(key)) {
        // if this key exists, count it； 如果键已存在，把数值相加
        map.set(key, map.get(key) + value);
    } else {
        // if this key doesn't exist, add it； 如果键还不存在，加进map
        map.set(key, value);
     }
}


// 2. 数组的度， 链接：https://leetcode-cn.com/problems/degree-of-an-array/

/**
 * @param {number[]} nums
 * @return {number}
 */
 var findShortestSubArray = function(nums) {
    // Use hash to calculate the appearance of each num, 用哈希表存储每个数字出现的频次，最小索引以及最大索引
    // Each key - pair = num: [count, minIndex, maxIndex]，键：num， 值：[出现的频次，最小索引, 最大索引]
    let numCount = new Map();

    for (let i = 0; i < nums.length; i++) {
        if (numCount.has(nums[i])) {
            // If this num exists in map, 如果num已存在，更新频次以及最大索引
            let value = numCount.get(nums[i]);
            numCount.set(nums[i], [value[0]+1, value[1], i]);
        } else {
            // If this num does not exist in map, 如果num不存在，新增频次为1，最大和最小索引均为当前索引
            numCount.set(nums[i], [1, i, i]);
        }
    }

    // sort the values in ascending order of appearance，对频次进行排序
    let appearance = [...numCount.values()].sort((a, b) => a[0] - b[0]);
    let current = appearance.pop();
    let maxAppearch = 0;
    let result = 50000;
    while (current && current[0] >= maxAppearch) {
        result = Math.min(result, current[2] - current[1] + 1);
        maxAppearch = current[0];
        current = appearance.pop();
    }
    return result;
};