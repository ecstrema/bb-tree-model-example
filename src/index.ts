import { TN } from "bb-tree-model"


// Let's first create a tree:
let root = new TN().appendChildren(
                new TN().appendChildren(
                    new TN(),
                    new TN(),
                ),
                new TN(),
            )
// This method of initializing a tree has the advantage of easily showing the structure.

// now let's print it to the console:
root.print();
/**
tree-node
  ├tree-node
  │ ├tree-node
  │ └tree-node
  └tree-node
*/
// well that's already something! But we can do better. Let's add some more children.
const newChild1 = new TN(root);
const newChild2 = new TN(root);
root.print();
/**
tree-node
  ├tree-node
  │ ├tree-node
  │ └tree-node
  ├tree-node
  ├tree-node
  └tree-node
*/
// But wait! There's no `appendChildren` here.
// That's right, the parent was specified in the children's constructor, so there was no need for it.

// Ok. Now let's see navigate through the tree.
// If you've ever used tree structures, you probably know some tree traversal algorithms like
// *breadth-first* or *depth-first*. Let's try them.

// With bb, the *breadth-first* algorithm is implemented in the `traverse` method
root.traverse((child) => {
    console.log(child.toString);
});
/**
tree-node
tree-node
tree-node
tree-node
tree-node
tree-node
*/
// hmmm... Interesting. how could we make this better?
// let's override the `TreeNode` class...
class MyRootNode extends TN {
    public get toString(): string {
        return 'I am the root component!'
    }
}
class MyBranchNode extends TN {
    public get toString(): string {
        return 'beware of branches'
    }
}
// ... and use it in a tree
root = new MyRootNode().appendChildren(
            new MyBranchNode().appendChildren(
                new TN(),
                new TN(),
            ),
            new MyBranchNode(),
        )
root.print();
/**
I am the root component!
  ├beware of branches
  │ ├tree-node
  │ └tree-node
  └beware of branches
*/

// well that looks better. We can try to *breadth-first* again now.
root.traverse((child) => {
    console.log(child.toString)
})
/*
I am the root component!
beware of branches
beware of branches
tree-node
tree-node
*/

// Great! what about *depth-first*? It's called `walk` in bb.
root.walk((child) => {
    console.log(child.toString)
})
/*
I am the root component!
beware of branches
tree-node
tree-node
beware of branches
*/

// Wonderful, isn't it?

// To go further, explore the docs
