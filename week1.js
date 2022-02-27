// 1. 加一， 链接：https://leetcode-cn.com/problems/plus-one/

/**
 * @param {number[]} digits
 * @return {number[]}
 */
 var plusOne = function(digits) {
    // Use a stack to store current array， 用栈存储
    let stack = [];
    let reversedResult = [];
    let carry = 1;    // to record if it needs to add carry, 进位
    for (let digit of digits) {
        stack.push(digit);
    }
    // Pop the stack and plus 1 to the last digit then push to result
    while (stack.length > 0) {
        let current = stack.pop();
        let outcome = current + carry;
        if (outcome >= 10) {
            outcome = outcome - 10;
            carry = 1;
        } else {
            carry = 0;
        }
        reversedResult.push(outcome);
    }
    if (carry === 1) {
        // if in the end, carry is 1, then need to add 1 to the end；如果最后还需要进位，则给result多加一位
        reversedResult.push(1);
    }
    return reversedResult.reverse();
};


// 2. 合并两个有序链表， 链接：https://leetcode-cn.com/problems/merge-two-sorted-lists/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
 var mergeTwoLists = function(list1, list2) {
    // If either list is empty, return the other list's node
    if (list1 == null) return list2;
    if (list2 == null) return list1;

    // Compare values and use recursion for the rest of values in the list
    // If l1 is lower
    if (list1.val < list2.val) {
        list1.next = mergeTwoLists(list1.next, list2);
        return list1;
    }
    // If l2 is lower
    else {
        list2.next = mergeTwoLists(list1, list2.next);
        return list2;
    }
};