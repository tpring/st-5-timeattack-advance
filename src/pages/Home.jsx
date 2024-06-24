import { useState, useEffect } from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
    // TODO: useQuery 로 리팩터링 하세요.

    const fetchData = async () => {
        const response = await axios.get('http://localhost:4000/todos');
        return response.data;
    };

    const { data, isLoading, error } = useQuery({ queryKey: ['todos'], queryFn: fetchData });

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) {
        return <div style={{ fontSize: 36 }}>로딩중...</div>;
    }

    if (error) {
        console.error(error);
        return <div style={{ fontSize: 24 }}>에러가 발생했습니다: {error.message}</div>;
    }

    return (
        <>
            <h2>서버통신 투두리스트 by useState</h2>
            <TodoForm fetchData={fetchData} />
            <TodoList todos={data} />
        </>
    );
}
