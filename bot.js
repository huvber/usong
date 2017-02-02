const Telegraf = require('telegraf')
const {trackSearch} = require('./musixmatch')

const bot = new Telegraf(process.env.USONGBOT_ID, {username: 'usongbot'})

console.log('bot initialized')

bot.command('start', (ctx) => ctx.reply('uSongBot activated'))

bot.on('message', async (ctx) =>{
  const text = ctx.update.message.text
  console.log(text)
  try {
    const res = await trackSearch(text)
    console.log(res)
    if(Array.isArray(res) && res.length > 0){
      ctx.reply(res[0].track.track_share_url)
    }
  } catch (e) {
    console.log('error')
    console.log(e, e.stack)
  }
  return 
})

bot.startPolling()
