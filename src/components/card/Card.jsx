//importo lo stile
import style from './Card.module.css'

//importo il bottone
import Button from '../buttons/Button';

//importo le icone di fontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

//creo il componente Card e gli aggiungo la props post
export default function Card({ cardPost, cardIndex, eliminatePost }) {

    //eseguo il return
    return (
        <>
            {cardPost && cardPost.published && <div className={style.card}>
                <div className={`${style.cardTop} ${style.dFlex}`}>
                    <img src={cardPost.image} alt="immagine" />
                </div>

                <div className={style.cardBottom}>
                    <h3 className={style.mt1}>{cardPost.title}</h3>
                    <p className={style.mt1}>{cardPost.content}</p>

                    <p className={style.mt1}>
                        {Array.isArray(cardPost.tags) && cardPost.tags.map((tag, index) => (
                            <span className={style[tag]} key={index}>
                                {tag}{index < cardPost.tags.length - 1 ? ' ' : ''}
                            </span>


                        ))}
                    </p>
                    <Button />

                    <button onClick={eliminatePost} data-index={cardIndex} className={style.deleteBtn}><FontAwesomeIcon icon={faTrash} /></button>
                </div>
            </div>
            }

        </>
    )
}