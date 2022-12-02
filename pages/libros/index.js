import Link from "next/link";
import { useState } from 'react';

export async function getStaticProps() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/`)

    const data = await res.json()

    
    return {
        props: {
            books: data
        }
    }

}


const BookList = ({ books }) => {

    const [submitting, setSubmitting] = useState(false)
    async function handleDelete(e, bookId) {

        setSubmitting(true)
        e.preventDefault()
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${bookId}`,{

            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
            },

            body: JSON.stringify({
                _method: 'DELETE'
            })

        })

        if (res.ok) {
            window.location.href= '/libros'
        }
        setSubmitting(false)
    }

    return (
        <div>
            <h1>Book List</h1>
            <ul data-cy="book-list">
                {books.map(book =>(
                    
                    <li key={`book-${book.id}`}>

                        <Link 
                            href={`/libros/${book.id}`}
                            data-cy={`link-to-visit-book-${book.id}`}
                        >
                            {book.title}
                        </Link>

                        {' - '}

                        <Link 
                            href={`/libros/${book.id}/editar`}
                            data-cy={`link-to-edit-book-${book.id}`}

                        >
                            Editar
                        </Link>

                        {' - '}

                        <form 
                            onSubmit = {(e) => handleDelete(e, book.id)}
                            style={{ display: 'inline' }}
                        >
                            <button
                                disabled = {submitting}
                                data-cy={`link-to-delete-book-${book.id}`}
                            >
                                {submitting ? 'Eliminando..' : 'Eliminar'}
                            </button>
                        </form>

                    </li>

                ))}
            </ul>
            <Link href="/libros/crear">New Book</Link>
            <Link href="/">Home</Link>
        </div>
    )
}

export default BookList