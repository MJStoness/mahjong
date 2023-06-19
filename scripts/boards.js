class Board {
    constructor(name, layout) {
        this.name = name;
        this.layout = layout;

        let tileCount = 0;
        layout.forEach(level => {
            tileCount += level.length;
        });
        this.tileCount = tileCount;
    }
}

const boards = [
    new Board('default', [
        [ 
            [1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],[12,0],
            [3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],
            [2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2],[11,2],
            [0, 3.5],
            [1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,3],[12,3],
            [1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],[12,4],
            [13, 3.5], [14, 3.5],
            [2,5],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],
            [3,6],[4,6],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],
            [1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],[9,7],[10,7],[11,7],[12,7]
        ],
        [
            [4,1],[5,1],[6,1],[7,1],[8,1],[9,1],
            [4,2],[5,2],[6,2],[7,2],[8,2],[9,2],
            [4,3],[5,3],[6,3],[7,3],[8,3],[9,3],
            [4,4],[5,4],[6,4],[7,4],[8,4],[9,4],
            [4,5],[5,5],[6,5],[7,5],[8,5],[9,5],
            [4,6],[5,6],[6,6],[7,6],[8,6],[9,6],
        ],
        [
            [5,2],[6,2],[7,2],[8,2],
            [5,3],[6,3],[7,3],[8,3],
            [5,4],[6,4],[7,4],[8,4],
            [5,5],[6,5],[7,5],[8,5],
        ],
        [
            [6,3],[7,3],
            [6,4],[7,4],
        ],
        [
            [6.5, 3.5]
        ]
    ]),
    new Board('debug', [
        [ 
            [1,0],
            [3,1],[4,1],[5,1],[6,1],
            [2,2],[3,2]
        ],
        [
            [1,0]
        ]
    ]),
    new Board('debug2', [
        [ 
            [1,0],
            [3,1],[4,1],[5,1],[6,1],
            [2,2],[3,2]
        ],
        [
            [1,0]
        ]
    ]),
    new Board('debug3', [
        [ 
            [1,0],
            [3,1],[4,1],[5,1],[6,1],
            [2,2],[3,2]
        ],
        [
            [1,0]
        ]
    ])
]