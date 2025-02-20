import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit2, Trash2, CheckCircle, Circle, X } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://localhost:3002/todos'; // Update this if your backend runs on another host/port.

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editValue, setEditValue] = useState('');

  // Fetch todos from the backend
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(API_URL);
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, []);

  // Add a new todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    try {
      const response = await axios.post(API_URL, { text: inputValue.trim() });
      setTodos([...todos, response.data]);
      setInputValue('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Toggle completion status
  const toggleComplete = async (id) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`);
      setTodos(todos.map(todo => todo._id === id ? response.data : todo));
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  // Start editing a todo
  const startEdit = (todo) => {
    setEditingTodo(todo);
    setEditValue(todo.text);
  };

  // Update todo text
  const updateTodo = async () => {
    if (!editValue.trim()) return;
    
    try {
      const response = await axios.put(`${API_URL}/${editingTodo._id}`, { text: editValue.trim() });
      setTodos(todos.map(todo => (todo._id === editingTodo._id ? response.data : todo)));
      setEditingTodo(null);
      setEditValue('');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // Clear completed todos
  const clearCompleted = async () => {
    try {
      await axios.delete(API_URL);
      setTodos(todos.filter(todo => !todo.completed));
    } catch (error) {
      console.error('Error clearing completed todos:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Task Manager
          </h1>
          <div className="flex justify-center items-center mt-4 space-x-4">
            <div className="bg-white/20 rounded-full px-6 py-2">
              <p className="text-white text-lg">{todos.filter(t => !t.completed).length} tasks remaining</p>
            </div>
            <div className="bg-white/20 rounded-full px-6 py-2">
              <p className="text-white text-lg">{todos.filter(t => t.completed).length} completed</p>
            </div>
          </div>
        </div>

        {/* Add Todo Form */}
        <div className="bg-white rounded-2xl shadow-lg mb-8 p-6">
          <form onSubmit={addTodo} className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 px-6 py-4 rounded-xl text-gray-700 bg-gray-50 border-2 border-gray-100 focus:outline-none focus:border-blue-400 transition-all text-lg"
            />
            <button type="submit" className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all text-lg">
              <PlusCircle className="w-6 h-6" />
              <span>Add Task</span>
            </button>
          </form>
        </div>

        {/* Todo List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {todos.map(todo => (
            <div key={todo._id} className="p-6 flex justify-between items-center hover:bg-gray-50 transition-all">
              <div className="flex items-center">
                <button onClick={() => toggleComplete(todo._id)} className="mr-4">
                  {todo.completed ? <CheckCircle className="w-6 h-6 text-green-500" /> : <Circle className="w-6 h-6 text-gray-400" />}
                </button>
                <span className={`text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                  {todo.text}
                </span>
              </div>
              <div className="flex gap-3">
                <button onClick={() => startEdit(todo)} className="px-4 py-2 text-blue-600 hover:bg-blue-100 rounded-lg flex items-center gap-2">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => deleteTodo(todo._id)} className="px-4 py-2 text-red-600 hover:bg-red-100 rounded-lg flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        {editingTodo && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg mb-4"
              />
              <div className="flex justify-end gap-2">
                <button onClick={() => setEditingTodo(null)} className="px-4 py-2 bg-gray-200 rounded-lg">
                  Cancel
                </button>
                <button onClick={updateTodo} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        {todos.some(todo => todo.completed) && (
          <button onClick={clearCompleted} className="mt-4 px-6 py-3 bg-red-600 text-white rounded-lg">
            Clear Completed
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoApp;
