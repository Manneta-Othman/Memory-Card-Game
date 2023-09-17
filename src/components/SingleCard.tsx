
import cover from '../assets/Manneta-logo.png'

type CardProps = {
    card: {src:string, id:number, matched: boolean}
    handleChoice: (card: {src:string, id:number, matched: boolean}) => void
    flipped: boolean
    disabled: boolean
}

export default function SingleProps({card, handleChoice, flipped, disabled}:CardProps) {

    function handleClick() {

        if(!disabled) handleChoice(card)
    }

  return (
    <div className="card">
        <div className={flipped ? 'inner flipped' : 'inner'}>
            <img src={card.src} alt="front card" className='front' />
            <img src={cover} alt="back card" className='cover' onClick={handleClick} />
        </div>
    </div>  
    )
}
