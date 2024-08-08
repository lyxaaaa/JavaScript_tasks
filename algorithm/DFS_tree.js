function depthFirstSearch(root) {  
    if(root === null) return;
    console.log(root.value);
    for(let i = 0; i < root.children.length; i++) {
        depthFirstSearch(root.children[i]);
    }
}  
     
// 示例树结构  
const tree = { 
   value: 'root',  
   children: [  
       {  
           value: 'child1',  
           children: [  
               { value: 'grandchild1', children: [] },  
               { value: 'grandchild2', children: [] }  
           ]  
       },  
       {  
           value: 'child2',  
           children: [  
               { value: 'grandchild3', children: [] },  
               { value: 'grandchild4', children: [] }  
           ]  
       }  
   ]  
};  
     
// 从根节点开始深度优先遍历  
depthFirstSearch(tree);