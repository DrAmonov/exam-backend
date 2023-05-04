const http = require('http');

const Io = require('./utils/Io');
const Todos = new Io('.db/todos.json');
const Todo = require('./models/todo');
const parser = require('./utils/parser');

const server = http.createServer(async (res, req) => {
	// console.log('ishla');

	if (req.url === '/todo' && req.metohod === 'POST') {
		req.body = await parser(req);
		const { text, date } = req.body;
		date = new Date();
		const todos = await Todos.read();
		const id = (todos[todos.length - 1]?.id || 0) + 1;

		const newTodo = new Todo(id, text, date);
		const data = todos.length ? [...todos, newTodo] : [newTodo];
		Todos.write(data);

		res.writeHead(201);
		res.end(JSON.stringify({ success: 'true' }));
		console.log('ishla too');
	} else if (req.url === '/todo/get' && req.metohod === 'GET') {
		console.log('allright');
	} else if (req.url === `/todo` && req.metohod === 'PUT') {
		req.body = await parser(req);
		const todos = await Todos.read();
		const id = (todos[todos.length - 1]?.id || 0) + 1;

		const index = todos.findIndex((p) => p.id === id);
		const data = (todos[index] = { id, ...todos });

		Todos.write(data);
		console.log('adfaef');

		res.writeHead(203);
		res.end(JSON.stringify({ success: 'true' }));
	} else if (req.url === `/todo` && req.metohod === 'DELETE') {
		const todos = await Todos.read();
		const id = (todos[todos.length - 1]?.id || 0) + 1;

		const newData = data.filter((e) => e.id != id);

		const data = todos.length ? [...todos, newData] : [newData];

		Todos.write(data);
		res.writeHead(501);
		res.end(JSON.stringify({ success: true }));
	} else if (req.metohod === 'PUT') {
		req.body = await parser(req);
		const todos = await Todos.read();
		const id = (todos[todos.length - 1]?.id || 0) + 1;

		const { isComplated } = req.body;
		const newData = data.filter((e) => e.id === id);

		isComplated = true

		const data = todos.length ? [...todos, newData] : [newData];

		Todos.write(data);
		res.writeHead(200, "isComplated");
	}
});
PORT = 5487;
server.listen(PORT, () => {
	console.log(`server run ${PORT}`);
});

// "uzurli sabablarga ko'ra ayrim muammolar yuzaga kelgan iltimos logikasiga ham ahamiyat bering"
