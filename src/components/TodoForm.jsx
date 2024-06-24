import { QueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
// import { todoApi } from "../api/todos";

export default function TodoForm({ fetchData }) {
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const queryclient = new QueryClient();
    // TODO: useMutation 으로 리팩터링 하세요.

    const addTodo = async () => {
        await axios.post('http://localhost:4000/todos', {
            id: Date.now().toString(),
            title,
            contents,
            isCompleted: false,
            createdAt: Date.now(),
        });
    };

    const mutation = useMutation(addTodo, {
        onSuccess: () => {
            queryclient.invalidateQueries(['todos']);
            setTitle('');
            setContents('');
        },
    });

    const handleAddTodo = async (e) => {
        e.preventDefault();
        mutation.mutate();
        // await fetchData();
    };

    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="title">제목:</label>
            <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <label htmlFor="contents">내용:</label>
            <input
                id="contents"
                name="contents"
                value={contents}
                onChange={(e) => setContents(e.target.value)}
                required
            />
            <button type="submit">추가하기</button>
        </form>
    );
}
