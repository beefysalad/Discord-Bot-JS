const Discord = require('discord.js')
const config = require('./config.json')
const client = new Discord.Client()
const axios = require('axios')

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!!!`);
    client.user.setPresence({
        status: 'online',
        activity: {
            name: "onits ni Tabs",
            type: "PLAYING",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }
    });
});

client.on('message', async (msg)=>{
    const args = msg.content.slice(config.prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    
    try{
        if(command ==='help'){
            msg.channel.send(`> Current Prefix is ${config.prefix}\n> Commands are:\n> help : view commands\n> tts + message : make the bot send tts message\n> search + anime title : search for an anime using the MyAnimeList API\n> info : info about the bot\n> src: view source code of the bot`) 
        }
        else if(command.startsWith('tts')){
            const filtered = msg.content.split(" ")
            let ttsMessage = ''
           
                for(let i=0; i<filtered.length; i++)
                {
                    if(i!==0)
                    {
                        ttsMessage += `${filtered[i]} `
                    }
                }
                msg.channel.send(ttsMessage, {tts: true})
        }
        else if(msg.content.startsWith('gg'))
        {
            msg.reply('Ggs! Tomorrow again!')
            
        }
        else if(command==='search')
        {
            const animeQuery = msg.content.split(" ")
            let animeq = ''
            for(let i =0; i<animeQuery.length; i++)
            {
                if(i!==0)
                {
                    animeq += `${animeQuery[i]} `
                }
            }
            const data = await fetchAnimeInfo(animeq)
            msg.channel.send(data.results[0].image_url)
            msg.channel.send(`Title: ${data.results[0].title}\nSynopsis: \n${data.results[0].synopsis}`)
            
        }   
        else if(command==='info')
        {
            msg.channel.send('> The bot is scripted using NodeJavaScript with the library Axios that fetches the MyAnimeList API')
        }
        else if(command==='src')
        {
            msg.channel.send('https://github.com/beefysalad/Discord-Bot-JS/blob/main/Discord%20Bot%20Javascript/main.js')
        }
        else if(command==='j')
        {
            const connection = await msg.member.voice.channel.join()
            const dispatcher = connection.play('./topibakat2.mp3',{volume: 0.5})
            dispatcher.on('start',()=>{
                console.log('playing')
            })
            dispatcher.on('finish',()=>{
                console.log('finished playing')
            })
            dispatcher.on('error',console.error)
        }
        else if(command==='l')
        {
            const conn = msg.member.voice.channel.leave()
        }
     
    }
    catch(error)
    {
        console.log('nisud')
        msg.channel.send(error)
        console.log(error)
    }
     
})
const fetchAnimeInfo = async (title) =>{
    const c = 
                {
                    params:
                    {
                        q: title
                    },
                    headers:{
                        'x-rapidapi-key': 'da83a92a7cmshccce6ee64476b32p149f46jsn0281c4b8a9d1',
                        'x-rapidapi-host': 'jikan1.p.rapidapi.com'
                    }
                }
    const res = await axios.get(`https://jikan1.p.rapidapi.com/search/anime`,c)
    return res.data
}
client.login(config.token)
