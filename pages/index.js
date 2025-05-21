import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const querySnapshot = await getDocs(collection(db, 'todos'));
      const items = [];
      querySnapshot.forEach((d) => {
        items.push({ ...d.data(), id: d.id });
      });
      setTodos(items);
    };
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!input) return;
    const docRef = await addDoc(collection(db, 'todos'), {
      text: input,
      status: 'pending',
    });
    setTodos([...todos, { text: input, status: 'pending', id: docRef.id }]);
    setInput('');
  };

  const removeTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
    setTodos(todos.filter((t) => t.id !== id));
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const saveEdit = async (id) => {
    const todoRef = doc(db, 'todos', id);
    await updateDoc(todoRef, { text: editingText });
    setTodos(todos.map((t) => (t.id === id ? { ...t, text: editingText } : t)));
    setEditingId(null);
    setEditingText('');
  };

  const updateStatus = async (id, status) => {
    const todoRef = doc(db, 'todos', id);
    await updateDoc(todoRef, { status });
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Todo App</h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo"
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <button onClick={addTodo} style={{ padding: '0.5rem 1rem' }}>Add</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((t) => (
          <li
            key={t.id}
            style={{
              background: '#f4f4f4',
              marginTop: '1rem',
              padding: '0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderLeft: t.status === 'completed' ? '4px solid green' : t.status === 'rejected' ? '4px solid red' : '4px solid gray',
            }}
          >
            {editingId === t.id ? (
              <input
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                style={{ flex: 1, marginRight: '1rem' }}
              />
            ) : (
              <span style={{ flex: 1 }}>{t.text}</span>
            )}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {editingId === t.id ? (
                <button onClick={() => saveEdit(t.id)}>Save</button>
              ) : (
                <button onClick={() => startEdit(t)}>Edit</button>
              )}
              <button onClick={() => updateStatus(t.id, 'completed')}>✓</button>
              <button onClick={() => updateStatus(t.id, 'rejected')}>✗</button>
              <button onClick={() => removeTodo(t.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
