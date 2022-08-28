const {
 default: makeWASocket,
  DisconnectReason,
  fetchLatestBaileysVersion,
  useSingleFileAuthState
 } = require('@adiwajshing/baileys');

 require("qrcode-terminal");
 
 const pino = require('pino');
 const Pino = require('pino');
 const fs = require('fs');
const { state, saveState } = useSingleFileAuthState("./qrcode.json")
const prefix = "."
// 𝐂𝐨𝐧𝐬𝐨𝐥𝐞 / 𝐓𝐞𝐫𝐦𝐮𝐱
const banner = "syx bot | power by m7"
async function startBot () {
console.log(banner)
const m7 = makeWASocket({
logger: pino({ level: "silent" }),printQRInTerminal: true,auth: state})
m7.ev.on("connection.update", (update) => {
const { connection, lastDisconnect } = update
if(connection === "close") {
const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut
console.log("Conexão fechada devido a", lastDisconnect.error, "Tentando reconectar...", shouldReconnect)
if(shouldReconnect) {
startBot()}
} else if(connection === "open") {
console.log("foda-se a estética, o bagulho funcionando ta bom demais, bot on")
}})


// 𝐋𝐢𝐧𝐠𝐮𝐚𝐠𝐞𝐧 𝐃𝐨 𝐁𝐨𝐭

m7.ev.on("messages.upsert", async m => {
try {
const info = m.messages[0]
// await m7.sendReadReceipt(info.key.remoteJid, info.key.participant, [info.key.id]) baileys antiga
if (!info.key.participant) info.key.participant = info.key.remoteJid
info.key.participant = info.key.participant.replace(/:[0-9]+/gi, "")
if (!info.message) return
const from = info.key.remoteJid
const type = Object.keys(info.message).find((key) => !['senderKeyDistributionMessage', 'messageContextInfo'].includes(key))

// 🄰🄻🅃🄾 🅁🄴🅂🄿🄾🄽🄳🄴🅁 🄳🄾 🄱🄾🅃

const body = (type === 'conversation' &&
info.message.conversation.startsWith(prefix)) ?
info.message.conversation: (type == 'imageMessage') &&
info.message[type].caption.startsWith(prefix) ?
info.message[type].caption: (type == 'videoMessage') &&
info.message[type].caption.startsWith(prefix) ?
info.message[type].caption: (type == 'extendedTextMessage') &&
info.message[type].text.startsWith(prefix) ?
info.message[type].text: (type == 'listResponseMessage') &&
info.message[type].singleSelectReply.selectedRowId ?
info.message.listResponseMessage.singleSelectReply.selectedRowId: (type == 'templateButtonReplyMessage') ?
info.message.templateButtonReplyMessage.selectedId: (type === 'messageContextInfo') ?
info.message[type].singleSelectReply.selectedRowId: (type == 'm7.sendMessageButtonMessage') &&
info.message[type].selectedButtonId ?
info.message[type].selectedButtonId: (type == 'stickerMessage') && ((info.message[type].fileSha256.toString('base64')) !== null && (info.message[type].fileSha256.toString('base64')) !== undefined) ? (info.message[type].fileSha256.toString('base64')): ""
budy = (type === 'conversation') ? info.message.conversation : (type === 'extendedTextMessage') ? info.message.extendedTextMessage.text : ''

// Bady
bady = (type === "conversation") ? info.message.conversation : (type == "imageMessage") ? info.message.imageMessage.caption : (type == "videoMessage") ? info.message.videoMessage.caption : (type == "extendedTextMessage") ? info.message.extendedTextMessage.text : (info.message.listResponseMessage && info.message.listResponseMessage.singleSelectenviar.selectedRowId) ? info.message.listResponseMessage.singleSelectenviar.selectedRowId: ""

// Budy
budy = (type === "conversation") ? info.message.conversation : (type === "extendedTextMessage") ? info.message.extendedTextMessage.text : ""

//===

button = (type == "buttonsResponseMessage") ? info.message.buttonsResponseMessage.selectedDisplayText : ""
button = (type == "buttonsResponseMessage") ? info.message.buttonsResponseMessage.selectedButtonId : ""
listMessage = (type == "listResponseMessage") ? info.message.listResponseMessage.title : ""

var pes = (type === "conversation" && info.message.conversation) ? info.message.conversation : (type == "imageMessage") && info.message.imageMessage.caption ? info.message.imageMessage.caption : (type == "videoMessage") && info.message.videoMessage.caption ? info.message.videoMessage.caption : (type == "extendedTextMessage") && info.message.extendedTextMessage.text ? info.message.extendedTextMessage.text : ""

// 𝐎𝐮𝐭𝐫𝐚𝐬 𝐅𝐮𝐧𝐜𝐨𝐞𝐬
// const isGroup = from.endsWith('@g.us')
const getGroupAdmins = (participants) => {
admins = []
for (let i of participants) {i.isAdmin ? admins.push(i.jid):''}
return admins}
const itsMe = m.sender == m7.user.id ? true : false
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.m || quoted).mimetype || ''

const args = body.trim().split(/ +/).slice(1)
const q = args.join(' ')
const comando = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const isCmd = body.startsWith(prefix)
const enviar = (texto) => {
m7.sendMessage(from, { text: texto }, {quoted: info})}

// 𝐋𝐢𝐧𝐠𝐮𝐚𝐠𝐞𝐧 𝐃𝐞 𝐆𝐫𝐮𝐩𝐨
// const isAntiLink =  antilink.includes(from)
const botNumber = m7.user.jid
const isGroup = info.key.remoteJid.endsWith("@g.us")
const sender = isGroup ? info.key.participant : info.key.remoteJid
const groupMetadata = isGroup ? await m7.groupMetadata(from) : ""
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isGroupAdmins = groupAdmins.includes(sender) || false
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const groupName = isGroup ? groupMetadata.subject : ""
const pushname = info.pushName ? info.pushName : ""


const content = JSON.stringify(info.message)

const getFileBuffer = async (mediakey, MediaType) => { 
const stream = await downloadContentFromMessage(mediakey, MediaType)

let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}

const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? m7.sendMessage(from, {text: teks.trim(), mentions: memberr}) : m7.sendMessage(from, {text: teks.trim(), mentions: memberr})
}

const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()


// 𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐍𝐨 𝐏𝐫𝐢𝐯𝐚𝐝𝐨

if (!isGroup && isCmd){ console.log("comando no pv : \n")
  console.log('nome:', pushname, "\n")
  console.log('comando:', comando, "\n")
}

// 𝐌𝐞𝐧𝐬𝐚𝐠𝐞𝐧 𝐍𝐨 𝐏𝐫𝐢𝐯𝐚𝐝𝐨

if (!isCmd && !isGroup){
  console.log("Mensagem no privado, mlk mo burro nem sabe que eu sou um bot \n")
  console.log('nome:', pushname, '\n')
  console.log('mensagem:', budy, "\n")
}

// 𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐄𝐦 𝐆𝐫𝐮𝐩𝐨

if (isCmd && isGroup) {
  console.log("comando em grupo \n")
  console.log('nome do grupo:', groupName, '\n')
  console.log('mensagem:', budy, "\n")
}

// 𝐌𝐞𝐧𝐬𝐚𝐠𝐞𝐧 𝐄𝐦 𝐆𝐫𝐮𝐩𝐨

if (!isCmd && isGroup){
  console.log("comando em grupo \n")
  console.log('nome do grupo:', groupName, '\n')
  console.log("nome do user: ", pushname, "\n")
  console.log('mensagem:', budy, "\n")
}
switch (comando)
{
case 'sla':
  return enviar("se você não sabe, imagine eu")
break
default :


}
}
catch(e) {
  console.log(e)
}})}
startBot()