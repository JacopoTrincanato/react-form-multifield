//importo lo stile
import style from './Card.module.css'

//importo il bottone
import Button from '../button/Button';

//creo il componente Card e gli aggiungo la props post
export default function Card({ post }) {

    //eseguo il return
    return (
        <>
            {post.published && <div className={style.card}>
                <div className={`${style.cardTop} ${style.dFlex}`}>
                    <img src={post.image} alt="immagine" />
                </div>

                <div className={style.cardBottom}>
                    <h3 className={style.mt1}>{post.title}</h3>
                    <p className={style.mt1}>{post.content}</p>

                    <p className={style.mt1}>
                        {post.tags && post.tags.map((tag, index) => (
                            <span className={style[tag]} key={index}>
                                {tag}{index < post.tags.length - 1 ? ' ' : ''}
                            </span>


                        ))}
                    </p>
                    <Button />
                </div>
            </div>
            }

        </>
    )
}