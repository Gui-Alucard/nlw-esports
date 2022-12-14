import { useState, useEffect } from "react";
import * as Dialog from '@radix-ui/react-dialog';

import logoImg from "./assets/logo-nlw-esports.svg";
import GameBanner from './components/GameBanner';
import CreateAdBanner from './components/CreateAdBanner';

import './styles/main.css';
import CreatAdModal from "./components/CreatAdModal";
import axios from "axios";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])
  const url = 'http://localhost:3333';

  useEffect(() => {
    axios(`${url}/games`).then(res => setGames(res.data))
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="logo eSports" />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game => {
          return (
            <GameBanner
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
              key={game.id}
            />
          )
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreatAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
