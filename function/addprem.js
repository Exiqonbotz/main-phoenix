let handler = async (m, { conn, text, usedPrefix, command }) => {
  global.premuser = { key: { remoteJid: `status@broadcast`, participant: '0@s.whatsapp.net' }, status: 1, surface: 1 , message: { conversation: 'Nishikigi Chisato Premium User'} }
  let who
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
  else who = m.chat
  let user = db.data.users[who]
  if (!who) throw "Markieren oder antworten Sie auf Nachrichten, die Sie zu Premium machen möchten!"
  let txt = text.replace('@' + who.split('@')[0], '').trim() 
  if (!txt) throw "Wie viele Tage hast du?"
  if (isNaN(txt)) return m.reply(`nur mamaskuh Nummer!\n\nBeispiel:\n${usedPrefix + command} @${m.sender.split('@')[0]} 7`)
  var jumlahHari = 86400000 * txt
  var now = new Date() * 1
  if (now < user.premiumTime) user.premiumTime += jumlahHari
  else user.premiumTime = now + jumlahHari
  user.premium = true
         global.db.data.users[m.sender].pointxpp += 1
  global.db.data.users[who].label = "Premium"
  conn.reply(m.chat, `Erfolgreich!\n*${user.name}* ist jetzt Premium für ${txt} Tage .\n\ncountdown: ${msToDate(user.premiumTime - now)}`, premuser)
}

handler.help = ['addprem [@user] <Tage>']
handler.tags = ['owner']
handler.command = /^(add|\+)p(rem)?$/i
handler.rowner = true
handler.mods = true    

export default handler

function msToDate(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
    days = Math.floor(duration / (1000 * 60 * 60 * 24))

  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  let result = `${days} Tage, ${hours} Stunden, ${minutes} Minuten und ${seconds} Sekunden`
  return result
                }