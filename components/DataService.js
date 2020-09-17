const DATA = [ 
    {id: 1, text: 'Item Onee', color: 'red'}, 
    {id: 2, text: 'Item Twoo', color: 'blue'}, 
    {id: 3, text: 'Item Threee', color: 'yellow'}
] 
const dataService = { getNotes: (username) => { return DATA; } }

export default dataService;