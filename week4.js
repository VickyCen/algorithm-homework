// 1. 被围绕的区域， 链接：https://leetcode-cn.com/problems/surrounded-regions

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
 var solve = function(board) {
    let m = board.length;
    let n = board[0].length; 
    let queue = [];      // bfs队列
    let copyBoard = [];

    function bfs(x, y) {
        // from the "o" cell, find out all "o" cells that are connected
        let dx = [-1, 0, 0, 1];
        let dy = [0, -1, 1, 0];
        queue.push([x, y]);
        while(queue.length) {
            let top = queue.shift();
            for (let z = 0; z < 4; z++) {
                let nx = top[0] + dx[z];
                let ny = top[1] + dy[z];
                if (nx < 0 || nx >= m || ny < 0 || ny >= n) continue;   // out of border - 出界了不算
                if (copyBoard[nx][ny][0] != "O") continue; // 如果是X不算
                if (copyBoard[nx][ny][1]) continue;   // if has been visited - 访问过了不算
                copyBoard[nx][ny][1] = true;
                board[nx][ny] = "O";
                queue.push([nx, ny]);
            }
            
        }
    }

    // create the result board that filled with X - 先创造一个copyBoard， 存原先board里的值和这一格是否被访问
    for (let i = 0; i < m; i++) {
        let array = [];
        for (let j = 0; j < n; j++) {
            let temp = board[i][j];
            array.push([temp, false]);    // [value, visited] - [值，是否访问过]
            board[i][j] = "X";   // 并且把board先全部变为“X”
        }
        copyBoard.push(array);
    }

    // Start from the boader to find connected area with "o" - 通过寻找边上的“O”格，如果找到了，通过bfs找连通块
    for (let i = 0; i < m; i++) {
        if (copyBoard[i][0][0] === "O" && !copyBoard[i][0][1]) {
            copyBoard[i][0][1] = true;
            board[i][0] = "O";
            bfs(i, 0);
        }
        if (copyBoard[i][n - 1][0] === "O" && !copyBoard[i][n - 1][1]) {
            copyBoard[i][n - 1][1] = true;
            board[i][n - 1] = "O";
            bfs(i, n - 1);
        }
    }
    for (let j = 0; j < n; j++) {
        if (copyBoard[0][j][0] === "O" && !copyBoard[0][j][1]) {
            copyBoard[0][j][1] = true;
            board[0][j] = "O";
            bfs(0, j);
        }
        if (copyBoard[m - 1][j][0] === "O" && !copyBoard[m - 1][j][1]) {
            copyBoard[m - 1][j][1] = true;
            board[m - 1][j] = "O";
            bfs(m - 1, j);
        }
    }
    return board;
};



// 2. 把二叉搜索树转换为累加树， 链接：https://leetcode-cn.com/problems/convert-bst-to-greater-tree/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */

 var convertBST = function(root) {
    let result = 0;

    function sum(root) {
        if (root === null) return root;
        sum(root.right);  // 算右子树
        root.val = root.val + result;  // 根的值为根和右子树相加
        result = root.val;  
        sum(root.left);    // 算左子树
    }
    sum(root);
    return root;
};