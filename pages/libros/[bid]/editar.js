import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState } from 'react';

export async function getServerSideProps({ params }) {
   const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.bid}`)
   const data = await res.json()

   return {
    props: {
        book:data
    }
   }
}

const BookEdit = ({ book }) => {

    const router = useRouter()
    const [bookTitle, setbookTitle] = useState(book.title)
    const [bookSynopsis, setbookSynopsis] = useState(book.synopsis)
    const [submitting, setSubmitting] = useState(false) //para evitar que haga varios inserts si el usuario pulsa repetidamente el botón de enviar

    //errores
    const [errors, setErrors] = useState('');

    async function handleSubmit(e) {

        setSubmitting(true)
        e.preventDefault()
       
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${book.id}`,{

            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
            },

            body: JSON.stringify({
                title: bookTitle,
                synopsis: bookSynopsis,
                _method: 'PATCH'
            })

        })

        if (res.ok) {

            //success
            setErrors([]) //para que desaparezcan los errores
            setbookTitle('')
            setbookSynopsis('')

            return router.push('/libros')

        } 
        
        const data = await res.json()
        setErrors(data.errors)
        setSubmitting(false)
        // console.log(res)
    }

    return (
        <>
            <h1> Book Edit </h1>
            {/* <p>{JSON.stringify(errors)}</p> */}

            <form onSubmit={handleSubmit}>
                
                <input 

                    onChange = {(e) => setbookTitle(e.target.value)}
                    type ="text"
                    value = {String(bookTitle)}
                    disabled = {submitting}
                    data-cy="input-book-title"

                />

                <br/>

                <textarea
                
                    onChange = {(e) => setbookSynopsis(e.target.value)}
                    value = {String(bookSynopsis)}
                    disabled = {submitting}
                    data-cy="textarea-book-synopsis"
                
                />
                
                <button 
                    disabled = {submitting}
                    data-cy="button-submit-book"
                >
                    {submitting ? 'Enviando..' : 'Enviar'}
                </button>
                
                {errors.title && (
                    <span style={{
                        color: 'red', display: 'block'
                        }}> {errors.title} </span>
                       
                   
                )}
                {errors.synopsis && (
                    <span style={{
                        color: 'red', display: 'block'
                        }}> {errors.synopsis} </span>
                )}

            </form>

            <br/>
            
            <Link href="/libros">Book List</Link>
        
        </>
    );
}

export default BookEdit;
