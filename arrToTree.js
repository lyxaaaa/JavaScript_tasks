// 示例数据  
const list = [
    { id: 1, name: 'Node 1', parentId: null },
    { id: 2, name: 'Node 1.1', parentId: 1 },
    { id: 3, name: 'Node 1.2', parentId: 1 },
    { id: 4, name: 'Node 2', parentId: null },
    { id: 5, name: 'Node 2.1', parentId: 4 },
    { id: 6, name: 'Node 2.2', parentId: 4 },
    { id: 7, name: 'Node 2.1.1', parentId: 5 },
];

function arrToTree(arr, parentId = null) {
    let result = [];
    let map = {};
    for(let i = 0; i < arr.length; i++) {
        map[arr[i].id] = {...arr[i], children: []};
    }
    for(let i = 0; i < arr.length; i++) {
        let node = map[arr[i].id];
        if(arr[i].parentId === parentId) {
            result.push(node);
        }
        else {
            map[arr[i].parentId].children.push(node);
        }
    }
    return result;
}

const tree = arrToTree(list, null);

function printTree(tree, leval = 0) {
    tree.forEach(node => {
        console.log(`${'--'.repeat(leval)} ${node.name}`);
        if(node.children.length > 0) printTree(node.children, leval + 1);
    });
}
printTree(tree);