import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronUpIcon } from '@radix-ui/react-icons';

import { CaretDown } from 'phosphor-react';

interface Game {
  id: string;
  title: string;
}

interface Props {
  games: Game[];
  triggerTextStyle: string;
}

export function SelectBox({ games, triggerTextStyle }: Props) {
  return (
    <div>
      <Select.Trigger aria-label="Game" className={`inline-flex items-center justify-between bg-zinc-900 py-3 px-4 rounded text-sm ${triggerTextStyle}`}>
        <Select.Value placeholder="Selecione o game que deseja jogar" />
        <Select.Icon className='text-zinc-400'>
          <CaretDown size={24} weight="bold" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Content className='fixed top-[40.5%] -translate-y-1/2 left-[48.3%] -translate-x-1/2 truncate bg-zinc-900 rounded shadow-lg shadow-black/25 mt-1'>
        <Select.ScrollUpButton>
          <ChevronUpIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className='p-2 w-96'>
          {games.map(game => {
            return (
              <Select.Item key={game.id} value={game.title} className="flex items-start hover:bg-violet-400 rounded p-1">
                <Select.ItemText>{game.title}</Select.ItemText>
                <Select.ItemIndicator>
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            )
          })}
        </Select.Viewport>
      </Select.Content>
    </div>
  )
}
