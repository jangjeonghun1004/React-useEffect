import { useState, useEffect } from "react";

type Book = {
    id: number;
    title: string;
    author: string;
};

function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function awaitFunction() {
    await sleep(1000); // 2초 대기
}

function Book() {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                await awaitFunction();
                const response = await fetch('/book.json');
                const data = await response.json();
                setBooks(data);
            } catch(error) {
                console.log(`error message = ${error}`);
            } finally {
                setIsLoading(false);
            }
        }

        fetchBooks();
    }, [/*필터 useState 설정*/]);

    return (
        <div>
            <h2>Books</h2>
            {isLoading && <strong>Data is Loading...</strong>}

            <ul>
                {books.map((book) => {
                    return (
                        <li key={book.id}>
                            <strong>{book.title}</strong> By {book.author}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default Book