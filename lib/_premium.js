let handler = m => m

handler.before = async function (m) {
    let user = db.data.users[m.sender]
   // if (m.chat.endsWith('status@broadcast')) {
     //   console.log('Status Wa!')
    //}
        let chat = global.db.data.chats[m.chat]
        let _premium = global.lg[chat.sprache]._premium
    if (user.premiumTime != 0 && user.premium) {
        if (new Date() * 1 >= user.premiumTime) {
            await this.sendMessage(m.chat, `${_premium.text.replace('%user', `@${m.sender.split`@`[0]}`)}`, wm, m)
            user.premiumTime = 0
            user.premium = false
        }
    } 
}

export default handler