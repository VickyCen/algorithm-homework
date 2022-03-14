// 1. 合并K 个升序链表， 链接：https://leetcode-cn.com/problems/merge-k-sorted-lists/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
 var mergeKLists = function(lists) {
    if (lists.length === 0) return null;
    // Use recursion to merge lists - 通过递归合并链表
    return merge(lists, 0, lists.length - 1);
};

var merge = function(linkedList, left, right) {
    if (left === right) return linkedList[left];

    let mid = parseInt(left + (right - left) / 2);
    // Divide into small tasks, each task is to merge 2 lists 
    // 分治法，把问题分为子问题，子问题就是把两个链表数组合并成一个升序链表
    let list1 = merge(linkedList, left, mid);
    let list2 = merge(linkedList, mid + 1, right);

    return merge2Lists(list1, list2);
}

var merge2Lists = function(list1, list2) {
    if (list2 === null) return list1;
    if (list1 === null) return list2;
    // rucursion - 通过比较链表头元素的值，值小的链表剩下的元素和另一个链表进行升序排列
    if (list1.val < list2.val) {
        list1.next = merge2Lists(list1.next, list2);
        return list1;
    } else {
        list2.next = merge2Lists(list1, list2.next);
        return list2;
    }
}


// 2. 从中序与后序遍历序列构造二叉树， 链接：https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
 var buildTree = function(inorder, postorder) { 
    // Use recursion to build tree by using inorder and postorder
    return build(inorder, postorder);
};

var build = function(subInorder, subPostorder) {
        if (subInorder.length === 0) return null;
        let root = new TreeNode(subPostorder.pop());
        // find out the last element of left subtree - 找到左子树和右子树的分界点
        let mid = subInorder.indexOf(root.val);
        
        // Get inorder and postorder for left subtree and right subtree - 计算左子树和右子树的inorder和postorder
        let leftInorder = subInorder.slice(0, mid);
        let rightInorder = subInorder.slice(mid + 1, subInorder.length);
        let leftPostorder = subPostorder.slice(0, mid);
        let rightPostorder = subPostorder.slice(mid, subPostorder.length);

        // Build subtrees by recursion - 建立左，右子树
        root.left = build(leftInorder, leftPostorder);
        root.right = build(rightInorder, rightPostorder);
        return root;
    }