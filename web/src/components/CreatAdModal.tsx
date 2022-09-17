import { useEffect, useState, FormEvent } from 'react';
import { CaretDown, Check, GameController, } from 'phosphor-react';

import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronUpIcon } from '@radix-ui/react-icons';

import { Input } from './Form/Input';
import axios from 'axios';
// import { SelectBox } from './Form/SelectBox';

interface Game {
  id: string;
  title: string;
}

export default function CreatAdModal() {
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)
  const [triggerTextStyle, setTriggerTextStyle] = useState("text-zinc-500")

  const url = 'http://localhost:3333';
  const weekDaysArray = [
    {
      name: "Domingo",
      short: "D",
      stringIndex: "0"
    },
    {
      name: "Segunda",
      short: "S",
      stringIndex: "1"
    },
    {
      name: "Terça",
      short: "T",
      stringIndex: "2"
    },
    {
      name: "Quarta",
      short: "Q",
      stringIndex: "3"
    },
    {
      name: "Quinta",
      short: "Q",
      stringIndex: "4"
    },
    {
      name: "Sexta",
      short: "S",
      stringIndex: "5"
    },
    {
      name: "Sábado",
      short: "S",
      stringIndex: "6"
    },
  ];

  useEffect(() => {
    axios(`${url}/games`).then(res => setGames(res.data))
  }, [])

  async function handleCreateAd(e: FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    if (!data.name) {
      return
    }

    try {
      await axios.post(`${url}/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel
      })
      alert('Anúncio criado com sucesso!')
    } catch (error) {
      console.log(error)
      alert('Erro ao criar o anúncio!')
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">Qual o game?</label>
            <Select.Root name='game' onValueChange={(e) => (setTriggerTextStyle("text-white"))}>
              <Select.Trigger aria-label="Game" className={`inline-flex items-center justify-between bg-zinc-900 py-3 px-4 rounded text-sm ${triggerTextStyle}`}>
                <Select.Value placeholder="Selecione o game que deseja jogar" />
                <Select.Icon className='text-zinc-400'>
                  <CaretDown size={24} weight="bold" />
                </Select.Icon>
              </Select.Trigger>
              <Select.Content className='fixed top-[39%] -translate-y-1/2 left-[48.3%] -translate-x-1/2 truncate bg-zinc-900 rounded shadow-lg shadow-black/25 mt-1'>
                <Select.ScrollUpButton>
                  <ChevronUpIcon />
                </Select.ScrollUpButton>
                <Select.Viewport className='p-2 w-96'>
                  {games.map(game => {
                    return (
                      <Select.Item key={game.id} value={game.id} className="flex items-start hover:bg-violet-400 rounded p-1">
                        <Select.ItemText>{game.title}</Select.ItemText>
                        <Select.ItemIndicator className='absolute right-0 w-12 inline-flex items-center justify-center translate-y-1/4 h-4 text-emerald-400'>
                          <CheckIcon />
                        </Select.ItemIndicator>
                      </Select.Item>
                    )
                  })}
                </Select.Viewport>
              </Select.Content>
            </Select.Root>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input name="name" id="name" placeholder="Como te chamam dentro do game?" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
              <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual o seu Discord?</label>
              <Input name="discord" id="discord" type="text" placeholder="Usuario#0000" />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDaysArray">Quando costuma jogar?</label>

              <ToggleGroup.Root
                type='multiple'
                className="grid grid-cols-4 gap-2"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                {weekDaysArray.map(day => {
                  return (
                    <ToggleGroup.Item
                      key={day.stringIndex}
                      value={day.stringIndex}
                      title={day.name}
                      className={`w-8 h-8 rounded ${weekDays.includes(day.stringIndex) ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      {day.short}
                    </ToggleGroup.Item>
                  )
                })}
              </ToggleGroup.Root>
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="hourStart">Qual horário do dia?</label>
            <div className="grid grid-cols-2 gap-2">
              <Input id="hourStart" name="hourStart" type="time" placeholder="De" />
              <Input id="hourEnd" name="hourEnd" type="time" placeholder="Até" />
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox.Root
              checked={useVoiceChannel}
              className='w-6 h-6 p-1 rounded bg-zinc-900'
              onCheckedChange={(checked) => checked ? setUseVoiceChannel(true) : setUseVoiceChannel(false)}
            >
              <Checkbox.Indicator>
                <Check className='w-4 h-4 text-emerald-400' />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
            >
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
            >
              <GameController className="w-6 h-6" />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
