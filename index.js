// import dotenv from 'dotenv'
// dotenv.config()
// import { Configuration, OpenAIApi } from 'openai'

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// })
// const openai = new OpenAIApi(configuration)
/////////////////////////////////////////////////////
import openai from './config/open-ai.js'
import readlineSync from 'readline-sync'
import colors from 'colors'

const main = async () => {
    // const response = await openai.listEngines()
    // console.log(response.data.data)
    //////////////////////////////////////////////////////////////////////////////
    // const chatCompletion = await openai.createChatCompletion({
    //     model: 'gpt-3.5-turbo',
    //     messages: [ { role: 'user', content: 'What is the capital of Massachusetts?' }, ]
    // })
    // console.log(chatCompletion.data)
    // console.log(chatCompletion.data.choices[0].message)
    //////////////////////////////////////////////////////////////////////////////
    // const userName = readlineSync.question('May I have your name? ')
    // console.log(`Hello ${userName}.`)
    //////////////////////////////////////////////////////////////////////////////
    console.log(colors.bold.green('Welcome to the Chatbot Program!'))
    console.log(colors.bold.green('You can start chatting with the bot.'))
    
    /* [1] Store Conversation History */
    const chatHistory = []
    
    while (true) {
        const userInput = readlineSync.question(colors.yellow('You : '))
        try {
            /* [2] Construct Messages by Iterating Over the History */
            const messages = chatHistory.map(([role, content]) => ({role, content}))
            /* [3] Add Latest User Input */
            messages.push({ role: 'user', content: userInput })
            //////////////////////////////////////////////////
            /* Finish This Program with 'exit' Instruction */
            // if (userInput.toLowerCase() === 'exit') { 
            //     return
            // }
            //////////////////////////////////////////////////
            /* Call the API with User Input */
            const completion = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                // messages: [ { role: 'user', content: userInput }, ],
                /* [4] Create Chat Completion with Chat History */
                messages,
            })
            /* Get Completion Content/Text */
            const completionText = completion.data.choices[0].message.content
            //////////////////////////////////////////////////
            /* Finish This Program with 'exit' Instruction */
            if (userInput.toLowerCase() === 'exit') { 
                console.log(colors.green('Bot : ') + completionText)
                return
            }
            //////////////////////////////////////////////////
            /* Print Out the Result */
            console.log(colors.green('Bot : ') + completionText)
            /* [5] Update History with User Input and Assistant Response */
            chatHistory.push(['user', userInput])
            chatHistory.push(['assistant', completionText])
        } catch (error) {
            console.error(colors.red(error))
        }
    }

}
main()

/**
 * Compare with and without chat history asking below queries
 * 
 * 1. what is the capital of Florida? 
 * 2. what is the population? 
 */