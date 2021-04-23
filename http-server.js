const http = require('http');

const todos = [
    { id: 1, text: 'Todo 1'},
    { id: 2, text: 'Todo 2'},
    { id: 3, text: 'Todo 3'},
]
const server = http.createServer((req,res)=>{

    const { method, url} = req;
    let body = [];
    req.on('data', chunk =>{
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        
        const response = {
            statusCode : 400,
            message: 'Not Found',
            data: null
        }
        
        if (method === 'GET' && url === '/todos') {
            response.statusCode = 200;
            response.message = 'Success';
            response.data = todos;
        } else if(method === 'POST' && url === '/todos') {
            const {text} = JSON.parse(body);
            todos.push({ id: todos.length + 1, text});
            response.statusCode = 201;
            response.message = 'Success',
            response.data = todos;
        }



        res.writeHead(response.statusCode, {
            'Content-type': 'application/json',
            'X-Powered-By': 'Node.js'
        })
        res.end(JSON.stringify(response));
    })

})

const PORT = 5000;
server.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})