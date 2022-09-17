import express from 'express'
import cors from 'cors'

import { PrismaClient} from '@prisma/client'
import { converteHourToMinutes } from './utils/convert-hours-to-minutes'
import { converteMinutesToHours } from './utils/convert-minutes-to-hours'

const app = express()
app.use(express.json())
app.use(cors())

const prisma = new PrismaClient({
  log: ['query']
})

app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    }
  })
  return res.status(200).json(games);
})

app.post('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;
  const body: any = req.body;
  //Validações => ZOD lib

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: converteHourToMinutes(body.hourStart),
      hourEnd: converteHourToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    }
  })
  return res.status(201).json(ad);
})

app.get('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;
  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  
  return res.status(200).json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: converteMinutesToHours(ad.hourStart),
      hourEnd: converteMinutesToHours(ad.hourEnd),
    }
  }))
})

app.get('/games/:id/discord', async (req, res) => {
  const adId = req.params.id;
  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    }
  })

  return res.json({
    discord: ad.discord,
  })
})

app.listen(3333)