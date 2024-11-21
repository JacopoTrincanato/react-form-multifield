//importo lo useState
import { useState } from "react";

//importo lo stile
import style from "./Form.module.css";

//importo i post
import posts from "../../data/posts";

//importo AddButton 
import AddButton from "../buttons/AddButton";

//importo la Card
import Card from "../card/Card";

//Creo il modello iniziale del post
const addedPost = {
    title: "",
    image: "",
    content: "",
    category: "",
    tags: [],
    published: false,
};

//creo il componente Form
export default function Form() {
    const [formData, setFormData] = useState(addedPost);
    const [initialPosts, setInitialPosts] = useState(posts);

    //creo una funzione per aggiungere un titolo
    function addPost(e) {

        //Impedisco il comportamento predefinito del form
        e.preventDefault();

        //Creo un nuovo oggetto post combinando un ID univoco (Date.now()) con i dati del modulo
        const newItem = {
            id: Date.now(),
            ...formData,
        };

        //Aggiorno la lista dei post aggiungendo il nuovo post in cima
        setInitialPosts([newItem, ...initialPosts]);

        //Resetto il modulo al modello iniziale dopo l'invio
        setFormData(addedPost);
    }

    //creo la funzione handleFormField
    function handleFormField(e) {
        // Destrutturo gli attributi dell'evento target per ottenere name, value, type e checked
        const { name, value, type, checked } = e.target;

        // Controllo se il campo è un checkbox e se il nome è "tags"
        if (type === "checkbox" && name === "tags") {
            // Aggiorno lo stato dei tag nel formData.
            setFormData((prevState) => ({
                // Mantengo invariato il resto dei dati nel formData
                ...prevState,
                tags: checked

                    // Se il checkbox è selezionato, aggiungo il valore al campo tags
                    ? [...prevState.tags, value]

                    // Altrimenti, rimuovo il valore dal campo tags
                    : prevState.tags.filter((tag) => tag !== value),
            }));
        }

        // Controllo se il nome è "published" (il select che gestisce lo stato pubblicato)
        else if (name === "published") {
            setFormData({

                // Mantengo invariato il resto dei dati nel formData
                ...formData,

                // Aggiorno il valore di `published` in base all'opzione selezionata
                published: value === "published",
            });
        }

        // Per tutti gli altri campi
        else {
            setFormData({

                // Mantengo invariato il resto dei dati nel formData
                ...formData,

                // Aggiorno il campo corrispondente (name è la chiave del dato) con il valore inserito
                [name]: value,
            });
        }
    }


    //creo una funzione per cancellare un titolo del post
    function eliminate(e) {

        //Ottengo l'indice del post da eliminare dal pulsante associato
        const deleteTitle = Number(e.target.getAttribute("data-index"));

        //Filtro la lista dei post, escludendo quello con l'indice specificato
        const newPost = initialPosts.filter((post, index) => index != deleteTitle);

        //Aggiorno lo stato con la lista filtrata
        setInitialPosts(newPost);
    }

    //eseguo il return
    return (
        <>
            <section>
                <h2>Aggiungi un nuovo post utilizzando il form</h2>
                <form onSubmit={addPost}>

                    {/* Campo per il titolo del post */}
                    <input
                        type="text"
                        placeholder="Inserisci il titolo"
                        className={style.placeholder}
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleFormField}
                    />

                    {/* Campo per il link all'immagine */}
                    <input
                        type="text"
                        placeholder="Inserisci l'immagine"
                        className={style.placeholder}
                        name="image"
                        value={formData.image}
                        onChange={handleFormField}
                    />

                    {/* Campo per il contenuto del post */}
                    <textarea
                        name="content"
                        placeholder="Inserisci il contenuto"
                        id="content"
                        rows="5"
                        className={style.placeholder}
                        value={formData.content}
                        onChange={handleFormField}
                    ></textarea>

                    {/* Selettore per impostare se il post è pubblicato */}
                    <select
                        name="published"
                        id="category"
                        className={style.placeholder}
                        value={formData.published ? "published" : "notPublished"}
                        onChange={handleFormField}
                    >
                        <option value="published">Published</option>
                        <option value="notPublished">Not Published</option>
                    </select>

                    {/* Checkbox per i vari tag*/}
                    <div>

                        <label>
                            <input
                                type="checkbox"
                                name="tags"
                                value="html"
                                checked={formData.tags.includes("html")}
                                onChange={handleFormField}
                            />
                            html
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                name="tags"
                                value="css"
                                checked={formData.tags.includes("css")}
                                onChange={handleFormField}
                            />
                            css
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                name="tags"
                                value="js"
                                checked={formData.tags.includes("js")}
                                onChange={handleFormField}
                            />
                            js
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                name="tags"
                                value="php"
                                checked={formData.tags.includes("php")}
                                onChange={handleFormField}
                            />
                            php
                        </label>
                    </div>

                    {/* Componente AddButton*/}
                    <AddButton />

                </form>
            </section>

            {/* Mappo in InitialPosts*/}
            {initialPosts.map((post, index) => (
                <Card key={post.id} cardPost={post} eliminatePost={eliminate} cardIndex={index}></Card>
            ))}
        </>
    );
}
