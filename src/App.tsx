import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImgs = [
  {'src': 'assets/html.svg', matched: false},
  {'src': 'assets/css.svg', matched: false},
  {'src': 'assets/javascript.svg', matched: false},
  {'src': 'assets/react.svg', matched: false},
  {'src': 'assets/sass.svg', matched: false},
  {'src': 'assets/bootstrap.svg', matched: false},
  {'src': 'assets/typescript.svg', matched: false},
  {'src': 'assets/redux.svg', matched: false}
]

type CardProps ={
  src: string
  id: number
  matched:boolean
}

function App() {

  const [cards, setCards] = useState<CardProps[]>([])
  const [turns, setTurns] = useState(0)

  const [firstChoice, setFirstChoice] = useState<CardProps | null>(null)
  const [secondChoice, setSecondChoice] = useState<CardProps | null>(null)
  const [disabled, setDisabled] = useState(false)

  

  // shuffle Cards and assign it to a new varibale
  const shuffleCards = () => {
    const shuffledCards = [...cardImgs, ...cardImgs]
    .sort(() => Math.random() - 0.5)
    .map(card => ({...card, id: Math.random()}))

    setCards(shuffledCards);
    setFirstChoice(null)
    setSecondChoice(null)
    setTurns(0)
  }


  useEffect(() => {
    shuffleCards()
  }, [])

//Handle Choices when Clicking on Cards

function handleChoice(card:{src:string, id:number, matched: boolean}){

  firstChoice ? setSecondChoice(card) : setFirstChoice(card)
}

// matching logic of the cards

function handleMatch () {
  if((firstChoice && secondChoice) && (firstChoice.id !== secondChoice.id)) {

    setDisabled(true)
  
    if(firstChoice.src === secondChoice.src){
      setCards(prevCard => {
        return prevCard.map(card => {
          if(card.src === firstChoice.src){
            return {...card, matched: true}
          }else{
            return card
          }
        })
      })
  
      resetTurn();  
    }else{
      setTimeout(() => {
        resetTurn()
      }, 1000)
    }
    setTurns(turn => turn + 1)
  }
}

//reset choices to null
function resetTurn() {
  setFirstChoice(null)
  setSecondChoice(null)
  setDisabled(false)
}

useEffect(() => {
  handleMatch();
}, [firstChoice, secondChoice])


  return (
    <>
      <div className="App">
        <h1>Matching Cards Game</h1>
        <button onClick={shuffleCards} >Start The Game</button>

        <div className="container">
          {cards.map(card => (
            <SingleCard 
              key={card.id} 
              card={card} 
              handleChoice={handleChoice}
              flipped={firstChoice === card || secondChoice === card || card.matched}
              disabled={disabled}
            />
          ))}

          <h3>Turns: {turns}</h3>
        </div>
      </div>
    </>
  )
}

export default App
