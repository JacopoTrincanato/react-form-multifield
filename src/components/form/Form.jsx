//importo lo useState
import { useState } from "react";

//importo lo stile
import style from "./Form.module.css"

//importo i post
import posts from "../../data/posts";

//importo le icone di fontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

//creo il componente Form
export default function Form() {
    const [initialPosts, setInitialPosts] = useState(posts)
    const [newPosts, setNewPosts] = useState('')
    //creo una funzione per aggiungere un titolo
    function addPostTitle(e) {
        e.preventDefault()

        setInitialPosts([...initialPosts, { title: newPosts }])
        setNewPosts('')

    }

    //creo una funzione per cancellare un titolo del post
    function eliminate(e) {

        const deleteTitle = Number(e.target.getAttribute('data-index'))

        const newPost = initialPosts.filter((post, index) => index != deleteTitle)

        setInitialPosts(newPost)

    }

    //eseguo il return
    return (
        <section>
            <form onSubmit={addPostTitle}>

                <input type="text" placeholder="Inserisci il titolo" className={style.placeholder} value={newPosts} onChange={e => setNewPosts(e.target.value)} />

                <button className={style.formBtn} type="submit" id="button">INVIA</button>

            </form>

            < ul >
                <li><h2>Titoli dei post</h2></li>
                {initialPosts.map((post, index) => <li className={style.liItem} key={index}>{post.title}
                    <button onClick={eliminate} data-index={index} className={style.deleteBtn}><FontAwesomeIcon icon={faTrash} /></button>
                </li>)}

            </ ul>



        </section>
    )
}