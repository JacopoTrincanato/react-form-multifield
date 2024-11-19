//importo lo useState
import { useState } from "react";

//importo lo stile
import style from "./Form.module.css"

//importo i post
import posts from "../../data/posts";

//importo AddButton 
import AddButton from "../buttons/AddButton";

//importo la Card
import Card from "../card/Card";

//importo le icone di fontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const addedPost = {
    title: "",
    image: "",
    content: "",
    category: "",
    tags: [],
    published: true
}

//creo il componente Form
export default function Form() {
    const [formData, setFormData] = useState(addedPost)
    const [initialPosts, setInitialPosts] = useState(posts)

    //creo una funzione per aggiungere un titolo
    function addPost(e) {
        e.preventDefault()

        const newItem = {
            id: Date.now(),
            ...formData
        }

        setInitialPosts([newItem, ...initialPosts])

        setFormData(addedPost)

    }

    function handleFormField(e) {

        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

        setFormData({
            ...formData,
            [e.target.name]: value
        })
    }

    //creo una funzione per cancellare un titolo del post
    function eliminate(e) {

        const deleteTitle = Number(e.target.getAttribute('data-index'))

        const newPost = initialPosts.filter((post, index) => index != deleteTitle)

        setInitialPosts(newPost)

    }

    //eseguo il return
    return (
        <>
            <section>
                <h2>Aggiungi un nuovo post utilizzando il form</h2>

                <form onSubmit={addPost}>

                    <input type="text"
                        placeholder="Inserisci il titolo"
                        className={style.placeholder}
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleFormField}
                    />

                    <input type="text"
                        placeholder="Inserisci l'immagine"
                        className={style.placeholder}
                        name="image"
                        value={formData.image}
                        onChange={handleFormField} />

                    <textarea name="content"
                        placeholder="Inserisci il contenuto"
                        id="content" rows="5"
                        className={style.placeholder}
                        value={formData.content}
                        onChange={handleFormField}>

                    </textarea>

                    <select name="published"
                        id="category"
                        className={style.placeholder}
                        value={formData.published ? "published" : "notPublished"}
                        onChange={handleFormField}>
                        <option value="published">Published</option>
                        <option value="notPublished">not Published</option>
                    </select>

                    <div>
                        <input type="checkbox"
                            name="tags"
                            value={formData.tags}
                            onChange={handleFormField}
                        />html

                        <input type="checkbox"
                            name="tags"
                            value={formData.tags}
                            onChange={handleFormField}
                        />css

                        <input type="checkbox"
                            name="tags"
                            value={formData.tags}
                            onChange={handleFormField}
                        />js

                        <input type="checkbox"
                            name="tags"
                            value={formData.tags}
                            onChange={handleFormField}
                        />php

                    </div>



                    <AddButton />

                </form>


            </section>

            {initialPosts.map((post, index) => <Card key={post.id} post={post}><button onClick={eliminate} data-index={index} className={style.deleteBtn}><FontAwesomeIcon icon={faTrash} /></button></Card>)}
        </>
    )
}